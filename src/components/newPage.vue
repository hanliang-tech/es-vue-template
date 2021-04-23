<template>
  <div class="container">
    <div class="info">
      <img class="logo" src="../assets/logo.png">
      <p>扩展屏模板</p>
      <span>New Page</span>
    </div>
  </div>
</template>

<script>
import { getApp, keyDown } from '../util';
import native from '../native';
export default {
  mounted() {
    this.app = getApp();
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on('nativeOnKeyDown', this.nativeOnKeyDown);
  },
  methods: {
    backPress() {
      native.closePage();
    },
    nativeOnKeyDown(key) {
      if (key === keyDown.down) {
        console.log('keydown-----------down')
      }
    },
  },
};
</script>

<style>

</style>
