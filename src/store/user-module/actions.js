import { firebaseAuth, firebaseDb } from "boot/firebase";
import {
  ref,
  set,
  onValue,
  update,
  onChildAdded,
  onChildChanged,
} from "firebase/database";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export function registerUser({}, payload) {
  createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
    .then((response) => {
      console.log(response);
      console.log("firebaseAuth.currentUser.uid");
      console.log(firebaseAuth.currentUser.uid);
      let userId = firebaseAuth.currentUser.uid;
      set(ref(firebaseDb, "users/" + userId), {
        name: payload.name,
        email: payload.email,
        online: true,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function loginUser({}, payload) {
  signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function logoutUser() {
  signOut(firebaseAuth);
}

export function handleAuthStateChanged({ commit, dispatch, state }) {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is logged in.
      let userId = firebaseAuth.currentUser.uid;
      // firebaseDb.ref("users/" + userId).once("value", (snapshot) => {
      //   let userDetails = snapshot.val();
      //   commit("setUserDetails", {
      //     name: userDetails.name,
      //     email: userDetails.email,
      //     userId: userId,
      //   });
      // });
      onValue(
        ref(firebaseDb, "/users/" + userId),
        (snapshot) => {
          if (snapshot.exists()) {
            let userDetails = snapshot.val();
            console.log("userDetails");
            console.log(userDetails);
            commit("setUserDetails", {
              name: userDetails.name,
              email: userDetails.email,
              userId: userId,
            });
          }
        },
        {
          onlyOnce: true,
        }
      );
      dispatch("firebaseUpdateUser", {
        userId: userId,
        updates: {
          online: true,
        },
      });
      dispatch("firebaseGetUsers");
      this.$router.push("/");
    } else {
      // User is logged out.
      dispatch("firebaseUpdateUser", {
        userId: state.userDetails.userId,
        updates: {
          online: false,
        },
      });
      commit("setUserDetails", {});
      this.$router.replace("/auth");
    }
  });
}

export function firebaseUpdateUser({}, payload) {
  if (payload.userId) {
    // firebaseDb.ref("users/" + payload.userId).update(payload.updates);
    update(ref(firebaseDb, "users/" + payload.userId), payload.updates);
  }
}

export function firebaseGetUsers({ commit }) {
  const usersRef = ref(firebaseDb, "users");
  // firebaseDb.ref("users").on("child_added", (snapshot) => {
  //   let userDetails = snapshot.val();
  //   let userId = snapshot.key;
  //   commit("addUser", {
  //     userId,
  //     userDetails,
  //   });
  // });
  onChildAdded(usersRef, (snapshot) => {
    let userDetails = snapshot.val();
    let userId = snapshot.key;
    commit("addUser", {
      userId,
      userDetails,
    });
  });
  // firebaseDb.ref("users").on("child_changed", (snapshot) => {
  //   let userDetails = snapshot.val();
  //   let userId = snapshot.key;
  //   commit("updateUser", {
  //     userId,
  //     userDetails,
  //   });
  // });
  onChildChanged(usersRef, (snapshot) => {
    let userDetails = snapshot.val();
    let userId = snapshot.key;
    commit("updateUser", {
      userId,
      userDetails,
    });
  });
}
