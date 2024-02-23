const utils = require("./utils");
const player = require("./player");

exports.init = data => {
  const id = [
    "picker.pageFill.view",
    "picker.background.view",
    "picker.navbar.view",
    "picker.navbar.separator.view",
    "picker.navbar.openimgTime.label",
    "picker.navbar.endimgTime.label",
    "picker.toast.label"
  ];

  const frame = utils.window.frame;
  const _width = $device.info.model.includes("iPad") ? 400 : (frame.width < frame.height ? frame.width : frame.height) - 14, _height = 280;

  const closePicker = () => {
    $(id[1]).relayout();
    $(id[1]).remakeLayout((make, view) => {
      make.width.equalTo(_width);
      make.height.equalTo(_height);
      make.top.equalTo(view.super.bottom);
      make.centerX.equalTo(view.super);
    });
    $ui.animate({
      duration: 0.25,
      animation: () => {
        $(id[1]).relayout();
        $(id[1]).prev.alpha = 0;
      },
      completion: () => $(id[0]).remove()
    });
  };

  const schedule = superview => {
    const textsize = utils.sizeThatFits("00:0000:00", {
      font: $font(16)
    });
    superview.add({
      type: "view",
      props: {
        cornerRadius: 6,
        smoothCorners: true,
        bgcolor: $color("systemSecondaryFill")
      },
      layout: (make, view) => {
        make.size.equalTo($size(textsize.width + 41, 30));
        make.center.equalTo($(id[2]));
      },
      events: {
        touchesBegan: sender => {
          if ($(id[6])) $(id[6]).remove();
          $(id[0]).add({
            type: "view",
            props: {
              id: id[6],
              smoothCorners: true,
              alpha: 0,
              bgcolor: $color("systemSecondaryBackground")
            },
            layout: (make, view) => {
              make.width.equalTo(sender.frame.width);
              make.height.equalTo(sender.frame.height);
              make.top.equalTo(view.prev).inset(7);
              make.centerX.equalTo(view.prev);
              utils.shadows(view, {
                color: $color("black"),
                cornerRadius: 6,
                radius: 3,
                opacity: 0.2,
                offset: $size(0, 0)
              });
            },
            events: {
              ready: sender => {
                sender.relayout();
                sender.updateLayout((make, view) => make.top.equalTo(sender.prev).inset(-50));
                $ui.animate({
                  duration: 0.25,
                  animation: () => {
                    sender.alpha = 1;
                    sender.relayout();
                  }
                });
              }
            },
            views: [{
              type: "view",
              props: {
                cornerRadius: 6,
                smoothCorners: true,
                bgcolor: $color("systemSecondaryFill")
              },
              layout: $layout.fill,
              views: [{
                type: "view",
                props: {
                  bgcolor: $color("systemGray2")
                },
                layout: (make, view) => {
                  make.size.equalTo($size(1, 16));
                  make.center.equalTo(view.super);
                }
              },
              {
                type: "label",
                props: {
                  text: player.video.timeDisplay(data.opening),
                  font: $font(16),
                  align: $align.center,
                  textColor: $color(data.opening ? "systemLabel" : "systemSecondaryLabel")
                },
                layout: (make, view) => {
                  make.width.equalTo(textsize.width / 2 + 20);
                  make.left.centerY.equalTo(view.super);
                }
              },
              {
                type: "label",
                props: {
                  text: player.video.timeDisplay(data.ending),
                  font: $font(16),
                  align: $align.center,
                  textColor: $color(data.ending ? "systemLabel" : "systemSecondaryLabel")
                },
                layout: (make, view) => {
                  make.width.equalTo(textsize.width / 2 + 20);
                  make.right.centerY.equalTo(view.super);
                }
              }]
            }]
          });
          $ui.animate({
            duration: 0.25,
            animation: () => sender.scale(0.9)
          });
        },
        touchesEnded: sender => {
          if ($(id[6])) {
            $(id[6]).relayout();
            $(id[6]).updateLayout((make, view) => make.top.equalTo(view.prev).inset(7));
            $ui.animate({
              duration: 0.25,
              animation: () => {
                sender.scale(1);
                $(id[6]).alpha = 0;
                $(id[6]).relayout();
              },
              completion: () => $(id[6]).remove()
            });
          }
        }
      },
      views: [{
        type: "view",
        props: {
          id: id[3],
          bgcolor: $color("systemGray2")
        },
        layout: (make, view) => {
          make.size.equalTo($size(1, 16));
          make.center.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          id: id[4],
          text: "00:00",
          font: $font(16),
          align: $align.center,
          textColor: $color("systemSecondaryLabel")
        },
        layout: (make, view) => {
          make.width.equalTo(textsize.width / 2 + 20);
          make.left.centerY.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          id: id[5],
          text: "00:00",
          font: $font(16),
          align: $align.center,
          textColor: $color("systemSecondaryLabel")
        },
        layout: (make, view) => {
          make.width.equalTo(textsize.width / 2 + 20);
          make.right.centerY.equalTo(view.super);
        }
      }]
    });
  };

  let userInteractionEnabled = true;
  const feedbackAnimate = () => {
    if (!userInteractionEnabled) return;
    userInteractionEnabled = false;
    $(id[1]).relayout();
    $(id[1]).updateLayout((make, view) => make.centerX.equalTo(view.super).offset(-7));
    $ui.animate({
      duration: 0.1,
      animation: () => $(id[1]).relayout(),
      completion: () => {
        $device.taptic(1);
        $(id[1]).updateLayout((make, view) => make.centerX.equalTo(view.super).offset(7));
        $ui.animate({
          duration: 0.2,
          animation: () => $(id[1]).relayout(),
          completion: () => {
            $device.taptic(1);
            $(id[1]).updateLayout((make, view) => make.centerX.equalTo(view.super).offset(0));
            $ui.animate({
              duration: 0.1,
              animation: () => $(id[1]).relayout(),
              completion: () => userInteractionEnabled = true
            });
          }
        });
      }
    });
  };

  const items = Array(4).fill(Array.from(Array(60).keys()).map(num => String(num).length === 1 ? "0" + num : num.toString()));

  let opening = 0, ending = 0;
  utils.window.add({
    type: "view",
    props: {id: id[0]},
    layout: $layout.fill,
    views: [{
      type: "view",
      props: {
        alpha: 0,
        bgcolor: $color($rgba(0, 0, 0, 0.25), $rgba(0, 0, 0, 0.4))
      },
      layout: $layout.fill,
      events: {
        touchesBegan: () => feedbackAnimate()
      }
    },
    {
      type: "view",
      props: {
        id: id[1],
        smoothCorners: true,
        bgcolor: $color("systemSecondaryBackground")
      },
      layout: (make, view) => {
        make.width.equalTo(_width);
        make.height.equalTo(_height);
        make.top.equalTo(view.super.bottom);
        make.centerX.equalTo(view.super);
        utils.shadows(view, {
          color: $color("black"),
          cornerRadius: 15,
          radius: 3,
          opacity: 0.2,
          offset: $size(0, 0)
        });
      },
      events: {
        ready: sender => {
          schedule(sender);
          sender.relayout();
          sender.remakeLayout((make, view) => {
            make.width.equalTo(_width);
            make.height.equalTo(_height);
            make.centerX.equalTo(view.super);
            make.bottom.equalTo(utils.window.safeAreaBottom).inset(7);
          });
          $ui.animate({
            duration: 0.25,
            animation: () => {
              sender.relayout();
              sender.prev.alpha = 1;
            }
          });
        }
      },
      views: [{
        type: "view",
        props: {id: id[2]},
        layout: (make, view) => {
          make.height.equalTo(44);
          make.top.left.right.inset(0);
        }
      },
      {
        type: "button",
        props: {
          title: "\u53d6\u6d88",
          font: $font("bold", 17),
          titleColor: $color("systemLabel"),
          bgcolor: $color("clear")
        },
        layout: (make, view) => {
          make.size.equalTo($size(64, 44));
          make.top.left.inset(0);
        },
        events: {
          tapped: sender => closePicker()
        }
      },
      {
        type: "button",
        props: {
          title: "\u5b8c\u6210",
          font: $font("bold", 17),
          titleColor: $color("systemLabel"),
          bgcolor: $color("clear")
        },
        layout: (make, view) => {
          make.size.equalTo($size(64, 44));
          make.top.right.inset(0);
        },
        events: {
          tapped: sender => {
            player.video.opening = opening;
            player.video.ending = ending;
            data.opening = opening;
            data.ending = ending;
            closePicker();
            utils.lottieAlert("checkmark");
            $ui.success(!opening && !ending ? "\u5df2\u53d6\u6d88\u8df3\u8fc7\u7247\u5934\u7247\u5c3e" : `\u8df3\u8fc7\u7247\u5934 ${$(id[4]).text} \u7247\u5c3e ${$(id[5]).text}`, 3);
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
          make.top.equalTo($(id[2]).bottom);
          make.left.right.inset(0);
        }
      },
      {
        type: "picker",
        props: {items},
        layout: (make, view) => {
          make.top.equalTo(view.prev.bottom);
          make.left.right.bottom.inset(0);
        },
        events: {
          ready: sender => sender.add({
            type: "view",
            props: {
              bgcolor: sender.views[1].bgcolor
            },
            layout: (make, view) => {
              make.width.equalTo(sender.views[1].frame.height);
              make.top.equalTo(sender.views[1].bottom);
              make.bottom.equalTo(sender.views[2].top);
              make.centerX.equalTo(view.super);
            }
          }),
          changed: sender => {
            const data = sender.data;
            opening = parseInt(data[0] * 60) + parseInt(data[1]);
            ending = parseInt(data[2] * 60) + parseInt(data[3]);
            $(id[4]).text = `${data[0]}:${data[1]}`;
            $(id[5]).text = `${data[2]}:${data[3]}`;
            $(id[4]).textColor = $color(opening ? "systemLabel" : "systemSecondaryLabel");
            $(id[5]).textColor = $color(ending ? "systemLabel" : "systemSecondaryLabel");
          }
        }
      }]
    }]
  });
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
