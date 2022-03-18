<script lang="ts" setup>
import { inject, ref } from 'vue'
import ActionSection from '@/views/components/ActionSection.vue'
import { Team } from '@/types/team'
import { useForm } from '@inertiajs/inertia-vue3'

const props = defineProps<{team: Team}>()
const route: any = inject('route')
const confirmingTeamDeletion = ref(false)

const form = useForm({})

function confirmTeamDeletion () {
  confirmingTeamDeletion.value = true
}
function deleteTeam () {
  form.delete(route('teams.destroy', props.team), {
    errorBag: 'deleteTeam'
  })
}
</script>

<template>
  <div>
    <action-section>
      <template #title>
        Delete Team
      </template>

      <template #description>
        Permanently delete this team.
      </template>

      <template #content>
        Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain.
      </template>
      <template #actions>
        <v-btn
          color="error"
          @click="confirmTeamDeletion"
        >
          Delete Team
        </v-btn>
      </template>
    </action-section>

    <!-- Delete Team Confirmation Modal -->
    <v-dialog
      v-model="confirmingTeamDeletion"
    >
      <v-card>
        <v-card-title>
          Delete Team
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted.
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmingTeamDeletion = false">
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="deleteTeam"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          >
            Delete Team
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
