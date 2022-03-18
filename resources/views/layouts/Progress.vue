<script lang="ts" setup>
import { Inertia } from '@inertiajs/inertia'
import { ref } from 'vue'
// TODO: file upload buffer
// TODO: enable component
Inertia.on('start', () => startBuffer())
// Inertia.on('progress', (e) => progressBuffer(e))
Inertia.on('finish', () => clearBuffer())

const value = ref(0)
const show = ref(false)
const interval = ref(0)
function startBuffer () {
  show.value = true
  clearInterval(interval.value)
  interval.value = setInterval(() => (value.value += Math.random() * (20 - 10) + 10), 200)
}
function clearBuffer () {
  value.value = 100
  setTimeout(() => {
    show.value = false
    value.value = 0
  }, 200)
}

// function progressBuffer (event) {
//   console.log(event)
//   if (event.detail.progress.percentage) {
//     value.value = (event.detail.progress.percentage / 100) * 0.9
//   }
// }

</script>

<template>
  <v-progress-linear
    v-if="show"
    v-model="value"
    color="info"
  />
</template>

<style scoped>
/* .top {
  position: absolute;
  z-index: 3000;
  top: 0px;
} */
</style>
