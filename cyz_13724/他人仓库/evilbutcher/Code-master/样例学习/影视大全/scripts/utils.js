const spinner = require("./spinner");

const window = $objc("UIApplication").$sharedApplication().invoke("delegate.window").jsValue();

const systemColor = name => $objc("UIColor").invoke(`system${name.charAt(0).toUpperCase() + name.slice(1)}Color`).jsValue();

const deviceOrientation = $objc("UIDevice").invoke("currentDevice.orientation");

const statusBarOrientation = () => $objc("UIApplication").invoke("sharedApplication.statusBarOrientation");

const shadows = (view, {
  color = systemColor("gray"),
  cornerRadius = 0,
  offset = $size(0, 0),
  radius = 3,
  opacity = 0.5
} = {}) => {
  const layer = view.runtimeValue().invoke("layer");
  layer.invoke("setShadowColor", color.runtimeValue().invoke("CGColor"));
  layer.invoke("setCornerRadius", cornerRadius);
  layer.invoke("setShadowOffset", offset);
  layer.invoke("setShadowRadius", radius);
  layer.invoke("setShadowOpacity", opacity);
};

const tapped = handler => {
  const range = $device.info.screen.height > $device.info.screen.width ? $device.info.screen.height / 10 : $device.info.screen.width / 10;
  return {
    touchesBegan: (sender, location) => $ui.animate({
      duration: 0.25,
      animation: () => sender.alpha = 0.5
    }),
    touchesMoved: (sender, location) => $ui.animate({
      duration: 0.25,
      animation: () => sender.alpha = location.x > sender.frame.width + range || location.x < -range || location.y > sender.frame.height + range || location.y < -range ? 1 : 0.5
    }),
    touchesEnded: (sender, location) => {
      location.x > sender.frame.width + range || location.x < -range || location.y > sender.frame.height + range || location.y < -range ? null : handler();
      $ui.animate({
        duration: 0.25,
        animation: () => sender.alpha = 1
      });
    }
  };
};

const setPicSize = container => {
  const _width = container.frame.width;
  const _size = {
    width: parseInt((_width - (_width > 1200 ? 160 : _width > 1100 ? 144 : _width > 850 ? 128 : _width > 800 ? 112 : _width > 650 ? 96 : _width > 500 ? 80 : _width > 350 ? 64 : 48)) / (_width > 1200 ? 9 : _width > 1100 ? 8 : _width > 850 ? 7 : _width > 800 ? 6 : _width > 650 ? 5 : _width > 500 ? 4 : _width > 350 ? 3 : 2)),
    height: parseInt((_width - (_width > 1200 ? 160 : _width > 1100 ? 144 : _width > 850 ? 128 : _width > 800 ? 112 : _width > 650 ? 96 : _width > 500 ? 80 : _width > 350 ? 64 : 48)) / (_width > 1200 ? 9 : _width > 1100 ? 8 : _width > 850 ? 7 : _width > 800 ? 6 : _width > 650 ? 5 : _width > 500 ? 4 : _width > 350 ? 3 : 2) * 1.33333333) + 44
  };
  return $size(_size.width, _size.height);
};

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

const showConfetti = () => window.add({
  type: "lottie",
  props: {
    src: "assets/lottie/confetti.json",
    contentMode: 0,
    userInteractionEnabled: false
  },
  layout: (make, view) => {
    make.width.equalTo(window.frame.width < window.frame.height ? window.frame.width : window.frame.height);
    make.height.equalTo(view.super);
    make.center.equalTo(view.super);
  },
  events: {
    ready: sender => sender.play({
      handler: finished => {
        if (finished) sender.remove();
      }
    })
  }
});

const lottieAlert = (object, {
  fromFrame = 0,
  toFrame = object.op,
  loop = false
} = {}) => {
  object = JSON.parse($file.read("/assets/lottie/" + object + ".json").string);
  const id = "lottie.alert.view";
  const timestamp = new Date().valueOf();
  if ($(id)) $(id).remove();
  window.add({
    type: "view",
    props: {
      id, info: timestamp,
      bgcolor: $color($rgba(0, 0, 0, 0.25), $rgba(0, 0, 0, 0.4)),
      alpha: 0
    },
    layout: $layout.fill,
    views: [
      {
        type: "blur",
        props: {
          style: 8,
          cornerRadius: 16,
          smoothCorners: true
        },
        layout: (make, view) => {
          make.size.equalTo($size(130, 130));
          make.center.equalTo(view.super);
        },
        views: [
          {
            type: "lottie",
            props: {
              json: object, loop,
              contentMode: 1
            },
            layout: $layout.fill
          }
        ]
      }
    ]
  });
  if ($(id)) $ui.animate({
    duration: 0.25,
    animation: () => $(id).alpha = 1,
    completion: () => {
      if ($(id).info !== timestamp) return;
      $("lottie").play({
        fromFrame, toFrame,
        handler: finished => {
          if (finished) $ui.animate({
            duration: 0.25,
            animation: () => $(id).alpha = 0,
            completion: () => $(id).remove()
          });
        }
      });
    }
  });
};

const spinAnimate = {
  id: [
    "navbar.playHist.button",
    "navbar.playHist.button.spinner",
    "navbar.playHist.button.image"
  ],
  play() {
    $(this.id[0]).userInteractionEnabled = false;
    if ($(this.id[1])) $(this.id[1]).remove();
    $(this.id[0]).add(spinner.init({
      id: this.id[1],
      diameter: $(this.id[2]).frame.width - 1.2,
      color: $color("systemLabel"),
      layout: (make, view) => {
        make.size.equalTo($(this.id[2]).frame.width - 1.5);
        make.right.inset(-0.7);
        make.centerY.equalTo(view.super)
      },
      events: {
        ready: sender => {
          $(this.id[2]).hidden = true;
          sender.play();
        }
      }
    }));
  },
  stop() {
    if ($(this.id[1])) $(this.id[1]).remove();
    $(this.id[2]).hidden = false;
    $(this.id[0]).userInteractionEnabled = true;
  }
};

const application = (name, schemeUrl) => {
  return {
    title: name,
    symbol: "play.fill",
    handler: async (sender, index, data) => {
      const open = $app.openURL(schemeUrl + data.url);
      await $wait(0.3);
      if (!open) {
        $ui.error("\u65e0\u6cd5\u6253\u5f00 " + name);
        $device.taptic(1);
        await $wait(0.15);
        $device.taptic(1);
      }
    }
  }
};

class Spinner {
  constructor({
    id = "system.spinner.view",
    text = "\u8bf7\u7a0d\u7b49",
    view = window
  } = {}) {
    this.id = id;
    this.text = text;
    this.view = view;
    this.size = sizeThatFits(this.text, {
      font: $font("bold", 17),
      size: {
        width: this.view.frame.width - 112,
        height: this.view.frame.width - 112
      }
    });
    this.spinner = {
      type: "spinner",
      props: {
        style: 0,
        loading: true,
        color: $color("systemLabel")
      },
      layout: (make, view) => {
        make.top.equalTo(view.super);
        make.centerX.equalTo(view.super);
      }
    };
    this.label = {
      type: "label",
      props: {
        text: this.text,
        align: $align.center,
        textColor: $color("systemLabel"),
        font: $font("bold", 17)
      },
      layout: (make, view) => {
        make.bottom.equalTo(view.super);
        make.centerX.equalTo(view.super);
      }
    };
    this.views = {
      type: "view",
      props: {
        id: this.id,
        bgcolor: $color($rgba(0, 0, 0, 0.25), $rgba(0, 0, 0, 0.4)),
        alpha: 0
      },
      layout: $layout.fill,
      views: [{
        type: "blur",
        props: {
          style: 8,
          cornerRadius: 15,
          smoothCorners: true
        },
        layout: (make, view) => {
          make.width.equalTo(this.size.width + 48 < 130 ? 130 : this.size.width + 48);
          make.height.equalTo(view.width);
          make.center.equalTo(view.super);
        },
        views: [{
          type: "view",
          layout: (make, view) => {
            make.width.equalTo(view.super);
            make.height.equalTo(68);
            make.center.equalTo(view.super);
          },
          views: [this.spinner, this.label]
        }]
      }]
    };
  }
  start() {
    if ($(this.id)) $(this.id).remove();
    this.view.add(this.views);
    if ($(this.id)) $ui.animate({
      duration: 0.25,
      animation: () => $(this.id).alpha = 1
    });
  }
  async stop(delay) {
    if (delay) await $wait(delay);
    if ($(this.id)) $ui.animate({
      duration: 0.25,
      animation: () => $(this.id).alpha = 0,
      completion: () => {
        if ($(this.id)) $(this.id).remove();
      }
    });
  }
};

const getNowDate =() => {
  const date = new Date();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) month = "0" + month;
  if (strDate >= 0 && strDate <= 9) strDate = "0" + strDate;
  return date.getFullYear() + "-" + month + "-" + strDate + " " + date.toTimeString().substring(0, 8);
};

module.exports = {
  window,
  systemColor,
  deviceOrientation,
  statusBarOrientation,
  shadows,
  tapped,
  setPicSize,
  sizeThatFits,
  showConfetti,
  lottieAlert,
  spinAnimate,
  application,
  getNowDate,
  Spinner
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
