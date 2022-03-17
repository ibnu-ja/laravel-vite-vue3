<script lang="ts" setup>
import { Jetstream, User } from '@/types/inertia-props'
import AppLayout from '@/views/layouts/AppLayout.vue'
import DeleteUserForm from '@/views/pages/Profile/Partials/DeleteUserForm.vue'
import JetSectionBorder from '@/views/Jetstream/SectionBorder.vue'
import LogoutOtherBrowserSessionsForm from '@/views/pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue'
import TwoFactorAuthenticationForm from '@/views/pages/Profile/Partials/TwoFactorAuthenticationForm.vue'
import UpdatePasswordForm from '@/views/pages/Profile/Partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from '@/views/pages/Profile/Partials/UpdateProfileInformationForm.vue'
import { computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

const jetstream = computed(() => usePage().props.value.jetstream as Jetstream)
// const page = usePage()

const user = computed(() => usePage().props.value.user as User)
// const user = ref(computed(() => usePage().props.value.user))
defineProps<{
  sessions: any[]
}>()
</script>

<template>
  <app-layout title="Profile">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Profile
      </h2>
    </template>

    <div>
      <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <div v-if="jetstream.canUpdateProfileInformation">
          <update-profile-information-form :user="user" />

          <jet-section-border />
        </div>

        <div v-if="jetstream.canUpdatePassword">
          <update-password-form class="mt-10 sm:mt-0" />

          <jet-section-border />
        </div>

        <div v-if="jetstream.canManageTwoFactorAuthentication">
          <two-factor-authentication-form class="mt-10 sm:mt-0" />

          <jet-section-border />
        </div>

        <logout-other-browser-sessions-form
          :sessions="sessions"
          class="mt-10 sm:mt-0"
        />

        <template v-if="jetstream.hasAccountDeletionFeatures">
          <jet-section-border />

          <delete-user-form />
        </template>
      </div>
    </div>
  </app-layout>
</template>
