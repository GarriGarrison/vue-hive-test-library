import { computed, ComputedRef, Ref } from 'vue';
import { DataContainer, DataContainerNode, DataContainerNodeWithRaw } from '../types/data-container';

type DataType<T> = Array<T> | Record<string, T>;
type DataRefType<T> = Ref<DataType<T>> | ComputedRef<DataType<T>>;
type DataItemKey = string | number;

type DataContainerConfig<T> = {
  data: DataRefType<T>;
  valueField?: string;
  titleField?: string;
};

export const UNKNOWN_KEY = '';

export const createUnknownNode = (): DataContainerNode<null> => {
  return {
    key: UNKNOWN_KEY,
    value: null,
    title: '',
    visible: false,
    raw: null,
    prev: null,
    next: null,
  };
};

export const useDataContainer = <T>({
  data,
  valueField,
  titleField = 'title',
}: DataContainerConfig<T>): ComputedRef<DataContainer<T>> => {
  const getValue = (item: T, key: DataItemKey): unknown => {
    if (valueField !== undefined && typeof item === 'object') {
      const value = (item as Record<string, unknown>)[valueField];
      return value === undefined ? (item as Record<string, unknown>).value : value;
    }
    if (data.value instanceof Array) {
      return item;
    }
    return key;
  };

  const getKey = (item: T, key: DataItemKey): string => String(getValue(item, key));

  const getTitle = (item: T): string => {
    if (item instanceof Object) {
      if (titleField !== undefined) {
        const title = (item as Record<string, unknown>)[titleField];
        return title === undefined ? String((item as Record<string, unknown>).title) : String(title);
      }
      throw new Error('use title-field option please');
    }
    return String(item);
  };

  return computed<DataContainer<T>>((): DataContainer<T> => {
    const result: DataContainer<T> = {};
    const resultM: Record<string, string> = new Map<string, string>();

    let prev: DataContainerNode<T> | null = null;

    if (data.value) {
      for (const [key, value] of Object.entries(data.value)) {
        const dataKey = getKey(value, key);
        const current: DataContainerNodeWithRaw<T> = {
          key: dataKey,
          value: getValue(value, key),
          title: getTitle(value),
          visible: false,
          raw: value,
          prev,
          next: null,
        };

        if (prev !== null) {
          prev.next = current as DataContainerNode<T>;
        }

        // console.log('key', dataKey);
        // console.log('val', current);
        
        

        result[dataKey] = current as DataContainerNode<T>;
        resultM.set(dataKey, current);
        prev = current as DataContainerNode<T>;
      }
    }

    // console.log('result', result);
    // console.log('resultM', resultM);
    
    

    return result;
  });
};
