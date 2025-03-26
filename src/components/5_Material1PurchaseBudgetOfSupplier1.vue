<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import {useMaterial1RequirementBudget} from "@/composables/4_useMaterial1RequirementBudget";
import {useMaterial1PurchaseBudgetOfSupplier1} from "@/composables/5_useMaterial1PurchaseBudgetOfSupplier1";

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
    forPurchase,
  } = useMaterial1RequirementBudget(props.data);

  const {
    material1Costs,
    transportAndProcurementCosts,
    totalPurchase,
  } = useMaterial1PurchaseBudgetOfSupplier1(props.data);
  
  const {
    material1PurchasePrice
  } = props.data;

  const material1PurchasePrices = Array(5).fill(material1PurchasePrice);

  return [
    {
      indicator: "К закупке, м.",
      values: forPurchase,
    },
    {
      indicator: "цена закупки, руб.",
      values: material1PurchasePrices,
    },
    {
      indicator: "Стоимость закупки, руб.",
      values: material1Costs,
    },
    {
      indicator: "Транспортно-заготовительные расходы, руб.",
      values: transportAndProcurementCosts,
    },
    {
      indicator: "ИТОГО Закупка, руб.",
      values: totalPurchase,
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
