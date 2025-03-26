import { computed } from "vue";
import type { BusinessData } from "@/models/BusinessData";

export const useSalesBudget = (data: BusinessData) => {
  const aSales = computed(() => data.productASalesVolume / 4);
  const bSales = computed(() => data.productBSalesVolume / 4);

  const aRevenue = computed(() => aSales.value * data.productAPrice);
  const bRevenue = computed(() => bSales.value * data.productBPrice);
  const totalRevenue = computed(() => aRevenue.value + bRevenue.value);

  return {
    aSales: aSales.value,
    bSales: bSales.value,
    aRevenue: aRevenue.value,
    bRevenue: bRevenue.value,
    totalRevenue: totalRevenue.value,
  };
};
