
<script lang="ts" setup>
import { inject, ref } from 'vue'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { useDisplay } from 'vuetify'
import { useForm } from '@inertiajs/inertia-vue3'

const route: any = inject('route')

const { xs } = useDisplay()

const form = useForm({
  password: ''
})

const showP = ref(false)
function submit () {
  form.post(route('password.confirm'), {
    onFinish: () => form.reset()
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
          <v-card-title>Confirm Password</v-card-title>
          <v-card-text>
            <div class="mb-4">
              This is a secure area of the application. Please confirm your
              password before continuing.
            </div>
            <form @submit.prevent="submit">
              <v-text-field
                v-model="form.password"
                variant="outlined"
                label="Password"
                required
                autocomplete="current-password"
                :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="form.errors.password"
                :type="showP ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showP = !showP"
              />
              <v-btn
                block
                color="primary"
                type="submit"
                :disabled="form.processing"
              >
                Confirm
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </web-layout>
</template>
