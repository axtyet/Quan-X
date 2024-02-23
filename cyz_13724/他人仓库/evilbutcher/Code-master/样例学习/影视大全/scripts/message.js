const app = require("./app");
const utils = require("./utils");
const spinner = require("./spinner");
const navigationBar = require("./navigationBar");

exports.init = () => {
  const id = [
    "message.page.window",
    "message.page.navigationBar.view",
    "message.username.input",
    "message.content.input",
    "code.input",
    "code.view",
    "message.submit.button"
  ];

  const accessoryView = id => {
    return {
      type: "view",
      props: {
        height: 44,
        bgcolor: $color("clear")
      },
      views: [{
        type: "button",
        props: {
          cornerRadius: 6,
          smoothCorners: true,
          bgcolor: $color("clear")
        },
        layout: (make, view) => {
          make.size.equalTo($size(44, 32));
          make.right.inset(10);
          make.centerY.equalTo(view.super);
        },
        events: {
          tapped: sender => $(id).blur()
        },
        views: [{
          type: "blur",
          props: {
            style: 6,
            userInteractionEnabled: false
          },
          layout: $layout.fill
        },
        {
          type: "image",
          props: {
            symbol: "keyboard.chevron.compact.down",
            contentMode: 1,
            userInteractionEnabled: false,
            tintColor: $color("systemLabel")
          },
          layout: (make, view) => {
            make.size.equalTo($size(28, 28));
            make.centerX.equalTo(view.super);
            make.centerY.equalTo(view.super).offset(-1.6);
          }
        }]
      }]
    };
  };

  const getVerifyCode = async () => {
    if ($(id[5]).get("code")) $(id[5]).get("code").remove();
    const download = await $http.download({
      url: "https://www.okzy10.com/inc/common/code.php?a=gbook&s=" + Math.random(),
      showsProgress: false,
      backgroundFetch: true
    });
    if ($(id[5])) $(id[5]).add({
      type: "image",
      props: {
        id: "code",
        data: download.data,
        contentMode: 0,
        userInteractionEnabled: false
      },
      layout: $layout.fill
    });
  };

  const changeState = sender => {
    const reg = /(^\s*)|(\s*$)/g;
    const inputValue = [
      $(id[2]).text.replace(reg, ""),
      $(id[3]).text.replace(reg, ""),
      $(id[4]).text.replace(reg, "")
    ];
    const isNull = [
      !sender.text.replace(reg, ""),
      !inputValue[0] || !inputValue[1] || !inputValue[2]
    ];
    sender.super.bgcolor = isNull[0] ? $rgba(255, 59, 48, 0.6) : $color("systemSeparator");
    $(id[6]).userInteractionEnabled = isNull[1] ? false : true;
    $(id[6]).titleColor = $color(isNull[1] ? "gray" : "white");
    $(id[6]).bgcolor = $color(isNull[1] ? "systemFill" : "systemLink");
  };

  const scale = $device.info.screen.scale;

  $ui.push({
    props: {
      id: id[0],
      statusBarStyle: 0,
      navBarHidden: true
    },
    events: {
      disappeared: () => app.updateInterfaceOrientation()
    },
    views: [navigationBar.view({
      style: 1,
      title: "\u7559\u8a00",
      pageName: "message.page",
      subviews: [{
        type: "button",
        props: {
          circular: true,
          bgcolor: $color("clear")
        },
        layout: (make, view) => {
          make.size.equalTo($size(26, 26));
          make.right.equalTo($ui.window.safeAreaRight).inset(16);
          make.centerY.equalTo(view.super);
        },
        events: {
          tapped: sender => $safari.open("https://www.okzy10.com/index.php?m=gbook-show.html")
        },
        views: [{
          type: "image",
          props: {
            symbol: "safari",
            contentMode: 1,
            tintColor: $color("systemLabel")
          },
          layout: (make, view) => {
            make.size.equalTo(view.super);
            make.right.inset(-1.2);
            make.centerY.equalTo(view.super).offset(-0.5);
          }
        }]
      }]
    }),
    {
      type: "view",
      props: {
        cornerRadius: 6,
        smoothCorners: true,
        bgcolor: $color("systemSeparator")
      },
      layout: (make, view) => {
        make.height.equalTo(36);
        make.top.equalTo($(id[1]).bottom).inset(16);
        make.left.equalTo($ui.window.safeAreaLeft).inset(16);
        make.right.equalTo($ui.window.safeAreaRight).inset(16);
      },
      views: [{
        type: "input",
        props: {
          id: id[2],
          placeholder: "\u6635\u79f0",
          font: $font(16),
          accessoryView: accessoryView(id[2]),
          cornerRadius: 6 - (1 / scale),
          smoothCorners: true,
          placeholderColor: $color("systemPlaceholderText"),
          tintColor: $color("systemLabel"),
          bgcolor: $color("systemSecondaryBackground")
        },
        layout: (make, view) => make.edges.inset(2 / scale),
        events: {
          changed: sender => changeState(sender),
          didEndEditing: sender => changeState(sender)
        }
      }]
    },
    {
      type: "view",
      props: {
        cornerRadius: 6,
        smoothCorners: true,
        bgcolor: $color("systemSeparator")
      },
      layout: (make, view) => {
        make.height.equalTo(view.super).multipliedBy(0.3);
        make.top.equalTo(view.prev.bottom).inset(16);
        make.left.equalTo($ui.window.safeAreaLeft).inset(16);
        make.right.equalTo($ui.window.safeAreaRight).inset(16);
      },
      views: [{
        type: "text",
        props: {
          id: id[3],
          placeholder: "\u5185\u5bb9（\u4f8b\u5982：\u5468\u661f\u9a70《\u529f\u592b》2004）",
          font: $font(16),
          accessoryView: accessoryView(id[3]),
          cornerRadius: 6 - (1 / scale),
          smoothCorners: true,
          placeholderColor: $color("systemPlaceholderText"),
          textColor: $color("systemLabel"),
          tintColor: $color("systemLabel"),
          bgcolor: $color("systemSecondaryBackground")
        },
        layout: (make, view) => make.edges.inset(2 / scale),
        events: {
          changed: sender => changeState(sender),
          didEndEditing: sender => changeState(sender)
        }
      }]
    },
    {
      type: "view",
      layout: (make, view) => {
        make.height.equalTo(36);
        make.top.equalTo(view.prev.bottom).inset(20);
        make.left.equalTo($ui.window.safeAreaLeft).inset(16);
        make.right.equalTo($ui.window.safeAreaRight).inset(16);
      },
      views: [{
        type: "view",
        props: {
          cornerRadius: 6,
          smoothCorners: true,
          bgcolor: $color("systemSeparator")
        },
        layout: (make, view) => {
          make.width.equalTo(128);
          make.height.equalTo(view.super);
          make.top.left.inset(0);
        },
        views: [{
          type: "input",
          props: {
            id: id[4],
            type: $kbType.number,
            placeholder: "\u9a8c\u8bc1\u7801",
            font: $font(16),
            accessoryView: accessoryView(id[4]),
            cornerRadius: 6 - (1 / scale),
            smoothCorners: true,
            tintColor: $color("systemLabel"),
            bgcolor: $color("systemSecondaryBackground")
          },
          layout: (make, view) => make.edges.inset(2 / scale),
          events: {
            changed: sender => changeState(sender),
            didEndEditing: sender => changeState(sender)
          }
        }]
      },
      {
        type: "view",
        props: {
          id: id[5],
          cornerRadius: 6,
          smoothCorners: true,
          borderWidth: 2 / scale,
          borderColor: $color("systemSeparator"),
          bgcolor: $color("black")
        },
        layout: (make, view) => {
          make.width.equalTo(90);
          make.height.equalTo(view.super);
          make.top.equalTo(view.super);
          make.left.equalTo(view.prev.right).inset(10);
        },
        events: {
          ready: async sender => await getVerifyCode(),
          tapped: async sender => await getVerifyCode(),
          themeChanged: (sender, isDarkMode) => sender.borderColor = $color("systemSeparator")
        },
        views: [spinner.init({diameter: 20})]
      },
      {
        type: "button",
        props: {
          id: id[6],
          title: "\u63d0\u4ea4",
          font: $font("bold", 17),
          cornerRadius: 6,
          smoothCorners: true,
          userInteractionEnabled: false,
          titleColor: $color("gray"),
          bgcolor: $color("systemFill")
        },
        layout: (make, view) => {
          make.width.equalTo(72);
          make.height.equalTo(view.super);
          make.top.right.inset(0);
        },
        events: {
          tapped: sender => {
            const spinner = new utils.Spinner();
            $(id[2]).blur();
            $(id[3]).blur();
            $(id[4]).blur();
            spinner.start();
            $http.request({
              method: "POST",
              url: "https://www.okzy10.com/index.php?m=gbook-save",
              header: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "https://www.okzy10.com",
                "Referer": "https://www.okzy10.com/index.php?m=gbook-show.html",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/13.0 Safari/604.1"
              },
              body: {
                g_rid: "",
                g_name: $(id[2]).text,
                g_code: $(id[4]).text,
                g_content: $(id[3]).text
              },
              timeout: 10,
              handler: async resp => {
                const data = resp.data;
                const message = data ? data.match(/[\u4e00-\u9fa5]/g).join("") : "\u53d1\u9001\u5931\u8d25，\u8bf7\u7a0d\u540e\u91cd\u8bd5！";
                spinner.stop();
                $ui.alert(message);
                $(id[3]).text = "";
                $(id[4]).text = "";
                await getVerifyCode();
              }
            });
          }
        }
      }]
    }]
  });
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
