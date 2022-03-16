
<script setup lang="ts">
import AppSettingsGroup from './Group.vue'
import { computed } from 'vue'
import { useUserStore } from '@/scripts/store/user'

const user = useUserStore()

const items = computed(() => ([
  {
    text: 'light',
    icon: 'mdi-white-balance-sunny'
  },
  {
    text: 'dark',
    icon: 'mdi-weather-night'
  },
  {
    text: 'system',
    icon: 'mdi-desktop-tower-monitor'
  }
]))

if (!user.theme && !user.selected) {
  user.selected = 'system';
  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? user.theme = 'dark' : user.theme = 'light'
}

user.$subscribe((mutation, state) => {
  if (state.selected === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      user.theme = 'dark'
    } else user.theme = 'light'
  } else user.theme = state.selected
})
</script>

<template>
  <app-settings-group
    v-model="user.selected"
    title="theme"
    :items="items"
  />
</template>
