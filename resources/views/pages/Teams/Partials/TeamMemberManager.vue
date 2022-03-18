<script lang="ts" setup>
import { Permission, Role, Team } from '@/types/team'
import { computed, inject, ref } from 'vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import ActionSection from '@/views/components/ActionSection.vue'
import FormSection from '@/views/components/FormSection.vue'
import { Inertia } from '@inertiajs/inertia'
import { User } from '@/types/inertia-props'

// eslint-disable-next-line vue/require-prop-types
const props = defineProps<{team: Team, availableRoles: Role[], userPermissions: Permission}>()

const route: any = inject('route')

const currentUser = computed(() => usePage().props.value.user as User)

const addTeamMemberForm = useForm({
  email: '',
  role: props.availableRoles[0].key
})

const updateRoleForm = useForm({
  role: props.availableRoles[0].key
})

const leaveTeamForm = useForm({})

const removeTeamMemberForm = useForm({})

const currentlyManagingRole = ref(false)
const managingRoleFor = ref(null)
const confirmingLeavingTeam = ref(false)
const teamMemberBeingRemoved = ref(false)
const confirmingRemovingTeamMember = ref(false)

function addTeamMember () {
  addTeamMemberForm.post(route('team-members.store', props.team), {
    errorBag: 'addTeamMember',
    preserveScroll: true,
    onSuccess: () => addTeamMemberForm.reset()
  })
}

function cancelTeamInvitation (invitation) {
  Inertia.delete(route('team-invitations.destroy', invitation), {
    preserveScroll: true
  })
}

function manageRole (teamMember) {
  managingRoleFor.value = teamMember
  updateRoleForm.role = teamMember.membership.role
  currentlyManagingRole.value = true
}

function updateRole () {
  updateRoleForm.put(route('team-members.update', [props.team, managingRoleFor.value]), {
    preserveScroll: true,
    onSuccess: () => (currentlyManagingRole.value = false)
  })
}

function confirmLeavingTeam () {
  confirmingLeavingTeam.value = true
}

function leaveTeam () {
  leaveTeamForm.delete(route('team-members.destroy', [props.team, currentUser]))
}

function confirmTeamMemberRemoval (teamMember) {
  confirmingRemovingTeamMember.value = true
  teamMemberBeingRemoved.value = teamMember
}

function removeTeamMember () {
  removeTeamMemberForm.delete(route('team-members.destroy', [props.team, teamMemberBeingRemoved.value]), {
    errorBag: 'removeTeamMember',
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => (teamMemberBeingRemoved.value = false)
  })
}

function displayableRole (role) {
  return props.availableRoles.find(r => r.key === role)?.name
}
</script>

<template>
  <div>
    <div v-if="userPermissions.canAddTeamMembers">
      <v-divider class="my-8" />
      <form-section @submitted="addTeamMember">
        <template #title>
          Add Team Member
        </template>

        <template #description>
          Add a new team member to your team, allowing them to collaborate with you.
        </template>

        <template #form>
          <p class="mb-4">
            Please provide the email address of the person you would like to add to this team.
          </p>
          <v-text-field
            v-model="addTeamMemberForm.email"
            :error-messages="addTeamMemberForm.errors.email"
            variant="outlined"
            label="Email"
          />
          Role
          <v-list density="compact">
            <v-item-group
              v-model="addTeamMemberForm.role"
              mandatory
            >
              <v-item
                v-for="(role) in availableRoles"
                :key="role.key"
                v-slot="{ isSelected, toggle }"
                :value="role.key"
              >
                <v-list-item
                  @click="toggle"
                >
                  <v-list-item-avatar left>
                    <v-checkbox
                      :model-value="isSelected"
                      hide-details
                    />
                  </v-list-item-avatar>
                  <v-list-item-header>
                    <v-list-item-title v-text="role.name" />
                    <v-list-item-subtitle v-text="role.description" />
                  </v-list-item-header>
                </v-list-item>
              </v-item>
            </v-item-group>
          </v-list>
        </template>

        <template #actions>
          <transition
            leave-active-class="transition ease-in duration-1000"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-show="addTeamMemberForm.recentlySuccessful"
              class="text-sm text-gray-600"
            >
              Added.
            </div>
          </transition>
          <v-spacer />
          <v-btn
            color="secondary"
            :class="{ 'opacity-25': addTeamMemberForm.processing }"
            :disabled="addTeamMemberForm.processing"
            type="submit"
          >
            Add
          </v-btn>
        </template>
      </form-section>
    </div>
    <div v-if="team.team_invitations.length > 0 && userPermissions.canAddTeamMembers">
      <v-divider class="my-8" />
      <action-section>
        <template #title>
          Pending Team Invitations
        </template>

        <template #description>
          These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation.
        </template>
        <template #content>
          <v-list>
            <v-list-item
              v-for="invitation in team.team_invitations"
              :key="invitation.id"
            >
              <v-list-item-title v-text="invitation.email" />
              <v-spacer />
              <v-btn
                small
                text
                color="error"
                class="d-none d-sm-flex mx-1 text-capitalize"
                @click="cancelTeamInvitation(invitation)"
                v-if="userPermissions.canRemoveTeamMembers"
              >
                Cancel
              </v-btn>
            </v-list-item>
          </v-list>
        </template>
      </action-section>
    </div>
    <div v-if="team.users.length > 0">
      <v-divider class="my-8" />
      <action-section>
        <template #title>
          Team Members
        </template>

        <template #description>
          All of the people that are part of this team.
        </template>
        <template #content>
          <v-list density="compact">
            <v-list-item
              v-for="user in team.users"
              :key="user.id"
            >
              <v-list-item-avatar>
                <v-img
                  :src="user.profile_photo_url"
                  :alt="user.name"
                />
              </v-list-item-avatar>
              <v-list-item-title v-text="user.name" />
              <v-spacer />
              <v-btn
                class="d-none d-sm-flex mx-1 text-capitalize"
                text
                v-if="userPermissions.canAddTeamMembers && availableRoles.length"
                @click="manageRole(user)"
                v-text="displayableRole(user.membership?.role) "
              />
              <div
                class="mx-4"
                v-else-if="availableRoles.length"
              >
                {{ displayableRole(user.membership?.role) }}
              </div>
              <v-btn
                class="d-none d-sm-flex mx-1 text-capitalize"
                color="error"
                text
                @click="confirmLeavingTeam"
                v-if="currentUser.id === user.id"
              >
                Leave
              </v-btn>
              <v-btn
                class="d-none d-sm-flex mx-1 text-capitalize"
                color="error"
                text
                @click="confirmTeamMemberRemoval(user)"
                v-if="userPermissions.canRemoveTeamMembers"
              >
                Remove
              </v-btn>
            </v-list-item>
          </v-list>
        </template>
      </action-section>
    </div>

    <!-- Role Management Modal -->
    <v-dialog
      v-model="currentlyManagingRole"
    >
      <v-card>
        <v-card-title>
          Manage Role
        </v-card-title>

        <v-card-text>
          <v-list density="compact">
            <v-item-group
              v-model="updateRoleForm.role"
              mandatory
            >
              <v-item
                v-for="(role) in availableRoles"
                :key="role.key"
                v-slot="{ isSelected, toggle }"
                :value="role.key"
              >
                <v-list-item
                  @click="toggle"
                >
                  <v-list-item-avatar left>
                    <v-checkbox
                      :model-value="isSelected"
                      hide-details
                    />
                  </v-list-item-avatar>
                  <v-list-item-header>
                    <v-list-item-title v-text="role.name" />
                    <v-list-item-subtitle v-text="role.description" />
                  </v-list-item-header>
                </v-list-item>
              </v-item>
            </v-item-group>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="currentlyManagingRole = false">
            Cancel
          </v-btn>
          <v-btn
            color="secondary"
            @click="updateRole"
            :class="{ 'opacity-25': updateRoleForm.processing }"
            :disabled="updateRoleForm.processing"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Leave Team Confirmation Modal -->
    <v-dialog
      v-model="confirmingLeavingTeam"
    >
      <v-card>
        <v-card-title>
          Leave Team
        </v-card-title>

        <v-card-text>
          Are you sure you would like to leave this team?
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmingLeavingTeam = false">
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="leaveTeam"
            :class="{ 'opacity-25': leaveTeamForm.processing }"
            :disabled="leaveTeamForm.processing"
          >
            Leave
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Remove Team Member Confirmation Modal -->
    <v-dialog
      v-model="confirmingRemovingTeamMember"
    >
      <v-card>
        <v-card-title>
          Remove Team Member
        </v-card-title>

        <v-card-text>
          Are you sure you would like to remove this person from the team?
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmingRemovingTeamMember = false">
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="removeTeamMember"
            :class="{ 'opacity-25': removeTeamMemberForm.processing }"
            :disabled="removeTeamMemberForm.processing"
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
