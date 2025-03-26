import type { BusinessData } from "@/models/BusinessData";

export const useBudgetProductionCosts = (data: BusinessData) => {
    const { productionElectricity, equipmentDepreciation, productionManagementSalary, fsznContributions } = data;

    const q1 = productionElectricity / 4
    const q2 = equipmentDepreciation / 4
    const q3 = productionManagementSalary / 4

    const productionElectricityPurposes: number[] = Array(4).fill(q1);
    const depreciationAndAmortisation: number[] = Array(4).fill(q2);
    const salaries: number[] = Array(4).fill(q3);

    const q4 = (index: number) => (salaries[index] * fsznContributions) / 100

    const payrollDeductions = Array(4).fill(0).map((_, index) => q4(index));
    const sumRow4 = payrollDeductions.reduce((v, current) => v + current, 0);

    productionElectricityPurposes.push(productionElectricity);
    depreciationAndAmortisation.push(equipmentDepreciation);
    salaries.push(productionManagementSalary);
    payrollDeductions.push(sumRow4);

    const total: number[] = [];
    for (let i = 0; i < productionElectricityPurposes.length; i++) {
        let val = productionElectricityPurposes[i] + depreciationAndAmortisation[i] + salaries[i] + payrollDeductions[i];
        total.push(val);
    }

    return {
        productionElectricityPurposes: productionElectricityPurposes,
        depreciationAndAmortisation: depreciationAndAmortisation,
        salaries: salaries,
        payrollDeductions: payrollDeductions,
        total: total,
    };
};
