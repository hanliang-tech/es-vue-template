import Vue from 'vue';

const callNativeWithPromise = msg => {
  return Vue.Native.callNativeWithPromise('MiniModule', 'executeWithPromise', msg);
}

const callNative = msg => {
  return Vue.Native.callNative('MiniModule', 'execute', msg);
}

/**
 * 定位焦点
 * $refs：this.$refs.view 需要定位焦点标签的$refs对象
 * */
const requestFocus = $refs => {
  Vue.Native.callUIFunction($refs, 'requestFocus');
}

/**
 * 清空上一次记忆焦点
 * $refs：this.$refs.view ul的$refs对象
 * */
const clearFocusMemory = $refs => {
  Vue.Native.callUIFunction($refs, 'clearFocusMemory');
}

/**
 * 预设焦点：适用于ul列表
 * $refs：this.$refs.view ul的$refs对象
 * index：第几个子标签
 * */
const setSelectChildPosition = ($refs, index) => {
  Vue.Native.callUIFunction($refs, 'setSelectChildPosition', [index]);
}

/**
 * 获取设备信息
 * getDeviceInfo().then(res => {})
 * */
const getDeviceInfo = () => {
  return Vue.Native.callNativeWithPromise('MiniModule', 'executeWithPromise', { action: '__AC_GET_DEVICE_INFO__' });
}

/**
 * 系统TOAST提示（各品牌电视的提示样式不同，介意的可自己做）
 * msg：提示文字
 * long: 显示时间长短，true为7秒，false为4秒，默认false
 * */
const TOAST = (msg, long) => {
  long = long || false
  Vue.Native.callNative('MiniModule', 'execute', { action: '__AC_TOAST__', text: msg, long });
}

/**
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

/**
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

/**
 * 打开新扩展屏小程序
 * packageName：包名
 * params：启动参数
 * background: 新页面背景色例如 #000000
 * splashAd: 是否显示广告 默认为true显示广告
 * */
const newApp = (packageName, params, background, splashAd) => {
  background = background || '#000000'
  splashAd = splashAd || true
  Vue.Native.callNative('MiniModule', 'execute', { action: '__AC_NEW_TAB__', data: params, background, espkg: packageName, splashAd });
}

/**
 * 关闭当前页面
 * */
const closePage = () => {
  Vue.Native.callNative('MiniModule', 'execute', {action: '__AC_FINISH__'});
}

/**
 * 调起支付：用于单应用集成第三方支付sdk
 * */
const pay = data => {
  return Vue.Native.callNativeWithPromise('MiniModule', 'pay', data);
}

/**
 * 埋点
 * name: 事件名称
 * data: 事件参数
 * */
const eventTack = (name, data) => {
  Vue.Native.callNative('MiniModule', 'eventTack', { name, data });
}

/**
 * 向投屏手机端发消息
 * action: 消息名
 * data: 消息参数
 * */
const sendToMobile = (action, data) => {
  const params = data || {};
  params.action = action;
  Vue.Native.callNative('MiniModule', 'execute', params);
}

/**
 * 获取当前音量
 * getVolume().then(res => {})
 * */
const getVolume = () => {
  return Vue.Native.callNativeWithPromise('UtilsModule', 'getVolume');
}

/**
 * 获取最大音量
 * getMaxVolume().then(res => {})
 * */
const getMaxVolume = () => {
  return Vue.Native.callNativeWithPromise('UtilsModule', 'getMaxVolume');
}

/**
 * 设置音量
 * 1      提高一点音量
 * -1     减小一点音量
 * 0      只显示一下音量的状态
 * -100   静音
 * 100    取消静音
 * 101    切换静音/非静音状态
 * volume: 音量值
 * shouUI：是否显示音量UI(默认true)
 * */
const adjustVolume = (volume, shouUI) => {
  Vue.Native.callNative('UtilsModule', 'adjustVolume', volume, shouUI);
}

/**
 * 设置音量
 * volume: 音量值
 * shouUI：是否显示音量UI(默认false)
 * */
const setVolume = (volume, shouUI) => {
  shouUI = shouUI || false
  Vue.Native.callNative('UtilsModule', 'setVolume', volume, shouUI);
}


/**
 * 智能音箱--是否支持智能音箱
 * isSupportSpeaker().then(res => { console.log(res.support) })
 * */
const isSupportSpeaker = () => {
  return Vue.Native.callNativeWithPromise('SpeakerModule', 'isSupportSpeaker')
}

/**
 * 智能音箱--发现音箱开关设置
 * data: 是否开启
 * */
const enableDiscoverSpeaker = (data) => {
  Vue.Native.callNative('SpeakerModule', 'enableDiscoverSpeaker', data);
}

/**
 * 智能音箱--获取绑定音箱列表
 * getBindSpeakers().then(res => {})
 * */
const getBindSpeakers = () => {
  return Vue.Native.callNativeWithPromise('SpeakerModule', 'getBindSpeakers', {})
}

/**
 * 智能音箱--获取绑定码
 * getBindCode().then(res => {})
 * */
const getBindCode = () => {
  return Vue.Native.callNativeWithPromise('SpeakerModule', 'getBindCode', {})
}

/**
 * 智能音箱--发现音箱
 * discoverSpeakers().then(res => {})
 * */
const discoverSpeakers = () => {
  return Vue.Native.callNativeWithPromise('SpeakerModule', 'discoverSpeakers', {})
}

/**
 * 智能音箱--获取发现音箱开关状态
 * canDiscoverSpeaker().then(res => {})
 * */
const canDiscoverSpeaker = () => {
  return Vue.Native.callNativeWithPromise('SpeakerModule', 'canDiscoverSpeaker')
}

/**
 * 通过sdk与app通信
 * eventName: 事件名称（与app端约定）
 * eventParams: 事件参数（与app端约定）
 * nativeEventWithPromise(name, data).then(res => {})
 * */
const nativeEventWithPromise = (eventName, eventParams) => {
  return Vue.Native.callNativeWithPromise('NativeEventModule', 'executeWithPromise', { eventId: eventName, data: eventParams });
}

/**
 * 通过sdk与app通信
 * eventName: 事件名称（与app端约定）
 * eventParams: 事件参数（与app端约定）
 * */
const nativeEvent = (eventName, eventParams) => {
  return Vue.Native.callNative('NativeEventModule', 'execute', { eventId: eventName, data: eventParams });
}

export default {
  callNativeWithPromise,
  callNative,
  requestFocus,
  clearFocusMemory,
  setSelectChildPosition,
  getDeviceInfo,
  TOAST,
  newTab,
  newTabMax,
  newApp,
  closePage,
  pay,
  eventTack,
  sendToMobile,
  getVolume,
  getMaxVolume,
  adjustVolume,
  setVolume,
  isSupportSpeaker,
  enableDiscoverSpeaker,
  getBindSpeakers,
  getBindCode,
  discoverSpeakers,
  canDiscoverSpeaker,
  nativeEventWithPromise,
  nativeEvent,
};
