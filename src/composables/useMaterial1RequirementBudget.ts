import type { BusinessData } from "@/models/BusinessData";
import {useBudgetProductionAndProductInventory} from "@/composables/useBudgetProductionAndProductInventory";

export const useMaterial1RequirementBudget = (data: BusinessData) => {
    const {
        aVolume,
        bVolume,
    } = useBudgetProductionAndProductInventory(data);

    const {
        productAMaterial1,
        productBMaterial1,
        material1BeginningInventory,
        material1InventoryPolicy,
    } = data;

    const aDemandVolumeProduction = aVolume.map(v => v * productAMaterial1);
    const bDemandVolumeProduction = bVolume.map(v => v * productBMaterial1);
    const totalDemandVolumeProduction = aDemandVolumeProduction.map((v, i) => v + bDemandVolumeProduction[i]);

    const beginningInventory: number[] = [material1BeginningInventory];
    const endInventory: number[] = [];
    for (let i = 0; i < 4; i++) {
        let balance = 0;
        if (beginningInventory[i] > totalDemandVolumeProduction[i]) {
            balance = beginningInventory[i] - totalDemandVolumeProduction[i];
        }
        else {
            if (i >= 3) {
                balance = totalDemandVolumeProduction[0] * material1InventoryPolicy / 100;
            }
            else {
                balance = totalDemandVolumeProduction[i + 1] * material1InventoryPolicy / 100;
            }
        }

        endInventory.push(balance);

        if (i < 3) {
            beginningInventory.push(balance);
        }
    }

    beginningInventory.push(material1BeginningInventory);
    endInventory.push(endInventory[endInventory.length - 1]);

    const forPurchase: number[] = [];
    for (let i = 0; i < 4; i++) {
        let val = totalDemandVolumeProduction[i] - beginningInventory[i] + endInventory[i];
        forPurchase.push(val);
    }

    const sum = forPurchase.reduce((v, current) => v + current, 0);
    forPurchase.push(sum);

    return {
        aDemandVolumeProduction: aDemandVolumeProduction,
        bDemandVolumeProduction: bDemandVolumeProduction,
        totalDemandVolumeProduction: totalDemandVolumeProduction,
        beginningInventory: beginningInventory,
        endInventory: endInventory,
        forPurchase: forPurchase,
    };
};
