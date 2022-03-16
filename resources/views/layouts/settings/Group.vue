<template>
  <v-sheet style="padding: 1rem">
    <h5 class="text-h5 text-center mb-4">
      Theme
    </h5>
    <v-item-group
      class="mx-auto"
      mandatory
      :multiple="multiple"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <v-row dense>
        <v-col
          v-for="({ icon, text }) in items"
          :key="text"
          cols="6"
        >
          <v-item :value="text">
            <template #default="{ isSelected, toggle }">
              <v-card
                :color="isSelected ? 'primary' : `grey-${dark ? 'darken' : 'lighten'}-3`"
                class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
                rounded
                flat
                @click="toggle"
              >
                {{ text }}

                <v-icon :icon="icon" />
              </v-card>
            </template>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

defineProps<{
  title?: string
  modelValue?: string
  items?: Array
  multiple?: boolean
}>()

defineEmits({
  'update:modelValue': (value: string) => true
})

const theme = useTheme()

const dark = computed(() => theme.getTheme(theme.current.value).dark)
</script>

<style lang="sass">
  .v-card--group::before
    border-radius: inherit
</style>
