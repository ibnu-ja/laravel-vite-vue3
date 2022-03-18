<script lang="ts" setup>
import ApiTokenManager from './Partials/ApiTokenManager.vue'
import AppLayout from '@/views/layouts/AppLayout.vue'
import { Token } from '@/types/token'
defineProps<{tokens: Token[], availablePermissions: string[], defaultPermissions: string }>()
</script>

<template>
  <app-layout>
    <template #header>
      <h2>
        API Tokens
      </h2>
    </template>
    <api-token-manager
      :tokens="tokens"
      :available-permissions="availablePermissions"
      :default-permissions="defaultPermissions"
    />
  </app-layout>
</template>
