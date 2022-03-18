
<script lang="ts" setup>
// import ValidationErrors from '@/views/components/ValidationErrors.vue'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { inject } from 'vue'
import { useDisplay } from 'vuetify'
// import { Inertia } from '@inertiajs/inertia'
import { useForm } from '@inertiajs/inertia-vue3'

const route: any = inject('route')

const { xs } = useDisplay()

defineProps<{status: string}>()
const form = useForm({
  email: ''
})
function submit () {
  form.post(route('password.email'))
}
</script>

<template>
  <web-layout>
    <v-row
      :no-gutters="xs"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-card>
          <v-form @submit.prevent="submit">
            <v-card-title>Forgot password?</v-card-title>
            <v-card-text>
              <p class="mb-4">
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
              </p>

              <div
                v-if="status"
                class="mb-4 text-success"
              >
                {{ status }}
              </div>

              <v-text-field
                v-model="form.email"
                :error-messages="form.errors.email"
                variant="outlined"
                label="Email Address"
                required
                autofocus
                type="email"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="secondary"
                type="submit"
                :disabled="form.processing"
              >
                Request Password Reset
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </web-layout>
</template>
