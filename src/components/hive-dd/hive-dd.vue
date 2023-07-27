<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import HiveInput from '@/components/hive-input/hive-input.vue';
// import { Value } from '@/common/types/value';
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
  Input,
  onInput,
  onUpdateModelValue,
  Search,
} from '@/common/mixin/emits';
import { useOnMount } from '@/common/hooks/use-mount';
import { Value, Option, useListMethods } from './hooks/use-list-methods';

// export default {
//   name: 'dropdown',
//   props: ['title', 'items'],
//   data () {
//     return {
//       isOpen: false
//     }
//   }
// }

// type Value = string | number | null;

// type Opt = {
//   title: string;
//   value: Value;
// };

interface Props {
  options: Option[];
  modelValue: Value;
  title: string;
  menuHeight?: string;
}

const props = defineProps<Props>();

// type Emit = Mount & Unmount & Update<currentType> & Focusin & Focusout & Keydown & Input<currentType>;
type Emit = Mount & Unmount & Update<Value> & Focusin & Focusout & Keydown & Input<string> & Search<string>;

const emit = defineEmits<Emit>();

useOnMount(emit);

// const isOpen = ref(false);
// const isExpanded = ref(false);
// const searchQuery = ref('');

// const activeValue = ref(props.modelValue);
// const updateActiveValue = (value: Value) => {
//   activeValue.value = value;
// };

// const currentValue = ref(props.modelValue);
// const updateCurrentValue = (value: Value) => {
//   currentValue.value = value;
//   isExpanded.value = false;
// };

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
  toggle
} = useListMethods(props.options, props.modelValue);

// watch(
//   () => props.modelValue,
//   () => {
//     updateCurrentValue(props.modelValue);
//   },
// );

// onMounted(() => {
//   updateCurrentValue(props.modelValue);
// })
</script>

<template>
  <!-- <div class="menu-item"> -->
  <div class="hive-drop-down">
    <!-- <a href="#">
      {{ title }}
    </a>
    <svg viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#FFF"
      ></path>
    </svg> -->
    <hive-input
      v-model="searchQuery"
      ref="searchRef"
      :placeholder="current.title"
      class="hive-drop-down__search"
      @focusin="expand"
      @focusout="collapse"
    />
    <i class="hive-drop-down__icon" :class="{ expand: isExpanded }" @mousedown="toggle" />
    <transition name="fade" appear>
      <!-- <div class="sub-menu" v-if="!isExpanded"> -->
      <div
        v-if="isExpanded"
        class="hive-drop-down__menu"
        :style="{
          height: menuHeight,
        }"
      >
        <!-- <div v-for="(item, i) in options" :key="i" class="menu-item"> -->
        <div
          v-for="(item, i) in options"
          :key="i"
          class="hive-drop-down__menu-item"
          :class="{
            selected: item.value === activeValue,
          }"
          @click="updateCurrentValue(item.value), onUpdateModelValue<Value>(emit, item.value)"
          @mouseover="updateActiveValue(item.value)"
          @mousedown.prevent
        >
          {{ item.value }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

$drop-down-z_menu: 11;
$drop-down-border: 1px solid var(--border, $border);
$drop-down-selected_background: rgba(0, 0, 0, 0.03);
$drop-down-selected_color: rgba(0, 0, 0, 0.95);
$drop-down-border-top: #fafafa;
$drop-down-box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
$drop-down-padding: 0.5em 1em 0.5em 1em;
.hive-drop-down {
  position: relative;
  cursor: pointer;
  // word-wrap: break-word;
  // line-height: 1.2rem;
  // white-space: normal;
  text-align: left;
  outline: 0;
  // background-color: none;
  display: inline-block;
  color: var(--text, $text);
  // -webkit-box-shadow: none;
  // box-shadow: none;
  border: $drop-down-border;
  border-radius: var(--border-radius, $border-radius);
  // padding: $drop-down-padding;
  // display: flex;
  // align-items: center;
  // justify-content: right;
  // -webkit-transition: width 0.1s ease, -webkit-box-shadow 0.1s ease;
  // transition: box-shadow 0.1s ease, width 0.1s ease;

  &__search {
    border: none;
    padding: $drop-down-padding;
    width: calc(100% - 2rem);

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
  }

  &__icon {
    cursor: auto;
    line-height: 1.2rem;
    opacity: 0.7;
    background: none !important;
    font-style: normal;

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
    // position: absolute;
    // background-color: #222;
    // top: 100%; //calc(100% + 18px);
    // left: 0%;
    // transform: translateX(-50%);
    // width: max-content;
    // border-radius: 0px 0px 16px 16px;
    // padding: $drop-down-padding;

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

// .menu-item svg {
//   width: 10px;
//   margin-left: 10px;
// }

.menu-item .sub-menu {
  position: absolute;
  background-color: #222;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: all 0.5s ease-out;
// }

// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }
</style>
