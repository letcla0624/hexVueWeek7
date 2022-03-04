<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <a href="#/admin" class="navbar-brand">後台</a>
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link" aria-current="page"
              >後台首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/prodLists" class="nav-link"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link"
              >顧客訂單</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link"
              >優惠券</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <button type="button" class="btn btn-danger" @click="logOut">
              登出<i class="bi bi-box-arrow-right ms-1"></i>
            </button>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">返回前台</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logOut() {
      let loader = this.$loading.show();
      this.$http
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((res) => {
          alert(res.data.message);
          loader.hide();
          this.$router.push("/login");
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
          alert(err.response.message);
        });
    },
  },
};
</script>
