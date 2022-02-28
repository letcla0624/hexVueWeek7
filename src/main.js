import { createApp } from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

// import "bootstrap";
// 解決 'bootstrap' is not defined 問題
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;
import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.scss";

import App from "./App.vue";
import router from "./router";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
// 設定預設語系
setLocale("zh_TW");

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(VueLoading, {
  color: "#ffc107",
});
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.mount("#app");
