const utils = require("./utils");

exports.init = ({initialTab = 0, views}) => {
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











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
