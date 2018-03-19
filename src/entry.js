/*global Vue*/
/* weex initialized here, please do not move this line */
import util from '@/util'
import store from './store'

const router = require('./router');
const App = require('@/index.vue');

/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router, store }, App));
router.push('/');
Vue.use(util);