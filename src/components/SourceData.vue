<script setup lang="ts">

import { ref, watch, reactive } from 'vue';
import { BusinessData } from '@/models/BusinessData'

const props = defineProps<{
  data: BusinessData
}>();

const emit = defineEmits<{ (e: 'modelUpdated', model: BusinessData): void }>();

const businessData = reactive<BusinessData>(props.data);

watch(businessData, (newVal) => {
  items.value.forEach(item => {
    if (item.dataKey) {
      item.value = newVal[item.dataKey as keyof BusinessData];
    }
  });
  
  emit('modelUpdated', newVal);
}, { deep: true });

const items = ref([
  { material: 'Продукт А', indicator: 'Объем продаж в натуральном выражении', designation: 'ОП', unit: 'шт', value: businessData.productASalesVolume, comment: '', dataKey: 'productASalesVolume' },
  { material: 'Продукт В', indicator: 'Объем продаж в натуральном выражении', designation: 'ОП', unit: 'шт', value: businessData.productBSalesVolume, comment: '', dataKey: 'productBSalesVolume' },
  { material: 'Продукт А', indicator: 'цена реализации', designation: 'Ц', unit: 'руб.', value: businessData.productAPrice, comment: '', dataKey: 'productAPrice' },
  { material: 'Продукт В', indicator: 'цена реализации', designation: 'Ц', unit: 'руб.', value: businessData.productBPrice, comment: '', dataKey: 'productBPrice' },

  // TODO: to be hardcoded
  // { material: 'Продукт А', indicator: 'Политика взаимоотношений с Покупателем 1', designation: '', unit: '', value: null, comment: 'оплата по факту поставки в периоде отгрузки 40%, в периоде, следующем за периодом отгрузки 60%' },
  // { material: 'Продукт В', indicator: 'Политика взаимоотношений с Покупателем 1', designation: '', unit: '', value: null, comment: 'предоплата 40% в периоде, предшествующем периоду отгрузки, 60% - оплата по факту оплаты' },

  { material: 'Продукт А', indicator: 'Остаток на начало года по Продукту А', designation: '', unit: 'шт.', value: businessData.productABeginningInventory, comment: '', dataKey: 'productABeginningInventory' },
  { material: 'Продукт В', indicator: 'Остаток на начало года по Продукту В', designation: '', unit: 'шт.', value: businessData.productBBeginningInventory, comment: '', dataKey: 'productBBeginningInventory' },

  { material: 'Продукт А', indicator: 'Политика запасов по Продукту А', designation: '', unit: '%', value: businessData.productAInventoryPolicy, comment: 'на конец периода (квартал) запас составляет 20% от потребностей следующего периода', dataKey: 'productAInventoryPolicy' },
  { material: 'Продукт В', indicator: 'Политика запасов по Продукту В', designation: '', unit: '%', value: businessData.productBInventoryPolicy, comment: 'на конец периода (квартал) запас составляет 10% от потребностей следующего периода', dataKey: 'productBInventoryPolicy' },

  { material: 'Продукт А', indicator: 'материал 1', designation: 'М1', unit: 'м.', value: businessData.productAMaterial1, comment: '', dataKey: 'productAMaterial1' },
  { material: 'Продукт А', indicator: 'рабочий 1', designation: 'Р1', unit: 'чел-ч.', value: businessData.productAWorker1, comment: '', dataKey: 'productAWorker1' },
  { material: 'Продукт В', indicator: 'материал 1', designation: 'М1', unit: 'м.', value: businessData.productBMaterial1, comment: '', dataKey: 'productBMaterial1' },
  { material: 'Продукт В', indicator: 'рабочий 1', designation: 'Р1', unit: 'чел-ч.', value: businessData.productBWorker1, comment: '', dataKey: 'productBWorker1' },

  { material: 'Материал 1', indicator: 'Цена закупки', designation: 'Цм', unit: 'руб.', value: businessData.material1PurchasePrice, comment: '', dataKey: 'material1PurchasePrice' },
  { material: 'Рабочий 1', indicator: 'Часовая тарифная ставка', designation: 'ЧТС', unit: 'руб.', value: businessData.workerHourlyRate, comment: '', dataKey: 'workerHourlyRate' },

  { material: 'Материал 1', indicator: 'Политика запасов по материалу 1', designation: '', unit: '%', value: businessData.material1InventoryPolicy, comment: 'на конец периода (квартала) запас составляет 25% от потребностей следующего периода', dataKey: 'material1InventoryPolicy' },
  { material: 'Материал 1', indicator: 'Политика взаимоотношений с Поставщиком 1', designation: '', unit: '%', value: businessData.material1Supplier1Policy, comment: 'оплата производится по схеме: 90% в периоде поставки, 10% - в периоде, следующем за периодом поставки', dataKey: 'material1Supplier1Policy' },

  { material: 'Отчисления в ФСЗН', indicator: '', designation: '', unit: '%', value: businessData.fsznContributions, comment: '', dataKey: 'fsznContributions' },
  { material: 'Электроэнергия на производственные цели', indicator: '', designation: '', unit: 'руб.', value: businessData.productionElectricity, comment: '', dataKey: 'productionElectricity' },
  { material: 'Телефон, Интернет', indicator: '', designation: '', unit: 'руб.', value: businessData.telecomExpenses, comment: '', dataKey: 'telecomExpenses' },
  { material: 'Амортизация производственного оборудования', indicator: '', designation: '', unit: 'руб.', value: businessData.equipmentDepreciation, comment: '', dataKey: 'equipmentDepreciation' },

  { material: 'Электроэнергия на общехозяйственные цели', indicator: '', designation: '', unit: 'руб.', value: businessData.adminElectricity, comment: '', dataKey: 'adminElectricity' },
  { material: 'ЗП АУП производства', indicator: '', designation: '', unit: 'руб.', value: businessData.productionManagementSalary, comment: '', dataKey: 'productionManagementSalary' },
  { material: 'Командировочные расходы', indicator: '', designation: '', unit: 'руб.', value: businessData.businessTripExpenses, comment: '', dataKey: 'businessTripExpenses' },
  { material: 'Реклама', indicator: '', designation: '', unit: 'руб.', value: businessData.advertisingExpenses, comment: '', dataKey: 'advertisingExpenses' },
  { material: 'Расходы на упаковку', indicator: '', designation: '', unit: 'руб.', value: businessData.packagingExpenses, comment: '', dataKey: 'packagingExpenses' },

  { material: 'Налог на прибыль', indicator: '', designation: '', unit: '%', value: businessData.incomeTax, comment: '', dataKey: 'incomeTax' },

  { material: 'Плановая (нормативная) себестоимость Продукта А', indicator: '', designation: '', unit: 'руб.', value: businessData.productAPlannedCost, comment: '', dataKey: 'productAPlannedCost' },
  { material: 'Плановая (нормативная) себестоимость Продукта В', indicator: '', designation: '', unit: 'руб.', value: businessData.productBPlannedCost, comment: '', dataKey: 'productBPlannedCost' },

  { material: 'Остаток на начало года Материала 1', indicator: '', designation: '', unit: 'м.', value: businessData.material1BeginningInventory, comment: '', dataKey: 'material1BeginningInventory' },
  { material: 'ТЗР, норматив в квартал', indicator: '', designation: '', unit: 'руб.', value: businessData.material1TransportationCosts, comment: '', dataKey: 'material1TransportationCosts' },

  { material: 'ЗП АУП', indicator: '', designation: '', unit: 'руб.', value: businessData.managementSalary, comment: '', dataKey: 'managementSalary' },
  { material: 'Остаток денежных средств на начало', indicator: '', designation: '', unit: 'руб.', value: businessData.beginningCashBalance, comment: '', dataKey: 'beginningCashBalance' }
]);

const headers = [
  { title: 'Материал/услуга/ресурс', key: 'material' },
  { title: 'Показатель', key: 'indicator' },
  { title: 'Обозначение', key: 'designation' },
  { title: 'Ед. изм.', key: 'unit' },
  { title: 'Значение', key: 'value' },
  { title: 'Комментарий', key: 'comment' },
];

function handleValueChange(item: any, newValue: number) {
  businessData[item.dataKey as keyof BusinessData] = newValue;
}

</script>

<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="items"
        :hide-default-footer="true"
        :items-per-page="-1"
        class="elevation-1">
      <template v-slot:item.value="{ item }">
        <v-text-field
            :model-value="item.value"
            @update:model-value="(val) => handleValueChange(item, Number(val))"
            density="compact"
            variant="outlined"
            type="number"
        ></v-text-field>
      </template>
    </v-data-table>
  </v-container>
</template>
