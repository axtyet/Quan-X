const app = require("./app");
const utils = require("./utils");
const spinner = require("./spinner");
const database = require("./database");

exports.init = data => {
  const id = [
    "video.info.container.view",
    "video.info.container.blank.view",
    "video.info.container.scroll",
    "video.info.container.blur",
    "video.info.pic.container",
    "video.info.pointer.view",
    "video.info.scroll.occluder"
  ];
  const viewController = utils.window;
  const viewHeight = parseInt(viewController.frame.width < viewController.frame.height ? viewController.frame.width : viewController.frame.height) + 20;

  const scrollEnd = sender => {
    sender.scrollToOffset($point(0, sender.contentOffset.y <= 0 ? 0 : viewHeight));
    if (sender.contentOffset.y <= 0 && $(id[0])) $(id[0]).remove();
  };

  const favorites = database.favorites.query();
  data.favorite = favorites.some(item => item.id === data.id) ? 1 : 0;

  viewController.add({
    type: "view",
    props: {id: id[0]},
    layout: $layout.fill,
    events: {
      layoutSubviews: sender => {
        sender.relayout();
        $(id[2]).contentSize = $size(sender.frame.width, viewHeight * 2);
      }
    },
    views: [{
      type: "view",
      props: {
        id: id[1],
        bgcolor: $color($rgba(0, 0, 0, 0.25), $rgba(0, 0, 0, 0.4)),
        alpha: 0
      },
      layout: $layout.fill,
      events: {
        tapped: sender => {
          if (!$(id[2]).tracking) $(id[2]).scrollToOffset($point(0, 0));
        }
      }
    },
    {
      type: "scroll",
      props: {
        id: id[2],
        showsHorizontalIndicator: false,
        showsVerticalIndicator: false,
        pagingEnabled: true,
        bounces: false
      },
      layout: (make, view) => {
        make.height.equalTo(viewHeight);
        make.left.right.inset(0);
        make.bottom.inset(-20);
      },
      events: {
        ready: sender => sender.scrollToOffset($point(0, viewHeight)),
        didScroll: sender => {
          const offset = parseFloat((sender.contentOffset.y / (sender.frame.height)).toFixed(2));
          const scrollLock = sender.contentOffset.y > viewHeight;
          if (scrollLock) sender.contentOffset = $point(0, viewHeight);
          if ($(id[1])) $(id[1]).alpha = offset <= 0 ? 0 : offset >= 1 ? 1 : offset;
          if ($(id[5])) $(id[5]).alpha = offset <= 0 ? 0 : offset >= 1 ? 1 : offset;
          $(id[6]).updateLayout((make, view) => make.height.equalTo(viewHeight - sender.contentOffset.y));
          $(id[6]).relayout();
        },
        didEndDecelerating: sender => scrollEnd(sender),
        didEndScrollingAnimation: sender => scrollEnd(sender)
      },
      views: [{
        type: "blur",
        props: {
          id: id[3],
          style: 8,
          cornerRadius: 10,
          smoothCorners: true
        },
        layout: (make, view) => {
          make.size.equalTo(view.super);
          make.top.equalTo(viewHeight);
          make.left.inset(0);
        },
        views: [{
          type: "view",
          props: {id: id[5]},
          layout: (make, view) => {
            make.size.equalTo($size(60, 25));
            make.top.inset(0);
            make.centerX.equalTo(view.super);
          },
          events: Object.assign({}, utils.tapped(() => {
            if (!$(id[2]).tracking) $(id[2]).scrollToOffset($point(0, 0));
          })),
          views: [{
            type: "view",
            props: {
              circular: true,
              smoothCorners: true,
              bgcolor: $color("systemSecondaryLabel")
            },
            layout: make => make.edges.inset(10)
          }]
        },
        {
          type: "scroll",
          layout: (make, view) => {
            make.top.equalTo(view.prev.bottom);
            make.left.equalTo(viewController.safeAreaLeft);
            make.right.equalTo(viewController.safeAreaRight);
            make.bottom.equalTo(viewController.safeAreaBottom);
          },
          events: {
            layoutSubviews: sender => {
              sender.relayout();
              sender.contentSize = $size(sender.frame.width, sender.frame.height);
              $("content").frame = $rect(0, 0, sender.frame.width, sender.frame.height);
            }
          },
          views: [{
            type: "scroll",
            props: {id: "content"},
            events: {
              layoutSubviews: sender => {
                sender.relayout();
                sender.contentSize = $size(sender.frame.width, sender.get("info").frame.y + sender.get("info").frame.height + 20);
              },
              didScroll: sender => sender.super.alwaysBounceVertical = sender.contentOffset.y <= 0 ? true : false
            },
            views: [{
              type: "view",
              props: {
                id: id[4],
                smoothCorners: true,
                bgcolor: $color("systemFill")
              },
              layout: (make, view) => {
                make.size.equalTo($size(140, 186));
                make.top.inset(10);
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
                make.bottom.equalTo($(id[4]));
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
                      app.updateFavoriteData(data);
                      app.updateFavoriteMark(data);
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
                make.top.equalTo($(id[4]).bottom).offset(20);
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
        }]
      }]
    },
    {
      type: "view",
      props: {id: id[6]},
      layout: (make, view) => {
        make.height.equalTo(0);
        make.top.equalTo(view.prev);
        make.left.right.inset(0);
      }
    }]
  });
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
