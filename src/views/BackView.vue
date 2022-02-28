<template>
  <BackNavbarComponent></BackNavbarComponent>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
import BackNavbarComponent from "@/components/BackNavbarComponent.vue";

export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  components: {
    BackNavbarComponent,
  },
  methods: {
    checkAdmin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`, {
            api_token: this.token,
          })
          .then(() => {
            this.checkSuccess = true;
          })
          .catch((err) => {
            alert(err.response.data.message);
            this.$router.push("/login");
          });
      } else {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.checkAdmin();
  },
};
</script>
