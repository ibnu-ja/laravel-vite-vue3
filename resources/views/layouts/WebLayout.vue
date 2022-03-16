<script setup lang="ts">
import { Link as inertiaLink, usePage } from '@inertiajs/inertia-vue3'
import AppSettingsTheme from '@/views/layouts/settings/Theme.vue'
import { User } from '@/types/inertia-props'
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/scripts/store/user'

const route: any = inject('route')

const user = usePage().props.value.user as User

const { theme } = storeToRefs(useUserStore())

</script>

<template>
  <v-app :theme="theme">
    <v-app-bar
      app
      fixed
    >
      <v-spacer />

      <v-menu
        offset-y
        style="z-index: 1020;"
      >
        <template #activator="{props}">
          <v-btn
            icon
            color="primary"
            v-bind="props"
          >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <app-settings-theme />
      </v-menu>
      <template
        v-if="user"
      >
        <inertia-link
          class="nostyle"
          href="/dashboard"
        >
          <v-btn
            text
            class="d-none d-sm-flex mr-2 text-capitalize"
          >
            Dashboard
          </v-btn>
        </inertia-link>
      </template>

      <template v-else>
        <inertia-link
          class="nostyle"
          v-if="!route().current('login') && !route().current('register')"
          :href="route('login')"
        >
          <v-btn
            text
            variant="outlined"
          >
            Login
          </v-btn>
        </inertia-link>
        <inertia-link
          class="nostyle"
          v-if="!route().current('login') && !route().current('register')"
          :href="route('register')"
        >
          <v-btn
            color="primary"
            class="ml-2"
          >
            Register
          </v-btn>
        </inertia-link>

        <div v-if="route().current('login') || route().current('register')">
          <transition
            name="slide-fade"
            mode="out-in"
          >
            <div
              v-if="route().current('login')"
              key="registerinertia-link"
            >
              Don't have an account?
              <inertia-link :href="route('register')">
                Sign up
              </inertia-link>
            </div>
            <div
              v-else
              key="logininertia-link"
            >
              Already have an account?
              <inertia-link :href="route('login')">
                Sign in
              </inertia-link>
            </div>
          </transition>
        </div>
      </template>
    </v-app-bar>

    <v-main class="mt-6">
      <v-container class="pa-0 pa-sm-2">
        <slot />
      </v-container>
    </v-main>

    <v-footer padless>
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="py-4 text-center"
          cols="12"
        >
          © IJI
          <!--2021 - -->
          {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
