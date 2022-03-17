<script lang="ts" setup>
import { inject, ref } from 'vue'
import ValidationErrors from '@/views/components/ValidationErrors.vue'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { useDisplay } from 'vuetify'
import { useForm } from '@inertiajs/inertia-vue3'

const props = defineProps<{
  email: string
  token: string
}>()

const route: any = inject('route')

const { xs } = useDisplay()

const showPassConfirmation = ref(false)
const showPass = ref(false)
const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: ''
})

function submit () {
  form.post(route('password.update'), {
    onFinish: () => form.reset('password', 'password_confirmation')
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
            <v-card-title>Reset Password</v-card-title>
            <v-card-text>
              <validation-errors class="mb-4" />
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
                label="New Password"
                required
                autocomplete="current-password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showPass = !showPass"
              />
              <v-text-field
                v-model="form.password_confirmation"
                variant="outlined"
                label="Comfirn New Password"
                required
                autocomplete="current-password"
                :append-icon="
                  showPassConfirmation ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="showPassConfirmation ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showPassConfirmation = !showPassConfirmation"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :disabled="form.processing"
              >
                Reset Password
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-sheet
      class
      color="gray pulse"
      width="200px"
    />
  </web-layout>
</template>
