const utils = require("./utils");
const finds = require("./finds");
const search = require("./search");
const favorite = require("./favorite");
const playHistory = require("./playHistory");
const setting = require("./setting");

exports.init = () => {
  const id = [
    "home.navbar.blur",
    "searchBar.view",
    "searchBar.input",
    "searchBar.cancel.button.view",
    "navbar.playHist.button",
    "searchPage.background.blur",
    "home.navbar.tab.view",
    "navbar.playHist.button.image",
    "searchPage.list",
    "searchPage.list.footer.label",
    "searchPage.list.footer.link",
    "home.views.container",
    "favorite.views.container",
    "setting.views.container",
    "home.content.matrix",
    "favorite.page.matrix",
    "setting.page.list"
  ];

  const focusAnimate = () => {
    const cancelBtnSize = utils.sizeThatFits("\u53d6\u6d88");
    $app.autoKeyboardEnabled = true;
    $(id[2]).focus();
    search.init();
    $(id[1]).relayout();
    $(id[1]).super.relayout();
    $(id[1]).super.updateLayout(make => make.right.inset(16));
    $(id[1]).updateLayout(make => make.right.inset(cancelBtnSize.width + 10));
    $ui.animate({
      duration: 0.25,
      animation: () => {
        $(id[0]).bgcolor = $color("systemBackground");
        $(id[1]).super.relayout();
        $(id[1]).relayout();
        $(id[4]).alpha = 0;
        $(id[1]).alpha = 1;
        $(id[3]).alpha = 1;
      },
      completion: () => $(id[5]).add({
        type: "view",
        props: {
          id: "separator",
          alpha: 0,
          bgcolor: $color("separatorColor")
        },
        layout: (make, view) => {
          make.height.equalTo(16);
          make.top.inset(-(16 - 1 / $device.info.screen.scale));
          make.left.right.inset(0);
          utils.shadows(view, {
            color: $color("black"),
            cornerRadius: 0,
            radius: 16,
            opacity: 0.18,
            offset: $size(0, 0)
          });
        },
        events: {
          ready: sender => $ui.animate({
            duration: 0.25,
            animation: () => sender.alpha = 1
          })
        }
      })
    });
  };

  const blurAnimate = () => {
    $(id[2]).blur();
    $(id[1]).relayout();
    $(id[1]).updateLayout(make => make.right.inset(0));
    $ui.animate({
      duration: 0.25,
      animation: () => {
        $(id[1]).relayout();
        $(id[1]).alpha = 0.7;
        $(id[3]).alpha = 0;
      },
      completion: () => $app.autoKeyboardEnabled = false
    });
  };

  const fadeout = () => {
    $(id[2]).text = "";
    $(id[5]).get("separator").remove();
    $(id[5]).relayout();
    $(id[1]).super.relayout();
    $(id[1]).super.updateLayout(make => make.right.inset(52));
    $(id[5]).updateLayout((make, view) => make.top.equalTo($(id[6])).offset(48));
    $ui.animate({
      duration: 0.25,
      animation: () => {
        $(id[0]).bgcolor = $color("clear");
        $(id[1]).super.relayout();
        $(id[5]).relayout();
        $(id[4]).alpha = 1;
        $(id[5]).alpha = 0;
      },
      completion: () => {
        $(id[5]).remove();
        search.setExtend();
      }
    });
  };

  const tabBar = ({initialTab = 0, views}) => {
    const pageIds = views.map(item => item.pageID);

    return {
      type: "blur",
      props: {style: 10},
      layout: (make, view) => {
        make.top.equalTo($ui.window.safeAreaBottom).offset(-49);
        make.left.right.bottom.inset(0);
      },
      views: [{
        type: "stack",
        props: {
          spacing: 16,
          axis: 0,
          distribution: 1,
          alignment: 0,
          stack: {
            views: views.map((item, index) => {
              return {
                type: "view",
                props: {
                  id: item.tabID,
                  info: index
                },
                events: {
                  ready: sender => pageIds.forEach((id, index) => $(id).hidden = index !== initialTab),
                  layoutSubviews: sender => {
                    const isVerticalScreen = utils.statusBarOrientation() === 1 || utils.statusBarOrientation() === 2;
                    $(pageIds[0]).updateLayout((make, view) => make.left.inset(-(initialTab * view.super.frame.width)));
                    $(pageIds[0]).relayout();
                    sender.super.views.forEach((item, index) => {
                      item.views[1].font = $font(isVerticalScreen ? 10 : 14);
                      item.views[0].updateLayout((make, view) => {
                        make.centerX.equalTo(view.super).offset(isVerticalScreen ? 0 : -17);
                        make.centerY.equalTo(view.super).offset(isVerticalScreen ? -6 : 0);
                      });
                      item.views[1].remakeLayout((make, view) => {
                        if (isVerticalScreen) {
                          make.top.equalTo(view.prev.bottom).inset(2);
                          make.centerX.equalTo(view.super);
                        } else {
                          make.left.equalTo(view.prev.right).inset(5);
                          make.centerY.equalTo(view.super);
                        }
                      });
                      item.views[0].relayout();
                      item.views[1].relayout();
                    });
                  },
                  tapped: sender => {
                    sender.super.views.forEach((view, index) => {
                      $ui.animate({
                        duration: 0.25,
                        animation: () => {
                          view.views[0].symbol = views[index].symbols[index === sender.info && item.symbols[1] ? 1 : 0];
                          view.views[0].tintColor = utils.systemColor(index === sender.info ? "blue" : "gray");
                          view.views[1].textColor = utils.systemColor(index === sender.info ? "blue" : "gray");
                        }
                      });
                    });
                    pageIds.forEach((id, index) => $(id).hidden = sender.info !== index);
                    $(pageIds[0]).updateLayout((make, view) => make.left.inset(-(sender.info * view.super.frame.width)));
                    $ui.animate({
                      duration: 0.25,
                      animation: () => $(pageIds[0]).relayout()
                    });
                    if (initialTab === sender.info && initialTab === 0 && $(id[14]).contentOffset.y > 0) $(id[14]).scrollToOffset($point(0, 0));
                    if (initialTab === sender.info && initialTab === 1 && $(id[15]).contentOffset.y > 0) $(id[15]).scrollToOffset($point(0, 0));
                    if (initialTab === sender.info && initialTab === 2 && $(id[16]).contentOffset.y > 0) $(id[16]).scrollToOffset($point(0, 0));
                    initialTab = sender.info;
                  }
                },
                views: [{
                  type: "image",
                  props: {
                    symbol: item.symbols[index === initialTab && item.symbols[1] ? 1 : 0],
                    contentMode: 1,
                    clipsToBounds: false,
                    alpha: 0.9,
                    tintColor: utils.systemColor(index === initialTab ? "blue" : "gray")
                  },
                  layout: (make, view) => {
                    make.size.equalTo($size(29, 29));
                    make.centerX.equalTo(view.super);
                    make.centerY.equalTo(view.super).offset(-6);
                  }
                },
                {
                  type: "label",
                  props: {
                    text: item.title,
                    font: $font(10),
                    textColor: utils.systemColor(index === initialTab ? "blue" : "gray")
                  },
                  layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).inset(2);
                    make.centerX.equalTo(view.super);
                  }
                }]
              };
            })
          }
        },
        layout: (make, view) => {
          make.height.equalTo(49);
          make.top.inset(0);
          make.left.equalTo($ui.window.safeAreaLeft).inset(16);
          make.right.equalTo($ui.window.safeAreaRight).inset(16);
        }
      },
      {
        type: "view",
        props: {
          bgcolor: $color("separatorColor")
        },
        layout: (make, view) => {
          make.height.equalTo(1 / $device.info.screen.scale);
          make.top.left.right.inset(0);
        }
      }]
    };
  };

  $ui.render({
    props: {
      id: "main.window",
      statusBarStyle: 0,
      navBarHidden: true
    },
    views: [{
      type: "view",
      props: {id: id[11]},
      layout: (make, view) => {
        make.width.equalTo(view.super);
        make.height.equalTo(view.super);
        make.top.left.inset(0);
      },
      views: [{
        type: "blur",
        props: {
          id: id[0],
          style: 10
        },
        layout: (make, view) => {
          make.top.left.right.inset(0);
          make.bottom.equalTo($ui.window.safeAreaTop).offset(100);
        },
        views: [finds.init(), {
          type: "view",
          layout: (make, view) => {
            make.height.equalTo(52);
            make.left.equalTo($ui.window.safeAreaLeft);
            make.right.equalTo($ui.window.safeAreaRight);
            make.bottom.equalTo(view.prev.top);
          },
          views: [{
            type: "view",
            layout: (make, view) => {
              make.height.equalTo(36);
              make.left.inset(16);
              make.right.inset(52);
              make.centerY.equalTo(view.super);
            },
            views: [{
              type: "view",
              props: {
                id: id[1],
                cornerRadius: 10,
                smoothCorners: true,
                bgcolor: $color("systemTertiaryFill"),
                alpha: 0.7
              },
              layout: (make, view) => {
                make.height.equalTo(view.super);
                make.top.left.right.inset(0);
              },
              views: [{
                type: "image",
                props: {
                  symbol: "magnifyingglass",
                  contentMode: 1,
                  tintColor: $color("systemSecondaryLabel")
                },
                layout: (make, view) => {
                  make.size.equalTo($size(20.281, 20.281));
                  make.left.inset(7);
                  make.centerY.equalTo(view.super);
                },
                events: {
                  tapped: () => focusAnimate(),
                  longPressed: () => {
                    focusAnimate();
                    $device.taptic(2);
                  }
                }
              },
              {
                type: "input",
                props: {
                  id: id[2],
                  returnKeyType: 6,
                  font: $font("HelveticaNeue", 17),
                  placeholder: "\u641c\u7d22",
                  tintColor: $color("primaryText"),
                  textColor: $color("primaryText"),
                  bgcolor: $color("clear"),
                  accessoryView: {}
                },
                layout: (make, view) => {
                  make.top.right.bottom.inset(0);
                  make.left.equalTo(view.prev.right).offset(-3);
                },
                events: {
                  didBeginEditing: () => focusAnimate(),
                  didEndEditing: sender => sender.blur(),
                  returned: async sender => {
                    const text = sender.text.replace(/(^\s*)|(\s*$)/g, "");
                    if (!text) {
                      $ui.warning("\u641c\u7d22\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
                      sender.text = text;
                      return false;
                    }
                    sender.blur();
                    const resp = await search.request(text);
                    const _Null = !resp.data[0];
                    $(id[8]).data = _Null ? [] : [{
                      title: "\u641c\u7d22\u7ed3\u679c",
                      rows: resp.data
                    }];
                    $(id[9]).text = 1 + "／" + resp.pagecount;
                    $(id[9]).hidden = resp.pagecount ? false : true;
                    $(id[10]).hidden = _Null && !resp.error ? false : true;
                    $(id[8]).endFetchingMore();
                    search.setExtend(resp);
                  }
                }
              }]
            },
            {
              type: "view",
              props: {
                id: id[3],
                alpha: 0
              },
              layout: (make, view) => {
                make.height.equalTo(view.super)
                make.left.equalTo(view.prev.right).offset(10);
                make.right.equalTo(view.super);
              },
              events: Object.assign({}, utils.tapped(() => {
                blurAnimate();
                fadeout();
              })),
              views: [{
                type: "label",
                props: {
                  text: "\u53d6\u6d88",
                  align: $align.center,
                  textColor: $color("systemLabel")
                },
                layout: $layout.fill
              }]
            }]
          },
          {
            type: "button",
            props: {
              id: id[4],
              circular: true,
              bgcolor: $color("clear")
            },
            layout: (make, view) => {
              make.size.equalTo($size(26, 26));
              make.left.equalTo(view.prev.right).inset(10);
              make.centerY.equalTo(view.super);
            },
            events: {
              tapped: sender => playHistory.init("\u89c2\u770b\u5386\u53f2")
            },
            views: [{
              type: "image",
              props: {
                id: id[7],
                symbol: "clock",
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
        },
        {
          type: "view",
          props: {
            bgcolor: $color("separatorColor")
          },
          layout: (make, view) => {
            make.height.equalTo(1 / $device.info.screen.scale);
            make.left.right.bottom.inset(0);
          }
        }]
      }]
    },
    {
      type: "view",
      props: {
        id: id[12],
        hidden: true
      },
      layout: (make, view) => {
        make.width.equalTo(view.super);
        make.height.equalTo(view.super);
        make.top.inset(0);
        make.left.equalTo(view.prev.right);
      },
      views: favorite.init()
    },
    {
      type: "view",
      props: {
        id: id[13],
        hidden: true,
        bgcolor: $color("insetGroupedBackground")
      },
      layout: (make, view) => {
        make.width.equalTo(view.super);
        make.height.equalTo(view.super);
        make.top.inset(0);
        make.left.equalTo(view.prev.right);
      },
      views: setting.init()
    },
    tabBar({
      initialTab: 0,
      views: [{
        title: "\u9996\u9875",
        tabID: "tabbar.home",
        pageID: id[11],
        symbols: ["house", "house.fill"]
      },
      {
        title: "\u6536\u85cf",
        tabID: "tabbar.favorite",
        pageID: id[12],
        symbols: ["heart", "heart.fill"]
      },
      {
        title: "\u8bbe\u7f6e",
        tabID: "tabbar.setting",
        pageID: id[13],
        symbols: ["gear"]
      }]
    })]
  });
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
