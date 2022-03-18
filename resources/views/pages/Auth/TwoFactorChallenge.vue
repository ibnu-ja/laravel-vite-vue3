<script lang="ts" setup>
import { inject, ref } from 'vue'
// import ValidationErrors from '@/views/components/ValidationErrors.vue'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { useDisplay } from 'vuetify'
import { useForm } from '@inertiajs/inertia-vue3'

const route: any = inject('route')
const recovery = ref(false)
const code = ref(null)
const form = useForm({
  code: '',
  recovery_code: ''
})

const { xs } = useDisplay()

const recoveryCode = ref(null)

function toggleRecovery () {
  recovery.value = recovery.value !== true
  form.clearErrors()
  form.reset()
}

function submit () {
  form.post(route('two-factor.login'))
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
            <v-card-title>Two Factor authentication</v-card-title>
            <v-card-text>
              <!-- <validation-errors class="mb-4" /> -->

              <p
                class="mb-4"
                v-if="! recovery"
              >
                Please confirm access to your account by entering the authentication code provided by your authenticator application.
              </p>

              <p
                class="mb-4"
                v-else
              >
                Please confirm access to your account by entering one of your emergency recovery codes.
              </p>
              <!-- TODO use 2fa component when released -->
              <v-text-field
                v-if="!recovery"
                ref="code"
                v-model="form.code"
                :error-messages="form.errors.code"
                type="text"
                inputmode="numeric"
                class="mt-1 block w-full"
                autofocus
                autocomplete="one-time-code"
                variant="outlined"
                label="Code"
                required
              />
              <v-text-field
                v-else
                ref="recoveryCode"
                v-model="form.recovery_code"
                :error-messages="form.errors.code"
                type="text"
                inputmode="numeric"
                class="mt-1 block w-full"
                autofocus
                autocomplete="one-time-code"
                variant="outlined"
                label="Recovery Code"
                required
              />
            </v-card-text>
            <v-card-actions>
              <a
                href="#"
                @click.prevent="toggleRecovery"
                v-text="
                  !recovery ? 'Use recovery code' : 'Use authenticator code'
                "
              />
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
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
