import type { BusinessData } from "@/models/BusinessData";
import { useSalesBudget } from "@/composables/1_useSalesBudget";
import {useCostBudget} from "@/composables/12_useCostBudget";

export const useBudgetProductionAndProductInventory = (data: BusinessData) => {
    const { aSales, bSales } = useSalesBudget(data);

    const {
        productAPrice,
        productBPrice,
        productABeginningInventory,
        productBBeginningInventory,
        productAInventoryPolicy,
        productBInventoryPolicy,
    } = data;

    const aBeginningInventoryArray: number[] = [productABeginningInventory];
    const aEndInventoryArray: number[] = [];
    for (let i = 0; i < 4; i++) {
        let balance = 0;
        if (aBeginningInventoryArray[i] - aSales[i] > aSales[i + 1] * productAInventoryPolicy / 100) {
            balance = aBeginningInventoryArray[i] - aSales[i];
        }
        else {
            if (i >= 3) {
                balance = Math.ceil(aSales[0] * productAInventoryPolicy / 100);
            }
            else {
                balance = Math.ceil(aSales[i + 1] * productAInventoryPolicy / 100);
            }
        }

        aEndInventoryArray.push(balance);

        if (i < 3) {
            aBeginningInventoryArray.push(balance);
        }
    }

    aBeginningInventoryArray.push(productABeginningInventory);
    aEndInventoryArray.push(aEndInventoryArray[aEndInventoryArray.length - 1]);

    const bBeginningInventoryArray: number[] = [productBBeginningInventory];
    const bEndInventoryArray: number[] = [];
    for (let i = 0; i < 4; i++) {
        let balance = 0;
        if (bBeginningInventoryArray[i] - bSales[i] > bSales[i + 1] * productBInventoryPolicy / 100) {
            balance = bBeginningInventoryArray[i] - bSales[i];
        }
        else {
            if (i >= 3) {
                balance = Math.ceil(bSales[0] * productBInventoryPolicy / 100);
            }
            else {
                balance = Math.ceil(bSales[i + 1] * productBInventoryPolicy / 100);
            }
        }

        bEndInventoryArray.push(balance);

        if (i < 3) {
            bBeginningInventoryArray.push(balance);
        }
    }

    bBeginningInventoryArray.push(productBBeginningInventory);
    bEndInventoryArray.push(bEndInventoryArray[bEndInventoryArray.length - 1]);

    /*const { unitCost } = useCostBudget(data);
    
    console.log(unitCost)*/
    
    const aVolume: number[] = [];
    const aProductionVolume: number[] = [];
    for (let i = 0; i < aSales.length; i++) {
        let bal = aSales[i] - aBeginningInventoryArray[i] + aEndInventoryArray[i];
        aVolume.push(bal);
        aProductionVolume.push(bal * productAPrice);
    }

    const bVolume: number[] = [];
    const bProductionVolume: number[] = [];
    for (let i = 0; i < bSales.length; i++) {
        let bal = bSales[i] - bBeginningInventoryArray[i] + bEndInventoryArray[i];
        bVolume.push(bal);
        bProductionVolume.push(bal * productAPrice);
    }

    const totalProductionVolume = aProductionVolume.map((v, i) => v + bProductionVolume[i]);
    
    return {
        aBeginningInventoryArray: aBeginningInventoryArray,
        aEndInventoryArray: aEndInventoryArray,

        bBeginningInventoryArray: bBeginningInventoryArray,
        bEndInventoryArray: bEndInventoryArray,

        aVolume: aVolume,
        aProductionVolume: aProductionVolume,
        bVolume: bVolume,
        bProductionVolume: bProductionVolume,

        totalProductionVolume: totalProductionVolume
    };
};
