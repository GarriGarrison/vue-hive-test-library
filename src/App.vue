<script setup lang="ts">
import { HiveButton } from '.';
</script>

<template>
  <hive-button>
    <img src="@/assets/search.svg" alt="image after" class="img" />
    Click
     <img src="@/assets/search.svg" alt="image before" class="img" />
  </hive-button>

  <hive-button disabled />

  <hive-button title="Classes" :class="'test'" />
</template>

<style lang="scss" scoped>
.img {
  width: 15px;
  height: 15px;
}

.test {
  background-color: azure;
}
</style>
