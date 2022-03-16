/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
import { createApp, h } from 'vue'
import { Ziggy } from './ziggy'
import ZiggyVue from './plugins/ziggy-vue'
// eslint-disable-next-line sort-imports
import { Link, createInertiaApp } from '@inertiajs/inertia-vue3'
import { importPageComponent } from '@/scripts/vite/import-page-component'
// import RouterLink from '@/scripts/plugins/RouterLink'
import pinia from '@/scripts/plugins/pinia'
import vuetify from '@/scripts/plugins/vuetify'
// import InertiaLink from './plugins/inertia-link'
createInertiaApp({
  resolve: (name) => importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
  setup ({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .use(pinia)
      .use(ZiggyVue, Ziggy)
      .use(vuetify)
      // .component('InertiaLink', InertiaLink)
      .mount(el)
  }
})