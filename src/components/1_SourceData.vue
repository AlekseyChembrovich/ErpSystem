<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  { material: 'Продукт А', indicator: 'Объем продаж в натуральном выражении', designation: 'ОП', unit: 'шт', value: 140, comment: '' },
  { material: 'Продукт В', indicator: 'Объем продаж в натуральном выражении', designation: 'ОП', unit: 'шт', value: 260, comment: '' },
  { material: 'Продукт А', indicator: 'цена реализации', designation: 'Ц', unit: 'руб.', value: 40, comment: '' },
  { material: 'Продукт В', indicator: 'цена реализации', designation: 'Ц', unit: 'руб.', value: 95, comment: '' },
  { material: 'Продукт А', indicator: 'Политика взаимоотношений с Покупателем 1', designation: '', unit: '', value: null, comment: 'оплата по факту поставки в периоде отгрузки 40%, в периоде, следующем за периодом отгрузки 60%' },
  { material: 'Продукт В', indicator: 'Политика взаимоотношений с Покупателем 1', designation: '', unit: '', value: null, comment: 'предоплата 40% в периоде, предшествующем периоду отгрузки, 60% - оплата по факту оплаты' },
]);

const headers = [
  { title: 'Материал/услуга/ресурс', key: 'material' },
  { title: 'Показатель', key: 'indicator' },
  { title: 'Обозначение', key: 'designation' },
  { title: 'Ед. изм.', key: 'unit' },
  { title: 'Значение', key: 'value' },
  { title: 'Комментарий', key: 'comment' },
];
</script>

<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" :hide-default-footer="true" class="elevation-1">
      <template v-slot:item.value="{ item }">
        <v-text-field v-model="item.value" density="compact" variant="outlined"></v-text-field>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 1000px;
  margin: auto;
}
</style>
