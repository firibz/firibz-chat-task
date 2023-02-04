import { firebaseDb } from "boot/firebase";
import { ref, onChildAdded, off, push, get } from "firebase/database";

let messagesRef;

export function firebaseGetMessages({ commit, rootState }, otherUserId) {
  let userId =
    rootState.user.userDetails.userId ||
    JSON.parse(localStorage.getItem("user"));
  messagesRef = ref(firebaseDb, "chats/" + userId + "/" + otherUserId);
  commit("showLoading", true);
  get(messagesRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        commit("addAllMessages", snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      commit("showLoading", false);
    });
  onChildAdded(messagesRef, (snapshot) => {
    let messageDetails = snapshot.val();
    let messageId = snapshot.key;
    commit("addMessage", {
      messageId,
      messageDetails,
    });
  });
}

export function firebaseStopGettingMessages({ commit }) {
  if (messagesRef) {
    off(messagesRef, "child_added");
    commit("clearMessages");
  }
}

export function firebaseSendMessage({ rootState }, payload) {
  let userId = rootState.user.userDetails.userId;
  // ref(
  //   firebaseDb,
  //   "chats/" + state.userDetails.userId + "/" + payload.otherUserId
  // ).push(payload.message);
  push(
    ref(firebaseDb, "chats/" + userId + "/" + payload.otherUserId),
    payload.message
  );
  // ref(
  //   firebaseDb,
  //   "chats/" + payload.otherUserId + "/" + state.userDetails.userId
  // ).push(payload.message);
  payload.message.from = "them";
  push(
    ref(firebaseDb, "chats/" + payload.otherUserId + "/" + userId),
    payload.message
  );
}
