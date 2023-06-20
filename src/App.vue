<script setup lang="ts">
import { ref } from 'vue';
import { HiveButton, HiveLoader } from '.';

const text = ref('text');
</script>

<template>
  <hive-loader />

  <div class="wrapper">
    <!-- Button -->
    <widget-wrapper title="Button">
      <hive-button>
        <img src="@/assets/search.svg" alt="image after" class="img" />
        Click
        <img src="@/assets/search.svg" alt="image before" class="img" />
      </hive-button>

      <hive-button disabled />

      <hive-button :style="{ backgroundColor: 'red' }" />

      <hive-button title="Classes" :class="'test'" />
    </widget-wrapper>

     <!-- Textarea -->
    <widget-wrapper title="Textarea">
      {{ text }}
      <hive-textarea v-model="text" resize-direction="both" />
    </widget-wrapper>
  </div>
</template>

<style lang="scss" scoped>

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
  background-color: azure;
}
</style>
