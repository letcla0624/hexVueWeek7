<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">前台</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse text-center"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page"
              >首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">產品頁</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">
              <i class="bi bi-cart-fill position-relative">
                購物車
                <span
                  class="position-absolute top-0 start-100 translate-middle badge border-light rounded-pill bg-danger"
                  >{{ cart.carts.length }}</span
                >
              </i>
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link">前往後台</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from "@/libs/emitter.js";

export default {
  data() {
    return {
      cart: {
        carts: [],
      },
    };
  },
  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getCart();
    emitter.on("get-cart", () => {
      this.getCart();
    });
  },
};
</script>
