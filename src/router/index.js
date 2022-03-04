import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/FrontView.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/Front/IndexView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "首頁",
            },
          ],
        },
      },
      {
        path: "products",
        component: () => import("@/views/Front/ProductsView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "首頁",
              link: "/",
            },
            {
              name: "產品頁",
            },
          ],
        },
      },
      {
        path: "prod/:id",
        component: () => import("@/views/Front/ProdView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "首頁",
              link: "/",
            },
            {
              name: "產品頁",
              link: "/products",
            },
            {
              name: "產品內頁",
            },
          ],
        },
      },
      {
        path: "cart",
        component: () => import("@/views/Front/CartView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "首頁",
              link: "/",
            },
            {
              name: "購物車",
            },
          ],
        },
      },
      {
        path: "pay",
        component: () => import("@/views/Front/PayView.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/NotFound.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/admin",
    component: () => import("@/views/BackView.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/Back/AdminView.vue"),
      },
      {
        path: "prodLists",
        component: () => import("@/views/Back/ProdListsView.vue"),
      },
      {
        path: "orders",
        component: () => import("@/views/Back/OrdersView.vue"),
      },
      {
        path: "coupon",
        component: () => import("@/views/Back/CouponView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
