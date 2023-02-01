import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import VuePaginate from 'vue-paginate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' 
import { ModalPlugin } from 'bootstrap-vue'
import velocity from 'velocity-animate'

import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.prototype.$url = process.env.VUE_APP_BACKEND_URL

Vue.prototype.$token = localStorage.getItem('token')


Vue.use(Notifications)
Vue.use(VuePaginate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)
Vue.use({velocity})
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
