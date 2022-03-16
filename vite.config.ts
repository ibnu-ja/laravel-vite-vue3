import { defineConfig } from 'vite'
import inertia from './resources/scripts/vite/inertia-layout'
import laravel from 'vite-plugin-laravel'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'

export default defineConfig({
  plugins: [
    inertia(),
    vue(),
    vuetify(),
    laravel()
  ]
})
