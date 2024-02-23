const utils = require("./utils");
const player = require("./player");
const picker = require("./picker");
const spinner = require("./spinner");
const database = require("./database");
const navigationBar = require("./navigationBar");

const playPage = data => {
  const id = [
    "playPage.window",
    "video.container.view",
    "playPage.container.scroll",
    "playPage.navigationBar.view",
    "video.mask.view",
    "video.playPause.mark.view",
    "video.playPause.mark.view.image",
    "video.background.fill.layer.view",
    "video.buffered.progress.view",
    "video.playback.progress.view",
    "playPage.content.tab.container",
    "playPage.content.tab",
    "playPage.matrix",
    "playPage.video.info.scroll.view",
    "playPage.navigationBar.content.tab",
    "playPage.video.bottom.separator",
    "playPage.standard.title"
  ];

  const favorites = database.favorites.query();
  data.favorite = favorites.some(item => item.id === data.id) ? 1 : 0;

  const autoPlay = data => {
    const episodes = data.play.length;
    const timeLeft = data.schedule.duration - data.schedule.watched;
    const i = data.play.findIndex(play => play.url === data.url) + 1;
    const ended = data.schedule.duration && timeLeft <= (data.ending ? data.ending : 5);
    const index = ended && i < episodes ? i : ended ? 0 : i - 1;
    data = Object.assign({}, data, {
      label: data.play[index].name,
      url: data.play[index].url,
      schedule: {
        watched: ended ? (data.opening ? data.opening : 0) : data.schedule.watched,
        duration: ended ? 0 : data.schedule.duration
      }
    });
    player.video.setMatrix(data, "play");
    player.video.container = $(id[1]);
    player.video.load(data);
    $(id[12]).scrollTo({
      indexPath: $indexPath(0, index),
      animated: false
    });
  };

  let videoHeight = $ui.vc.view.frame.width / 1.777777777777778;

  const autoLayout = sender => {
    if ($app.env !== $env.app || !sender.super || !$(player.video.id)) return;
    const window = $ui.window.frame;
    const isVerticalScreen = utils.statusBarOrientation() === 1 || utils.statusBarOrientation() === 2;
    const isHorizontalScreen = utils.statusBarOrientation() === 3 || utils.statusBarOrientation() === 4;
    player.video.rotating = true;
    videoHeight = isHorizontalScreen ? (window.height / 6 < 70 ? 70 : window.height / 6 > 150 ? 150 : parseInt(window.height / 6)) : window.width / 1.777777777777778;
    player.video.controls(false);
    $(player.video.id).cornerRadius = isHorizontalScreen ? 4 : 0;
    $(id[10]).hidden = isHorizontalScreen;
    $(id[16]).hidden = isHorizontalScreen;
    $(id[4]).hidden = isVerticalScreen;
    $(id[14]).hidden = isVerticalScreen;
    $(id[15]).hidden = isVerticalScreen;
    $(id[13]).views[0].updateLayout(make => make.top.inset(isHorizontalScreen ? videoHeight + 80 : videoHeight + 122));
    $(id[13]).views[0].relayout();
    $(id[12]).reload();
    sender.updateLayout((make, view) => make.height.equalTo(isHorizontalScreen ? videoHeight + 20 : videoHeight));
    $(id[1]).updateLayout((make, view) => {
      make.width.equalTo(isHorizontalScreen ? videoHeight * 1.777777777777778 : window.width);
      make.height.equalTo(videoHeight);
      make.left.equalTo(sender.super.safeAreaLeft).inset(isHorizontalScreen ? 16 : 0);
      utils.shadows(view, {
        color: $color(isHorizontalScreen ? "black" : "clear"),
        cornerRadius: isHorizontalScreen ? 4 : 0,
        radius: isHorizontalScreen ? 3 : 0,
        opacity: 0.18,
        offset: $size(0, 0)
      });
    });
    $(id[5]).updateLayout(make => make.centerX.equalTo(sender.super.safeAreaRight).offset(isHorizontalScreen ? -(window.height / 12 + 10) : -(window.width / 2)));
    $ui.animate({
      animation: () => sender.relayout(),
      completion: () => {
        if (isVerticalScreen) player.video.controls(true);
        player.video.rotating = false;
      }
    });
  };

  $ui.push({
    props: {
      id: id[0],
      statusBarStyle: 0,
      navBarHidden: true
    },
    events: {
      disappeared: () => updateInterfaceOrientation(),
      dealloc: () => player.video.history(player.video.histCache)
    },
    views: [navigationBar.view({
      style: 1,
      title: data.name,
      pageName: "playPage",
      subviews: [{
        type: "button",
        props: {
          symbol: "ellipsis",
          circular: true,
          tintColor: $color("systemLabel"),
          bgcolor: $color("systemFill")
        },
        layout: (make, view) => {
          make.size.equalTo($size(28, 28));
          make.right.equalTo($ui.window.safeAreaRight).inset(16);
          make.centerY.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            const playbackRates = () => $ui.menu({
              items: ["0.3x", "0.5x", "0.7x", "1.0x", "1.2x", "1.5x", "1.7x", "2.0x"],
              handler: title => player.video.playbackRates(parseFloat(title))
            });
            $ui.menu({
              items: ["\u64ad\u653e\u901f\u5ea6", "\u8df3\u8fc7\u7247\u5934\u7247\u5c3e", "\u91cd\u65b0\u52a0\u8f7d\u89c6\u9891"],
              handler: (title, index) => index === 0 ? playbackRates() : index === 1 ? picker.init(data) : player.video.reload()
            })
          }
        }
      },
      {
        type: "tab",
        props: {
          id: id[14],
          items: ["\u9009\u96c6", "\u8be6\u60c5"],
          dynamicWidth: true,
          hidden: true
        },
        layout: (make, view) => {
          const orientation = utils.statusBarOrientation();
          make.width.equalTo(orientation === 3 || orientation === 4 ? $ui.vc.view.frame.height - 52 : $ui.vc.view.frame.width - 52);
          make.height.equalTo(26);
          make.center.equalTo(view.super);
        },
        events: {
          changed: sender => {
            const i = sender.index;
            $(id[11]).index = i;
            $(id[2]).scrollToOffset($point(i ? $(id[2]).frame.width : 0, 0));
          }
        }
      }]
    }),
    {
      type: "scroll",
      props: {
        id: id[2],
        bounces: false,
        pagingEnabled: true,
        alwaysBounceVertical: false,
        alwaysBounceHorizontal: false,
        showsHorizontalIndicator: false,
        showsVerticalIndicator: false,
        hidden: $app.env !== $env.app
      },
      layout: $layout.fillSafeArea,
      events: {
        layoutSubviews: sender => sender.contentSize = $size(sender.frame.width * sender.views.length, sender.frame.height),
        willEndDragging: (sender, velocity, target) => {
          if (parseFloat($app.info.version) < 2.12) return;
          const index = target.x / sender.frame.width;
          $(id[11]).index = index;
          $(id[14]).index = index;
        },
        didEndDecelerating: sender => {
          if (parseFloat($app.info.version) > 2.11) return;
          const index = sender.contentOffset.x / sender.frame.width;
          $(id[11]).index = index;
          $(id[14]).index = index;
        }
      },
      views: [{
        type: "matrix",
        props: {
          id: id[12],
          spacing: 16,
          showsVerticalIndicator: false,
          bgcolor: $color("clear"),
          menu: {
            title: "\u5728\u5176\u5b83 App \u4e2d\u6253\u5f00",
            items: [{
              inline: true,
              items: player.apps
            },
            {
              title: "\u5206\u4eab\u94fe\u63a5",
              symbol: "square.and.arrow.up",
              handler: (sender, index, data) => {
                $share.sheet([data.url, data.name + `（${data.label.text}）`]);
              }
            }]
          },
          header: {
            type: "view",
            events: {
              height: sender => {
                const isHorizontalScreen = utils.statusBarOrientation() === 3 || utils.statusBarOrientation() === 4;
                return isHorizontalScreen ? videoHeight + 64 : videoHeight + 106;
              }
            }
          },
          template: {
            props: {bgcolor: $color("clear")},
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
              views: [{
                type: "image",
                props: {
                  src: data.pic,
                  contentMode: 0
                },
                layout: $layout.fill,
                events: {
                  layoutSubviews: sender => {
                    sender.relayout();
                    sender.get("mask").remakeLayout((make, view) => {
                      const diameter = sender.frame.width;
                      make.size.equalTo($size(parseInt(diameter * 0.33), parseInt(diameter * 0.33)));
                      make.center.equalTo(view.super);
                      utils.shadows(view, {
                        color: $color("black"),
                        cornerRadius: parseInt(diameter * 0.165),
                        radius: parseInt(diameter * 0.0825),
                        opacity: 1,
                        offset: $size(0, 0)
                      });
                    });
                  }
                },
                views: [{
                  type: "view",
                  props: {id: "mask"},
                  views: [{
                    type: "image",
                    props: {
                      id: "mark",
                      contentMode: 1,
                      tintColor: $color("white")
                    },
                    layout: $layout.fill
                  }]
                }]
              }]
            },
            {
              type: "label",
              props: {
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
        layout: (make, view) => {
          make.size.equalTo(view.super);
          make.top.left.inset(0);
        },
        events: {
          layoutSubviews: sender => sender.relayout(),
          itemSize: sender => utils.setPicSize(sender),
          didSelect: (sender, indexPath, thisItem) => {
            if (!thisItem.playing) {
              sender.data = sender.data.map((item, index) => {
                const playing = index === indexPath.item;
                return {
                  label: {
                    text: item.label.text,
                    textColor: playing ? utils.systemColor("green") : $color("systemLabel")
                  },
                  mask: {hidden: playing ? false : true},
                  mark: {symbol: "play.circle"},
                  name: thisItem.name,
                  url: item.url, playing
                };
              });
              player.video.paused = true;
              player.video.load(Object.assign({}, data, {
                label: thisItem.label.text,
                url: thisItem.url,
                schedule: {
                  watched: data.opening ? data.opening : 0,
                  duration: 0
                }
              }));
            } else player.video.paused ? player.video.play() : player.video.pause();
          }
        }
      },
      {
        type: "scroll",
        props: {
          id: id[13],
          showsVerticalIndicator: false
        },
        layout: (make, view) => {
          make.size.equalTo(view.super);
          make.top.inset(0);
          make.left.equalTo(view.prev.right);
        },
        events: {
          layoutSubviews: sender => {
            sender.relayout();
            sender.contentSize = $size(sender.frame.width, sender.get("info").frame.y + sender.get("info").frame.height + 20);
            sender.super.contentOffset = $point($(id[14]).index ? sender.frame.width : 0, 0);
          }
        },
        views: [{
          type: "view",
          props: {
            smoothCorners: true,
            bgcolor: $color("systemFill")
          },
          layout: (make, view) => {
            const isHorizontalScreen = utils.statusBarOrientation() === 3 || utils.statusBarOrientation() === 4;
            make.size.equalTo($size(140, 186));
            make.top.inset(isHorizontalScreen ? videoHeight + 80 : videoHeight + 122);
            make.left.inset(16);
            utils.shadows(view, {
              color: $color("black"),
              cornerRadius: 5,
              radius: 3,
              opacity: 0.5,
              offset: $size(1, 1)
            });
          },
          views: [spinner.init(), {
            type: "image",
            props: {
              src: data.pic,
              contentMode: 0,
              cornerRadius: 5 - (1 / $device.info.screen.scale),
              smoothCorners: true
            },
            layout: (make, view) => make.edges.inset(2 / $device.info.screen.scale),
            views: [{
              type: "view",
              props: {
                id: "mask",
                alpha: data.remarks ? 1 : 0,
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
                  text: data.remarks,
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
            },
            {
              type: "gradient",
              props: {
                colors: [
                  $rgba(255, 255, 255, 0.22),
                  $rgba(0, 0, 0, 0.1)
                ],
                locations: [0.0, 1.0],
                startPoint: $point(0, 0),
                endPoint: $point(1, 1)
              },
              layout: $layout.fill
            }]
          }]
        },
        {
          type: "label",
          props: {
            text: data.name,
            lines: 2,
            font: $font("bold", 16),
            textColor: $color("systemLabel")
          },
          layout: (make, view) => {
            make.width.equalTo(view.super).offset(-188);
            make.top.equalTo(view.prev);
            make.left.equalTo(view.prev.right).inset(16);
          }
        },
        {
          type: "label",
          props: {
            text: data.director,
            font: $font(12),
            textColor: $color("systemSecondaryLabel")
          },
          layout: (make, view) => {
            make.width.equalTo(view.prev);
            make.top.equalTo(view.prev.bottom).offset(8);
            make.left.equalTo(view.prev);
          }
        },
        {
          type: "label",
          props: {
            text: data.actor,
            font: $font(12),
            lines: 2,
            textColor: $color("systemSecondaryLabel")
          },
          layout: (make, view) => {
            make.width.equalTo(view.prev);
            make.top.equalTo(view.prev.bottom).offset(6);
            make.left.equalTo(view.prev);
          }
        },
        {
          type: "label",
          props: {
            text: data.year,
            font: $font(12),
            textColor: $color("systemSecondaryLabel")
          },
          layout: (make, view) => {
            make.width.equalTo(view.prev);
            make.top.equalTo(view.prev.bottom).offset(6);
            make.left.equalTo(view.prev);
          }
        },
        {
          type: "label",
          props: {
            text: data.type,
            font: $font(12),
            lines: 2,
            textColor: $color("systemSecondaryLabel")
          },
          layout: (make, view) => {
            make.width.equalTo(view.prev);
            make.top.equalTo(view.prev.bottom).offset(6);
            make.left.equalTo(view.prev);
          }
        },
        {
          type: "button",
          props: {
            title: data.favorite ? "\u5df2\u6536\u85cf" : "\u6536\u85cf",
            font: $font(13),
            cornerRadius: 2,
            smoothCorners: true,
            titleColor: $color("white"),
            bgcolor: utils.systemColor(data.favorite ? "blue" : "gray")
          },
          layout: (make, view) => {
            const size = utils.sizeThatFits(view.title, {font: $font(13)});
            make.width.equalTo(size.width + 28);
            make.height.equalTo(28);
            make.left.equalTo(view.prev);
            make.bottom.equalTo(view.super.views[0]);
          },
          events: {
            tapped: sender => {
              const title = data.favorite ? "\u6536\u85cf" : "\u5df2\u6536\u85cf";
              const size = utils.sizeThatFits(title, {font: $font(13)});
              sender.relayout();
              sender.updateLayout(make => make.width.equalTo(size.width + 28));
              $ui.animate({
                duration: 0.25,
                animation: () => {
                  sender.relayout();
                  sender.title = title;
                  sender.bgcolor = utils.systemColor(data.favorite ? "gray" : "blue");
                },
                completion: () => {
                  data.favorite = data.favorite ? 0 : 1;
                  data.favorite ? database.favorites.insert(data) : database.favorites.remove(data.id);
                  updateFavoriteData(data);
                  updateFavoriteMark(data);
                }
              });
            }
          }
        },
        {
          type: "view",
          props: {
            alpha: data.info ? 1 : 0
          },
          layout: (make, view) => {
            make.width.equalTo(view.super).offset(-32);
            make.height.equalTo(16);
            make.top.equalTo(view.super.views[0].bottom).offset(20);
            make.left.inset(16);
          },
          views: [{
            type: "label",
            props: {
              text: "\u7b80\u4ecb",
              font: $font(13),
              textColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => {
              make.left.inset(0);
              make.centerY.equalTo(view.super);
            }
          },
          {
            type: "view",
            props: {
              bgcolor: $color("systemSeparator")
            },
            layout: (make, view) => {
              make.height.equalTo(1 / $device.info.screen.scale);
              make.left.equalTo(view.prev.right).inset(4);
              make.right.bottom.inset(0);
            }
          }]
        },
        {
          type: "label",
          props: {
            id: "info",
            text: data.info,
            font: $font(14),
            lineSpacing: 20,
            lines: 0,
            textColor: $color("systemLabel")
          },
          layout: (make, view) => {
            make.width.equalTo(view.super).offset(-32);
            make.top.equalTo(view.prev.bottom).inset(4);
            make.left.equalTo(view.prev);
          }
        }]
      }]
    },
    {
      type: "view",
      props: {clipsToBounds: true},
      layout: (make, view) => {
        make.height.equalTo($app.env !== $env.app ? view.super : videoHeight);
        make.top.equalTo($(id[3]).bottom);
        make.left.right.inset(0);
      },
      views: [{
        type: "view",
        props: {
          id: id[7],
          bgcolor: $color("systemSecondaryBackground")
        },
        layout: $layout.fill,
        events: {
          ready: sender => sender.setNeedsLayout(),
          layoutSubviews: sender => autoLayout(sender.super)
        }
      },
      {
        type: "view",
        props: {
          id: id[8],
          cornerRadius: 4,
          smoothCorners: true,
          userInteractionEnabled: false,
          bgcolor: $color("systemQuaternaryFill")
        },
        layout: (make, view) => {
          make.width.equalTo(0);
          make.top.left.bottom.inset(0);
        }
      },
      {
        type: "view",
        props: {
          id: id[9],
          userInteractionEnabled: false,
          smoothCorners: true,
          bgcolor: $color("lime")
        },
        layout: (make, view) => {
          make.width.equalTo(0);
          make.top.left.bottom.inset(0);
          utils.shadows(view, {
            color: $color("green"),
            cornerRadius: 4,
            radius: 3,
            opacity: 0.6,
            offset: $size(1, 0)
          });
        }
      },
      {
        type: "view",
        props: {id: id[5]},
        layout: (make, view) => {
          make.size.equalTo($size(40, 40));
          make.center.equalTo(view.super);
          utils.shadows(view, {
            color: $color("black"),
            cornerRadius: 20,
            radius: 3,
            opacity: 0.5,
            offset: $size(0, 0)
          });
        },
        events: Object.assign({}, utils.tapped(() => player.video.paused ? player.video.play() : player.video.pause())),
        views: [{
          type: "image",
          props: {
            id: id[6],
            contentMode: 1,
            symbol: "play.circle.fill",
            tintColor: $color("systemLabel")
          },
          layout: $layout.fill
        }]
      },
      {
        type: "view",
        props: {
          id: id[1],
          smoothCorners: true,
          bgcolor: $color("black")
        },
        layout: (make, view) => {
          const vcFrame = $ui.vc.view.frame;
          make.width.equalTo(vcFrame.width);
          make.height.equalTo($app.env !== $env.app ? view.super : vcFrame.width / 1.777777777777778);
          make.left.equalTo($ui.window.safeAreaLeft);
          make.centerY.equalTo(view.super);
        },
        events: Object.assign({}, utils.tapped(() => player.video.enterFullScreen()), {
          ready: sender => autoPlay(data)
        }),
        views: [{
          type: "view",
          props: {
            id: id[4],
            hidden: true
          },
          layout: $layout.fill,
        }]
      }]
    },
    {
      type: "view",
      props: {
        id: id[15],
        hidden: true,
        bgcolor: $color("separatorColor")
      },
      layout: (make, view) => {
        make.height.equalTo(1 / $device.info.screen.scale);
        make.top.equalTo(view.prev.bottom);
        make.left.right.inset(0);
      }
    },
    {
      type: "view",
      props: {
        id: id[10],
        bgcolor: $color("primarySurface"),
        hidden: $app.env !== $env.app
      },
      layout: (make, view) => {
        make.height.equalTo(62);
        make.top.equalTo(view.prev);
        make.left.right.inset(0);
      },
      views: [{
        type: "tab",
        props: {
          id: id[11],
          items: ["\u9009\u96c6", "\u8be6\u60c5"],
          dynamicWidth: true
        },
        layout: (make, view) => {
          make.top.bottom.inset(16);
          make.left.equalTo($ui.window.safeAreaLeft).inset(16);
          make.right.equalTo($ui.window.safeAreaRight).inset(16);
        },
        events: {
          changed: sender => {
            const i = sender.index;
            $(id[14]).index = i;
            $(id[2]).scrollToOffset($point(i ? $(id[2]).frame.width : 0, 0));
          }
        }
      }]
    }]
  });
};

const reverseData = data => Object.assign({}, deleteObjectKeys(data, "label", "url", "opening", "ending", "schedule"), {
  pic: {
    src: data.pic
  },
  mask: {
    alpha: data.remarks ? 1 : 0
  },
  heart: {
    hidden: data.favorite ? false : true
  },
  remarks: {
    text: data.remarks
  },
  name: {
    text: data.name
  },
  director: {
    text: data.director
  },
  actor: {
    text: data.actor
  },
  year: {
    text: data.year
  },
  type: {
    text: data.type
  }
});

const transformData = data => {
  if (!data) return;
  const history = player.video.histCache;
  const i = history.findIndex(item => item.id === data.id);
  return {
    id: data.id,
    favorite: data.favorite,
    remarks: data.remarks.text,
    name: data.name.text,
    director: data.director.text,
    actor: data.actor.text,
    year: data.year.text,
    type: data.type.text,
    pic: data.pic.src,
    info: data.info,
    play: data.play,
    down: data.down,
    label: i !== -1 ? history[i].label : data.play[0].name,
    url: i !== -1 ? history[i].url : data.play[0].url,
    opening: i !== -1 ? history[i].opening : 0,
    ending: i !== -1 ? history[i].ending : 0,
    schedule: {
      watched: i !== -1 ? history[i].schedule.watched : 0,
      duration: i !== -1 ? history[i].schedule.duration : 0
    }
  };
};

const deleteObjectKeys = (object, ...keys) => {
  keys.forEach(key => {
    delete object[key];
  });
  return object;
};

const updateFavoriteData = data => [
  $("favorite.page.matrix"),
  $("favorite.page.check.matrix")
].forEach(item => {
  const editSwitch = $("favorite.page.edit.switch.button");
  data.favorite ? item.insert({
    indexPath: $indexPath(0, 0),
    value: Object.assign({}, reverseData(data), {
      favorite: 1,
      heart: {
        hidden: false
      }
    })
  }) : item.delete(item.data.findIndex(item => item.id === data.id));
  $delay(0.2, () => {
    editSwitch.titleColor = $color(item.data[0] ? "systemLabel" : "systemTertiaryLabel");
    editSwitch.userInteractionEnabled = item.data[0] ? true : false;
  });
});

const updateFavoriteMark = data => [
  $("home.content.matrix")
].forEach(page => {
  if (page) page.data = page.data.map((item, index) => Object.assign({}, item, {
    heart: {
      hidden: item.id === data.id ? !data.favorite : item.heart.hidden
    }
  }));
});

const updateInterfaceOrientation = () => $app.notify({
  name: "interfaceOrientation",
  object: utils.statusBarOrientation()
});

module.exports = {
  playPage,
  reverseData,
  transformData,
  deleteObjectKeys,
  updateFavoriteData,
  updateFavoriteMark,
  updateInterfaceOrientation
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
