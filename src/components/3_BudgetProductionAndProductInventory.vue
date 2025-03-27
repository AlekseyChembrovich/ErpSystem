<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import { useSalesBudget } from "@/composables/1_useSalesBudget";
import {useBudgetProductionAndProductInventory} from "@/composables/3_useBudgetProductionAndProductInventory";
import {useCostBudget} from "@/composables/12_useCostBudget";

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
  const { aSales, bSales } = useSalesBudget(props.data);
  const { unitCost } = useCostBudget(props.data);
  const {
    aBeginningInventoryArray,
    aEndInventoryArray,
    bBeginningInventoryArray,
    bEndInventoryArray,
    aVolume,
    bVolume,
  } = useBudgetProductionAndProductInventory(props.data);
  
  const aPlannedCost = Array(5).fill(unitCost[0]);
  const bPlannedCost = Array(5).fill(unitCost[1]);

  const aProductionVolume: number[] = [];
  for (let i = 0; i < aSales.length; i++) {
    let bal = aSales[i] - aBeginningInventoryArray[i] + aEndInventoryArray[i];
    aProductionVolume.push(bal * unitCost[0]);
  }

  const bProductionVolume: number[] = [];
  for (let i = 0; i < bSales.length; i++) {
    let bal = bSales[i] - bBeginningInventoryArray[i] + bEndInventoryArray[i];
    bProductionVolume.push(bal * unitCost[1]);
  }

  const totalProductionVolume = aProductionVolume.map((v, i) => v + bProductionVolume[i]);
  
  return [
    {
      indicator: "Объем продаж А, шт. (№1)",
      values: aSales,
    },
    {
      indicator: "Объем продаж В, шт.  (№1)",
      values: bSales,
    },
      
    {
      indicator: "Остаток на начало Продукта А, шт.",
      values: aBeginningInventoryArray,
    },
    {
      indicator: "Остаток на начало Продукта В, шт.",
      values: bBeginningInventoryArray,
    },
    {
      indicator: "Остаток на конец Продукта А, шт.",
      values: aEndInventoryArray,
    },
    {
      indicator: "Остаток на конец Продукта В, шт.",
      values: bEndInventoryArray,
    },

    {
      indicator: "Объем производства Продукта А, шт.",
      values: aVolume,
    },
    {
      indicator: "Объем производства Продукта В, шт.",
      values: bVolume,
    },

    {
      indicator: "Плановая себестоимость Продукта А, руб.",
      values: aPlannedCost,
    },
    {
      indicator: "Плановая себестоимость Продукта В, руб.",
      values: bPlannedCost,
    },
      
    {
      indicator: "Объем производства Продукта А,руб.",
      values: aProductionVolume,
    },
    {
      indicator: "Объем производства Продукта В,руб.",
      values: bProductionVolume,
    },
    {
      indicator: "ИТОГО Объем производства,руб.",
      values: totalProductionVolume,
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
