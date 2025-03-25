<script lang="ts" setup>

import { ref } from "vue";
import type { Ref } from "@vue/reactivity";
import SourceData from '@/components/1_SourceData.vue'
import { BusinessData } from '@/models/BusinessData'

const tab: Ref<number> = ref(1);

const updated = (value: BusinessData) => {
  console.log(value);
};

</script>

<template>
  <v-container>
    <v-card>
      <v-tabs
          v-model="tab"
          bg-color="primary">
        <v-tab :value="1" class="text-none">Исходные данные</v-tab>
        <v-tab :value="2" class="text-none">Item Two</v-tab>
        <v-tab :value="3" class="text-none">Item Three</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1">
            <SourceData @modelUpdated="updated" />
          </v-tabs-window-item>

          <v-tabs-window-item :value="2">
            Two
          </v-tabs-window-item>

          <v-tabs-window-item :value="3">
            Three
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>
