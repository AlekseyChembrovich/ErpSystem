<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import {useWorker1NeedBudget} from "@/composables/7_useWorker1NeedBudget";
import {useLabourCostBudgetWorker1} from "@/composables/8_useLabourCostBudgetWorker1";

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
    totalLabourIntensity,
  } = useWorker1NeedBudget(props.data);

  const {
    workerHourlyRates,
    salaries,
    payrollDeductions,
    totalLabourCosts,
  } = useLabourCostBudgetWorker1(props.data);

  return [
    {
      indicator: "Итого Трудоемкость на объем производства, чел-ч.",
      values: totalLabourIntensity,
    },
    {
      indicator: "Часовая тарифная ставка, руб.",
      values: workerHourlyRates,
    },
    {
      indicator: "Заработная плата, руб.",
      values: salaries,
    },
    {
      indicator: "Отчисления на заработную плату, руб.",
      values: payrollDeductions,
    },
    {
      indicator: "ИТОГО Расходы на оплату труда, руб.",
      values: totalLabourCosts,
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
