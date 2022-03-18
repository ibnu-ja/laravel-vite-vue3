
<script lang="ts" setup>
import WebLayout from '@/views/layouts/WebLayout.vue'
defineProps<{terms: 'string'}>()
</script>
<template>
  <web-layout>
    <div v-html="terms" />
  </web-layout>
</template>
