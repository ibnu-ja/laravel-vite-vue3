
<script lang="ts" setup>
import WebLayout from '@/views/layouts/WebLayout.vue'
defineProps<{policy: 'string'}>()
</script>
<template>
  <web-layout>
    <div v-html="policy" />
  </web-layout>
</template>
