import type { BusinessData } from "@/models/BusinessData";
import {useBudgetProductionAndProductInventory} from "@/composables/3_useBudgetProductionAndProductInventory";

export const useWorker1NeedBudget = (data: BusinessData) => {
    const {
        aVolume,
        bVolume,
    } = useBudgetProductionAndProductInventory(data);

    const {
        productAWorker1,
        productBWorker1,
    } = data;

    const aLabourIntensity: number[] = Array(5).fill(productAWorker1);
    const bLabourIntensity: number[] = Array(5).fill(productBWorker1);

    const labourIntensityPerAVolume: number[] = aVolume.map(v => v * productAWorker1);
    const labourIntensityPerBVolume: number[] = bVolume.map(v => v * productBWorker1);
    const totalLabourIntensity = labourIntensityPerAVolume.map((v, i) => v + labourIntensityPerBVolume[i]);

    return {
        aLabourIntensity: aLabourIntensity,
        bLabourIntensity: bLabourIntensity,
        labourIntensityPerAVolume: labourIntensityPerAVolume,
        labourIntensityPerBVolume: labourIntensityPerBVolume,
        totalLabourIntensity: totalLabourIntensity,
    };
};
