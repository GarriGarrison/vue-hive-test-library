// import { FilteredOptions } from '@/common/types/option';
// import { ActiveValue, CurrentValue, Value } from '@/common/types/value';

import { Ref, computed, ref } from 'vue';
import { InputExpose } from '@/components/hive-input/hive-input.vue';

// export type ListMethodsConfig = {
//   activeValue: ActiveValue;
//   currentValue: CurrentValue;
//   filteredOptions: FilteredOptions;
//   collapse: () => void;
// };

// export type ListMethodsExport = {
//   updateCurrentValue: (value: Value) => void;
// };

// export const useListMethods = ({ currentValue, filteredOptions, collapse }: ListMethodsConfig): ListMethodsExport => {
//   const updateCurrentValue = (value: Value) => {
//     if (!filteredOptions.value[String(value)]) {
//       collapse();
//       return;
//     }

//     if (currentValue.value !== value) {
//       currentValue.value = value;
//     }

//     collapse();
//   };

//   return {
//     updateCurrentValue,
//   };
// };

export type Value = string | number | null;
export type Option = {
  title: string;
  value: Value;
};

export const useListMethods = (options: Option[], modelValue: Value) => {
  const isExpanded = ref(false);
  const activeValue: Ref<Value | undefined> = ref();
  const currentValue: Ref<Value | undefined> = ref();
  const current: Ref<Option> = ref(options[0]);
  const searchQuery = ref('');
  const searchRef: Ref<InputExpose | null> = ref(null);
  const searchInput = computed(() => searchRef.value?.input);
  const filteredOptions = ref(new Map());

  for (const option of options) {
    filteredOptions.value.set(option.value, option)
  }

  if (modelValue) {
  current.value = filteredOptions.value.get(modelValue);
  }


  const updateActiveValue = (value: Value) => {
    activeValue.value = value;
  };
    

  const updateCurrentValue = (value: Value) => {
    currentValue.value = value;
    current.value = filteredOptions.value.get(value);
    collapse();
  };

  const expand = () => {
    isExpanded.value = true;

    if (currentValue.value) {
      activeValue.value = currentValue.value;
    }
  };

  const collapse = () => {
    isExpanded.value = false;
    searchQuery.value = '';
    searchInput.value?.blur();
  };

  const toggle = () => {
    if (!isExpanded.value) {
      setTimeout(() => searchInput.value?.focus());
    }
  };

  return {
    isExpanded,
    activeValue,
    updateActiveValue,
    currentValue,
    current,
    updateCurrentValue,
    searchQuery,
    searchRef,
    searchInput,
    expand,
    collapse,
    toggle
  }
};
