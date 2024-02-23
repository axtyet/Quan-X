const main = require("./scripts/main");
const siri = require("./scripts/siri");
const widget = require("./scripts/widget");
const utils = require("./scripts/utils");
const database = require("./scripts/database");

utils.window.theme = $cache.get("theme");
$app.env === $env.today ? widget.init() : $app.env === $env.siri ? siri.init() : $app.env === $env.app ? main.init() : $app.openURL("jsbox://run?name=" + encodeURI($addin.current.name));

$app.listen({
  ready: () => {
    if ($app.env !== $env.app) return false;
    let initialOrientation = utils.statusBarOrientation();
    let initialization = true;
    $timer.schedule({
      interval: 0.01,
      handler: () => {
        const orientation = utils.statusBarOrientation();
        if (initialization || initialOrientation !== orientation) {
          initialization = false;
          initialOrientation = orientation;
          $app.notify({
            name: "interfaceOrientation",
            object: orientation
          });
        }
      }
    });
  },
  exit: () => {
    utils.window.theme = $app.theme;
    if ($cache.get("switch.database.backup")) database.backup()
  }
});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
