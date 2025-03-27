import type { BusinessData } from "@/models/BusinessData";
import { useSalesBudget } from "@/composables/1_useSalesBudget";

export const usePaymentSchedule = (data: BusinessData) => {
    const {
        aBuyer1RelationshipPolicy,
        bBuyer1RelationshipPolicy
    } = data;
    
    const { aRevenue, bRevenue, } = useSalesBudget(data);

    const aBuyer1RelationshipPolicyPercent = aBuyer1RelationshipPolicy / 100;
    const bBuyer1RelationshipPolicyPercent = bBuyer1RelationshipPolicy / 100;

    const quarterPaymentA = (index: number) =>
        aRevenue[index] * aBuyer1RelationshipPolicyPercent
        + bRevenue[index] * bBuyer1RelationshipPolicyPercent
        + bRevenue[index + 1] * (1 - bBuyer1RelationshipPolicyPercent);
    
    const quarterPaymentB = (index: number) => aRevenue[index] * (1 - aBuyer1RelationshipPolicyPercent);
    
    const quarterPaymentC = (index: number) =>
        aRevenue[index] * aBuyer1RelationshipPolicyPercent
        + bRevenue[index] * bBuyer1RelationshipPolicyPercent;

    const quarter1Payments: number[] = [quarterPaymentA(0), quarterPaymentB(0), 0, 0]
    const quarter2Payments: number[] = [0, quarterPaymentA(1), quarterPaymentB(1), 0]
    const quarter3Payments: number[] = [0, 0, quarterPaymentA(2), quarterPaymentB(2)]
    const quarter4Payments: number[] = [0, 0, 0, quarterPaymentC(3)]

    const sumRow1 = quarter1Payments.reduce((v, current) => v + current, 0);
    const sumRow2 = quarter2Payments.reduce((v, current) => v + current, 0);
    const sumRow3 = quarter3Payments.reduce((v, current) => v + current, 0);
    const sumRow4 = quarter4Payments.reduce((v, current) => v + current, 0);

    quarter1Payments.push(sumRow1);
    quarter2Payments.push(sumRow2);
    quarter3Payments.push(sumRow3);
    quarter4Payments.push(sumRow4);
    
    const getColumnSum = (index: number) => quarter1Payments[index] + quarter2Payments[index] + quarter3Payments[index] + quarter4Payments[index]

    const totalPayments: number[] = [getColumnSum(0), getColumnSum(1), getColumnSum(2), getColumnSum(3), getColumnSum(4)]

    return {
        quarter1Payments,
        quarter2Payments,
        quarter3Payments,
        quarter4Payments,
        totalPayments
    };
};
