import type { BusinessData } from "@/models/BusinessData";
import {useMaterial1RequirementBudget} from "@/composables/4_useMaterial1RequirementBudget";
import {useMaterial1PurchaseBudgetOfSupplier1} from "@/composables/5_useMaterial1PurchaseBudgetOfSupplier1";
import {useWorker1NeedBudget} from "@/composables/7_useWorker1NeedBudget";
import {useLabourCostBudgetWorker1} from "@/composables/8_useLabourCostBudgetWorker1";
import {useBudgetProductionCosts} from "@/composables/9_useBudgetProductionCosts";
import {useGeneralAdminExpensesBudget} from "@/composables/10_useGeneralAdminExpensesBudget";
import {useBudgetSellingCosts} from "@/composables/11_useBudgetSellingCosts";
import {useBudgetProductionAndProductInventory} from "@/composables/3_useBudgetProductionAndProductInventory";

export const useCostBudget = (data: BusinessData) => {
    const {
        aVolume: aVolume,
        bVolume: bVolume,
    } = useBudgetProductionAndProductInventory(data);
    
    const {
        aDemandVolumeProduction,
        bDemandVolumeProduction,
        totalDemandVolumeProduction,
    } = useMaterial1RequirementBudget(data);

    const {
        material1Costs,
        transportAndProcurementCosts,
    } = useMaterial1PurchaseBudgetOfSupplier1(data);

    const {
        labourIntensityPerAVolume,
        labourIntensityPerBVolume,
        totalLabourIntensity,
    } = useWorker1NeedBudget(data);

    const {
        totalLabourCosts,
    } = useLabourCostBudgetWorker1(data);

    const mat1Costs: number[] = [
        aDemandVolumeProduction[4] / totalDemandVolumeProduction[4] * material1Costs[4],
        bDemandVolumeProduction[4] / totalDemandVolumeProduction[4] * material1Costs[4],
        (aDemandVolumeProduction[4] / totalDemandVolumeProduction[4] * material1Costs[4])
        + (bDemandVolumeProduction[4] / totalDemandVolumeProduction[4] * material1Costs[4])
    ];

    const tranAndProcurementCosts: number[] = [
        aDemandVolumeProduction[4] / totalDemandVolumeProduction[4] * transportAndProcurementCosts[4],
        bDemandVolumeProduction[4] / totalDemandVolumeProduction[4] * transportAndProcurementCosts[4],
        (aDemandVolumeProduction[4] / totalDemandVolumeProduction[4] * transportAndProcurementCosts[4])
        + (bDemandVolumeProduction[4] / totalDemandVolumeProduction[4] * transportAndProcurementCosts[4])
    ];

    const worker1LabourCosts: number[] = [
        labourIntensityPerAVolume[4] / totalLabourIntensity[4] * totalLabourCosts[4],
        labourIntensityPerBVolume[4] / totalLabourIntensity[4] * totalLabourCosts[4],
        (labourIntensityPerAVolume[4] / totalLabourIntensity[4] * totalLabourCosts[4])
        + (labourIntensityPerBVolume[4] / totalLabourIntensity[4] * totalLabourCosts[4])
    ];

    const directExpenses = mat1Costs.map((v, i) => v + tranAndProcurementCosts[i] + worker1LabourCosts[i]);

    const productProductionVolume = [ aVolume[4], bVolume[4], (aVolume[4] + bVolume[4]) ];

    const {
        total: total9,
    } = useBudgetProductionCosts(data);

    const {
        total: total10,
    } = useGeneralAdminExpensesBudget(data);

    const {
        total: total11,
    } = useBudgetSellingCosts(data);

    const generalProductionCosts = [
        productProductionVolume[0] / productProductionVolume[2] * total9[4],
        productProductionVolume[1] / productProductionVolume[2] * total9[4],
        total9[4]
    ];

    const generalBusinessExpenses = [
        productProductionVolume[0] / productProductionVolume[2] * total10[4],
        productProductionVolume[1] / productProductionVolume[2] * total10[4],
        total10[4]
    ];

    const sellingExpenses = [
        productProductionVolume[0] / productProductionVolume[2] * total11[4],
        productProductionVolume[1] / productProductionVolume[2] * total11[4],
        total11[4]
    ];

    const indirectCosts = generalProductionCosts.map(
        (v, i) => v + generalBusinessExpenses[i] + sellingExpenses[i]);

    const costOfProduction = directExpenses.map((v, i) => v + indirectCosts[i]);

    const unitCost = costOfProduction.map((v, i) => v / productProductionVolume[i]);

    return {
        mat1Costs: mat1Costs,
        tranAndProcurementCosts: tranAndProcurementCosts,
        worker1LabourCosts: worker1LabourCosts,
        directExpenses: directExpenses,
        productProductionVolume: productProductionVolume,
        generalProductionCosts: generalProductionCosts,
        generalBusinessExpenses: generalBusinessExpenses,
        sellingExpenses: sellingExpenses,
        indirectCosts: indirectCosts,
        costOfProduction: costOfProduction,
        unitCost: unitCost,
    };
};

export const calcTzrRate = (data: BusinessData): number => {
    const {
        transportAndProcurementCosts,
        totalPurchase,
    } = useMaterial1PurchaseBudgetOfSupplier1(data);
    
    return transportAndProcurementCosts[4] / totalPurchase[4];
}

export const calcOprRate = (data: BusinessData): number => {
    const {
        worker1LabourCosts,
        generalProductionCosts,
    } = useCostBudget(data);

    return generalProductionCosts[2] / worker1LabourCosts[2];
}
