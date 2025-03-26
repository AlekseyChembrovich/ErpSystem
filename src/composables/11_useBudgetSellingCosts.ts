import type { BusinessData } from "@/models/BusinessData";

export const useBudgetSellingCosts = (data: BusinessData) => {
    const {
        advertisingExpenses,
        packagingExpenses,
        businessTripExpenses
    } = data;

    const advertisementQ = advertisingExpenses / 4;
    const packagingExpenseQ = packagingExpenses / 4;
    const businessTripExpenseQ = businessTripExpenses / 4;

    const advertisements = Array(4).fill(advertisementQ);
    const packagingCosts = Array(4).fill(packagingExpenseQ);
    const travelExpenses = Array(4).fill(businessTripExpenseQ);

    advertisements.push(advertisingExpenses);
    packagingCosts.push(packagingExpenses);
    travelExpenses.push(businessTripExpenses);

    const total: number[] = [];
    for (let i = 0; i < advertisements.length; i++) {
        let val = advertisements[i] + packagingCosts[i] + travelExpenses[i];
        total.push(val);
    }

    return {
        advertisements: advertisements,
        packagingCosts: packagingCosts,
        travelExpenses: travelExpenses,
        total: total,
    };
};
