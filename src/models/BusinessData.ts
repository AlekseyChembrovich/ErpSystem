﻿import {reactive} from "vue";

export interface BusinessData {
    // Продукты (объемы продаж и цены)
    productASalesVolume: number;        // Объем продаж в натуральном выражении для продукта А
    productBSalesVolume: number;        // Объем продаж в натуральном выражении для продукта B
    productAPrice: number;              // цена реализации для продукта А
    productBPrice: number;              // цена реализации для продукта B
    
    // Политика взаимоотношений с Покупателем 1
    aBuyer1RelationshipPolicy: number;    // Политика взаимоотношений с Покупателем 1 по Продукту А
    bBuyer1RelationshipPolicy: number;    // Политика взаимоотношений с Покупателем 1 по Продукту В
    
    // Остатки на начало года
    productABeginningInventory: number; // Остаток на начало года по Продукту А
    productBBeginningInventory: number; // Остаток на начало года по Продукту В

    // Политики запасов продуктов
    productAInventoryPolicy: number;    // Политика запасов по Продукту А
    productBInventoryPolicy: number;    // Политика запасов по Продукту В

    // Материалы и труд для продукта A
    productAMaterial1: number;          // материал 1 для продукта А
    productAWorker1: number;            // рабочий 1 для продукта А

    // Материалы и труд для продукта B
    productBMaterial1: number;          // материал 1 для продукта B
    productBWorker1: number;            // рабочий 1 для продукта B

    // Цены закупки и тарифы
    material1PurchasePrice: number;     // Цена закупки для материал 1
    workerHourlyRate: number;           // Часовая тарифная ставка

    // Политики запасов материалов и поставщиков
    material1InventoryPolicy: number;   // Политика запасов по материалу 1
    material1Supplier1Policy: number;   // Политика взаимоотношений с Поставщиком 1

    // Налоги и отчисления
    fsznContributions: number;          // Отчисления в ФСЗН

    // Производственные расходы
    productionElectricity: number;      // Электроэнергия на производственные цели
    telecomExpenses: number;            // Телефон, Интернет
    equipmentDepreciation: number;      // Амортизация производственного оборудования

    // Общехозяйственные расходы
    adminElectricity: number;           // Электроэнергия на общехозяйственные цели
    productionManagementSalary: number; // ЗП АУП производства
    businessTripExpenses: number;       // Командировочные расходы
    advertisingExpenses: number;        // Реклама
    packagingExpenses: number;          // Расходы на упаковку

    // Налоги
    incomeTax: number;                  // Налог на прибыль

    // Плановая себестоимость
    productAPlannedCost: number;        // Плановая (нормативная) себестоимость Продукта А
    productBPlannedCost: number;        // Плановая (нормативная) себестоимость Продукта В

    // Остатки и запасы
    material1BeginningInventory: number; // Остаток на начало года Материала 1
    material1TransportationCosts: number; // ТЗР, норматив в квартал

    // Зарплата АУП
    managementSalary: number;           // ЗП АУП 

    // Денежные средства
    beginningCashBalance: number;       // Остаток денежных средств на начало
}

/*
Объем продаж в натуральном выражении для продукта А
Объем продаж в натуральном выражении для продукта B
цена реализации для продукта А
цена реализации для продукта B
Политика взаимоотношений с Покупателем 1 для продукта А
Политика взаимоотношений с Покупателем 1 для продукта B
Остаток на начало года по Продукту А
Остаток на начало года  по Продукту В
Политика запасов по Продукту А
Политика запасов по Продукту В

материал 1 для продукта А
рабочий 1 для продукта А

материал 1 для продукта B
рабочий 1 для продукта B
Цена закупки для материал 1
Часовая тарифная ставка

Политика запасов по материалу 1
Политика взаимоотношений с Поставщиком 1
Отчисления в ФСЗН
Электроэнергия на производственные цели
Телефон, Интернет
Амортизация производственного оборудования
Электроэнергия на общехозяйственные цели
ЗП АУП производства
Командировочные расходы
Реклама
Расходы на упаковку
Налог на прибыль
Плановая (нормативная) себестоимость Продукта А
Плановая (нормативная) себестоимость Продукта В
Остаток на начало года Материала 1
ТЗР, норматив в квартал
ЗП АУП 
Остаток денежных средств на начало
*/

export const defaultBusinessData = reactive<BusinessData>({
    productASalesVolume: 140,
    productBSalesVolume: 260,
    productAPrice: 40,
    productBPrice: 95,

    aBuyer1RelationshipPolicy: 40,
    bBuyer1RelationshipPolicy: 60,
    
    productABeginningInventory: 23,
    productBBeginningInventory: 150,
    productAInventoryPolicy: 20,
    productBInventoryPolicy: 10,

    productAMaterial1: 5,
    productAWorker1: 6,
    productBMaterial1: 6,
    productBWorker1: 2,

    material1PurchasePrice: 40,
    workerHourlyRate: 20,

    material1InventoryPolicy: 25,
    material1Supplier1Policy: 90,

    fsznContributions: 35,

    productionElectricity: 25300,
    telecomExpenses: 125000,
    equipmentDepreciation: 32000,

    adminElectricity: 40000,
    productionManagementSalary: 15000,
    businessTripExpenses: 65200,
    advertisingExpenses: 29000,
    packagingExpenses: 36000,

    incomeTax: 24,

    productAPlannedCost: 2079.28891,
    productBPlannedCost: 1996.082725,

    material1BeginningInventory: 560,
    material1TransportationCosts: 200,

    managementSalary: 52000,
    beginningCashBalance: 16500,
});
