import type { defineComponent, VueElement } from 'vue';

export type VueComponent = VueElement | ReturnType<typeof defineComponent>;
export type Value = string | number | boolean | unknown | string[];
