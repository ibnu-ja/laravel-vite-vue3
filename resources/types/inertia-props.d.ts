/* eslint-disable camelcase */
export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: Date;
  current_team_id?: number;
  profile_photo_path?: string;
  created_at: Date;
  updated_at: Date;
  profile_photo_url: string;
  two_factor_enabled: boolean;
}

export type Jetstream = {
  canCreateTeams?: boolean;
  canManageTwoFactorAuthentication?: boolean;
  canUpdatePassword?: boolean;
  canUpdateProfileInformation?: boolean;
  flash?: any;
  hasAccountDeletionFeatures?: boolean;
  hasApiFeatures?: boolean;
  hasTeamFeatures?: boolean;
  hasTermsAndPrivacyPolicyFeature?: boolean;
  managesProfilePhotos?: boolean;
}
