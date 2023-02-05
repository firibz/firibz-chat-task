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
    component: () => import("pages/PageAuth.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/chat/:otherUserId",
        component: () => import("pages/ChatPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
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
