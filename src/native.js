import Vue from 'vue';

const callNativeWithPromise = msg => {
  return Vue.Native.callNativeWithPromise('MiniModule', 'executeWithPromise', msg);
}

const callNative = msg => {
  return Vue.Native.callNative('MiniModule', 'execute', msg);
}

/*
 * 定位焦点
 * ref：this.$refs.tab 需要定位焦点标签的ref值
 * */
const requestFocus = ref => {
  Vue.Native.callUIFunction(ref, 'requestFocus');
}

/*
 * 预设焦点：适用于ul列表
 * ref：this.$refs.tab ul的ref值
 * index：第几个子标签
 * */
const setSelectChildPosition = (ref, index) => {
  Vue.Native.callUIFunction(ref, 'setSelectChildPosition', [index]);
}

/*
 * 获取设备信息
 * getDeviceInfo().then(res => {})
 * */
const getDeviceInfo = () => {
  return Vue.Native.callNativeWithPromise('MiniModule', 'executeWithPromise', { action: '__AC_GET_DEVICE_INFO__' });
}

/*
 * 系统TOAST提示（各品牌电视的提示样式不同，介意的可自己做）
 * msg：提示文字
 * */
const TOAST = msg => {
  Vue.Native.callNative('MiniModule', 'execute', {action: '__AC_TOAST__', text: msg });
}

/*
 * 打开新页面
 * url：页面路径
 * query：页面参数
 * clearTask：是否关闭其他页面，可用于返回首页
 * background: 新页面背景色例如 #000000
 * */
const newTab = (url, query, background, clearTask) => {
  clearTask = clearTask || false;
  background = background || '#000000'
  Vue.Native.callNative('MiniModule', 'execute', {action: '__AC_NEW_TAB__', data: JSON.stringify({ url, query }), background: background, clearTask: clearTask});
}

/*
 * 打开新页面
 * url：页面路径
 * query：页面参数
 * max：最多数量
 * background: 新页面背景色例如 #000000
 * */
const newTabMax = (url, query, num, background) => {
  background = background || '#000000'
  Vue.Native.callNative('MiniModule', 'execute', {action: '__AC_NEW_TAB__', data: JSON.stringify({ url, query }), background: background, flag: url, max: num});
}

/*
 * 关闭当前页面
 * */
const closePage = () => {
  Vue.Native.callNative('DeviceEventModule', 'invokeDefaultBackPressHandler');
}

/*
 * 关闭所有页面
 * */
const closeAllPage = () => {
  Vue.Native.callNative('MiniModule', 'execute', {action: '__AC_FINISH__'});
}

/*
 * 调起支付：用于单应用集成第三方支付sdk
 * */
const pay = msg => {
  return Vue.Native.callNativeWithPromise('MiniModule', 'pay', msg);
}

/*
 * 埋点
 * name: 事件名称
 * data: 事件参数
 * */
const eventTack = (name, data) => {
  Vue.Native.callNative('MiniModule', 'eventTack', { name, data });
}

/*
 * 向投屏手机端发消息
 * action: 消息名
 * data: 消息参数
 * */
const sendToMobile = (action, data) => {
  const params = data || {};
  params.action = action;
  Vue.Native.callNative('MiniModule', 'execute', params);
}

export default {
  callNativeWithPromise,
  callNative,
  requestFocus,
  setSelectChildPosition,
  getDeviceInfo,
  TOAST,
  newTab,
  newTabMax,
  closePage,
  closeAllPage,
  pay,
  eventTack,
  sendToMobile,
};
