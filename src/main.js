import Vue from 'vue'
import App from './App.vue'
import store from './store'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../src/assets/style.css'




Vue.config.productionTip = false

new Vue({
  store,

  render: h => h(App)
}).$mount('#app')
