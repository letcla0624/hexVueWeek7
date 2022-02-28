<template>
  <div class="container d-grid align-items-center">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
        <div class="text-center">
          <div class="card border-0 shadow-lg">
            <div class="card-body">
              <h1 class="card-title my-3">後台登入</h1>
              <VForm v-slot="{ errors }" ref="form" @submit="login">
                <div class="form-floating mb-3">
                  <VField
                    type="email"
                    name="信箱"
                    class="form-control border-0 border-bottom rounded-0"
                    :class="{ 'is-invalid': errors['信箱'] }"
                    id="username"
                    placeholder="name@example.com"
                    rules="email|required"
                    v-model="user.username"
                  ></VField>
                  <ErrorMessage
                    name="信箱"
                    class="invalid-feedback text-start"
                  ></ErrorMessage>
                  <label for="username">信箱</label>
                </div>
                <div class="position-relative">
                  <div class="form-floating">
                    <VField
                      type="password"
                      name="密碼"
                      class="form-control border-0 border-bottom rounded-0"
                      :class="{ 'is-invalid': errors['密碼'] }"
                      id="password"
                      placeholder="password"
                      rules="required|min:4"
                      v-model="user.password"
                      @keyup.enter="login"
                    ></VField>
                    <ErrorMessage
                      name="密碼"
                      class="invalid-feedback text-start"
                    ></ErrorMessage>
                    <label for="password">密碼</label>
                  </div>
                </div>
                <button class="btn btn-lg btn-warning w-100 mt-5" type="submit">
                  登入<i class="bi bi-box-arrow-in-right ms-2"></i>
                </button>
              </VForm>
              <router-link
                to="/"
                class="btn btn-link text-dark text-decoration-none mt-3"
                >回前台</router-link
              >
            </div>
          </div>
          <p class="mt-5 mb-3 text-muted">&copy; 2022 - 威爾</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      let loader = this.$loading.show();
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          // console.log(res.data);
          loader.hide();
          const { token, expired } = res.data;
          document.cookie = `token=${token}; expires=${new Date(expired)}`;
          this.$router.push("/admin");
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
