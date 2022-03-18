
<script lang="ts" setup>
import { Ref, inject, nextTick, ref, watch } from 'vue'
import axios from 'axios'/* eslint-disable vue/require-prop-types */

const emit = defineEmits(['confirmed'])

const route: any = inject('route')

// interface Props {
//   title?: string
//   content?: string
//   button?: string
// }

// eslint-disable-next-line vue/no-setup-props-destructure
// const {
//   title = 'Confirm Password',
//   content = 'For your security, please confirm your password to continue.',
//   button = 'Confirm'
// } = defineProps<Props>()

defineProps({
  title: {
    type: String,
    default: 'Confirm Password'
  },
  content: {
    type: String,
    default: 'For your security, please confirm your password to continue.'
  },
  button: {
    type: String,
    default: 'Confirm'
  }
})

// console.log(content)

const showP = ref(false)
const confirmingPassword = ref(false)
const form = ref({
  processing: false,
  password: ''
})
const error: Ref<undefined | any[] | string> = ref(undefined)

function startConfirmingPassword () {
  axios.get(route('password.confirmation')).then(response => {
    if (response.data.confirmed) {
      emit('confirmed')
    } else {
      confirmingPassword.value = true
      // TODO focus
      // setTimeout(() => this.$refs.password.focus(), 250)
    }
  })
}
watch(confirmingPassword, () => {
  form.value.password = ''
  error.value = undefined
})

function confirmPassword () {
  form.value.processing = true

  axios
    .post(route('password.confirm'), {
      password: form.value.password
    })
    .then(() => {
      confirmingPassword.value = false
      nextTick(() => emit('confirmed'))
    })
    .catch(e => {
      error.value = e.response.data.errors.password[0]
      // this.errors = Object.values(res.data.errors)
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     this.$refs.password.focus()
      //   })
      // })
    })
    .finally(() => (form.value.processing = false))
}
// }
// }
</script>

<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot />
    </span>

    <v-dialog
      v-model="confirmingPassword"
    >

      <v-form
        @submit.prevent="confirmPassword"
        :disabled="form.processing"
      >
        <v-card>
          <v-card-title class="headline">
            {{ title }}
          </v-card-title>

          <v-card-text>
            {{ content }}

            <div class="mt-4">
              <v-text-field
                ref="password"
                v-model="form.password"
                class="mt-1"
                label="Password"
                variant="outlined"
                :error-messages="error"
                :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP ? 'text' : 'password'"
                @click:append="showP = !showP"
              />
            </div>
          </v-card-text>

          <v-card-actions class="px-6 py-4">
            <v-spacer />
            <v-btn
              variant="outlined"
              @click="confirmingPassword = false"
            >
              Nevermind
            </v-btn>

            <v-btn
              color="secondary"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
              type="submit"
            >
              {{ button }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </span>
</template>
