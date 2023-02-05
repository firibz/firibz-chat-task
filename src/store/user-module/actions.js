import { firebaseAuth, firebaseDb } from "boot/firebase";
import {
  ref,
  set,
  onValue,
  update,
  onChildAdded,
  onChildChanged,
  child,
  get,
} from "firebase/database";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export function registerUser({ dispatch }, payload) {
  createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
    .then((response) => {
      let userId = firebaseAuth.currentUser.uid;
      set(ref(firebaseDb, "users/" + userId), {
        name: payload.name,
        email: payload.email,
        online: true,
      });
      dispatch("alert/success", "Your account is registered successfully.", {
        root: true,
      });
      // this.$router.push("/");
      // setting user details in the store and redirecting is handled in handleAuthStateChanged action
    })
    .catch((error) => {
      dispatch("alert/error", error.message, { root: true });
      console.log(error.message);
    });
}

export function loginUser({ dispatch }, payload) {
  signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
    .then((response) => {
      // this.$router.push("/");
      // setting user details in the store and redirecting is handled in handleAuthStateChanged action
    })
    .catch((error) => {
      dispatch("alert/error", error.message, { root: true });
      console.log(error.message);
    });
}

export function logoutUser() {
  signOut(firebaseAuth).then(() => {
    localStorage.removeItem("user");
    // this.$router.go();
    // resetting the store and redirecting is handled in handleAuthStateChanged action
    // and then in firebaseUpdateUser action
  });
}

export function handleAuthStateChanged({ commit, dispatch, state }) {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is logged in.
      let userId = firebaseAuth.currentUser.uid;
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
            dispatch("firebaseUpdateUser", {
              userId: userId,
              updates: {
                online: true,
              },
            });
            dispatch("firebaseGetUsers");
            if (
              this.$router.currentRoute.fullPath === "/login" ||
              this.$router.currentRoute.fullPath === "/register" ||
              this.$router.currentRoute.fullPath === "/auth"
            ) {
              this.$router.push("/");
            }
          }
        },
        {
          onlyOnce: true,
        }
      );
    } else {
      // User is logged out.
      dispatch("firebaseUpdateUser", {
        userId: state.userDetails.userId,
        updates: {
          online: false,
        },
      });
    }
  });
}

export function firebaseUpdateUser({}, payload) {
  if (payload.userId) {
    update(ref(firebaseDb, "users/" + payload.userId), payload.updates).then(
      () => {
        if (payload.updates.online === false) {
          localStorage.removeItem("user");
          this.$router.go();
        }
      }
    );
  }
}

export function firebaseGetUsers({ commit }) {
  const usersRef = ref(firebaseDb, "users");
  commit("showLoading", true);
  get(ref(firebaseDb, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        commit("addAllUsers", snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      dispatch("alert/error", error.message, { root: true });
      console.error(error);
    })
    .finally(() => {
      commit("showLoading", false);
    });

  onChildAdded(usersRef, (snapshot) => {
    let userDetails = snapshot.val();
    let userId = snapshot.key;
    commit("addUser", {
      userId,
      userDetails,
    });
  });

  onChildChanged(usersRef, (snapshot) => {
    let userDetails = snapshot.val();
    let userId = snapshot.key;
    commit("updateUser", {
      userId,
      userDetails,
    });
  });
}
