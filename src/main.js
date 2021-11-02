import Vue from "vue";
import App from "./App.vue";
import "normalize.css/normalize.css";
// понятно, конечно, что тащить все иконки не стоит
import "material-icons/iconfont/material-icons.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
