import type { BusinessData } from "@/models/BusinessData";

export const useSalesBudget = (data: BusinessData) => {
  const aSale: number = data.productASalesVolume / 4;
  const bSale: number = data.productBSalesVolume / 4;
  const aSales: number[] = [aSale, aSale, aSale, aSale, data.productASalesVolume];
  const bSales: number[] = [bSale, bSale, bSale, bSale, data.productBSalesVolume];

  const aRevenue = aSales.map(v => v * data.productAPrice);
  const bRevenue = bSales.map(v => v * data.productBPrice);
  const totalRevenue = aRevenue.map((v, i) => v + bRevenue[i]);

  return {
    aSales: aSales,
    bSales: bSales,
    aRevenue: aRevenue,
    bRevenue: bRevenue,
    totalRevenue: totalRevenue,
  };
};
