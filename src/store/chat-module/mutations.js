import Vue from "vue";
export function showLoading(state, payload) {
  state.messagesLoading = payload;
}
export function addMessage(state, payload) {
  Vue.set(state.messages, payload.messageId, payload.messageDetails);
}
export function addAllMessages(state, payload) {
  state.messages = payload;
}
export function clearMessages(state) {
  state.messages = {};
}
