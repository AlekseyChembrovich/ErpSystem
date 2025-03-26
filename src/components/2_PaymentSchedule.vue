
<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import { usePaymentSchedule } from "@/composables/2_usePaymentSchedule";

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
  const {firstQuarterPayments, secondQuarterPayments, thirdQuarterPayments, fourthQuarterPayments, totalPayments} = usePaymentSchedule(props.data)

  return [
    {
      indicator: "платежи 1-го квартала, руб. (Итого №1)",
      values: firstQuarterPayments,
    },
    {
      indicator: "платежи 2-го квартала, руб. (Итого №1)",
      values: secondQuarterPayments,
    },
    {
      indicator: "платежи 3-го квартала, руб. (Итого №1)",
      values: thirdQuarterPayments,
    },
    {
      indicator: "платежи 4-го квартала, руб. (Итого №1)",
      values: fourthQuarterPayments,
    },
    {
      indicator: "ИТОГО платежи, руб.",
      values: totalPayments,
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

