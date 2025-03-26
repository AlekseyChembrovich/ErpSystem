import type { BusinessData } from "@/models/BusinessData";
import { useSalesBudget } from "@/composables/1_useSalesBudget";

export const usePaymentSchedule = (data: BusinessData) => {

    const { aRevenue, bRevenue, } = useSalesBudget(data);

    const quarterPaymentA = (index: number) => aRevenue[index] * 0.4 + bRevenue[index] * 0.6 + bRevenue[index + 1] * 0.4;
    const quarterPaymentB = (index: number) => aRevenue[index] * 0.6;
    const quarterPaymentC = (index: number) => aRevenue[index] * 0.4 + bRevenue[index] * 0.6;

    const firstQuarterPayments: number[] = [quarterPaymentA(0), quarterPaymentB(0), 0, 0, quarterPaymentA(0) + quarterPaymentB(0)]
    const secondQuarterPayments: number[] = [0, quarterPaymentA(1), quarterPaymentB(1), 0, quarterPaymentA(1) + quarterPaymentB(1)]
    const thirdQuarterPayments: number[] = [0, 0, quarterPaymentA(2), quarterPaymentB(2), quarterPaymentA(2) + quarterPaymentB(2)]
    const fourthQuarterPayments: number[] = [0, 0, 0, quarterPaymentC(3), quarterPaymentC(3)]

    const getColumnSum = (index: number) => firstQuarterPayments[index] + secondQuarterPayments[index] + thirdQuarterPayments[index] + fourthQuarterPayments[index]

    const totalPayments: number[] = [getColumnSum(0), getColumnSum(1), getColumnSum(2), getColumnSum(3), getColumnSum(4)]

    return {
        firstQuarterPayments,
        secondQuarterPayments,
        thirdQuarterPayments,
        fourthQuarterPayments,
        totalPayments
    };
};
