<script setup lang="ts">
import { ref, computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import { useSalesBudget } from "@/composables/useSalesBudget";

const props = defineProps<{
  data: BusinessData;
}>();

// Заголовки таблицы
const headers = [
  { title: "Показатель", key: "indicator" },
  { title: "Квартал 1", key: "q1" },
  { title: "Квартал 2", key: "q2" },
  { title: "Квартал 3", key: "q3" },
  { title: "Квартал 4", key: "q4" },
  { title: "год", key: "year" },
];

// Вычисляемые данные для таблицы
const tableData = computed(() => {
  const { aSales, bSales, aRevenue, bRevenue, totalRevenue } = useSalesBudget(
    props.data
  );

  const {
    productASalesVolume,
    productBSalesVolume,
    productAPrice,
    productBPrice,
  } = props.data;

  return [
    {
      indicator: "Объем продаж А, шт.",
      values: aSales,
    },
    {
      indicator: "Объем продаж В, шт.",
      values: bSales,
    },
    { indicator: "Цена А, руб.", values: Array(5).fill(productAPrice) },
    { indicator: "Цена В, руб.", values: Array(5).fill(productBPrice) },
    {
      indicator: "Объем продаж А, руб.",
      values: aRevenue,
    },
    {
      indicator: "Объем продаж В, руб.",
      values: bRevenue,
    },
    {
      indicator: "ИТОГО объем продаж, руб.",
      values: totalRevenue,
    },
  ];
});

// Форматирование чисел
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
