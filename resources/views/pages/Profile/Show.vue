<script lang="ts" setup>
import { Jetstream, User } from '@/types/inertia-props'
import AppLayout from '@/views/layouts/AppLayout.vue'
import DeleteUserForm from './Partials/DeleteUserForm.vue'
import LogoutOtherBrowserSessionsForm from './Partials/LogoutOtherBrowserSessionsForm.vue'
import { Session } from '@/types/session'
import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm.vue'
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue'
import { computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

defineProps<{sessions: Session[]}>()

const user = computed(() => usePage().props.value.user as User)
const jetstream = computed(() => usePage().props.value.jetstream as Jetstream)

</script>

<template>
  <app-layout>
    <template #header>
      <h2>
        Profile
      </h2>
    </template>

    <div>
      <div class="mx-auto py-10 px-sm-6 px-lg-8">
        <div v-if="jetstream.canUpdateProfileInformation">
          <update-profile-information-form :user="user" />

          <v-divider class="my-8" />
        </div>

        <div v-if="jetstream.canUpdatePassword">
          <update-password-form class="mt-10 mt-sm-0" />

          <v-divider class="my-8" />
        </div>

        <div v-if="jetstream.canManageTwoFactorAuthentication">
          <two-factor-authentication-form class="mt-10 mt-sm-0" />

          <v-divider class="my-8" />
        </div>

        <logout-other-browser-sessions-form
          :sessions="sessions"
          class="mt-10 mt-sm-0"
        />

        <template v-if="jetstream.hasAccountDeletionFeatures">
          <v-divider class="my-8" />

          <delete-user-form class="mt-10 mt-sm-0" />
        </template>
      </div>
    </div>
  </app-layout>
</template>
