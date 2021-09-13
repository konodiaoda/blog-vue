// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import vuetify from "./plugins/vuetify";
// import animated from "animate.css";
import "./assets/css/index.css";
// import "./assets/css/iconfont.css";
import "./assets/css/markdown.css";
import axios from "axios";
import VueAxios from "vue-axios";

// import config from "./assets/js/config";

Vue.config.productionTip = false
// Vue.prototype.config = config;
// Vue.config.productionTip = false;
// Vue.use(animated);

Vue.use(VueAxios, axios);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount("#app")
