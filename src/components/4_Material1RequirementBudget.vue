<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import {useBudgetProductionAndProductInventory} from "@/composables/useBudgetProductionAndProductInventory";
import {useMaterial1RequirementBudget} from "@/composables/useMaterial1RequirementBudget";

const props = defineProps<{
  data: BusinessData;
}>();

const headers = [
  { title: "Показатель", key: "indicator" },
  { title: "Квартал 1", key: "q1" },
  { title: "Квартал 2", key: "q2" },
  { title: "Квартал 3", key: "q3" },
  { title: "Квартал 4", key: "q4" },
  { title: "Год", key: "year" },
];

const tableData = computed(() => {
  const {
    aDemandVolumeProduction,
    bDemandVolumeProduction,
    totalDemandVolumeProduction,
    beginningInventory,
    endInventory,
    forPurchase,
  } = useMaterial1RequirementBudget(props.data);
  
  const {
    aVolume,
    bVolume,
  } = useBudgetProductionAndProductInventory(props.data);

  const {
    productAMaterial1,
    productBMaterial1,
  } = props.data;
  
  const aConsumptionRate = Array(5).fill(productAMaterial1);
  const bConsumptionRate = Array(5).fill(productBMaterial1);
  
  return [
    {
      indicator: "Объем производства Продукта А, шт.",
      values: aVolume,
    },
    {
      indicator: "Объем производства Продукта В, шт.",
      values: bVolume,
    },
    {
      indicator: "норма расхода  для Продукта А, м.",
      values: aConsumptionRate,
    },
    {
      indicator: "норма расхода для Продукта В, м.",
      values: bConsumptionRate,
    },

    {
      indicator: "Потребность на объем производства Продукта А, м.",
      values: aDemandVolumeProduction,
    },
    {
      indicator: "Потребность на объем производства Продукта В, м.",
      values: bDemandVolumeProduction,
    },
    {
      indicator: "Итого потребность на объем производства, м.",
      values: totalDemandVolumeProduction,
    },

    {
      indicator: "остаток на начало, м.",
      values: beginningInventory,
    },
    {
      indicator: "остаток на конец, м.",
      values: endInventory,
    },
    {
      indicator: "К закупке, м.",
      values: forPurchase,
    },
  ];
});

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("ru-RU").format(num);
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    :items-per-page="-1"
    hide-default-footer
    class="elevation-1 quarterly-table"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ item.indicator }}</td>
        <td v-for="(value, index) in item.values" :key="index">
          {{ formatNumber(value) }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
