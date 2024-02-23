const app = require("./app");
const api = require("./api");
const utils = require("./utils");
const player = require("./player");
const spinner = require("./spinner");
const database = require("./database");
const navigationBar = require("./navigationBar");

exports.init = async title => {
  const id = [
    "playHistory.window",
    "playHistory.list",
    "playHistory.list.header",
    "playHistory.navigationBar.view",
    "playHistory.editing.fill.list",
    "playHistory.navbar.editing.button",
    "playHistory.footer.blur",
    "playHistory.footer.checkedall.button",
    "playHistory.footer.delete.button",
    "playHistory.editing.action.list"
  ];

  let history = player.video.histCache;

  const updateList = async () => {
    const request = history.map(async item => {
      const resp = await api.request(api.detail + "&ids=" + item.id);
      const data = resp.data[0] ? app.transformData(resp.data[0]) : item;
      return data;
    });
    return await Promise.all(request);
  };

  utils.spinAnimate.play();
  history = await updateList();

  const didSelectItem = (sender, index) => {
    history = player.video.histCache;
    const data = history[index];
    if (sender.id !== id[1] && $(id[1]).data[index].ended) data.schedule.watched = 0;
    app.playPage(data);
    database.history.insert(data);
    history.unshift(history.splice(index, 1)[0] = data);
    player.video.history(history);
  };

  const editSwitch = () => {
    history = player.video.histCache;
    $(id[1]).setEditing(false);
    $(id[1]).showsVerticalIndicator = $(id[6]) ? true : false;
    $(id[5]).title = $(id[6]) ? "\u7f16\u8f91" : "\u53d6\u6d88";
    $(id[1]).relayout();
    $(id[4]).relayout();
    $(id[1]).updateLayout((make, view) => make.left.equalTo($ui.window.safeAreaLeft).offset($(id[6]) ? 0 : 36));
    $(id[4]).updateLayout((make, view) => make.left.equalTo($ui.window.safeAreaLeft).offset($(id[6]) ? -36 : 0));
    $(id[4]).hidden = $(id[6]) ? true : false;
    $(id[9]).hidden = $(id[6]) ? true : false;
    $ui.animate({
      duration: 0.25,
      animation: () => {
        $(id[1]).relayout();
        $(id[4]).relayout();
      }
    });
    if ($(id[6])) {
      $(id[6]).relayout();
      $(id[6]).remakeLayout((make, view) => {
        make.top.equalTo(view.super.bottom);
        make.left.right.bottom.inset(0);
      });
      $ui.animate({
        duration: 0.25,
        animation: () => $(id[6]).relayout(),
        completion: () => {
          $(id[6]).remove();
          player.video.history(history);
        }
      });
    } else footerView();
  };

  const toggleChecked = indexPath => {
    $(id[4]).data = $(id[4]).data.map((item, index) => {
      return indexPath === index ? {
        checked: item.checked ? false : true,
        rowFill: {
          info: index,
          bgcolor: $color(item.checked ? "clear" : "systemFill")
        },
        checkbox: {
          hidden: item.checked ? false : true
        },
        checkmark: {
          hidden: item.checked ? true : false
        }
      } : item.checked ? {
        checked: true,
        rowFill: {
          info: index,
          bgcolor: $color("systemFill")
        },
        checkbox: {
          hidden: true
        },
        checkmark: {
          hidden: false
        }
      } : {
        checked: false,
        rowFill: {
          info: index,
          bgcolor: $color("clear")
        },
        checkbox: {
          hidden: false
        },
        checkmark: {
          hidden: true
        }
      };
    });
    const checkedItems = $(id[4]).data.filter(item => item.checked);
    $(id[7]).title = $(id[4]).data.every(item => item.checked) ? "\u53d6\u6d88\u5168\u9009" : "\u5168\u9009";
    $(id[8]).title = checkedItems[0] ? `\u5220\u9664(${checkedItems.length})` : "\u5220\u9664";
    $(id[8]).titleColor = checkedItems[0] ? utils.systemColor("red") : $color("systemTertiaryLabel");
    $(id[8]).userInteractionEnabled = checkedItems[0] ? true : false;
  };

  const deleteCheckedItems = () => {
    const indexes = $(id[4]).data.filter(item => item.checked).map(item => item.rowFill.info);
    for (let i = history.length - 1; i >= 0; i--) {
      indexes.forEach(item => {
        if (i === item) {
          $(id[9]).delete(item);
          $(id[4]).delete(item);
          $(id[1]).delete(item);
          database.history.remove(history[item].id);
        }
      });
    }
    history = history.filter((item, index) => !indexes.includes(index));
    player.video.histCache = history;
    editSwitch();
    $(id[5]).titleColor = $color(history[0] ? "systemLabel" : "systemTertiaryLabel");
    $(id[5]).userInteractionEnabled = history[0] ? true : false;
  };

  const footerView = () => {
    if ($(id[6])) $(id[6]).remove();
    $ui.window.add({
      type: "blur",
      props: {
        id: id[6],
        style: 10
      },
      layout: (make, view) => {
        make.top.equalTo(view.super.bottom);
        make.left.right.bottom.inset(0);
      },
      events: {
        ready: sender => {
          sender.relayout();
          sender.remakeLayout((make, view) => {
            make.top.equalTo($ui.window.safeAreaBottom).offset(-44);
            make.left.right.bottom.inset(0);
          });
          $ui.animate({
            duration: 0.25,
            animation: () => sender.relayout()
          });
        }
      },
      views: [{
        type: "view",
        layout: (make, view) => {
          make.width.equalTo(view.super);
          make.height.equalTo(44);
          make.top.left.inset(0);
        },
        views: [{
          type: "button",
          props: {
            id: id[7],
            title: "\u5168\u9009",
            font: $font("bold", 16),
            titleColor: $color("systemLabel"),
            bgcolor: $color("clear")
          },
          layout: (make, view) => {
            make.left.inset(0);
            make.right.equalTo(view.super.centerX);
            make.centerY.equalTo(view.super);
          },
          events: {
            tapped: sender => {
              const uncheck = sender.title === "\u5168\u9009";
              $(id[4]).data = history.map((item, index) => {
                return {
                  checked: uncheck ? true : false,
                  rowFill: {
                    info: index,
                    bgcolor: $color(uncheck ? "systemFill" : "clear")
                  },
                  checkbox: {
                    hidden: uncheck ? true : false
                  },
                  checkmark: {
                    hidden: uncheck ? false : true
                  }
                };
              });
              sender.title = uncheck ? "\u53d6\u6d88\u5168\u9009" : "\u5168\u9009";
              const checkedItems = $(id[4]).data.filter(item => item.checked);
              sender.next.title = checkedItems[0] ? `\u5220\u9664(${checkedItems.length})` : "\u5220\u9664";
              sender.next.titleColor = checkedItems[0] ? utils.systemColor("red") : $color("systemTertiaryLabel");
              sender.next.userInteractionEnabled = checkedItems[0] ? true : false;
            }
          }
        },
        {
          type: "button",
          props: {
            id: id[8],
            title: "\u5220\u9664",
            font: $font("bold", 16),
            userInteractionEnabled: false,
            titleColor: $color("systemTertiaryLabel"),
            bgcolor: $color("clear")
          },
          layout: (make, view) => {
            make.left.equalTo(view.super.centerX);
            make.right.inset(0);
            make.centerY.equalTo(view.super);
          },
          events: {
            tapped: () => deleteCheckedItems()
          }
        }]
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
    });
  };

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
      title: title,
      pageName: "playHistory",
      subviews: [{
        type: "button",
        props: {
          id: id[5],
          title: "\u7f16\u8f91",
          font: $font("bold", 16),
          bgcolor: $color("clear")
        },
        layout: (make, view) => {
          make.right.equalTo($ui.window.safeAreaRight).inset(16);
          make.centerY.equalTo(view.super)
        },
        events: {
          tapped: sender => editSwitch()
        }
      }]
    }),
    {
      type: "list",
      layout: (make, view) => {
        make.top.equalTo($ui.window.safeAreaTop);
        make.left.equalTo($ui.window.safeAreaLeft).offset(-36);
        make.right.equalTo($ui.window.safeAreaRight);
        make.bottom.equalTo($ui.window.safeAreaBottom);
      },
      props: {
        id: id[4],
        style: 0,
        rowHeight: 148,
        selectable: false,
        separatorHidden: true,
        showsVerticalIndicator: false,
        showsHorizontalIndicator: false,
        bgcolor: $color("clear"),
        hidden: true,
        header: {
          type: "view",
          props: {height: 44}
        },
        footer: {
          type: "view",
          props: {height: 44}
        },
        template: {
          props: {bgcolor: $color("clear")},
          views: [{
            type: "view",
            props: {id: "rowFill"},
            layout: $layout.fill,
            views: [{
              type: "view",
              layout: (make, view) => {
                make.width.equalTo(52);
                make.height.equalTo(view.super);
                make.top.left.inset(0);
              },
              views: [{
                type: "view",
                props: {
                  id: "checkbox",
                  circular: true,
                  borderWidth: 1.5,
                  borderColor: $color("systemOpaqueSeparator")
                },
                layout: (make, view) => {
                  make.size.equalTo($size(20, 20));
                  make.center.equalTo(view.super);
                },
                events: {
                  themeChanged: (sender, isDarkMode) => sender.borderColor = $color("systemOpaqueSeparator")
                }
              },
              {
                type: "image",
                props: {
                  id: "checkmark",
                  contentMode: 0,
                  circular: true,
                  icon: $icon("064", utils.systemColor("red")),
                  borderWidth: 1.5,
                  borderColor: utils.systemColor("red"),
                  bgcolor: $color("white"),
                  hidden: true
                },
                layout: (make, view) => {
                  make.size.equalTo($size(20, 20));
                  make.center.equalTo(view.super);
                }
              }]
            }]
          }]
        }
      }
    },
    {
      type: "list",
      layout: $layout.fillSafeArea,
      props: {
        id: id[1],
        style: 0,
        rowHeight: 148,
        separatorInset: $insets(0, 16, 0, 0),
        separatorHidden: false,
        indicatorInsets: $insets(44, 0, 0, 0),
        separatorColor: $color("systemSeparator"),
        bgcolor: $color("clear"),
        header: {
          type: "view",
          props: {
            id: id[2],
            height: 44
          }
        },
        template: {
          props: {
            bgcolor: $color("clear")
          },
          views: [{
            type: "view",
            props: {
              cornerRadius: 5,
              smoothCorners: true,
              bgcolor: $color("systemFill")
            },
            layout: (make, view) => {
              make.size.equalTo($size(99, 132));
              make.left.inset(16);
              make.centerY.equalTo(view.super);
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
              lines: 2,
              font: $font("bold", 16),
              textColor: $color("systemLabel")
            },
            layout: (make, view) => {
              make.top.equalTo(view.prev);
              make.left.equalTo(view.prev.right).offset(16);
              make.right.inset(16);
            }
          },
          {
            type: "label",
            props: {
              id: "duration",
              font: $font(13),
              textColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => {
              make.top.equalTo(view.prev.bottom).offset(8);
              make.left.right.equalTo(view.prev);
            }
          },
          {
            type: "label",
            props: {
              id: "episode",
              font: $font(13),
              textColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => {
              make.top.equalTo(view.prev.bottom).offset(8);
              make.left.right.equalTo(view.prev);
            }
          },
          {
            type: "button",
            props: {
              font: $font(14),
              cornerRadius: 2,
              smoothCorners: true,
              titleColor: $color("white", "black"),
              bgcolor: utils.systemColor("green")
            },
            layout: (make, view) => {
              make.size.equalTo($size(80, 30));
              make.left.equalTo(view.prev);
              make.bottom.equalTo($("pic").bottom);
            },
            events: {
              tapped: sender => didSelectItem(sender, sender.info)
            }
          }]
        },
        actions: [{
          title: "delete",
          handler: (sender, indexPath) => {
            const i = indexPath.item;
            history = player.video.histCache;
            database.history.remove(history[i].id);
            history.splice(indexPath.item, 1);
            $delay(0.4, () => player.video.history(history));
          }
        }]
      },
      events: {
        didSelect: (sender, indexPath) => didSelectItem(sender, indexPath.item),
        didScroll: sender => {
          $(id[4]).contentOffset = $point(0, sender.contentOffset.y);
          $(id[9]).contentOffset = $point(0, sender.contentOffset.y);
        }
      }
    },
    {
      type: "list",
      layout: $layout.fillSafeArea,
      props: {
        id: id[9],
        style: 0,
        rowHeight: 148,
        selectable: false,
        separatorHidden: true,
        indicatorInsets: $insets(44, 0, 44, 0),
        bgcolor: $color("clear"),
        hidden: true,
        header: {
          type: "view",
          props: {height: 44}
        },
        footer: {
          type: "view",
          props: {height: 44}
        },
        template: {
          props: {
            bgcolor: $color("clear")
          },
          views: [{
            type: "view",
            props: {
              id: "checkAction"
            },
            layout: $layout.fill,
            events: {
              tapped: sender => toggleChecked(sender.info)
            }
          }]
        }
      },
      events: {
        ready: sender => {
          player.video.history(history);
          utils.spinAnimate.stop();
          $(id[5]).titleColor = $color(sender.data[0] ? "systemLabel" : "systemTertiaryLabel");
          $(id[5]).userInteractionEnabled = sender.data[0] ? true : false;
        },
        didScroll: sender => {
          $(id[1]).contentOffset = $point(0, sender.contentOffset.y);
          $(id[4]).contentOffset = $point(0, sender.contentOffset.y);
        }
      }
    }]
  });
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
