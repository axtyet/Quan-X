const app = require("./app");
const api = require("./api");
const utils = require("./utils");
const player = require("./player");
const spinner = require("./spinner");
const database = require("./database");

exports.init = () => {
  let history = player.video.histCache;
  const updateList = async () => {
    const request = history.map(async item => {
      const resp = await api.request(api.detail + "&ids=" + item.id);
      return resp.data[0] ? app.transformData(resp.data[0]) : item;
    });
    return await Promise.all(request);
  };
  $ui.render({
    props: {
      id: "widget",
      navBarHidden: true
    },
    views: [{
      type: "list",
      layout: $layout.fillSafeArea,
      props: {
        id: "widget.list",
        style: 0,
        rowHeight: 110,
        pagingEnabled: true,
        separatorHidden: true,
        bgcolor: $color("clear"),
        template: {
          props: {
            bgcolor: $color("clear")
          },
          views: [{
            type: "view",
            props: {
              smoothCorners: true,
              bgcolor: $color("systemFill")
            },
            layout: (make, view) => {
              make.width.equalTo(90 / 1.33333333);
              make.height.equalTo(90);
              make.left.inset(10);
              make.centerY.equalTo(view.super);
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
                  make.height.equalTo(20);
                  make.left.bottom.inset(0);
                },
                views: [{
                  type: "label",
                  props: {
                    id: "remarks",
                    font: $font(10),
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
              id: "name",
              lines: 2,
              font: $font("bold", 16),
              textColor: $color("systemLabel")
            },
            layout: (make, view) => {
              make.top.equalTo(view.prev);
              make.left.equalTo(view.prev.right).offset(10);
              make.right.inset(10);
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
            type: "image",
            props: {
              id: "arrow",
              symbol: "chevron.right",
              contentMode: 1,
              tintColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => {
              make.size.equalTo($size(18, 18));
              make.right.inset(10);
              make.centerY.equalTo(view.super);
            }
          }]
        },
        actions: [{
          title: "delete",
          handler: (sender, indexPath) => {
            const i = indexPath.item;
            history = player.video.histCache;
            database.history.remove(history[i].id);
            history.splice(i, 1);
            $delay(0.4, () => player.video.history(history));
          }
        }]
      },
      events: {
        ready: async sender => {
          $ui.window.add({
            type: "lottie",
            props: {
              id: "widget.loading.lottie",
              src: "/assets/lottie/list-loading.json",
              loop: true,
              contentMode: 0
            },
            layout: make => make.edges.inset(-40),
            events: {
              ready: sender => sender.play()
            }
          });
          history = await updateList();
          player.video.history(history);
          $("widget.loading.lottie").remove();
        },
        didSelect: (sender, indexPath) => {
          history = player.video.histCache;
          const data = history[indexPath.item];
          app.playPage(data);
          database.history.insert(data);
          history.unshift(history.splice(indexPath.item, 1)[0] = data);
          player.video.history(history);
        },
        didEndDecelerating: sender => $device.taptic()
      }
    }]
  });
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
