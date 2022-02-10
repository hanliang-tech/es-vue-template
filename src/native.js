import Vue from 'vue';

export default {
  callNativeWithPromise: msg => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'executeWithPromise', msg);
  },

  callNative: msg => {
    return Vue.Native.callNative('MiniModule', 'execute', msg);
  },

  /**
   * 定位焦点
   * $refs：this.$refs.view 需要定位焦点标签的$refs对象
   * */
  requestFocus: $refs => {
    Vue.Native.callUIFunction($refs, 'requestFocus');
  },

  /**
   * 清空上一次记忆焦点
   * $refs：this.$refs.view ul的$refs对象
   * */
  clearFocusMemory: $refs => {
    Vue.Native.callUIFunction($refs, 'clearFocusMemory');
  },

  /**
   * 预设焦点：适用于ul列表
   * $refs：this.$refs.view ul的$refs对象
   * index：第几个子标签
   * */
  setSelectChildPosition: ($refs, index) => {
    Vue.Native.callUIFunction($refs, 'setSelectChildPosition', [index]);
  },

  /**
   * 获取设备信息
   * getDeviceInfo().then(res => {})
   * */
  getDeviceInfo: () => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'executeWithPromise', { action: '__AC_GET_DEVICE_INFO__' });
  },

  /**
   * 系统TOAST提示（各品牌电视的提示样式不同，介意的可自己做）
   * msg：提示文字
   * long: 显示时间长短，true为7秒，false为4秒，默认false
   * */
  TOAST: (msg, long) => {
    long = long || false
    Vue.Native.callNative('MiniModule', 'execute', { action: '__AC_TOAST__', text: msg, long });
  },

  /**
   * 打开新页面
   * url：页面路径
   * query：页面参数
   * clearTask：是否关闭其他页面，可用于返回首页
   * background: 新页面背景色例如 #000000
   * */
  newTab: (url, query, background, clearTask) => {
    clearTask = clearTask || false;
    background = background || '#000000'
    Vue.Native.callNative('MiniModule', 'execute', {action: '__AC_NEW_TAB__', data: JSON.stringify({ url, query }), background: background, clearTask: clearTask});
  },

  /**
   * 打开新页面
   * url：页面路径
   * query：页面参数
   * max：最多数量
   * background: 新页面背景色例如 #000000
   * */
  newTabMax: (url, query, num, background) => {
    background = background || '#000000'
    Vue.Native.callNative('MiniModule', 'execute', {action: '__AC_NEW_TAB__', data: JSON.stringify({ url, query }), background: background, flag: url, max: num});
  },

  /**
   * 打开新扩展屏小程序
   * packageName：包名
   * params：启动参数
   * background: 新页面背景色例如 #000000
   * splashAd: 是否显示广告 默认为true显示广告
   * */
  newApp: (packageName, params, background, splashAd) => {
    background = background || '#000000'
    splashAd = splashAd || true
    Vue.Native.callNative('MiniModule', 'execute', { action: '__AC_NEW_TAB__', data: params, background, espkg: packageName, splashAd });
  },

  /**
   * 打开第三方APP
   * cmd：第三方APP包名，跳转参数等
   * */
  newThirdApp: (cmd) => {
    Vue.Native.callNative('MiniModule', 'execute', { action:'__AC_APP__', cmd: cmd})
  },

  /**
   * 关闭当前页面
   * */
  closePage: () => {
    Vue.Native.callNative('MiniModule', 'execute', {action: '__AC_FINISH__'});
  },

  /**
   * 调起支付：用于单应用集成第三方支付sdk
   * */
  pay: data => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'pay', data);
  },

  /**
   * 埋点
   * name: 事件名称
   * data: 事件参数
   * */
  eventTack: (name, data) => {
    Vue.Native.callNative('MiniModule', 'eventTack', { name, data });
  },

  /**
   * 向投屏手机端发消息
   * action: 消息名
   * data: 消息参数
   * */
  sendToMobile: (action, data) => {
    let params = data || {};
    params.action = action;
    Vue.Native.callNative('MiniModule', 'execute', params);
  },

  /**
   * 获取当前音量
   * getVolume().then(res => {})
   * */
  getVolume: () => {
    return Vue.Native.callNativeWithPromise('UtilsModule', 'getVolume');
  },

  /**
   * 获取最大音量
   * getMaxVolume().then(res => {})
   * */
  getMaxVolume: () => {
    return Vue.Native.callNativeWithPromise('UtilsModule', 'getMaxVolume');
  },

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
  adjustVolume: (volume, shouUI) => {
    Vue.Native.callNative('UtilsModule', 'adjustVolume', volume, shouUI);
  },

  /**
   * 设置音量
   * volume: 音量值
   * shouUI：是否显示音量UI(默认false)
   * */
  setVolume: (volume, shouUI) => {
    shouUI = shouUI || false
    Vue.Native.callNative('UtilsModule', 'setVolume', volume, shouUI);
  },


  /**
   * 智能音箱--是否支持智能音箱
   * isSupportSpeaker().then(res => { console.log(res.support) })
   * */
  isSupportSpeaker: () => {
    return Vue.Native.callNativeWithPromise('SpeakerModule', 'isSupportSpeaker')
  },

  /**
   * 智能音箱--发现音箱开关设置
   * data: 是否开启
   * */
  enableDiscoverSpeaker: (data) => {
    Vue.Native.callNative('SpeakerModule', 'enableDiscoverSpeaker', data);
  },

  /**
   * 智能音箱--获取绑定音箱列表
   * getBindSpeakers().then(res => {})
   * */
  getBindSpeakers: () => {
    return Vue.Native.callNativeWithPromise('SpeakerModule', 'getBindSpeakers', {})
  },

  /**
   * 智能音箱--获取绑定码
   * getBindCode().then(res => {})
   * */
  getBindCode: () => {
    return Vue.Native.callNativeWithPromise('SpeakerModule', 'getBindCode', {})
  },

  /**
   * 智能音箱--发现音箱
   * discoverSpeakers().then(res => {})
   * */
  discoverSpeakers: () => {
    return Vue.Native.callNativeWithPromise('SpeakerModule', 'discoverSpeakers', {})
  },

  /**
   * 智能音箱--获取发现音箱开关状态
   * canDiscoverSpeaker().then(res => {})
   * */
  canDiscoverSpeaker: () => {
    return Vue.Native.callNativeWithPromise('SpeakerModule', 'canDiscoverSpeaker')
  },

  /**
   * 通过sdk与app通信
   * eventName: 事件名称（与app端约定）
   * eventParams: 事件参数（与app端约定）
   * nativeEventWithPromise(name, data).then(res => {})
   * */
  nativeEventWithPromise: (eventName, eventParams) => {
    return Vue.Native.callNativeWithPromise('NativeEventModule', 'executeWithPromise', { eventId: eventName, data: eventParams });
  },

  /**
   * 通过sdk与app通信
   * eventName: 事件名称（与app端约定）
   * eventParams: 事件参数（与app端约定）
   * */
  nativeEvent: (eventName, eventParams) => {
    return Vue.Native.callNative('NativeEventModule', 'execute', { eventId: eventName, data: eventParams });
  },

  /**
   * 添加闹钟
   * data: 闹钟参数
   * */
  addClock: (data) => {
    Vue.Native.callNative('NativeEventModule', 'execute', {eventId: 'addAlarm', data});
  },

  /**
   * 删除闹钟
   * data: 闹钟参数
   * */
  delClock: (data) => {
    Vue.Native.callNative('NativeEventModule', 'execute', {eventId: 'delAlarm', data});
  },
  
  /**
   * 获取元素宽高和坐标
   * $refs：this.$refs.view
   * callback：回调
   * */
  getLocationOnScreen: ($refs, callback) => {
    Vue.Native.callUIFunction($refs, 'getLocationOnScreen', {}, callback)
  },

  /**
   * 放大
   * $refs：this.$refs.view ul的$refs对象
   * x：放大倍数
   * y：放大倍数
   * duration：动画时间，不传无动画
   * */
  setScale: ($refs, x, y, duration) => {
    Vue.Native.callUIFunction($refs, 'setScale', [x, y, duration]);
  },

  /**
   * 获取app列表
   * getAppList().then(res => {})
   * */
  getAppList: () => {
    return Vue.Native.callNativeWithPromise('NativeAppModule', 'getAppList');
  },

  /**
   * 打开应用
   * pkg：包名
   * */
  startAppWithPackage: (pkg) => {
    Vue.Native.callNative('NativeAppModule', 'startAppWithPackage', pkg);
  },

  /**
   * 打开应用CMD
   * cmd：数组
   * */
  startAppWithCmd: (cmd) => {
    Vue.Native.callNative('NativeAppModule', 'startAppWithCmd', 'start', cmd);
  },

  /**
   * 获取自启动的应用列表
   * getAutoStartAppList().then(res => {})
   * */
  getAutoStartAppList: () => {
    return Vue.Native.callNativeWithPromise('NativeAppModule', 'getAutoStartAppList');
  },

  /**
   * 修改应用的自启开关
   * pkg：包名
   * open: 是否自启
   * setAutoStartAppSwitch(pkg, true).then(res => {})
   * */
  setAutoStartAppSwitch: (pkg, open) => {
    return Vue.Native.callNativeWithPromise('NativeAppModule', 'setAutoStartAppSwitch', pkg, open);
  },

  /**
   * 是否安装应用
   * pkg：包名
   * isAppInstalled().then(res => {})
   * */
  isAppInstalled: (pkg) => {
    return Vue.Native.callNativeWithPromise('NativeAppModule', 'isAppInstalled', pkg);
  },

  /**
   * 下载文件
   * name：文件名称
   * url：下载路径
   * md5：文件md5
   * downloadFile().then(res => {})
   * */
  downloadFile: (name, url, md5) => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'download', {
      url,
      name,
      md5
    },);
  },

  /**
   * 安装应用
   * path：下载路径
   * */
  installApp: (path) => {
    Vue.Native.callNative('NativeAppModule', 'installApp', path);
  },

  /**
   * 卸载应用
   * pkg：包名
   * */
  uninstallApp: (pkg) => {
    Vue.Native.callNative('NativeAppModule', 'uninstallApp', pkg);
  },

  /**
   * 连接数据库
   * tables：创建表的sql(Array) 例如：[ 'CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, address TEXT);' ]
   * callback: 回调函数
   * version: 版本号-用于数据库升级(int)
   * updates：升级语句(Array) 例如：[{ __version:2, __sqls:['CREATE TABLE IF NOT EXISTS test2 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, address TEXT)'] }, { __version:3, __sqls:['ALTER TABLE test2 ADD COLUMN card TEXT'
] }]
   * */
  connectSqlite: (tables, callback, version, updates) => {
    Vue.Native.callNative('SqliteModule', 'connect', { __version: version, __tables: tables, __updates: updates }, callback)
  },

  /**
   * 数据库-查询
   * sql：查询的sql 例如："SELECT * FROM test ORDER BY age LIMIT 4"
   * callback: 回调函数
   * */
  selectSqlite: (sql, callback) => {
    Vue.Native.callNative('SqliteModule', 'query', { __sqls: [sql] }, res => {
      callback(res.data[0])
    },)
  },

  /**
   * 数据库-增删改
   * sql：增删改的sql(Array)
   * 增：[ "INSERT INTO test (name,age,address) VALUES ('张三',10,'北京')", "INSERT INTO test (name,age,address) VALUES ('李四',30,'上海')" ]
   * 删：[ "DELETE FROM test WHERE id=2"]
   * 改：[ "UPDATE test SET age=15, address='北京海淀' WHERE id=1"]
   * callback: 回调函数
   * */
  writeSqlite: (sql, callback) => {
    Vue.Native.callNative('SqliteModule', 'execute', { __sqls: sql }, callback)
  },


  /**
   * 启动文件传输服务
   * startTransferServer().then(res => {}) {ip,port}
   * */
  startTransferServer: () => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'startTransferServer');
  },

  /**
   * 关闭文件传输服务
   * */
  stopTransferServer: () => {
    Vue.Native.callNative('MiniModule', 'stopTransferServer');
  },

  /**
   * 获取文件传输文件列表
   * getTransferFiles().then(res => {}) {name,url,size,modify_time}
   * */
  getTransferFiles: () => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'getTransferFiles');
  },

  /**
   * 获取空间大小
   * getDiskSize().then(res => {}) {total,available}
   * */
  getDiskSize: () => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'getDiskSize');
  },

  /**
   * 删除文件
   * uri：文件路径
   * */
  deleteFile: (uri) => {
    Vue.Native.callNative('MiniModule', 'deleteFile', uri);
  },

  /**
   * 获取空间大小
   * uri：文件路径
   * isFileExists(uri).then(res => {}) {total,available}
   * */
  isFileExists: (uri) => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'isFileExists', uri);
  },

  /**
   * 扫描文件
   * path: 目录
   * triggerSize：每次返回的条数
   * rules: {
   * type: 文件类型,
   * width: 宽（以上）,
   * height: 高（以上）,
   * size: 大小（字节）,
   * showHidden: 是否显示隐藏文件，默认false
   * }
   * */
  scanFile: (path, triggerSize, rules) => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'scanFile', {path, triggerSize, rules});
  },

  /**
   * 扫描图片
   * path: 目录
   * triggerSize：每次返回的条数
   * */
  scanImageFile: (path, triggerSize) => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'scanFile', {
      path,
      triggerSize,
      rules: {
        type: 'image/*',
        width: 1000,
        height: 500,
      },
    },);
  },

  /**
   * 网络是否正常
   * */
  isNetworkAvailable: () => {
    return Vue.Native.callNativeWithPromise('MiniModule', 'isNetworkAvailable');
  },

  /**
   * 重新加载线上包
   * */
  reload: () => {
    Vue.Native.callNative('MiniModule', 'reload');
  },

};
