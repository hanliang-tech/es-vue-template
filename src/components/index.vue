<template>
  <div class="container">
    <div class="info">
      <img class="logo" src="../assets/logo.png">
      <p>扩展屏模板</p>
      <span>Hello World!</span>
    </div>
    <div class="btn-list">
      <div :focusable=true @click="routeTo('newPage')" class="button" ref="newPage">
        <p duplicateParentState>打开新页面</p>
      </div>
      <div :focusable=true @click="quit" class="button">
        <p duplicateParentState>退出</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getApp, keyDown } from '../util';
import native from '../native';
export default {
  data() {
    return {
      exitTimer: 0,
    };
  },
  mounted() {
    this.app = getApp();
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on('nativeOnKeyDown', this.nativeOnKeyDown);
    native.requestFocus(this.$refs.newPage);
  },
  methods: {
    backPress() {
      const now = new Date().getTime() / 1000
      clearTimeout(this.exitTimer)
      if (now - this.exitTime < 1) {
        native.closePage();
      } else {
        this.exitTime = now
        native.TOAST('双击返回键退出APP');
      }
    },
    quit() {
      native.closePage();
    },
    nativeOnKeyDown(key) {
      if (key === keyDown.down) {
        console.log('keydown-----------down')
      }
    },
    routeTo(url, query) {
      native.newTab(url, query, '#ffffff');
    },
  },
};
</script>

<style>
  /*
  * 不支持百分百，只支持px
  * 容器默认背景黑色
  */
  .container {
    width: 1920px; /*屏幕尺寸固定，宽：1920，高：1080*/
    height: 1080px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .info {
    align-items: center;
  }
  .info .logo {
    width: 300px;
    height: 300px;
  }
  .info p {
    font-size: 30px;
  }
  .info span {
    font-size: 50px;
  }
  .btn-list {
    margin-top: 40px;
    flex-direction: row;
  }
  .btn-list .button {
    height: 60px;
    width: 200px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 30px;
    background-color: #00d2cc;
    focus-background-color: #000af5;
  }
  .btn-list .button p {
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
</style>
