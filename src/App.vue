<script setup lang="ts">

import AppNavigation from '@/components/0_AppNavigation.vue'

</script>

<template>
  <v-app>
    <AppNavigation />

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>
