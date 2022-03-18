
<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import AppActionSection from '@/views/components/ActionSection.vue'
import AppConfirmsPassword from '@/views/components/ConfirmsPassword.vue'
import { Inertia } from '@inertiajs/inertia'
import Markup from '@/views/components/Markup.vue'
import { User } from '@/types/inertia-props'
import axios from 'axios'
import { usePage } from '@inertiajs/inertia-vue3'

const enabling = ref(false)
const disabling = ref(false)
const qrCode = ref(null)
const recoveryCodes = ref([])

const route: any = inject('route')

const user = computed(() => usePage().props.value.user as User)

const twoFactorEnabled = computed(function () {
  return !enabling.value && user.value.two_factor_enabled
})

function enableTwoFactorAuthentication () {
  enabling.value = true
  Inertia.post(route('two-factor.enable'), {}, {
    preserveScroll: true,
    onSuccess: () =>
      Promise.all([showQrCode(), showRecoveryCodes()]),
    onFinish: () => (enabling.value = false)
  })
}

const codes = computed(() => {
  return recoveryCodes.value.join('\n')
})

async function showQrCode () {
  const res = await axios.get(route('two-factor.qr-code'))
  qrCode.value = res.data.svg
}

async function showRecoveryCodes () {
  const res = await axios.get(route('two-factor.recovery-codes'))
  recoveryCodes.value = res.data
}

async function regenerateRecoveryCodes () {
  await axios.post('/user/two-factor-recovery-codes')
  showRecoveryCodes()
}

function disableTwoFactorAuthentication () {
  disabling.value = true
  Inertia.delete('/user/two-factor-authentication', {
    preserveScroll: true,
    onSuccess: () => (disabling.value = false)
  })
}
</script>

<template>
  <app-action-section>
    <template #title>
      Two Factor Authentication
    </template>

    <template #description>
      Add additional security to your account using two factor authentication.
    </template>

    <template
      #status
    >
      <template
        v-if="twoFactorEnabled"
      >
        You have enabled two factor authentication.
      </template>
      <template v-else>
        You have not enabled two factor authentication.
      </template>
    </template>

    <template #content>
      <p>
        When two factor authentication is enabled, you will be prompted for a
        secure, random token during authentication. You may retrieve this
        token from your phone's Google Authenticator application.
      </p>

      <div v-if="twoFactorEnabled">
        <div v-if="qrCode">
          <p>
            Two factor authentication is now enabled. Scan the following QR
            code using your phone's authenticator application.
          </p>

          <v-sheet
            class="my-4 mx-auto pa-4"
            color="white"
            max-width="224"
          >
            <div
              class="text-center"
              v-html="qrCode"
            />
          </v-sheet>
        </div>

        <div v-if="recoveryCodes.length > 0">
          <p class="font-semibold">
            Store these recovery codes in a secure password manager. They can
            be used to recover access to your account if your two factor
            authentication device is lost.
          </p>
          <markup
            class="mt-4"
            :code="codes"
            resource="Two Factor Codes"
            resource-icon="mdi-shield-key"
          />
        </div>
      </div>
    </template>
    <template #actions>
      <div v-if="!twoFactorEnabled">
        <app-confirms-password @confirmed="enableTwoFactorAuthentication">
          <v-btn
            color="secondary"
            :class="{ 'opacity-25': enabling }"
            :disabled="enabling"
          >
            Enable
          </v-btn>
        </app-confirms-password>
      </div>

      <div v-else>
        <app-confirms-password @confirmed="regenerateRecoveryCodes">
          <v-btn
            v-if="recoveryCodes.length > 0"
            outlined
            class="mr-3"
          >
            Regenerate Recovery Codes
          </v-btn>
        </app-confirms-password>

        <app-confirms-password @confirmed="showRecoveryCodes">
          <v-btn
            v-if="recoveryCodes.length === 0"
            outlined
            class="mr-3"
          >
            Show Recovery Codes
          </v-btn>
        </app-confirms-password>

        <app-confirms-password @confirmed="disableTwoFactorAuthentication">
          <v-btn
            color="red"
            :class="{ 'opacity-25': disabling }"
            :disabled="disabling"
          >
            Disable
          </v-btn>
        </app-confirms-password>
      </div>
    </template>
  </app-action-section>
</template>
