<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import {useBudgetProductionAndProductInventory} from "@/composables/3_useBudgetProductionAndProductInventory";
import {useWorker1NeedBudget} from "@/composables/7_useWorker1NeedBudget";

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
    aVolume,
    bVolume,
  } = useBudgetProductionAndProductInventory(props.data);

  const {
    aLabourIntensity,
    bLabourIntensity,
    labourIntensityPerAVolume,
    labourIntensityPerBVolume,
    totalLabourIntensity,
  } = useWorker1NeedBudget(props.data);

  return [
    {
      indicator: "Объем продаж А, шт. (№1)",
      values: aVolume,
    },
    {
      indicator: "Объем продаж В, шт. (№1)",
      values: bVolume,
    },
    {
      indicator: "трудоемкость для Продукта А, чел-ч.",
      values: aLabourIntensity,
    },
    {
      indicator: "трудоемкость для Продукта В, чел-ч.",
      values: bLabourIntensity,
    },

    {
      indicator: "Трудоемкость на объем производства Продукта А, чел-ч.",
      values: labourIntensityPerAVolume,
    },
    {
      indicator: "Трудоемкость на объем производства Продукта B, чел-ч.",
      values: labourIntensityPerBVolume,
    },
    {
      indicator: "Итого Трудоемкость на объем производства, чел-ч.",
      values: totalLabourIntensity,
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
    class="elevation-1 quarterly-table">
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
