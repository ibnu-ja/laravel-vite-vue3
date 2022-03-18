<script lang="ts" setup>
import { inject, ref } from 'vue'
import AppActionSection from '@/views/components/ActionSection.vue'
import { useForm } from '@inertiajs/inertia-vue3'

const route: any = inject('route')
const confirmingUserDeletion = ref(false)
const form = useForm({
  password: ''
})
const password = ref<HTMLInputElement>()

const showP = ref(false)

function confirmUserDeletion () {
  confirmingUserDeletion.value = true
  // TODO call focus() when there is support
  // setTimeout(() => password.value?.focus(), 300)
}

function deleteUser () {
  form.delete(route('current-user.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    // onError: () => password.value?.focus(),
    onFinish: () => form.reset()
  })
}

function closeModal () {
  confirmingUserDeletion.value = false
  form.reset()
}

// defineExpose(password)
</script>

<template>
  <app-action-section>
    <template #title>
      Delete Account
    </template>

    <template #description>
      Permanently delete your account.
    </template>

    <template #content>
      <div class="text-sm">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </div>
    </template>
    <template #actions>
      <!-- TODO add max width to dialog -->
      <v-dialog v-model="confirmingUserDeletion">
        <v-form @submit.prevent="deleteUser">
          <v-card>
            <v-card-title class="headline">
              Delete Account
            </v-card-title>

            <v-card-text>
              Are you sure you want to delete your account? Once your account is
              deleted, all of its resources and data will be permanently deleted.
              Please enter your password to confirm you would like to permanently
              delete your account.

              <v-text-field
                class="mt-4"
                v-model="form.password"
                label="Password"
                ref="password"
                variant="outlined"
                :error-messages="Object.values(form.errors)"
                :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP ? 'text' : 'password'"
                @click:append="showP = !showP"
              />
            </v-card-text>

            <v-card-actions class="px-6 py-4">
              <v-spacer />
              <v-btn
                outlined
                @click="closeModal"
              >
                Nevermind
              </v-btn>

              <v-btn
                color="error"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
                type="submit"
              >
                Delete Account
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-btn
        color="error"
        @click="confirmUserDeletion"
      >
        Delete Account
      </v-btn>
    </template>
  </app-action-section>
</template>
