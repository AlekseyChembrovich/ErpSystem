import type { BusinessData } from "@/models/BusinessData";

export const useGeneralAdminExpensesBudget = (data: BusinessData) => {
    const {
        adminElectricity,
        telecomExpenses,
        managementSalary,
        fsznContributions
    } = data;

    const adminElectricityArray = Array(5).fill(adminElectricity);
    const telecomExpensesArray = Array(5).fill(telecomExpenses);
    const managementSalaryArray = Array(5).fill(managementSalary);
    const payrollDeductions = managementSalaryArray.map(v => v * fsznContributions / 100);

    const total = adminElectricityArray.map(
        (v, i) => v + telecomExpensesArray[i] + managementSalaryArray[i] + payrollDeductions[i]);

    return {
        adminElectricityArray: adminElectricityArray,
        telecomExpensesArray: telecomExpensesArray,
        managementSalaryArray: managementSalaryArray,
        payrollDeductions: payrollDeductions,
        total: total,
    };
};
