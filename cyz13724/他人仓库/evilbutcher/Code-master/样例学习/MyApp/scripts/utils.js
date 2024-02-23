/*-- 获取App最顶层Window对象 --*/
const window = $objc("UIApplication").$sharedApplication().invoke("delegate.window").jsValue();

/*-- 获取系统Adaptable颜色 --*/
const systemColor = name => $objc("UIColor").invoke(`system${name.charAt(0).toUpperCase() + name.slice(1)}Color`).jsValue();

/*-- 获取设备方向 (返回上下左右、正面和背面) --*/
const deviceOrientation = $objc("UIDevice").invoke("currentDevice.orientation");

/*-- 获取状态栏方向 (返回上下左右) --*/
const statusBarOrientation = () => $objc("UIApplication").invoke("sharedApplication.statusBarOrientation");

/*-- 获取字体占用空间大小的 --*/
const sizeThatFits = (text, {
  font = $font(17), lineSpacing,
  size = $ui.vc.view.frame
} = {}) => {
  return $text.sizeThatFits({
    text, font, lineSpacing,
    width: size.width,
    height: size.height
  });
};


module.exports = {
  window,
  systemColor,
  deviceOrientation,
  statusBarOrientation,
  sizeThatFits
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
