<script lang="ts" setup>
import { computed, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { useDisplay } from 'vuetify'
import { useForm } from '@inertiajs/inertia-vue3'

const route: any = inject('route')

const form = useForm({})
const { xs } = useDisplay()

const props = defineProps<{status: string}>()

function submit () {
  form.post(route('verification.send'))
}
function logout () {
  Inertia.post(route('logout'))
}
const verificationLinkSent = computed(() => {
  return props.status === 'verification-link-sent'
})
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
          <v-card-text>
            <p>Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.</p>
            <p
              class="text-success mt-4"
              v-if="verificationLinkSent"
            >
              A new verification link has been sent to the email address you provided during registration.
            </p>
          </v-card-text>
          <v-form @submit.prevent="submit">
            <v-card-actions>
              <v-btn
                color="secondary"
                type="submit"
              >
                Resend Verification Email
              </v-btn>
              <v-spacer />
              <a @click.prevent="logout">
                Logout
              </a>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </web-layout>
</template>
