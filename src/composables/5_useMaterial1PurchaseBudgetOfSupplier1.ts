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
        material1Costs[0] > 0 ? material1TransportationCosts : 0,
        material1Costs[1] > 0 ? material1TransportationCosts : 0,
        material1Costs[2] > 0 ? material1TransportationCosts : 0,
        material1Costs[3] > 0 ? material1TransportationCosts : 0,
    ];
    
    const transportAndProcurementSum = transportAndProcurementCosts.reduce(
        (v, current) => v + current, 0);
    transportAndProcurementCosts.push(transportAndProcurementSum);
    
    const totalPurchase: number[] = material1Costs.map((v, i) => v + transportAndProcurementCosts[i]);
    
    return {
        material1Costs: material1Costs,
        transportAndProcurementCosts: transportAndProcurementCosts,
        totalPurchase: totalPurchase
    };
};
