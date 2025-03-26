import type { BusinessData } from "@/models/BusinessData";
import { usePaymentSchedule } from "./2_usePaymentSchedule";
import { useCostBudget } from "./12_useCostBudget";

export const useIncomeStatement = (data: BusinessData) => {
    const { totalPayments } = usePaymentSchedule(data)
    const {
        costOfProduction,
        generalBusinessExpenses,
        sellingExpenses: sellingExpensesFromCostBudget
    } = useCostBudget(data);

    const costOfSalesСalculation = costOfProduction[costOfProduction.length - 1] / 4;
    const managementExpensesСalculation = generalBusinessExpenses[generalBusinessExpenses.length - 1] / 4;
    const sellingExpensesСalculation = sellingExpensesFromCostBudget[sellingExpensesFromCostBudget.length - 1] / 4;

    const costOfSales = Array(4).fill(costOfSalesСalculation);
    const managementExpenses = Array(4).fill(managementExpensesСalculation);
    const sellingExpenses = Array(4).fill(sellingExpensesСalculation);

    costOfSales.push(costOfProduction[costOfProduction.length - 1]);
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
