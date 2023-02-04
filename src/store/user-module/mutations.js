import Vue from "vue";

export function showLoading(state, payload) {
  state.usersLoading = payload;
}
export function setUserDetails(state, payload) {
  localStorage.setItem("user", JSON.stringify(payload.userId));
  state.userDetails = payload;
}
export function addUser(state, payload) {
  Vue.set(state.users, payload.userId, payload.userDetails);
}
export function addAllUsers(state, payload) {
  state.users = payload;
}
export function updateUser(state, payload) {
  Vue.set(state.users[payload.userId], payload.userDetails);
}
