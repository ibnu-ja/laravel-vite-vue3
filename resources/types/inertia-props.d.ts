/* eslint-disable camelcase */
export interface Membership {
  team_id: number
  user_id: number
  role: string
  created_at: string
  updated_at: string
}

export type User = {
  id: number
  name: string
  email: string
  email_verified_at?: Date
  current_team_id?: number
  profile_photo_path?: string
  created_at: Date
  updated_at: Date
  profile_photo_url?: string
  owned_teams?: any[]
  current_team?: null
  all_teams?: any[]
  membership?: Membership
  two_factor_enabled?: boolean
}

export type Jetstream = {
  canCreateTeams?: boolean
  canManageTwoFactorAuthentication?: boolean
  canUpdatePassword?: boolean
  canUpdateProfileInformation?: boolean
  flash?: any
  hasAccountDeletionFeatures?: boolean
  hasApiFeatures?: boolean
  hasTeamFeatures?: boolean
  hasTermsAndPrivacyPolicyFeature?: boolean
  managesProfilePhotos?: boolean
}

export interface ConnectedAccount {
  id: number
  provider: string
  avatar_path: string
  created_at: string
}

export interface Socialstream {
  show: boolean
  providers: string[]
  hasPassword: boolean
  connectedAccounts: ConnectedAccount[]
}
