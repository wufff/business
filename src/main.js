// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import initFont from '../static/js/initFont.js'
import api from './api';
import { InfiniteScroll } from 'mint-ui';
import  { ToastPlugin } from 'vux'
import { Field } from 'mint-ui';
import { Switch } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import { Spinner } from 'mint-ui';
import  { ConfirmPlugin } from 'vux';
Vue.use(ConfirmPlugin);
Vue.component(Spinner.name, Spinner);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Switch.name, Switch);
Vue.component(Field.name, Field);
Vue.use(ToastPlugin);
Vue.use(InfiniteScroll);

FastClick.attach(document.body);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
