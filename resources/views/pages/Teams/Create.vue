<script lang="ts" setup>
import AppLayout from '@/views/layouts/AppLayout.vue'
import CreateTeamForm from './Partials/CreateTeamForm.vue'
</script>

<template>
  <app-layout title="Create Team">
    <template #header>
      <h2>
        Create Team
      </h2>
    </template>

    <create-team-form />
  </app-layout>
</template>
