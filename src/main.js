import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import downloadjs from 'downloadjs';
Object.defineProperty(Vue.prototype, '$downloadjs', { value: downloadjs });


Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
