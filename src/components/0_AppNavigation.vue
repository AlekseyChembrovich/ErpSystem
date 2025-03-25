<script setup lang="ts">

</script>

<template>
  <v-app-bar>
    <v-container>
      <div class="d-flex justify-space-between">
        <v-sheet class="d-flex justify-center align-center">
          <v-icon class="mr-3" icon="mdi-cash-100" size="x-large"></v-icon>
          <p class="font-weight-medium">My App</p>
        </v-sheet>

        <v-sheet class="d-flex justify-center align-center">
          <v-btn
              value="home"
              to="/"
              class="text-none text-white mx-2"
              color="blue-darken-4"
              rounded="8"
              variant="flat"
              text="Home">
          </v-btn>
        </v-sheet>
      </div>
    </v-container>
  </v-app-bar>
</template>
