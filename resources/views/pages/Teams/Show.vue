<script lang="ts" setup>
import { Permission, Role, Team } from '@/types/team'
import AppLayout from '@/views/layouts/AppLayout.vue'
// import DeleteTeamForm from './Partials/DeleteTeamForm.vue'
// import TeamMemberManager from './Partials/TeamMemberManager.vue'
import UpdateTeamNameForm from './Partials/UpdateTeamNameForm.vue'

defineProps<{team: Team, availableRoles: Role[], permissions: Permission}>()
</script>

<template>
  <app-layout>
    <template #header>
      <h2>
        Team Settings
      </h2>
    </template>

    <update-team-name-form
      :team="team"
      :permissions="permissions"
    />

    <!-- <team-member-manager
      :team="team"
      :available-roles="availableRoles"
      :user-permissions="permissions"
    />

    <template v-if="permissions.canDeleteTeam && ! team.personal_team">
      <v-divider class="my-8" />
      <delete-team-form :team="team" />
    </template> -->
  </app-layout>
</template>
