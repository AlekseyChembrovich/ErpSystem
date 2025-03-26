import type { BusinessData } from "@/models/BusinessData";
import {useWorker1NeedBudget} from "@/composables/7_useWorker1NeedBudget";

export const useLabourCostBudgetWorker1 = (data: BusinessData) => {
    const {
        totalLabourIntensity,
    } = useWorker1NeedBudget(data);

    const {
        workerHourlyRate,
        fsznContributions
    } = data;

    const workerHourlyRates = Array(5).fill(workerHourlyRate);
    const salaries = totalLabourIntensity.map(v => v * workerHourlyRate);
    const payrollDeductions = salaries.map(v => v * fsznContributions / 100);
    const totalLabourCosts = salaries.map((v, i) => v + payrollDeductions[i]);
    
    return {
        workerHourlyRates: workerHourlyRates,
        salaries: salaries,
        payrollDeductions: payrollDeductions,
        totalLabourCosts: totalLabourCosts,
    };
};
