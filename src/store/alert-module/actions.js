export function error({ commit }, message) {
  commit("ERROR", message);
}

export function warning({ commit }, message) {
  commit("WARNING", message);
}

export function success({ commit }, message) {
  commit("SUCCESS", message);
}
