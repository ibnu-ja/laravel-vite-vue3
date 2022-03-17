<script lang="ts" setup>
import { inject, ref } from 'vue'
import AppActionSection from '@/views/components/ActionSection.vue'
import { Session } from '@/types/session'
import { useForm } from '@inertiajs/inertia-vue3'
defineProps<{
  sessions: Session[]
}>()

const route: any = inject('route')
const confirmingLogout = ref(false)
const form = useForm({
  password: ''
})
const showP = ref(false)

// TODO focus on form
function confirmLogout () {
  confirmingLogout.value = true
//   nextTick(() => {
//     setTimeout(() => password.value.focus())
//   })
}
const password = ref(null)

function logoutOtherBrowserSessions () {
  form.delete(route('other-browser-sessions.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    // onError: () => {
    //   nextTick(() => {
    //     setTimeout(() => {
    //       password.value.focus()
    //     })
    //   })
    // },
    onFinish: () => form.reset()
  })
}
function closeModal () {
  confirmingLogout.value = false
  form.reset()
}
</script>

<template>
  <app-action-section>
    <template #title>
      Browser Sessions
    </template>

    <template #description>
      Manage and logout your active sessions on other browsers and devices.
    </template>

    <template #content>
      <div class="text-sm">
        If necessary, you may logout of all of your other browser sessions
        across all of your devices. Some of your recent sessions are listed
        below; however, this list may not be exhaustive. If you feel your
        account has been compromised, you should also update your password.
      </div>
      <!-- TODO add max width to dialog -->
      <v-dialog
        v-model="confirmingLogout"
      >
        <v-form @submit.prevent="logoutOtherBrowserSessions">
          <v-card>
            <v-card-title>
              Logout Other Browser Sessions
            </v-card-title>

            <v-card-text>
              <p>
                Please enter your password to confirm you would like to logout of
                your other browser sessions across all of your devices.
              </p>

              <v-text-field
                class="mt-4"
                ref="password"
                v-model="form.password"
                label="Password"
                variant="outlined"
                :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP ? 'text' : 'password'"
                :error-messages="Object.values(form.errors)"
                @click:append="showP = !showP"
              />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                variant="outlined"
                @click="closeModal"
              >
                Nevermind
              </v-btn>

              <v-btn
                color="secondary"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
                type="submit"
              >
                Logout Other Browser Sessions
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <!-- Other Browser Sessions -->
      <v-list v-if="sessions.length > 0">
        <v-list-item
          :active="session.is_current_device"
          active-color="primary"
          v-for="(session, i) in sessions"
          :key="i"
          class="flex items-center"
        >
          <v-list-item-avatar left>
            <v-icon
              v-if="session.agent?.is_desktop"
              size="50"
            >
              mdi-desktop-tower-monitor
            </v-icon>
            <v-icon
              v-else
              size="50"
            >
              mdi-cellphone
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-header>
            <v-list-item-title>
              {{ session.agent?.platform }} -
              {{ session.agent?.browser }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ session.ip_address }},
              <span
                v-if="session.is_current_device"
                class="text-success"
              >
                This device
              </span>
              <span v-else>Last active {{ session.last_active }}</span>
            </v-list-item-subtitle>
          </v-list-item-header>
        </v-list-item>
      </v-list>

      <transition
        leave-active-class="transition ease-in duration-1000"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="form.recentlySuccessful"
          class="text-sm text-gray-600"
        >
          Saved. Done.
        </div>
      </transition>
    </template>

    <template #actions>
      <v-btn
        color="secondary"
        @click="confirmLogout"
      >
        Logout Other Browser Sessions
      </v-btn>
    </template>
  </app-action-section>
</template>
