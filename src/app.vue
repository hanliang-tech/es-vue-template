<template>
  <div id="root">
    <keep-alive>
      <router-view class="feature-content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'App',
  mounted() {
    Vue.Native.callNative('DeviceEventModule', 'setListenBackPress', true);
  },
};
</script>

<style scoped>
  #root {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
</style>
