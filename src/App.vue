<script lang="ts" setup>
import { Ref, computed, onMounted, ref } from 'vue';
import WidgetWrapper from '@/WidgetWrapper.vue';
import { HiveButton, HiveDialog, HiveLoader, HiveTextarea } from '.';
import HiveInput from './components/hive-input/hive-input.vue';
import HiveDropDown from './components/hive-drop-down/hive-drop-down.vue';
import { Option } from './common/types/select';
import { useYearStore } from './stores/years';

const text = ref('text');
const num = ref(0);
const isOpenModal = ref(false);
const dropdown = ref('dd');
const dd3 = ref(0);

const handleText = () => {
  console.log('click');
  text.value = 'onClick';
};

const handleNum = () => {
  console.log('click');
  num.value = 1000;
};

const handleR = () => {
  console.log('clickRRR');
};

const input = ref('');

const options = [5, 2, 1, 4, 3, 6];

let optionsTest: Option[] | undefined;

setTimeout(() => {
  optionsTest = [
    {
      // key: 'key1',
      // title: 'title3',
      // value: 'value3',
      valu: '2023',
      titl: 't2023',
      // key: '0',
    },
    {
      // key: 'key2',
      // title: 'title2',
      // value: 'value2',
      valu: '2022',
      titl: 't2022',
      // key: '1',
    },
    {
      // key: 'key3',
      // title: 'title1',
      // value: 'value1',
      valu: '2024',
      titl: 't2024',
      // key: '2',
    },
  ];
});

const optionsObjectSort =
  //computed(() => optionsTest);
  [
    {
      // key: 'key1',
      // title: 'title3',
      // value: 'value3',
      valu: '2023',
      titl: 't2023',
      // key: '0',
    },
    {
      // key: 'key2',
      // title: 'title2',
      // value: 'value2',
      valu: '2022',
      titl: 't2022',
      // key: '1',
    },
    {
      // key: 'key3',
      // title: 'title1',
      // value: 'value1',
      valu: '2024',
      titl: 't2024',
      // key: '2',
    },
    {
      // key: 'key1',
      // title: 'title3',
      // value: 'value3',
      valu: '2023',
      titl: 't2023',
      // key: '0',
    },
  ];

const optionsArray = [
  {
    key: 'key1',
    title: 'title1',
    value: 'value1',
  },
  {
    key: 'key2',
    title: 'title2',
    value: 'value2',
  },
  {
    key: 'key3',
    title: 'title3',
    value: 'value3',
  },
  {
    key: 'key4',
    title: 'title4',
    value: 'value4',
  },
  {
    key: 'key5',
    title: 'title5',
    value: 'value5',
  },
  {
    key: 'key6',
    title: 'title6',
    value: 'value6',
  },
  {
    key: 'key7',
    title: 'title7',
    value: 'value7',
  },
  {
    key: 'key8',
    title: 'title8',
    value: 'value8',
  },
  {
    key: 'key9',
    title: 'title9',
    value: 'value9',
  },
];

// const dd4 = ref('74fd8aaa-e10a-4fd0-941b-6f6c7249003d')
const dd4 = ref(null)

const optionsObject = {
  '74fd8aaa-e10a-4fd0-941b-6f6c7249003d': {
    title: 'Российская Федерация',
    id: '74fd8aaa-e10a-4fd0-941b-6f6c7249003d',
    classifier_id: '2e72e478-2e35-437c-aeea-0d6da10138ae',
  },
  'cefa7ecc-9e64-425d-bfdb-2dc89a0c9c5f': {
    title: 'Республика Беларусь',
    id: 'cefa7ecc-9e64-425d-bfdb-2dc89a0c9c5f',
    classifier_id: '2e72e478-2e35-437c-aeea-0d6da10138ae',
  },
};

const maritalStatusList = [
  {
    id: 0,
    title: 'холост',
  },
  {
    id: 1,
    title: 'женат',
  },
];
const mm = ref()

const date: Ref<Date | undefined> = ref()

const yearStore = useYearStore();
const yearList = computed(() => yearStore.years);

onMounted(() => {
  yearStore.getYears();
});

const handleSearch = (value: string) => {
  console.log('val', value);
  
}
</script>

<template>
  <hive-loader :visible="false" />

  <div class="app">
    <div class="wrapper">
      <!-- Button -->
      <widget-wrapper title="Button">
        <hive-button>
          <template #before>Before</template>
          <img src="@/assets/search.svg" alt="image after" class="img" />
          Click
          <img src="@/assets/search.svg" alt="image before" class="img" />
          <template #after>After</template>
        </hive-button>
        <hive-button disabled />
        <hive-button />
        <hive-button :style="{ backgroundColor: 'red' }" @click.right.prevent="handleR" />
        <hive-button title="Classes" :class="'test'" @click="handleText" />
      </widget-wrapper>

      <!-- Textarea -->
      <widget-wrapper title="Textarea">
        {{ text }}
        <hive-textarea v-model="text" resize-direction="both" :style="{ width: '300px' }" disabled />
      </widget-wrapper>

      <!-- Input -->
      <widget-wrapper title="Input">
        <div>{{ text }}</div>
        <div>{{ num }}</div>
        <hive-button title="Classes" :class="'test'" @click="handleNum" />

        <hive-input v-model="text" disabled />
        <hive-input v-model="num" type="number" />
        <hive-input v-model="num" type="number" :step="1" />
        <hive-input v-model="num" type="text" integer :min="5" :max="6" />
        <hive-input v-model="num" :mask="/^\d+$/" />
        <!-- <hive-input v-model="date" type="date" /> -->
      </widget-wrapper>

      <!-- Modal -->
      <widget-wrapper title="Modal">
        <hive-button @click="isOpenModal = true" />

        <hive-dialog v-model="isOpenModal">
          <template #header>
            <!-- <hive-button title="close" /> -->
            ривэд эдвэд
            FFFFFFFFFFFFFddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
          </template>

          Hello

          <div :style="{ display: 'flex', gap: '10px', height: '500px' }">
            <hive-input v-model="text" />
            <hive-textarea v-model="text" resize-direction="both" :style="{ width: '300px' }" />
            <!-- <hive-drop-down v-model="dropdown" :options="optionsObject" :style="{ width: '300px' }" /> -->
            <!-- <hive-drop-down v-model="dropdown" :options="optionsObject" :style="{ width: '300px' }" menu-width="0px" /> -->
            <!-- <hive-drop-down v-model="dd3" :options="yearList" title-field="title" value-field="value" /> -->
            <!-- <hive-drop-down v-model="mm" :options="yearList" title-field="title" value-field="id" /> -->
            <hive-button />
          </div>

          <template #footer>
            <hive-button title="close" />
          </template>
        </hive-dialog>
      </widget-wrapper>

      <!-- DropDown -->
      <widget-wrapper title="DropDown">
        {{ dd3 }}
        <br />
        {{ dd4 }}
        <br />
        {{ mm }}
        <!-- <hive-drop-down v-model="dropdown" :options="optionsObject" :style="{ width: '300px' }" /> -->
        <!-- <hive-drop-down v-model="dd3" :options="optionsObjectSort" value-field="value" title-field="title" /> -->
        <!-- <hive-drop-down v-model="dd3" :options="optionsObjectSort" title-field="titl" value-field="valu" /> -->
        <!-- <hive-drop-down v-model="dd3" :options="yearList" title-field="title" value-field="value" with-null /> -->
        <!-- <hive-drop-down v-model="dropdown" :options="options" /> -->
         <hive-drop-down v-model="dd4" :options="optionsObjectSort" title-field="titl" value-field="valu" />
         <!-- <hive-drop-down v-model="mm" :options="maritalStatusList" title-field="title" value-field="id" with-undefined @search="handleSearch" /> -->
      </widget-wrapper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 400px;
}

.img {
  width: 15px;
  height: 15px;
}

.test {
  background-color: aqua;
  z-index: 1;
}
</style>
