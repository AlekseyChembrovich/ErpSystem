import type { BusinessData } from "@/models/BusinessData";
import {useMaterial1PurchaseBudgetOfSupplier1} from "@/composables/5_useMaterial1PurchaseBudgetOfSupplier1";

export const useMaterial1PaymentScheduleToSupplier1 = (data: BusinessData) => {
    const {
        totalPurchase,
    } = useMaterial1PurchaseBudgetOfSupplier1(data);

    const q1Payments = [ totalPurchase[0] * 0.8, totalPurchase[0] * 0.2, 0, 0 ];
    const q2Payments = [ 0, totalPurchase[1] * 0.8, totalPurchase[1] * 0.2, 0 ];
    const q3Payments = [ 0, 0, totalPurchase[2] * 0.8, totalPurchase[2] * 0.2 ];
    const q4Payments = [ 0, 0, 0, totalPurchase[3] * 0.8 ];

    const sumRow1 = q1Payments.reduce((v, current) => v + current, 0);
    const sumRow2 = q2Payments.reduce((v, current) => v + current, 0);
    const sumRow3 = q3Payments.reduce((v, current) => v + current, 0);
    const sumRow4 = q4Payments.reduce((v, current) => v + current, 0);
    q1Payments.push(sumRow1);
    q2Payments.push(sumRow2);
    q3Payments.push(sumRow3);
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
