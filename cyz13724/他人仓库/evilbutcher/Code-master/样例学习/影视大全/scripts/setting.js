const utils = require("./utils");
const spinner = require("./spinner");
const message = require("./message");
const database = require("./database");
const playHistory = require("./playHistory");
const navigationBar = require("./navigationBar");

exports.init = () => {
  const id = [
    "setting.page.list",
    "setting.page.header.view",
    "setting.page.theme.list"
  ];

  let offsetY = 0, _height = 100;

  const config = JSON.parse($file.read("config.json").string);

  const data = ({ groups }) => groups.map(item => {
    return {
      title: item.title,
      rows: item.items.map(parameters => {
        const { type, key, on, value, title, symbol, text, titleColor, iconColor, handler, async } = parameters;

        if (type === "switch" && $cache.get(key) === undefined) $cache.set(key, on);
        if (type === "check" && on && $cache.get(key) === undefined) $cache.set(key, value);

        const types = {
          switch: {
            type: "switch",
            props: {
              on: $cache.get(key),
              onColor: utils.systemColor("green")
            },
            layout: (make, view) => {
              make.right.inset(20);
              make.centerY.equalTo(view.super);
            },
            events: {
              changed: sender => $cache.set(key, sender.on)
            }
          },
          arrow: {
            type: "image",
            props: {
              id: "arrowmark",
              contentMode: 1,
              symbol: "chevron.right",
              tintColor: $color("systemGray2")
            },
            layout: (make, view) => {
              make.height.equalTo(17);
              make.right.inset(20);
              make.centerY.equalTo(view.super);
            }
          },
          check: {
            type: "image",
            props: {
              id: "checkmark",
              info: value,
              contentMode: 1,
              symbol: "checkmark",
              tintColor: utils.systemColor("blue")
            },
            layout: (make, view) => {
              make.height.equalTo(20);
              make.right.inset(20);
              make.centerY.equalTo(view.super);
            },
            events: {
              ready: sender => sender.hidden = sender.info !== $cache.get(key)
            }
          },
          text: {
            type: "label",
            props: {
              text: text,
              font: $font(16),
              align: $align.right,
              textColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => {
              make.right.inset(20);
              make.centerY.equalTo(view.super);
            }
          }
        };

        const handlerAsync = async sender => {
          const id = "setting.item.async.spinner";
          const marks = {
            arrow: sender.get("arrowmark"),
            check: sender.get("checkmark")
          };
          sender.userInteractionEnabled = false;
          if ($(id)) $(id).remove();
          sender.add(spinner.init({
            id: id,
            diameter: 17,
            color: $color("systemGray2"),
            layout: (make, view) => {
              make.size.equalTo($size(17, 17));
              make.center.equalTo(marks[type]);
            },
            events: {
              ready: spinner => {
                marks[type].hidden = true;
                spinner.play();
              }
            }
          }));
          await $wait(0.4);
          await handler(value);
          $(id).remove();
          marks[type].hidden = false;
          sender.userInteractionEnabled = true;
        };

        return {
          type: "view",
          props: {
            selectable: type === "arrow" || type === "check"
          },
          layout: $layout.fill,
          events: {
            touchesEnded: sender => {
              if (typeof handler !== "function") return;
              if (type === "arrow") async ? handlerAsync(sender) : handler();
              if (type === "check") {
                sender.super.super.super.views.forEach(item => item.get("checkmark").hidden =  item.get("checkmark").info !== value);
                $cache.set(key, value);
                async ? handlerAsync(sender) : handler(value);
              }
            }
          },
          views: [types[type], {
            type: "view",
            props: {
              cornerRadius: 31 * 0.222,
              smoothCorners: true,
              bgcolor: iconColor,
              hidden: !symbol
            },
            layout: (make, view) => {
              make.size.equalTo($size(symbol ? 31 : 0, 31));
              make.left.inset(20);
              make.centerY.equalTo(view.super);
            },
            views: [{
              type: "image",
              props: {
                contentMode: 1,
                symbol: symbol,
                tintColor: $color("white")
              },
              layout: (make, view) => {
                make.size.equalTo($size(20, 20));
                make.center.equalTo(view.super);
              }
            }]
          },
          {
            type: "label",
            props: {
              text: title,
              textColor: titleColor
            },
            layout: (make, view) => {
              make.left.equalTo(view.prev.right).inset(symbol ? 15 : 0);
              make.centerY.equalTo(view.super);
            }
          }]
        };
      })
    };
  });

  const playbackRateList = () => {
    $ui.push({
      props: {
        statusBarStyle: 0,
        navBarHidden: true,
        bgcolor: $color("insetGroupedBackground")
      },
      views: [navigationBar.view({
        style: 1,
        title: "\u64ad\u653e\u901f\u5ea6",
        pageName: "playbackRates.page"
      }),
      {
        type: "list",
        layout: $layout.fillSafeArea,
        props: {
          style: 2,
          rowHeight: 45,
          separatorInset: 	$insets(0, 20, 0, 0),
          indicatorInsets: $insets(44, 0, 0, 0),
          separatorColor: $color("systemSeparator"),
          header: {
            type: "view",
            props: {height: 44}
          },
          data: data({
            groups: [{
              title: "\u9ed8\u8ba4\u64ad\u653e\u901f\u5ea6",
              items: [{
                type: "check",
                on: false,
                key: "playbackRate",
                value: 0.5,
                title: "0.5\u500d",
                handler: mode => {}
              },
              {
                type: "check",
                on: true,
                key: "playbackRate",
                value: 1.0,
                title: "1.0\u500d（\u6b63\u5e38）",
                handler: mode => {}
              },
              {
                type: "check",
                on: false,
                key: "playbackRate",
                value: 1.5,
                title: "1.5\u500d",
                handler: mode => {}
              },
              {
                type: "check",
                on: false,
                key: "playbackRate",
                value: 2.0,
                title: "2.0\u500d",
                handler: mode => {}
              }]
            }]
          })
        }
      }]
    });
  };

  const themeList = () => {
    $ui.push({
      props: {
        statusBarStyle: 0,
        navBarHidden: true,
        bgcolor: $color("insetGroupedBackground")
      },
      views: [navigationBar.view({
        style: 1,
        title: "\u754c\u9762\u8bbe\u7f6e",
        pageName: "theme.page"
      }),
      {
        type: "list",
        layout: $layout.fillSafeArea,
        props: {
          id: id[2],
          style: 2,
          rowHeight: 45,
          separatorInset: 	$insets(0, 66, 0, 0),
          indicatorInsets: $insets(44, 0, 0, 0),
          separatorColor: $color("systemSeparator"),
          header: {
            type: "view",
            props: {height: 44}
          },
          data: data({
            groups: [{
              title: "\u5916\u89c2",
              items: [{
                type: "check",
                on: false,
                async: true,
                key: "theme",
                value: "light",
                symbol: "sun.min",
                title: "\u59cb\u7ec8\u6d45\u8272",
                iconColor: $color("teal"),
                handler: mode => utils.window.theme = mode
              },
              {
                type: "check",
                on: false,
                async: true,
                key: "theme",
                value: "dark",
                symbol: "moon.circle",
                title: "\u59cb\u7ec8\u6df1\u8272",
                iconColor: $color("navy"),
                handler: mode => utils.window.theme = mode
              },
              {
                type: "check",
                on: true,
                async: true,
                key: "theme",
                value: "auto",
                symbol: "circle.righthalf.fill",
                title: "\u8ddf\u968f\u7cfb\u7edf",
                iconColor: $color("tintColor"),
                handler: mode => utils.window.theme = mode
              }]
            }]
          })
        }
      }]
    });
  };

  const backupList = () => {
    const list = $file.list("drive://\u5f71\u89c6\u5927\u5168").sort((a, b) => a < b ? 1 : -1);
    $ui.push({
      props: {
        statusBarStyle: 0,
        navBarHidden: true
      },
      views: [navigationBar.view({
        style: 1,
        title: "\u5907\u4efd\u8bb0\u5f55",
        pageName: "dataList.page"
      }),
      {
        type: "list",
        layout: $layout.fillSafeArea,
        props: {
          style: 2,
          separatorInset: 	$insets(0, 55, 0, 0),
          indicatorInsets: $insets(44, 0, 0, 0),
          separatorColor: $color("systemSeparator"),
          header: {
            type: "view",
            props: {height: 44}
          },
          actions: [{
            title: "delete",
            handler: (sender, indexPath) => {
              $file.delete("drive://\u5f71\u89c6\u5927\u5168/" + list[indexPath.item]);
              list.splice(indexPath.item, 1);
              if (!list[0]) sender.data = [];
            }
          }],
          template: {
            views: [{
              type: "image",
              props: {
                contentMode: 1,
                symbol: "doc.fill",
                tintColor: $color("systemLabel")
              },
              layout: (make, view) => {
                make.size.equalTo($size(20, 20));
                make.left.inset(20);
                make.centerY.equalTo(view.super);
              }
            },
            {
              type: "label",
              props: {
                font: $font(17),
                textColor: $color("systemLabel")
              },
              layout: (make, view) => {
                make.left.equalTo(view.prev.right).inset(15);
                make.centerY.equalTo(view.super);
              }
            }]
          },
          data: [{
            title: list[0] ? "\u9009\u62e9\u4e00\u4e2a\u6570\u636e\u8fdb\u884c\u6062\u590d" : "",
            rows: list.map(item => {
              return {
                label: {
                  text: item
                }
              }
            })
          }]
        },
        events: {
          didSelect: (sender, indexPath, data) => database.restore(data.label.text)
        }
      }]
    });
  };

  return [navigationBar.view({
    style: 0,
    title: "\u8bbe\u7f6e",
    pageName: "setting.page",
    largeTitleInset: 20
  }),
  {
    type: "list",
    props: {
      id: id[0],
      style: 2,
      rowHeight: 45,
      separatorInset: 	$insets(0, 66, 0, 0),
      indicatorInsets: $insets(44, 0, 49, 0),
      separatorColor: $color("systemSeparator"),
      header: {
        type: "view",
        props: {
          id: id[1],
          height: 100
        }
      },
      footer: {
        type: "view",
        props: {
          height: 49
        }
      },
      data: data({
        groups: [{
          title: "\u4e2a\u4eba",
          items: [{
            type: "arrow",
            title: "\u89c2\u770b\u5386\u53f2",
            symbol: "clock.fill",
            async: true,
            iconColor: utils.systemColor("indigo"),
            handler: () => playHistory.init("\u89c2\u770b\u5386\u53f2")
          },
          {
            type: "arrow",
            title: "\u7559\u8a00\u6c42\u7247",
            symbol: "text.bubble.fill",
            async: true,
            iconColor: utils.systemColor("green"),
            handler: () => message.init()
          }]
        },
        {
          title: "\u901a\u7528",
          items: [{
            type: "switch",
            key: "switch.network.tips",
            on: true,
            title: "\u79fb\u52a8\u7f51\u7edc\u64ad\u653e\u63d0\u793a",
            symbol: "bell.fill",
            iconColor: utils.systemColor("pink")
          },
          {
            type: "switch",
            key: "switch.autoPlay.next",
            on: true,
            title: "\u81ea\u52a8\u64ad\u653e\u4e0b\u4e00\u96c6",
            symbol: "forward.fill",
            iconColor: utils.systemColor("blue")
          },
          {
            type: "arrow",
            title: "\u64ad\u653e\u901f\u5ea6",
            symbol: "plus.slash.minus",
            async: true,
            iconColor: $color("orange"),
            handler: () => playbackRateList()
          },
          {
            type: "arrow",
            title: "\u754c\u9762\u8bbe\u7f6e",
            symbol: "circle.lefthalf.fill",
            async: true,
            iconColor: $color("tint"),
            handler: () => themeList()
          }]
        },
        {
          title: "\u6570\u636e",
          items: [{
            type: "switch",
            key: "switch.database.backup",
            on: false,
            title: "\u9000\u51fa\u65f6\u81ea\u52a8\u5907\u4efd",
            symbol: "arrow.clockwise.icloud.fill",
            iconColor: utils.systemColor("green")
          },
          {
            type: "arrow",
            async: true,
            title: "\u7acb\u5373\u5907\u4efd",
            symbol: "icloud.and.arrow.up.fill",
            iconColor: utils.systemColor("blue"),
            handler: () => {
              database.backup();
              utils.lottieAlert("checkmark");
            }
          },
          {
            type: "arrow",
            async: true,
            title: "\u5907\u4efd\u8bb0\u5f55",
            symbol: "list.bullet",
            iconColor: utils.systemColor("blue"),
            handler: () => backupList()
          },
          {
            type: "arrow",
            async: false,
            title: "\u8fd8\u539f\u6240\u6709\u8bbe\u7f6e",
            symbol: "paintbrush.fill",
            iconColor: utils.systemColor("red"),
            handler: () => $ui.alert({
              title: "\u8fd8\u539f\u6240\u6709\u8bbe\u7f6e",
              message: "\u8fd8\u539f\u8bbe\u7f6e\u5e76\u6e05\u9664\u7f13\u5b58，\u662f\u5426\u7ee7\u7eed？",
              actions: [{
                title: "\u7ee7\u7eed",
                style: 2,
                handler: () => {
                  $cache.clear();
                  $delay(0.6, () => $addin.restart());
                }
              },
              {
                style: 1,
                title: "\u53d6\u6d88"
              }]
            })
          }]
        },
        {
          title: "\u5173\u4e8e",
          items: [{
            type: "text",
            title: "\u4f5c\u8005",
            text: config.info.author,
            symbol: "person.fill",
            iconColor: utils.systemColor("purple")
          },
          {
            type: "text",
            title: "\u7248\u672c",
            text: config.info.version,
            symbol: "v.circle.fill",
            iconColor: utils.systemColor("orange")
          },
          {
            type: "arrow",
            title: "\u66f4\u65b0",
            symbol: "tray.and.arrow.up.fill",
            iconColor: utils.systemColor("blue"),
            handler: () => $app.openURL("https://liuguogy.github.io/JSBox-addins/?q=show&objectId=5ec5f46dc1c17600084c5f23")
          }]
        },
        {
          title: "\u66f4\u591a",
          items: [{
            type: "arrow",
            title: "\u5206\u4eab\u7ed9\u670b\u53cb",
            symbol: "arrowshape.turn.up.right.fill",
            iconColor: utils.systemColor("blue"),
            handler: () => $share.sheet(["https://liuguogy.github.io/JSBox-addins/?q=show&objectId=5ec5f46dc1c17600084c5f23", config.info.name])
          },
          {
            type: "arrow",
            async: true,
            title: "\u5b89\u88c5TV Box",
            symbol: "tv.fill",
            iconColor: utils.systemColor("gray"),
            handler: async () => {
              const resp = await $http.download("https://github.com/linzx91/jsbox/blob/master/tvbox/TV%20Box.box?raw=true");
              $addin.save({
                name: "TV Box",
                data: resp.data,
                handler: success => {
                  if (success) $ui.alert({
                    title: "\u5b89\u88c5\u5b8c\u6210",
                    message: "\u662f\u5426\u7acb\u5373\u6253\u5f00",
                    actions: [{
                      title: "\u6253\u5f00",
                      style: 0,
                      handler: () => $addin.run("TV Box")
                    },
                    {
                      title: "\u53d6\u6d88",
                      style: 1
                    }]
                  });
                }
              });
            }
          }]
        }]
      })
    },
    layout: $layout.fillSafeArea,
    events: {
      ready: sender => $app.listen({
        interfaceOrientation: orientation => {
          const isHorizontalScreen = orientation === 3 || orientation === 4;
          _height = isHorizontalScreen ? 44 : 100;
          $(id[1]).frame = $rect(0, 0, sender.frame.width, _height);
          sender.reload();
          if (sender.contentSize.height < sender.frame.height + 56) sender.contentSize = $size(sender.contentSize.width, sender.frame.height + 56);
          navigationBar.changeLayout("setting.page", offsetY, false);
        }
      }),
      didScroll: sender => {
        offsetY = sender.contentOffset.y;
        navigationBar.changeLayout("setting.page", offsetY, true);
      },
      didEndDragging: sender => {
        if (offsetY >= 0 && offsetY <= 56 && _height > 44) sender.scrollToOffset($point(0, offsetY >= 28 ? 56 : 0));
      },
      didEndDecelerating: sender => {
        if (offsetY >= 0 && offsetY <= 56 && _height > 44) sender.scrollToOffset($point(0, offsetY > 40 ? 56 : 0));
      }
    }
  }]
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
