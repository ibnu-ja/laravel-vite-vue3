import { createApp, h } from 'vue'
import { InertiaProgress } from '@inertiajs/progress'
import { Ziggy } from './ziggy'
import ZiggyVue from './plugins/ziggy-vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { importPageComponent } from '@/scripts/vite/import-page-component'
import pinia from '@/scripts/plugins/pinia'
import vuetify from '@/scripts/plugins/vuetify'
createInertiaApp({
  resolve: (name) => importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
  setup ({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .use(pinia)
      .use(ZiggyVue, Ziggy)
      .use(vuetify)
      .mount(el)
  }
})

InertiaProgress.init()
