const app = require("./app");
const api = require("./api");
const info = require("./info");
const utils = require("./utils");
const spinner = require("./spinner");
const launchScreen = require("./launchScreen");

exports.init = () => {
  const id = [
    "home.navbar.tab.view",
    "home.navbar.menu.blur",
    "home.content.matrix",
    "home.matrix.header.view",
    "home.matrix.footer.label",
    "home.matrix.footer.spinner",
    "home.navbar.blur",
    "launch.screen.page",
    "home.views.container",
    "home.matrix.header.occlude.view"
  ];

  const request = async (type, pagination = 1) => {
    const resp = await api.request(api.detail + type + "&pg=" + pagination);
    const _Null = !resp.data[0];
    if (_Null && !$(id[7])) {
      $ui.error(resp.message);
      $device.taptic(1);
      $delay(0.15, () => $device.taptic(1));
    } else if (!_Null) $device.taptic();
    return Object.assign({}, resp, {
      type, pagination: _Null && pagination === 1 ? 0 : pagination,
      finish: (resp.pagecount && pagination >= resp.pagecount) || (!_Null && resp.data.length >= resp.total) ? true : false
    });
  };

  const menu = (index, source) => {
    const tabs = api.distribution[index].subtabs.map(item => item.name);
    if ($(id[1])) $(id[1]).remove();
    $(id[8]).add({
      type: "blur",
      props: {
        id: id[1],
        style: 10,
        hidden: !tabs[0] ? true : false
      },
      layout: (make, view) => {
        make.height.equalTo(!tabs[0] ? 0 : 36);
        make.top.equalTo($(id[0]).bottom);
        make.left.right.inset(0);
      },
      views: [{
        type: "menu",
        props: {
          items: tabs,
          dynamicWidth: false,
          tintColor: $color("systemLabel"),
          bgcolor: $color("clear")
        },
        layout: (make, view) => {
          make.top.bottom.inset(0);
          make.left.equalTo($ui.window.safeAreaLeft).inset(16);
          make.right.equalTo($ui.window.safeAreaRight).inset(16);
        },
        events: {
          ready: sender => {
            sender.views[1].alpha = 0;
            sender.views[2].alpha = 0;
            matrix(source);
          },
          changed: async sender => {
            utils.spinAnimate.play();
            const i = sender.index;
            source = await request(api.distribution[index].subtabs[i].id);
            matrix(source);
            utils.spinAnimate.stop();
          }
        }
      },
      {
        type: "view",
        props: {
          bgcolor: $color("separatorColor")
        },
        layout: (make, view) => {
          make.height.equalTo(1 / $device.info.screen.scale);
          make.left.right.inset(0);
          make.bottom.equalTo(view.super);
        }
      }]
    });
  };
  const matrix = source => {
    let p = 0, t = 0, y = 36, m = 0, pullup = true;
    const loadAnimate = loading => {
      $(id[loading ? 5 : 4]).hidden = false;
      $ui.animate({
        duration: 0.25,
        animation: () => {
          $(id[loading ? 4 : 5]).alpha = 0;
          $(id[loading ? 5 : 4]).alpha = 1;
        },
        completion: () => $(id[loading ? 4 : 5]).hidden = true
      });
    };
    const occluder = () => {
      if ($(id[9])) $(id[9]).remove();
      $(id[8]).add({
        type: "view",
        props: {id: id[9]},
        layout: (make, view) => {
          make.top.left.right.inset(0);
          make.bottom.equalTo($(id[6]).bottom);
        }
      });
    };
    if ($(id[2])) $(id[2]).remove();
    $(id[8]).add({
      type: "matrix",
      props: {
        id: id[2],
        spacing: 16,
        indicatorInsets: $insets($(id[1]).frame.height + 100, 0, 49, 0),
        bgcolor: $color("clear"),
        header: {
          type: "view",
          props: {
            id: id[3],
            height: $(id[1]).frame.height + 100
          }
        },
        footer: {
          type: "view",
          props: {height: 89},
          views: [{
            type: "view",
            layout: (make, view) => {
              make.height.equalTo(40);
              make.top.left.right.inset(0);
            },
            views: [{
              type: "spinner",
              props: {
                id: id[5],
                style: 1,
                loading: true,
                alpha: 0,
                hidden: true,
                color: $color("systemLabel")
              },
              layout: (make, view) => make.center.equalTo(view.super)
            },
            {
              type: "label",
              props: {
                id: id[4],
                text: source.pagecount ? 1 + "／" + source.pagecount : source.message,
                font: $font(13),
                align: $align.center,
                textColor: $color("systemSecondaryLabel")
              },
              layout: (make, view) => make.center.equalTo(view.super)
            }]
          }]
        },
        template: {
          props: {
            clipsToBounds: false,
            bgcolor: $color("clear")
          },
          layout: $layout.fill,
          views: [{
            type: "view",
            props: {
              cornerRadius: 5,
              smoothCorners: true,
              bgcolor: $color("systemFill")
            },
            layout: (make, view) => {
              make.width.equalTo(view.super);
              make.height.equalTo(view.super).offset(-44);
              make.top.left.inset(0);
            },
            views: [spinner.init(), {
              type: "image",
              props: {
                id: "pic",
                contentMode: 0,
                cornerRadius: 5 - (1 / $device.info.screen.scale),
                smoothCorners: true
              },
              layout: (make, view) => make.edges.inset(2 / $device.info.screen.scale),
              views: [{
                type: "view",
                props: {
                  id: "mask",
                  bgcolor: $rgba(0, 0, 0, 0.5)
                },
                layout: (make, view) => {
                  make.width.equalTo(view.super);
                  make.height.equalTo(26);
                  make.left.bottom.inset(0);
                },
                views: [{
                  type: "label",
                  props: {
                    id: "remarks",
                    font: $font(12),
                    autoFontSize: true,
                    align: $align.center,
                    textColor: $color("white"),
                    shadowColor: $color("black")
                  },
                  layout: (make, view) => {
                    make.left.right.inset(4);
                    make.centerY.equalTo(view.super);
                  }
                }]
              }]
            }]
          },
          {
            type: "label",
            props: {
              id: "name",
              align: $align.center,
              font: $font(14),
              autoFontSize: true,
              lines: 2
            },
            layout: (make, view) => {
              make.width.equalTo(view.super);
              make.height.equalTo(44);
              make.bottom.inset(0);
              make.centerX.equalTo(view.super);
            }
          },
          {
            type: "view",
            props: {
              id: "heart",
              circular: true,
              hidden: true,
              bgcolor: utils.systemColor("blue")
            },
            layout: (make, view) => {
              make.size.equalTo($size(19, 19));
              make.top.left.inset(-7);
            },
            views: [{
              type: "image",
              props: {
                symbol: "heart",
                contentMode: 1,
                tintColor: $color("white")
              },
              layout: (make, view) => {
                make.size.equalTo($size(14, 14));
                make.center.equalTo(view.super);
              }
            }]
          }]
        }
      },
      layout: $layout.fillSafeArea,
      events: {
        ready: sender => {
          $(id[6]).moveToFront();
          sender.moveToBack();
          sender.data = source.data;
          $app.listen({
            interfaceOrientation: orientation => sender.reload()
          });
        },
        layoutSubviews: sender => sender.relayout(),
        itemSize: sender => utils.setPicSize(sender),
        didSelect: (sender, index, data) => app.playPage(app.transformData(data)),
        didLongPress: (sender, index, data) => {
          $device.taptic(2);
          info.init(app.transformData(data));
        },
        pulled: async sender => {
          pullup = false;
          const resp = await request(source.type, 1);
          const _Null = !resp.data[0];
          source = Object.assign({}, source, {
            pagination: _Null ? source.pagination : 1,
            pagecount: resp.pagecount ? resp.pagecount : source.pagecount,
            data: _Null ? source.data : resp.data,
            finish: (resp.pagecount && resp.pagination >= resp.pagecount) || (resp.total && resp.data.length >= resp.total) ? true : false
          });
          $(id[2]).data = source.data;
          $(id[4]).text = source.pagecount ? source.pagination + "／" + source.pagecount : source.message;
          sender.endRefreshing();
          pullup = true;
          if (!_Null) utils.showConfetti();
        },
        didReachBottom: async sender => {
          if (source.finish || !pullup) {
            sender.endFetchingMore();
            return false;
          }
          source.pagination++;
          loadAnimate(true);
          const resp = await request(source.type, source.pagination);
          const _Null = !resp.data[0];
          source = Object.assign({}, source, {
            pagination: _Null ? source.pagination - 1 : source.pagination,
            pagecount: resp.pagecount ? resp.pagecount : source.pagecount,
            data: source.data.concat(resp.data),
            finish: (source.pagecount && source.pagination >= source.pagecount) || (source.total && source.data.length >= source.total) ? true : false
          });
          sender.data = source.data;
          loadAnimate(false);
          $(id[4]).text = source.pagecount ? source.pagination + "／" + source.pagecount : source.message;
          sender.endFetchingMore();
        },
        didScroll: sender => {
          const distance = sender.contentOffset.y;
          $(id[6]).updateLayout((make, view) => make.bottom.equalTo($ui.window.safeAreaTop).offset(distance < 0 ? Math.abs(distance) + 100 : 100));
          sender.showsVerticalIndicator = distance > 0 ? true : false;
          p = distance;
          t < p && distance > 0 ? y-- : y++;
          y = y >= 36 ? 36 : y <= 0 ? 0 : y;
          t = p;
          const show = !$(id[1]).hidden && $(id[1]).frame.y === $(id[6]).frame.height - 36 && (y === 36 || distance < 36);
          const hide = !$(id[1]).hidden && $(id[1]).frame.y >= $(id[6]).frame.height && y === 0 && distance >= 36;
          if (distance > -20 && !m) {
            $(id[6]).moveToFront();
            if ($(id[9])) $(id[9]).remove();
            m = 1;
          } else if (distance <= -20 && m) {
            $(id[6]).moveToBack();
            occluder();
            m = 0;
          }
          if (show || hide) {
            $(id[1]).relayout();
            $(id[1]).updateLayout(make => show ? make.top.equalTo($(id[0]).bottom) : hide ? make.top.equalTo($(id[0]).bottom).offset(-36) : 0);
            $ui.animate({
              duration: 0.25,
              animation: () => $(id[1]).relayout()
            });
          }
        }
      }
    });
  };
  return {
    type: "view",
    props: {id: id[0]},
    layout: (make, view) => {
      make.height.equalTo(48);
      make.bottom.inset(0);
      make.left.equalTo($ui.window.safeAreaLeft).inset(16);
      make.right.equalTo($ui.window.safeAreaRight).inset(16);
    },
    views: [{
      type: "tab",
      props: {
        items: api.distribution.map(item => item.name),
        dynamicWidth: true
      },
      layout: (make, view) => {
        make.height.equalTo(32);
        make.left.right.inset(0);
        make.centerY.equalTo(view.super);
      },
      events: {
        ready: sender => launchScreen.init.start(request, menu, api.distribution[0].id),
        changed: async sender => {
          utils.spinAnimate.play();
          const i = sender.index;
          const source = await request(api.distribution[i].id);
          menu(i, source);
          utils.spinAnimate.stop();
        }
      }
    }]
  };
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
