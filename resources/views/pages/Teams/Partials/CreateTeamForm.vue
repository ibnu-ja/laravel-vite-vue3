<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import FormSection from '@/views/components/FormSection.vue'
import { User } from '@/types/inertia-props'

const user = computed(() => usePage().props.value.user as User)

const route: any = inject('route')
const form = useForm({
  name: ''
})

function createTeam () {
  form.post(route('teams.store'), {
    errorBag: 'createTeam',
    preserveScroll: true
  })
}
</script>

<template>
  <form-section @submitted="createTeam">
    <template #title>
      Team Details
    </template>

    <template #description>
      Create a new team to collaborate with others on projects.
    </template>

    <template #form>
      Team Owner
      <v-list class="mb-4">
        <v-list-item>
          <v-list-item-avatar left>
            <v-avatar
              size="30"
            >
              <v-img
                :src="user.profile_photo_url"
                :alt="user.name"
              />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-header>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-header>
        </v-list-item>
      </v-list>
      <v-text-field
        v-model="form.name"
        variant="outlined"
        :error-messages="form.errors.name"
        label="Team name"
      />
    </template>

    <template #actions>
      <v-spacer />
      <v-btn
        color="secondary"
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        type="submit"
      >
        Create
      </v-btn>
    </template>
  </form-section>
</template>
