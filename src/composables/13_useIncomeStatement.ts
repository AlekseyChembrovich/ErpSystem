import type { BusinessData } from "@/models/BusinessData";
import { usePaymentSchedule } from "./2_usePaymentSchedule";
import { useCostBudget } from "./12_useCostBudget";
import {useBudgetProductionAndProductInventory} from "@/composables/3_useBudgetProductionAndProductInventory";
import {useSalesBudget} from "@/composables/1_useSalesBudget";

export const useIncomeStatement = (data: BusinessData) => {


    const { aSales, bSales } = useSalesBudget(data);
    const { unitCost } = useCostBudget(data);
    const {
        aBeginningInventoryArray,
        aEndInventoryArray,
        bBeginningInventoryArray,
        bEndInventoryArray,
        aVolume,
        bVolume,
    } = useBudgetProductionAndProductInventory(data);


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
    
    

    const { totalPayments } = usePaymentSchedule(data)
    const {
        costOfProduction,
        generalBusinessExpenses,
        sellingExpenses: sellingExpensesFromCostBudget
    } = useCostBudget(data);

    const costOfSalesСalculation = costOfProduction[costOfProduction.length - 1] / 4;
    const managementExpensesСalculation = generalBusinessExpenses[generalBusinessExpenses.length - 1] / 4;
    const sellingExpensesСalculation = sellingExpensesFromCostBudget[sellingExpensesFromCostBudget.length - 1] / 4;

    const costOfSales = totalProductionVolume;
    const managementExpenses = Array(4).fill(managementExpensesСalculation);
    const sellingExpenses = Array(4).fill(sellingExpensesСalculation);

    managementExpenses.push(generalBusinessExpenses[generalBusinessExpenses.length - 1]);
    sellingExpenses.push(sellingExpensesFromCostBudget[sellingExpensesFromCostBudget.length - 1]);

    const total: number[] = [];
    for (let i = 0; i < 4; i++) {
        let val = totalPayments[i] - costOfSales[i] - managementExpenses[i] - sellingExpenses[i];
        total.push(val);
    }
    const totalSum = total.reduce((v, current) => v + current, 0);
    total.push(totalSum);


    return {
        revenue: totalPayments,
        costOfSales: costOfSales,
        managementExpenses: managementExpenses,
        sellingExpenses: sellingExpenses,
        total: total,
    };
};
