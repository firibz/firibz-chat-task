export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    let user = JSON.parse(localStorage.getItem("user"));

    // redirect to index page if already logged in
    if (
      (to.path === "/login" ||
        to.path === "/register" ||
        to.path === "/auth") &&
      user
    ) {
      return next({ path: "/" });
    }
    // redirecting to login page is handled in handleAuthStateChanged action

    // redirect to login page if not logged in and trying to access a restricted page
    if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
      // store.dispatch("alert/notLoggedInError", "");
      return next({ path: "/auth" });
    }
    if (to.path.startsWith("/chat") && !to.params.otherUserId) {
      return next({ path: "/" });
    }
    return next();
  });
};
