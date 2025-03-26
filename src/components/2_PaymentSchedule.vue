<!--
<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import { useSalesBudget } from "@/composables/useSalesBudget";

const props = defineProps<{
  data: BusinessData;
}>();

const headers = [
  { title: "Показатель", key: "indicator" },
  { title: "Квартал 1", key: "q1" },
  { title: "Квартал 2", key: "q2" },
  { title: "Квартал 3", key: "q3" },
  { title: "Квартал 4", key: "q4" },
  { title: "год", key: "year" },
];

const tableData = computed(() => {
  const { aRevenue, bRevenue, totalRevenue } = useSalesBudget(props.data);

  const quarterPaymentA = aRevenue * 0.4 + bRevenue * 0.6 + bRevenue * 0.4;
  const quarterPaymentB = aRevenue * 0.6;
  const quarterPaymentC = aRevenue * 0.4 + bRevenue * 0.6;

  const totalQuarterPaymentsAB = quarterPaymentA + quarterPaymentB;
  const totalQuarterPaymentsBC = quarterPaymentB + quarterPaymentC;
  const totalPayments = totalQuarterPaymentsAB * 3 + quarterPaymentC;

  return [
    {
      indicator: "платежи 1-го квартала, руб. (Итого №1)",
      values: [quarterPaymentA, quarterPaymentB, 0, 0, totalQuarterPaymentsAB],
    },
    {
      indicator: "платежи 2-го квартала, руб. (Итого №1)",
      values: [0, quarterPaymentA, quarterPaymentB, 0, totalQuarterPaymentsAB],
    },
    {
      indicator: "платежи 3-го квартала, руб. (Итого №1)",
      values: [0, 0, quarterPaymentA, quarterPaymentB, totalQuarterPaymentsAB],
    },
    {
      indicator: "платежи 4-го квартала, руб. (Итого №1)",
      values: [0, 0, 0, quarterPaymentC, quarterPaymentC],
    },
    {
      indicator: "ИТОГО платежи, руб.",
      values: [
        quarterPaymentA,
        totalQuarterPaymentsAB,
        totalQuarterPaymentsAB,
        totalQuarterPaymentsBC,
        totalPayments,
      ],
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
-->
