const app = require("./app");
const api = require("./api");
const utils = require("./utils");
const spinner = require("./spinner");
const message = require("./message");
const database = require("./database");

let extend, setExtend = resp => extend = resp;

const init = () => {
  const id = [
    "searchPage.background.blur",
    "searchPage.list",
    "searchPage.list.header",
    "searchHist.clear.button",
    "searchHist.matrix",
    "home.navbar.blur",
    "searchBar.input",
    "home.navbar.tab.view",
    "searchPage.list.footer.label",
    "searchPage.list.footer.spinner",
    "searchPage.list.footer.link"
  ];

  const loadAnimate = loading => {
    $(id[loading ? 9 : 8]).hidden = false;
    $ui.animate({
      duration: 0.25,
      animation: () => {
        $(id[loading ? 8 : 9]).alpha = 0;
        $(id[loading ? 9 : 8]).alpha = 1;
      },
      completion: () => $(id[loading ? 8 : 9]).hidden = true
    });
  };

  const hist = database.search.query();
  const timestamp = new Date().valueOf();
  if (!$(id[0])) $ui.window.add({
    type: "blur",
    props: {
      id: id[0],
      info: timestamp,
      style: 8,
      alpha: 0
    },
    layout: (make, view) => {
      make.top.equalTo($(id[7])).offset(48);
      make.left.right.bottom.inset(0);
    },
    events: {
      ready: sender => {
        sender.relayout();
        sender.updateLayout((make, view) => make.top.equalTo($(id[7])));
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
      type: "list",
      layout: (make, view) => {
        make.top.inset(0);
        make.left.equalTo($ui.window.safeAreaLeft);
        make.right.equalTo($ui.window.safeAreaRight);
        make.bottom.equalTo($ui.window.safeAreaBottom);
      },
      props: {
        id: id[1],
        style: 1,
        rowHeight: 148,
        sectionTitleHeight: 32,
        separatorInset: $insets(0, 16, 0, 0),
        separatorColor: $color("systemSeparator"),
        bgcolor: $color("clear"),
        header: {
          type: "view",
          props: {id: id[2]},
          views: [{
            type: "view",
            layout: (make, view) => {
              make.width.equalTo(view.super);
              make.height.equalTo(32);
              make.top.inset(8);
            },
            views: [{
              type: "label",
              props: {
                text: "\u641c\u7d22\u5386\u53f2",
                align: $align.center,
                font: $font(13),
                textColor: $color("systemSecondaryLabel")
              },
              layout: (make, view) => {
                make.left.inset(16);
                make.centerY.equalTo(view.super);
              }
            },
            {
              type: "button",
              props: {
                id: id[3],
                contentMode: 1,
                symbol: "trash",
                tintColor: $color("systemSecondaryLabel"),
                bgcolor: $color("clear")
              },
              layout: (make, view) => {
                make.size.equalTo($size(15, 15));
                make.right.inset(16);
                make.centerY.equalTo(view.super);
              },
              events: {
                tapped: sender => {
                  $ui.alert({
                    title: "\u786e\u5b9a\u8981\u5220\u9664\u641c\u7d22\u5386\u53f2\u8bb0\u5f55\u5417？",
                    actions: [{
                      title: "\u5220\u9664",
                      style: 2,
                      handler: () => {
                        database.search.remove();
                        $(id[4]).data = [];
                        $(id[2]).hidden = true;
                        $(id[2]).frame = $rect(0, 0, $(id[1]).frame.width, 0);
                        $(id[1]).reload();
                      }
                    },
                    {
                      style: 1,
                      title: "\u53d6\u6d88"
                    }]
                  });
                }
              }
            }]
          },
          {
            type: "matrix",
            props: {
              id: id[4],
              spacing: 10,
              bgcolor: $color("clear"),
              template: {
                props: {
                  bgcolor: $color("clear")
                },
                views: [{
                  type: "label",
                  props: {
                    align: $align.center,
                    font: $font(13),
                    cornerRadius: 4,
                    smoothCorners: true,
                    textColor: $color("systemLabel"),
                    bgcolor: $color("systemTertiaryFill")
                  },
                  layout: $layout.fill
                }]
              },
              data: hist.map(item => {
                return {
                  label: {text: item.label}
                }
              })
            },
            layout: (make, view) => {
              make.top.equalTo(view.prev.bottom);
              make.left.right.inset(6);
              make.bottom.inset(0);
            },
            events: {
              layoutSubviews: sender => {
                sender.relayout();
                $(id[2]).frame = $rect(0, 0, $(id[1]).frame.width, sender.contentSize.height + 40 >= 210 ? 210 : sender.contentSize.height + 40);
                $(id[2]).hidden = sender.contentSize.height && sender.data[0] ? false : true;
                $(id[1]).reload();
              },
              itemSize: (sender, indexPath) => {
                const text = sender.data[indexPath.item].label.text;
                const cellTextSize = utils.sizeThatFits(text, {
                  font: $font(13),
                  size: {
                    width: sender.frame.width - 40,
                    height: sender.frame.height
                  }
                });
                return $size(Math.round(cellTextSize.width + 20), 30);
              },
              didSelect: async (sender, indexPath, data) => {
                $(id[6]).text = data.label.text;
                $(id[6]).blur();
                const resp = await request(data.label.text);
                const _Null = !resp.data[0];
                $(id[1]).data = _Null ? [] : [{
                  title: "\u641c\u7d22\u7ed3\u679c",
                  rows: resp.data
                }];
                $(id[8]).text = 1 + "／" + resp.pagecount;
                $(id[8]).hidden = resp.pagecount ? false : true;
                $(id[10]).hidden = _Null && !resp.error ? false : true;
                $(id[1]).endFetchingMore();
                setExtend(resp);
              },
              didLongPress: (sender, indexPath, data) => {
                $device.taptic(1);
                $ui.alert({
                  title: `\u786e\u5b9a\u8981\u5220\u9664“${data.label.text}”\u5417？`,
                  actions: [{
                    title: "\u5220\u9664",
                    style: 2,
                    handler: async () => {
                      sender.delete($indexPath(0, indexPath.item));
                      database.search.remove(data.label.text);
                      await $wait(0.4);
                      $(id[2]).hidden = !sender.data[0];
                      $(id[2]).frame = $rect(0, 0, $(id[1]).frame.width, sender.contentSize.height + 40 <= 60 ? 0 : sender.contentSize.height + 40 >= 210 ? 210 : sender.contentSize.height + 40);
                      $(id[1]).reload();
                    }
                  },
                  {
                    style: 1,
                    title: "\u53d6\u6d88"
                  }]
                });
              }
            }
          }]
        },
        footer: {
          type: "view",
          props: {height: 40},
          views: [{
            type: "view",
            props: {
              id: id[10],
              hidden: true
            },
            layout: (make, view) => {
              make.width.equalTo(115);
              make.height.equalTo(view.super);
              make.center.equalTo(view.super);
            },
            views: [{
              type: "label",
              props: {
                text: "\u641c\u7d22\u4e0d\u5230？",
                font: $font(14),
                align: $align.left,
                textColor: $color("systemSecondaryLabel")
              },
              layout: (make, view) => {
                make.left.equalTo(view.super);
                make.centerY.equalTo(view.super);
              }
            },
            {
              type: "button",
              props: {
                title: "\u53bb\u7559\u8a00",
                font: $font(14),
                align: $align.right,
                titleColor: $color("systemLink"),
                bgcolor: $color("clear")
              },
              layout: (make, view) => {
                make.right.equalTo(view.super);
                make.centerY.equalTo(view.super);
              },
              events: {
                tapped: sender => message.init()
              }
            }]
          },
          {
            type: "spinner",
            props: {
              id: id[9],
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
              id: id[8],
              font: $font(13),
              align: $align.center,
              textColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => make.center.equalTo(view.super)
          }]
        },
        template: {
          props: {bgcolor: $color("clear")},
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
              id: "director",
              font: $font(12),
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
              id: "actor",
              font: $font(12),
              lines: 2,
              textColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => {
              make.top.equalTo(view.prev.bottom).offset(6);
              make.left.right.equalTo(view.prev);
            }
          },
          {
            type: "label",
            props: {
              id: "year",
              font: $font(12),
              textColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => {
              make.top.equalTo(view.prev.bottom).offset(6);
              make.left.right.equalTo(view.prev);
            }
          },
          {
            type: "label",
            props: {
              id: "type",
              font: $font(12),
              lines: 2,
              textColor: $color("systemSecondaryLabel")
            },
            layout: (make, view) => {
              make.top.equalTo(view.prev.bottom).offset(6);
              make.left.right.equalTo(view.prev);
            }
          }]
        }
      },
      events: {
        didSelect: (sender, indexPath, data) => app.playPage(app.transformData(data)),
        didReachBottom: async sender => {
          if (!extend || !extend.data.length || extend.finish) return;
          extend.pagination++;
          loadAnimate(true);
          const resp = await request(extend.text, extend.pagination);
          const _Null = !resp.data[0];
          extend = Object.assign({}, extend, {
            pagination: _Null ? extend.pagination - 1 : extend.pagination,
            pagecount: resp.pagecount ? resp.pagecount : extend.pagecount,
            data: extend.data.concat(resp.data),
            finish: (extend.pagecount && extend.pagination >= extend.pagecount) || (extend.total && extend.data.length >= extend.total) ? true : false
          });
          sender.data = [{
            title: "\u641c\u7d22\u7ed3\u679c",
            rows: extend.data
          }];
          loadAnimate(false);
          $(id[8]).text = extend.pagination + "／" + extend.pagecount;
          sender.endFetchingMore();
        }
      }
    }]
  });
};

const request = async (text, pagination = 1) => {
  const id = [
    "searchPage.list",
    "searchPage.list.header",
    "searchHist.matrix",
    "searchHist.clear.button"
  ];
  const code = encodeURI(text);
  const resp = await api.request(api.detail + "&wd=" + code + "&pg=" + pagination);
  const _Null = !resp.data.length;
  const history = database.search.query();
  const index = history.findIndex(item => item.label === text);
  database.search.insert(text);
  $(id[2]).delete(index);
  $(id[2]).insert({
    index: $indexPath(0, 0),
    value: {label: {text}}
  });
  $(id[2]).scrollTo({
    indexPath: $indexPath(0, 0),
    animated: true
  });
  $(id[1]).hidden = false;
  $(id[1]).frame = $rect(0, 0, $(id[0]).frame.width, $(id[2]).contentSize.height + 40 >= 210 ? 210 : $(id[2]).contentSize.height + 40);
  $(id[0]).reload();
  if (_Null) $ui.error(resp.message);
  return Object.assign({}, resp, {
    text, pagination,
    finish: (resp.pagecount && pagination >= resp.pagecount) || (resp.data.length && resp.data.length >= resp.total) ? true : false
  });
};

module.exports = {init, request, setExtend};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
