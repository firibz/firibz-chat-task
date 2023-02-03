// const routes = [
//   {
//     path: "/",
//     component: () => import("layouts/MainLayout.vue"),
//     children: [{ path: "", component: () => import("pages/Index.vue") }],
//   },
//   {
//     path: "/login",
//     component: () => import("pages/PageAuth.vue"),
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: "*",
//     component: () => import("pages/Error404.vue"),
//   },
// ];

// export default routes;

const routes = [
  {
    path: "/auth",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      // { path: "", component: () => import("pages/PageUsers.vue") },
      // {
      //   path: "/chat/:otherUserId",
      //   component: () => import("pages/PageChat.vue"),
      // },
      { path: "/", component: () => import("pages/PageAuth.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/chat/:otherUserId",
        component: () => import("pages/ChatPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue"),
  });
}

export default routes;
