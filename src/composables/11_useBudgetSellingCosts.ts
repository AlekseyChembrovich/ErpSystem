import type { BusinessData } from "@/models/BusinessData";

export const useBudgetSellingCosts = (data: BusinessData) => {
    const { advertisingExpenses, packagingExpenses, businessTripExpenses } = data;

    const q1 = advertisingExpenses / 4
    const q2 = packagingExpenses / 4
    const q3 = businessTripExpenses / 4

    const q1Payments = Array(4).fill(q1);
    const q2Payments = Array(4).fill(q2);
    const q3Payments = Array(4).fill(q3);

    q1Payments.push(advertisingExpenses);
    q2Payments.push(packagingExpenses);
    q3Payments.push(businessTripExpenses);

    const total: number[] = [];
    for (let i = 0; i < q1Payments.length; i++) {
        let val = q1Payments[i] + q2Payments[i] + q3Payments[i];
        total.push(val);
    }

    return {
        q1Payments: q1Payments,
        q2Payments: q2Payments,
        q3Payments: q3Payments,
        total: total,
    };
};
