<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Jetstream } from '@/types/inertia-props'
import { usePage } from '@inertiajs/inertia-vue3'

const jetstream = usePage().props.value.jetstream as Jetstream

const banner = computed(() => jetstream.flash?.banner)
const show = ref(!!banner.value)
const style = computed(() => jetstream.flash?.bannerStyle || 'success')
const message = computed(() => jetstream.flash?.banner || '')

watch(banner, () => {
  show.value = true
})
</script>

<template>
  <v-snackbar
    top
    v-model="show"
    multi-line
    :color="style"
  >
    {{ message }}
    <v-btn
      size="small"
      icon
      variant="plain"
      @click="show = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
