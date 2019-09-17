import Vue from 'vue'

import moment from 'moment'
moment.locale('id')

import VueMoment from 'vue-moment'
import VueTheMask from 'vue-the-mask'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/main.scss' // costume css

import _ from 'lodash'
Object.defineProperty(Vue.prototype, '_', { value: _ })

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './vueFriendlyIframe' // iframe
import './permission' // permission control
import './utils/errorLog' // error log

import * as filters from './filters' // global filters

import { mockXHR } from '../mock' // simulation data

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

if ((process.env.NODE_ENV === 'production') || (process.env.NODE_ENV === 'staging')) {
    Sentry.init({
        dsn: 'https://a28d13fa18d04acd98a3426d83ff094a@sentry.io/1725236',
        release: process.env.VERSION,
        integrations: [new Integrations.Vue({ Vue, attachProps: true })]
    })
}
// mock api in github pages site build
if (process.env.NODE_ENV === 'production') { mockXHR() }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueMoment, {
  moment
})

Vue.use(VueTheMask)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
