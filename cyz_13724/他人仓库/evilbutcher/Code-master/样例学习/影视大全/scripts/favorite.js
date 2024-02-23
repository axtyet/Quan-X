const app = require("./app");
const api = require("./api");
const info = require("./info");
const utils = require("./utils");
const spinner = require("./spinner");
const database = require("./database");
const navigationBar = require("./navigationBar");

exports.init = () => {
  const id = [
    "favorite.page.matrix",
    "favorite.page.check.matrix",
    "favorite.page.edit.switch.button",
    "favorite.page.checked.delete.button",
    "favorite.page.standard.title",
    "favorite.page.large.title",
    "tabbar.favorite"
  ];

  let _height = 100, offsetY = 0, editing = false, title = "\u6536\u85cf";

  const updateData = async () => {
    let rawData = database.favorites.query();
    const request = rawData.map(async item => {
      const resp = await api.request(api.detail + "&ids=" + item.id);
      return resp.data[0] ? resp.data[0] : app.reverseData(item);
    });
    return await Promise.all(request);
  };

  const readData = data => {
    $(id[2]).titleColor = $color(data[0] ? "systemLabel" : "systemTertiaryLabel");
    $(id[2]).userInteractionEnabled = data[0] ? true : false;
    $(id[0]).data = data;
    $(id[1]).data = data.map((item, index) => {
      return {
        id: item.id,
        checked: false,
        checkAction: {
          info: index
        },
        checkbox: {
          hidden: false
        },
        checkmark: {
          hidden: true
        }
      };
    });
  };

  const editSwitch = () => {
    $(id[2]).title = editing ? "\u7f16\u8f91" : "\u5b8c\u6210";
    $(id[1]).hidden = false;
    $(id[3]).hidden = false;
    $ui.animate({
      duration: 0.2,
      animation: () => {
        $(id[1]).alpha = editing ? 0 : 1;
        $(id[3]).alpha = editing ? 0 : 1;
        $(id[4]).text = title;
        $(id[5]).text = title;
      },
      completion: () => {
        $(id[1]).hidden = editing;
        $(id[3]).hidden = editing;
        $(id[3]).titleColor = $color("systemTertiaryLabel");
        $(id[0]).showsVerticalIndicator = editing ? true : false;
        $(id[3]).userInteractionEnabled = false;
        readData($(id[0]).data);
        editing = editing ? false : true;
      }
    });
  };

  const toggleChecked = indexPath => {
    $(id[1]).data = $(id[1]).data.map((item, index) => {
      return indexPath === index ? {
        id: item.id,
        checked: item.checked ? false : true,
        checkAction: {
          info: index
        },
        checkbox: {
          hidden: item.checked ? false : true
        },
        checkmark: {
          hidden: item.checked ? true : false
        }
      } : item.checked ? {
        id: item.id,
        checked: true,
        checkAction: {
          info: index
        },
        checkbox: {
          hidden: true
        },
        checkmark: {
          hidden: false
        }
      } : {
        id: item.id,
        checked: false,
        checkAction: {
          info: index
        },
        checkbox: {
          hidden: false
        },
        checkmark: {
          hidden: true
        }
      };
    });
    const checkedItems = $(id[1]).data.filter(item => item.checked);
    $(id[4]).text = checkedItems[0] ? `\u5df2\u9009\u5b9a ${checkedItems.length} \u9879` : title;
    $(id[5]).text = checkedItems[0] ? `\u5df2\u9009\u5b9a ${checkedItems.length} \u9879` : title;
    $(id[3]).titleColor = checkedItems[0] ? utils.systemColor("red") : $color("systemTertiaryLabel");
    $(id[3]).userInteractionEnabled = checkedItems[0] ? true : false;
  };

  const deleteCheckedItems = () => {
    let items = $(id[0]).data.map(item => app.transformData(item));
    const indexes = $(id[1]).data.filter(item => item.checked).map(item => item.checkAction.info);
    for (let i = items.length - 1; i >= 0; i--) {
      indexes.forEach(index => {
        if (i === index) {
          items[index] = Object.assign({}, items[index], {favorite: 0});
          app.updateFavoriteData(items[index]);
          app.updateFavoriteMark(items[index]);
          database.favorites.remove(items[index].id);
        }
      });
    }
    items = items.filter((item, index) => !indexes.includes(index));
    $delay(0.2, () => {
      editSwitch();
      $(id[4]).text = title;
      $(id[5]).text = title;
    });
  };

  const magnetic = {
    didEndDragging: sender => {
      if (offsetY >= 0 && offsetY <= 56 && _height > 44) sender.scrollToOffset($point(0, offsetY >= 28 ? 56 : 0));
    },
    didEndDecelerating: sender => {
      if (offsetY >= 0 && offsetY <= 56 && _height > 44) sender.scrollToOffset($point(0, offsetY > 40 ? 56 : 0));
    }
  };

  return [navigationBar.view({
    style: 0,
    title: title,
    pageName: "favorite.page",
    subviews: [{
      type: "button",
      props: {
        id: id[3],
        title: "\u5220\u9664",
        font: $font("bold", 16),
        cornerRadius: 0,
        userInteractionEnabled: false,
        alpha: 0,
        hidden: true,
        titleColor: $color("systemTertiaryLabel"),
        bgcolor: $color("clear")
      },
      layout: (make, view) => {
        make.left.inset(16);
        make.centerY.equalTo(view.super);
      },
      events: {
        tapped: sender => deleteCheckedItems()
      }
    },
    {
      type: "button",
      props: {
        id: id[2],
        title: "\u7f16\u8f91",
        font: $font("bold", 16),
        cornerRadius: 0,
        titleColor: $color("systemLabel"),
        bgcolor: $color("clear")
      },
      layout: (make, view) => {
        make.right.inset(16);
        make.centerY.equalTo(view.super);
      },
      events: {
        tapped: sender => editSwitch()
      }
    }]
  }),
  {
    type: "matrix",
    props: {
      id: id[0],
      spacing: 16,
      indicatorInsets: $insets(44, 0, 49, 0),
      bgcolor: $color("clear"),
      header: {
        type: "view",
        events: {
          height: () => _height
        }
      },
      footer: {
        type: "view",
        props: {height: 49}
      },
      template: {
        props: {
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
        }]
      }
    },
    layout: $layout.fillSafeArea,
    events: Object.assign({}, magnetic, {
      layoutSubviews: sender => sender.relayout(),
      itemSize: sender => utils.setPicSize(sender),
      didSelect: (sender, index, data) => app.playPage(app.transformData(data)),
      didLongPress: (sender, index, data) => {
        $device.taptic(2);
        info.init(app.transformData(data));
      },
      didScroll: sender => {
        offsetY = sender.contentOffset.y;
        $(id[1]).contentOffset = $point(0, offsetY);
      }
    })
  },
  {
    type: "matrix",
    props: {
      id: id[1],
      spacing: 16,
      indicatorInsets: $insets(44, 0, 49, 0),
      alpha: 0,
      hidden: true,
      bgcolor: $color("clear"),
      header: {
        type: "view",
        props: {
          clipsToBounds: true
        },
        events: {
          height: () => _height
        }
      },
      footer: {
        type: "view",
        props: {height: 49}
      },
      template: {
        props: {
          bgcolor: $color("clear")
        },
        layout: $layout.fill,
        views: [{
          type: "view",
          props: {
            id: "checkAction",
            cornerRadius: 5,
            smoothCorners: true,
            bgcolor: $rgba(0, 0, 0, 0.2)
          },
          layout: (make, view) => {
            make.width.equalTo(view.super);
            make.height.equalTo(view.super).offset(-44);
            make.top.left.inset(0);
          },
          views: [{
            type: "view",
            props: {
              id: "checkbox",
              circular: true,
              borderWidth: 1.5,
              borderColor: $color("white")
            },
            layout: (make, view) => {
              make.size.equalTo($size(20, 20));
              make.top.right.inset(5);
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
              make.size.equalTo(view.prev);
              make.top.right.equalTo(view.prev);
            }
          }]
        }]
      }
    },
    layout: $layout.fillSafeArea,
    events: Object.assign({}, magnetic, {
      ready: async sender => {
        if (sender.contentSize.height < sender.frame.height + 56) sender.contentSize = $size(sender.contentSize.width, sender.frame.height + 56);
        $app.listen({
          interfaceOrientation: orientation => {
            const isHorizontalScreen = orientation === 3 || orientation === 4;
            _height = isHorizontalScreen ? 44 : 100;
            if (sender.contentSize.height < sender.frame.height + 56) {
              $(id[0]).contentSize = $size(sender.contentSize.width, sender.frame.height + 56);
              $(id[1]).contentSize = $size(sender.contentSize.width, sender.frame.height + 56);
            }
            navigationBar.changeLayout("favorite.page", offsetY, false);
            $(id[0]).reload();
            $(id[1]).reload();
          }
        });
        readData(await updateData());
        $(id[6]).whenDoubleTapped(async () => {
          const spinner = new utils.Spinner();
          spinner.start();
          readData(await updateData());
          spinner.stop();
          utils.lottieAlert("checkmark");
        });
      },
      layoutSubviews: sender => sender.relayout(),
      itemSize: sender => utils.setPicSize(sender),
      didSelect: (sender, indexPath, data) => toggleChecked(indexPath.item),
      didScroll: sender => {
        offsetY = sender.contentOffset.y;
        $(id[0]).contentOffset = $point(0, offsetY);
        navigationBar.changeLayout("favorite.page", offsetY, true);
      }
    })
  }];
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
