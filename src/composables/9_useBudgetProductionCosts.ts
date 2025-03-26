import type { BusinessData } from "@/models/BusinessData";

export const useBudgetProductionCosts = (data: BusinessData) => {
    const { productionElectricity, equipmentDepreciation, productionManagementSalary, fsznContributions } = data;

    const q1 = productionElectricity / 4
    const q2 = equipmentDepreciation / 4
    const q3 = productionManagementSalary / 4

    const q1Payments = Array(4).fill(q1);
    const q2Payments = Array(4).fill(q2);
    const q3Payments = Array(4).fill(q3);

    const q4 = (index: number) => (q3Payments[index] * fsznContributions) / 100

    const q4Payments = Array(4).fill(0).map((_, index) => q4(index));
    const sumRow4 = q4Payments.reduce((v, current) => v + current, 0);

    q1Payments.push(productionElectricity);
    q2Payments.push(equipmentDepreciation);
    q3Payments.push(productionManagementSalary);
    q4Payments.push(sumRow4);

    const total: number[] = [];
    for (let i = 0; i < q1Payments.length; i++) {
        let val = q1Payments[i] + q2Payments[i] + q3Payments[i] + q4Payments[i];
        total.push(val);
    }

    return {
        q1Payments: q1Payments,
        q2Payments: q2Payments,
        q3Payments: q3Payments,
        q4Payments: q4Payments,
        total: total,
    };
};
