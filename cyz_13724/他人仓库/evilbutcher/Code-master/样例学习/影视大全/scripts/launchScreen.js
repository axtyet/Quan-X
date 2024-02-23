const utils = require("./utils");

exports.init = {
  id: [
    "launch.screen.page",
    "launch.screen.animate.view",
    "launch.screen.failure.view",
    "launch.screen.icon.view",
    "launch.screen.lottie"
  ],
  start(request, receiver, parameter) {
    let source, resp = (sender, source) => {
      if (source.data[0]) {
        receiver(0, source);
        this.stop();
      } else loadFailurePrompt();
    };
    const showLoading = () => {
      const label = "\u6b63\u5728\u8f7d\u5165";
      const labelSize = utils.sizeThatFits(label, {font: $font(12)});
      if ($(this.id[2])) $ui.animate({
        duration: 0.25,
        animation: () => $(this.id[2]).alpha = 0,
        completion: () => {
          if($(this.id[2])) $(this.id[2]).remove();
        }
      });
      $(this.id[0]).add({
        type: "view",
        props: {
          id: this.id[1],
          alpha: 0
        },
        layout: (make, view) => {
          make.width.equalTo(labelSize.width);
          make.height.equalTo(labelSize.height + 28)
          make.center.equalTo(view.super);
        },
        events: {
          ready: sender => $ui.animate({
            duration: 0.25,
            animation: () => sender.alpha = 1,
            completion: () => $(this.id[0]).add({
              type: "lottie",
              props: {
                id: this.id[4],
                src: "/assets/lottie/launch-screen.json"
              },
              layout: $layout.fill,
              events: {
                ready: sender => {
                  sender.moveToBack();
                  sender.play({
                    fromFrame: 0,
                    toFrame: 30,
                    handler: async finished => {
                      source = await request(parameter);
                      resp($(this.id[1]), source);
                    }
                  });
                }
              },
              views: [{
                type: "label",
                props: {
                  text: `Maintained by ${$addin.current.author}.`,
                  font: $font(10),
                  align: $align.center,
                  textColor: $color("systemSecondaryLabel")
                },
                layout: (make, view) => {
                  make.bottom.equalTo($ui.vc.view.safeAreaBottom).inset(10);
                  make.centerX.equalTo(view.super);
                }
              }]
            })
          })
        },
        views: [{
          type: "spinner",
          props: {
            style: 1,
            loading: true,
            color: $color("systemSecondaryLabel")
          },
          layout: (make, view) => {
            make.top.inset(0);
            make.centerX.equalTo(view.super);
          }
        },
        {
          type: "label",
          props: {
            text: label,
            font: $font(12),
            align: $align.center,
            textColor: $color("systemSecondaryLabel")
          },
          layout: (make, view) => {
            make.bottom.inset(0);
            make.centerX.equalTo(view.super);
          }
        }]
      });
    };
    const loadFailurePrompt = () => {
      const label = "\u65e0\u6cd5\u8fde\u63a5\u670d\u52a1\u5668";
      if ($(this.id[1])) $ui.animate({
        duration: 0.25,
        animation: () => $(this.id[1]).alpha = 0,
        completion: () => {
          if ($(this.id[1])) $(this.id[1]).remove();
        }
      });
      $(this.id[4]).play({
        fromFrame: 30,
        toFrame: 0,
        handler: finished => {
          $(this.id[4]).remove();
          $(this.id[0]).add({
            type: "view",
            props: {
              id: this.id[2],
              alpha: 0
            },
            layout: $layout.fill,
            events: {
              ready: sender => $ui.animate({
                duration: 0.25,
                animation: () => sender.alpha = 1
              })
            },
            views: [{
              type: "view",
              layout: (make, view) => {
                const labelSize = utils.sizeThatFits(label, {font: $font(28)});
                make.height.equalTo(labelSize.height + 70);
                make.left.right.inset(20);
                make.centerY.equalTo(view.super);
              },
              views: [{
                type: "label",
                props: {
                  text: label,
                  font: $font(28),
                  lines: 2,
                  align: $align.center,
                  textColor: utils.systemColor("gray2")
                },
                layout: (make, view) => {
                  make.left.right.inset(0);
                  make.top.equalTo(view.super);
                  make.centerX.equalTo(view.super);
                }
              },
              {
                type: "button",
                props: {
                  title: "\u91cd\u8bd5",
                  font: $font(15),
                  cornerRadius: 4,
                  smoothCorners: true,
                  borderWidth: 1.0,
                  borderColor: utils.systemColor("gray2"),
                  titleColor: utils.systemColor("gray2"),
                  bgcolor: $color("systemBackground")
                },
                layout: (make, view) => {
                  make.size.equalTo($size(120, 30));
                  make.bottom.equalTo(view.super);
                  make.centerX.equalTo(view.super);
                },
                events: {
                  themeChanged: (sender, isDarkMode) => sender.borderColor = utils.systemColor("gray2"),
                  tapped: sender => showLoading()
                }
              }]
            }]
          });
        }
      });
    };
    $ui.vc.view.add({
      type: "view",
      props: {
        id: this.id[0],
        bgcolor: $color("systemBackground")
      },
      layout: $layout.fill,
      events: {
        ready: sender => showLoading()
      }
    });
  },
  stop() {
    if ($(this.id[1])) $(this.id[1]).remove();
    if ($(this.id[2])) $(this.id[2]).remove();
    $(this.id[4]).play({
      fromFrame: 30,
      toFrame: 0,
      handler: finished => {
        $(this.id[4]).remove();
        if ($(this.id[0])) $ui.animate({
          duration: 0.25,
          animation: () => $(this.id[0]).alpha = 0,
          completion: () => $(this.id[0]).remove()
        });
      }
    });
  }
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
