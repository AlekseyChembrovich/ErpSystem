<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import {useMaterial1PaymentScheduleToSupplier1} from "@/composables/6_useMaterial1PaymentScheduleToSupplier1";

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
    q1Payments,
    q2Payments,
    q3Payments,
    q4Payments,
    total,
  } = useMaterial1PaymentScheduleToSupplier1(props.data);
  
  return [
    {
      indicator: "Платежи 1-го квартала, руб.",
      values: q1Payments,
    },
    {
      indicator: "Платежи 2-го квартала, руб.",
      values: q2Payments,
    },
    {
      indicator: "Платежи 3-го квартала, руб.",
      values: q3Payments,
    },
    {
      indicator: "Платежи 4-го квартала, руб.",
      values: q4Payments,
    },
    {
      indicator: "ИТОГО Закупка, руб.",
      values: total,
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
