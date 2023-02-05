import Vue from "vue";
export function SHOW_LOADING(state, payload) {
  state.messagesLoading = payload;
}
export function ADD_MESSAGE(state, payload) {
  Vue.set(state.messages, payload.messageId, payload.messageDetails);
}
export function ADD_ALL_MESSAGES(state, payload) {
  state.messages = payload;
}
export function CLEAR_MESSAGES(state) {
  state.messages = {};
}
