<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import {calcOprRate, calcTzrRate, useCostBudget} from "@/composables/12_useCostBudget";

const props = defineProps<{
  data: BusinessData;
}>();

const headers = [
  { title: "Cтатья затрат", key: "indicator" },
  { title: "Product А", key: "pA" },
  { title: "Product В", key: "pB" },
  { title: "Итого", key: "total" },
];

const tzrRate = computed(() => {
  return calcTzrRate(props.data);
});

const oprRate = computed(() => {
  return calcOprRate(props.data);
});

const tableData = computed(() => {
  const {
    mat1Costs,
    tranAndProcurementCosts,
    worker1LabourCosts,
    directExpenses,
    productProductionVolume,
    generalProductionCosts,
    generalBusinessExpenses,
    sellingExpenses,
    indirectCosts,
    costOfProduction,
    unitCost,
  } = useCostBudget(props.data);

  return [
    {
      indicator: "Прямые расходы, в том числе",
      values: directExpenses,
    },
    {
      indicator: "....затраты на Материал 1",
      values: mat1Costs,
    },
    {
      indicator: "....транспортно-заготовительные расходы",
      values: tranAndProcurementCosts,
    },
    {
      indicator: "....затраты на оплату труда Рабочего 1",
      values: worker1LabourCosts,
    },
    {
      indicator: "Объем производства Продукта, шт.",
      values: productProductionVolume,
    },
    {
      indicator: "Себестоимость по прямым расходам, руб.",
      values: directExpenses,
    },

    {
      indicator: "Себестоимость производства, руб.",
      values: costOfProduction,
    },
    {
      indicator: "Себестоимость единицы, руб.",
      values: unitCost,
    },

    {
      indicator: "Косвенные расходы, в том числе",
      values: indirectCosts,
    },
    {
      indicator: "....общепроизводственные расходы",
      values: generalProductionCosts,
    },
    {
      indicator: "....общехозяйственные расходы",
      values: generalBusinessExpenses,
    },
    {
      indicator: "....коммерческие расходы",
      values: sellingExpenses,
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
  
  <p class="mt-8 text-h6">Ставка ТЗР (800/(800+15600): {{ formatNumber(tzrRate) }}</p>
  <p class="mt-2 text-h6">Ставка ОПР: {{ formatNumber(oprRate) }}</p>
</template>
