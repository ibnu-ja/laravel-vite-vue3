
<script lang="ts" setup>
import { inject, ref } from 'vue'
// import Routes from '@/scripts/shims-Ziggy'
import ValidationErrors from '@/views/components/ValidationErrors.vue'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { useDisplay } from 'vuetify'
import { useForm } from '@inertiajs/inertia-vue3'

defineProps({
  canResetPassword: Boolean,
  // eslint-disable-next-line vue/require-default-prop
  status: String
})

const route: any = inject('route')

const { xs } = useDisplay()
const form = useForm({
  email: '',
  password: '',
  remember: false
})

console.log(route())
const showP = ref(false)

function submit () {
  form.transform(data => ({
    ...data,
    remember: form.remember ? 'on' : ''
  }))
    .post(route('login'), {
      onFinish: () => form.reset('password')
    })
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
            <v-card-title>Sign in to your account</v-card-title>
            <v-card-text>
              <validation-errors class="mb-4" />

              <div
                v-if="status"
                class="mb-4 font-medium text-sm text-green-600"
              >
                {{ status }}
              </div>
              <v-text-field
                v-model="form.email"
                variant="outlined"
                label="Email Address"
                required
                autofocus
              />
              <v-text-field
                v-model="form.password"
                variant="outlined"
                label="Password"
                required
                autocomplete="current-password"
                :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showP = !showP"
              />
              <v-checkbox
                v-model="form.remember"
                hide-details
                label="Remember me"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <!-- <inertia-link
                v-if="canResetPassword"
                class="mx-4"
                :href="route('password.request')"
              >
                Forgot your password?
              </inertia-link> -->

              <v-btn
                color="secondary"
                type="submit"
                :disabled="form.processing"
              >
                Sign In
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </web-layout>
</template>
