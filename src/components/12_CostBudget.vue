<script setup lang="ts">
import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";
import {useGeneralAdminExpensesBudget} from "@/composables/10_useGeneralAdminExpensesBudget";
import {useMaterial1RequirementBudget} from "@/composables/4_useMaterial1RequirementBudget";
import {useMaterial1PurchaseBudgetOfSupplier1} from "@/composables/5_useMaterial1PurchaseBudgetOfSupplier1";
import {useWorker1NeedBudget} from "@/composables/7_useWorker1NeedBudget";
import {useLabourCostBudgetWorker1} from "@/composables/8_useLabourCostBudgetWorker1";

const props = defineProps<{
  data: BusinessData;
}>();

const headers = [
  { title: "Cтатья затрат", key: "indicator" },
  { title: "Product А", key: "pA" },
  { title: "Product В", key: "pB" },
  { title: "Итого", key: "total" },
];

const tableData = computed(() => {
  const {
    aDemandVolumeProduction,
    bDemandVolumeProduction,
    totalDemandVolumeProduction,
  } = useMaterial1RequirementBudget(props.data);

  const {
    material1Costs,
      transportAndProcurementCosts,
  } = useMaterial1PurchaseBudgetOfSupplier1(props.data);

  const {
    labourIntensityPerAVolume,
    labourIntensityPerBVolume,
    totalLabourIntensity,
  } = useWorker1NeedBudget(props.data);

  const {
    totalLabourCosts,
  } = useLabourCostBudgetWorker1(props.data);

  const mat1Costs: number[] = [
    aDemandVolumeProduction[5] / totalDemandVolumeProduction[5] * material1Costs[5],
    bDemandVolumeProduction[5] / totalDemandVolumeProduction[5] * material1Costs[5],
    (aDemandVolumeProduction[5] / totalDemandVolumeProduction[5] * material1Costs[5])
    + (bDemandVolumeProduction[5] / totalDemandVolumeProduction[5] * material1Costs[5])
  ];

  const tranAndProcurementCosts: number[] = [
    aDemandVolumeProduction[5] / totalDemandVolumeProduction[5] * transportAndProcurementCosts[5],
    bDemandVolumeProduction[5] / totalDemandVolumeProduction[5] * transportAndProcurementCosts[5],
    (aDemandVolumeProduction[5] / totalDemandVolumeProduction[5] * transportAndProcurementCosts[5])
    + (bDemandVolumeProduction[5] / totalDemandVolumeProduction[5] * transportAndProcurementCosts[5])
  ];

  const worker1labourCosts: number[] = [
    labourIntensityPerAVolume[5] / totalLabourIntensity[5] * totalLabourCosts[5],
    labourIntensityPerBVolume[5] / totalLabourIntensity[5] * totalLabourCosts[5],
    (labourIntensityPerAVolume[5] / totalLabourIntensity[5] * totalLabourCosts[5])
    + (labourIntensityPerBVolume[5] / totalLabourIntensity[5] * totalLabourCosts[5])
  ];
  
  const directExpenses = mat1Costs.map((v, i) => v + tranAndProcurementCosts[i] + worker1labourCosts[i]);

  const productProductionVolume = [
    aDemandVolumeProduction[5],
    bDemandVolumeProduction[5],
    (aDemandVolumeProduction[5] + bDemandVolumeProduction[5])
  ];
  
  // ------------------
  
  // const generalProductionCosts = 
  
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
      values: worker1labourCosts,
    },
    {
      indicator: "Объем производства Продукта, шт.",
      values: productProductionVolume,
    },
    {
      indicator: "Себестоимость по прямым расходам, руб.",
      values: directExpenses,
    },
      
      // ------------

    {
      indicator: "....общепроизводственные расходы",
      values: directExpenses,
    },
    {
      indicator: "....общехозяйственные расходы",
      values: directExpenses,
    },
    {
      indicator: "....коммерческие расходы",
      values: directExpenses,
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
