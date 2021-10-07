import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/store';
import Popper from 'popper.js';


Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;

Vue.config.productionTip = false;

new Vue({
  //配置router
  router,
  store,
  render: h => h(App),
}).$mount('#app')

