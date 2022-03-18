/* eslint-disable camelcase */
import { User } from './inertia-props'
export interface Team {
  id: number
  user_id: number
  name: string
  personal_team: boolean
  created_at: string
  updated_at: string
  owner: User
  users: User[]
  team_invitations: any[]
}

export interface Role {
  key: string
  name: string
  description: string
  permissions: string[]
}

export interface Permission {
  canAddTeamMembers: boolean
  canDeleteTeam: boolean
  canRemoveTeamMembers: boolean
  canUpdateTeam: boolean
}
