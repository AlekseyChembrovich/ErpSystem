<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "@vue/reactivity";
import SourceData from "@/components/SourceData.vue";
import SalesBudget from "@/components/1_SalesBudget.vue";
/*import PaymentSchedule from "@/components/2_PaymentSchedule.vue";*/
import BudgetProductionAndProductInventory from "@/components/3_BudgetProductionAndProductInventory.vue";
import Material1RequirementBudget from "@/components/4_Material1RequirementBudget.vue";
import Material1PurchaseBudgetOfSupplier1 from "@/components/5_Material1PurchaseBudgetOfSupplier1.vue";
import { BusinessData, defaultBusinessData } from "@/models/BusinessData";

const tab: Ref<number> = ref(1);
const businessData: Ref<BusinessData> = ref(defaultBusinessData);

const updated = (newValue: BusinessData) => {
  console.log(newValue);
  businessData.value = newValue;
};
</script>

<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab :value="1" class="text-none">Исходные данные</v-tab>
        <v-tab :value="2" class="text-none">1 Бюджет продаж</v-tab>
        <v-tab :value="3" class="text-none">2 График платежей за Готовую продукцию</v-tab>
        <v-tab :value="4" class="text-none">3 Бюджет производства и запасов ГП</v-tab>
        <v-tab :value="5" class="text-none">4 Бюджет потребности в Материале 1</v-tab>
        <v-tab :value="6" class="text-none">5 Бюджет закупки Материала 1 у Поставщика 1</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1">
            <SourceData :data="businessData" @modelUpdated="updated" />
          </v-tabs-window-item>

          <v-tabs-window-item :value="2">
            <SalesBudget :data="businessData" />
          </v-tabs-window-item>

          <!--
          <v-tabs-window-item :value="3">
            <PaymentSchedule :data="businessData" />
          </v-tabs-window-item>
          -->

          <v-tabs-window-item :value="4">
            <BudgetProductionAndProductInventory :data="businessData" />
          </v-tabs-window-item>
          
          <v-tabs-window-item :value="5">
            <Material1RequirementBudget :data="businessData" />
          </v-tabs-window-item>

          <v-tabs-window-item :value="6">
            <Material1PurchaseBudgetOfSupplier1 :data="businessData" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>
