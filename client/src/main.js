import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI';
import axios from 'axios';

// Import boostrap
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.scss'

const ws = new WebSocket('ws://localhost:4000');

ws.addEventListener('open', () => {
  console.log('Websocket opened...')
})

ws.addEventListener('close', () => {
  console.log('Websocket close')
})

Vue.config.productionTip = false;

Vue.prototype.axios = axios;
Vue.prototype.websocket = ws;

components.forEach(component => {
  Vue.component(component.name, component)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
