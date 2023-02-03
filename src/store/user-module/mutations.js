import Vue from "vue";

export function showLoading(state, payload) {
  state.usersLoading = payload;
}
export function setUserDetails(state, payload) {
  state.userDetails = payload;
}
export function addUser(state, payload) {
  Vue.set(state.users, payload.userId, payload.userDetails);
}
export function updateUser(state, payload) {
  Object.assign(state.users[payload.userId], payload.userDetails);
}
export function addMessage(state, payload) {
  Vue.set(state.messages, payload.messageId, payload.messageDetails);
}
export function clearMessages(state) {
  state.messages = {};
}
