import type { BusinessData } from "@/models/BusinessData";
import {useMaterial1RequirementBudget} from "@/composables/4_useMaterial1RequirementBudget";

export const useMaterial1PurchaseBudgetOfSupplier1 = (data: BusinessData) => {
    const {
        forPurchase,
    } = useMaterial1RequirementBudget(data);

    const {
        material1PurchasePrice,
        material1TransportationCosts,
    } = data;

    const material1Costs = forPurchase.map(v => v * material1PurchasePrice);
    const transportAndProcurementCosts: number[] = [
        material1TransportationCosts,
        material1TransportationCosts,
        material1TransportationCosts,
        material1TransportationCosts,
        material1TransportationCosts * 4
    ];

    const totalPurchase: number[] = [];
    for (let i = 0; i < 4; i++){
        let val = material1Costs[i] > 0 ? material1Costs[i] + transportAndProcurementCosts[i] : 0;
        totalPurchase.push(val);
    }

    const sum = totalPurchase.reduce((v, current) => v + current, 0);
    totalPurchase.push(sum);

    return {
        material1Costs: material1Costs,
        transportAndProcurementCosts: transportAndProcurementCosts,
        totalPurchase: totalPurchase
    };
};
