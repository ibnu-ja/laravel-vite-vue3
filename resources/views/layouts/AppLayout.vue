
<script lang="ts" setup>
/* eslint-disable no-unused-vars */
import { Jetstream, User } from '@/types/inertia-props'
import { Link as inertiaLink, usePage } from '@inertiajs/inertia-vue3'
import { inject, ref, watch } from 'vue'
import AppSettingsTheme from '@/views/layouts/settings/Theme.vue'
import { Inertia } from '@inertiajs/inertia'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/scripts/store/user'
// import JetstreamFlash from '@/views/components/JetstreamFlashBanner.vue'

const route: any = inject('route')

const jetstream = usePage().props.value.jetstream as Jetstream
const user = usePage().props.value.user as User

const { theme, drawer } = storeToRefs(useUserStore())

function switchToTeam (team) {
  Inertia.put(route('current-team.update'),
    {
      team_id: team.id
    },
    {
      preserveState: false
    })
}

function logout () {
  Inertia.post(route('logout'))
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar
      density="compact"
      app
    >
      <v-app-bar-nav-icon
        size="small"
        class="d-lg-none"
        @click.stop="drawer = !drawer"
      />
      <inertia-link
        href="/"
      >
        <v-avatar
          link
          class="mx-2"
          color="grey darken-1"
          size="32"
        />
      </inertia-link>

      <v-toolbar-title
        v-if="$slots.header"
        id="pageheader"
      >
        <slot name="header" />
      </v-toolbar-title>

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
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
    >
      <v-list
        nav
        density="compact"
      >
        <inertia-link
          class="nostyle"
          :href="route('dashboard')"
        >
          <v-list-item
            :active="route().current('dashboard')"
          >
            <v-list-item-avatar left>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
        </inertia-link>

        <!-- API Management -->
        <inertia-link
          class="nostyle"
          :href="route('api-tokens.index')"
        >
          <v-list-item
            v-if="jetstream.hasApiFeatures"
            link
            :active="route().current('api-tokens.index')"
          >
            <v-list-item-avatar left>
              <v-icon>mdi-api</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>API Tokens</v-list-item-title>
          </v-list-item>
        </inertia-link>

        <v-divider />

        <!-- Team Management -->
        <template v-if="jetstream.hasTeamFeatures">
          <v-list-subheader>
            Manage Team
          </v-list-subheader>

          <inertia-link 
            class="nostyle" 
            :href="route('teams.create')"
          >
            <v-list-item
            link
          >
            <v-list-item-avatar left>
              <v-icon>mdi-account-multiple-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Team Settings</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="jetstream.canCreateTeams"
          >
            <v-list-item-avatar left>
              <v-icon>mdi-account-multiple-plus-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Create New Team</v-list-item-title>
          </v-list-item>
          </inertia-link>

        

          <v-list-subheader>
            Switch Teams
          </v-list-subheader>

          <template
            v-for="team in user.all_teams"
            :key="team.id"
          >
            <v-list-item
              @click.prevent="switchToTeam(team)"
            >
              <v-list-item-avatar
                left
                v-if="team.id == user.current_team_id"
              >
                <v-icon color="success">
                  mdi-check-circle-outline
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>{{ team.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </template>

        
        <v-list-subheader>
          Account
        </v-list-subheader>

        <inertia-link
          class="nostyle"
          :href="route('profile.show')"
        >
          <v-list-item
            link
            :active="route().current('profile.show')"
          >
            <v-list-item-avatar left>
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>
              Profile
            </v-list-item-title>
          </v-list-item>
        </inertia-link>
          <v-list-item @click.prevent="logout">
          <v-list-item-avatar left>
            <v-icon>mdi-exit-run</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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