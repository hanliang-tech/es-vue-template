let cachedApp;

function setApp(app) {
  cachedApp = app;
}

function getApp() {
  return cachedApp;
}

// 监听按键key值
const keyDown = {
  up: 19,
  down: 20,
  left: 21,
  right: 22,
  ok: 23,
  menu: 82,
}


export {
  setApp,
  getApp,
  keyDown
};
