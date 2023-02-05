import Vue from "vue";

export function SHOW_LOADING(state, payload) {
  state.usersLoading = payload;
}
export function SHOW_AUTH_LOADING(state, payload) {
  state.authLoading = payload;
}
export function SET_USER_DETAILS(state, payload) {
  localStorage.setItem("user", JSON.stringify(payload.userId));
  state.userDetails = payload;
}
export function ADD_USER(state, payload) {
  Vue.set(state.users, payload.userId, payload.userDetails);
}
export function ADD_ALL_USERS(state, payload) {
  state.users = payload;
}
export function UPDATE_USER(state, payload) {
  Object.assign(state.users[payload.userId], payload.userDetails);
}
