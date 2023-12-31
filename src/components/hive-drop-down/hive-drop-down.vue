<script lang="ts" setup>
import { reactive, watch } from 'vue';
import HiveInput from '@/components/hive-input/hive-input.vue';
import {
  Focusout,
  Keydown,
  Focusin,
  onFocusin,
  onFocusout,
  onKeydown,
  Mount,
  Unmount,
  Update,
  onUpdateModelValue,
  Search,
  onSearch,
} from '@/common/mixin/emits';
import { useOnMount } from '@/common/hooks/use-mount';
import { useListMethods } from './hooks/use-list-methods';
import { Options, Value  } from '@/common/types/select';

interface Props {
  options: Options | undefined;
  modelValue: Value;
  modelValueEventName?: string;
  disabled?: boolean;
  withUndefined?: boolean; 
  withNull?: boolean;
  nullTitle?: string;
  titleField?: string;
  valueField?: string;
  mask?: RegExp;
  menuHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValueEventName: 'onAfterChange',
  disabled: false,
  nullTitle: 'Не выбрано',
  titleField: 'title',
  valueField: 'value',
  menuHeight: '5rem'
});

type Emit = Mount & Unmount & Update<Value> & Focusin & Focusout & Keydown & Search<string>;
const emit = defineEmits<Emit>();
useOnMount(emit);

const configOptions = reactive({
  options: props.options,
  modelValue: props.modelValue,
  withUndefined: props.withUndefined,
  withNull: props.withNull,
  nullTitle: props.nullTitle,
  fieldTitle: props.titleField,
  fieldValue: props.valueField,
});

const {
  isExpanded,
  activeValue,
  current,
  updateCurrentValue,
  updateActiveValue,
  searchQuery,
  searchRef,
  expand,
  collapse,
  toggle,
  filteredOptions,
  currentOptions,
  setPrevActiveValue,
  setNextActiveValue,
} = useListMethods(configOptions);

watch(
  () => props.options,
  () => {
    configOptions.options = props.options;
    currentOptions.value = useListMethods(configOptions).currentOptions.value;
    filteredOptions.value = useListMethods(configOptions).filteredOptions.value;
    current.value = useListMethods(configOptions).current.value;
  },
);
</script>

<template>
  <div v-if="options" class="hive-drop-down__wrap">
    <div class="hive-drop-down" :class="{ expand: isExpanded, disable: disabled }">
      <hive-input
        v-model="searchQuery"
        ref="searchRef"
        :disabled="disabled"
        :placeholder="(current ? String(current[titleField]) : '')"
        class="hive-drop-down__search"
        :class="{ valueNull:  modelValue === null}"
        @focusin="expand(), onFocusin(emit)"
        @focusout="collapse(), onFocusout(emit)"
        @keydown="onKeydown(emit, $event)"
        @keydown.enter="updateCurrentValue(activeValue)"
        @keydown.esc="collapse"
        @keydown.up.prevent="setPrevActiveValue"
        @keydown.down.prevent="setNextActiveValue"
        @input="onSearch<string>(emit, $event as string)"
      />
      <i class="hive-drop-down__icon" :class="{ expand: isExpanded }" @mousedown="toggle" />
      <transition name="fade" appear>
        <div
          v-if="isExpanded"
          class="hive-drop-down__menu"
          :style="{
            height: menuHeight,
          }"
        >
          <div
            v-for="(item, i) in filteredOptions"
            :key="i"
            class="hive-drop-down__menu-item"
            :class="{
              selected: item[1][valueField] === activeValue || (item[1][valueField] === null && activeValue === 'null'),
            }"
            @click="updateCurrentValue(item[1][valueField]), onUpdateModelValue<Value>(emit, item[1][valueField])"
            @mouseover="updateActiveValue(item[1][valueField])"
            @mousedown.prevent
          >
            {{ item[1][titleField] }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

$drop-down-z_menu: 1;
$drop-down-border: 1px solid var(--border, $border);
$drop-down-selected_background: rgba(0, 0, 0, 0.03);
$drop-down-selected_color: rgba(0, 0, 0, 0.95);
$drop-down-border-top: #fafafa;
$drop-down-box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
$drop-down-padding: 0.5em 1em 0.5em 1em;

.hive-drop-down {
  position: absolute;
  left: 0;
  top: 0%;
  width: 100%;
  cursor: pointer;
  text-align: left;
  text-shadow: none;
  outline: 0;
  display: inline-block;
  color: var(--text, $text);
  border: $drop-down-border;
  border-radius: var(--border-radius, $border-radius);
  transition: opacity 0.1s ease;
  background-color: var(--bg-input, $bg-input);
  z-index: $drop-down-z_menu;
  will-change: transform, opacity;
  animation-iteration-count: 1;
  animation-duration: 300ms;
  animation-timing-function: ease;
  animation-fill-mode: both;

  &.expand {
    z-index: $drop-down-z_menu + 1;
    border-color: var(--border-focus, $border-focus);
  }

  &.disable {
    border-color: var(--border-disabled, $border-disabled);
    opacity: 0.6;
    pointer-events: none;
     cursor: pointer;
  }

  &__wrap {
    position: relative;
    height: 2.2rem;
    width: 100%;
    background-color: none;
    cursor: default;
  }

  &__search {
    border: none;
    padding: $drop-down-padding;
    width: calc(100% - 2rem);
    cursor: default;
    font-size: inherit;

    &::placeholder {
      opacity: 1;
      color: $text;
    }

    &:focus {
      cursor: text;

      &::placeholder {
        opacity: 0.5;
      }
    }

    &.valueNull {
      opacity: 0.8;
    }
  }

  &__icon {
    cursor: auto;
    line-height: 1.2rem;
    opacity: 0.7;
    background: none !important;
    font-style: normal;
    // font-size: 11px;

    &:before {
      content: '▼';
    }

    &.expand {
      &:before {
        content: '▲';
      }
    }
  }

  &__menu {
    overflow-y: auto;

    &-item {
      border-top: 1px solid $drop-down-border-top;
      padding: $p-input !important;
      white-space: normal;
      word-wrap: normal;

      &.selected {
        background: $drop-down-selected_background;
        color: $drop-down-selected_color;
      }
    }
  }
}
</style>
