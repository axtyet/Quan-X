const utils = require("./utils");
const spinner = require("./spinner");
const groups = require("./groups");
const tabBar = require("./tabBar");
const navigationBar = require("./navigationBar");


const id = [
  "pageId0",
  "pageId1",
  "pageId2"
];


const list = {
  type: "list",
  props: {
    style: 2, // 使用复选类型时这个应该选择 2
    rowHeight: 45,
    separatorInset: $insets(0, 66, 0, 0),
    indicatorInsets: $insets(100, 0, 49, 0),
    separatorColor: $color("systemSeparator"),
    header: {
      type: "view",
      props: {height: 100}
    },
    data: groups.init({
      groups: [{
        title: "\u5916\u89c2",
        items: [{
          type: "check",
          on: false,
          async: true,
          key: "theme",
          value: "light",
          symbol: "sun.min",
          title: "\u59cb\u7ec8\u6d45\u8272",
          iconColor: $color("teal"),
          handler: mode => utils.window.theme = mode
        },
        {
          type: "check",
          on: false,
          async: true,
          key: "theme",
          value: "dark",
          symbol: "moon.circle",
          title: "\u59cb\u7ec8\u6df1\u8272",
          iconColor: $color("navy"),
          handler: mode => utils.window.theme = mode
        },
        {
          type: "check",
          on: true,
          async: true,
          key: "theme",
          value: "auto",
          symbol: "circle.righthalf.fill",
          title: "\u8ddf\u968f\u7cfb\u7edf",
          iconColor: $color("tintColor"),
          handler: mode => utils.window.theme = mode
        }]
      },
      {
        title: "开关",
        items: [{
          type: "switch",
          on: false,
          key: "switch.off",
          symbol: "sun.min",
          title: "Off",
          iconColor: $color("red")
        },
        {
          type: "switch",
          on: true,
          key: "switch.on",
          symbol: "moon.circle",
          title: "on",
          iconColor: $color("blue")
        }]
      },
      {
        title: "箭头",
        items: [{
            type: "arrow",
            async: true,
            title: "右边显示 loading",
            symbol: "icloud.and.arrow.up.fill",
            iconColor: utils.systemColor("orange"),
            handler: async () => {
              await $wait(10)
            }
          },
          {
            type: "arrow",
            async: false,
            title: "无需加载",
            symbol: "list.bullet",
            iconColor: utils.systemColor("pink"),
            handler: () => {}
        }]
      }]
    })
  },
  layout: $layout.fillSafeArea,
  events: {
    didScroll: sender => {
      navigationBar.changeLayout(id[0], sender.contentOffset.y, true)
    }
  }
};


exports.init = () => $ui.render({
  props: {
    id: "window",
    statusBarStyle: 0,
    navBarHidden: true
  },
  views: [
    {
      type: "view",
      props: {
        id: id[0],
        hidden: true,
        bgcolor: $color("insetGroupedBackground")
      },
      layout: (make, view) => {
        make.width.equalTo(view.super);
        make.height.equalTo(view.super);
        make.top.left.inset(0);
      },
      views: [navigationBar.view({
        style: 0,
        title: "第1页",
        pageName: id[0],
        largeTitleInset: 20
      }),
      list
      ]
    },
    {
      type: "view",
      props: {
        id: id[1],
        hidden: true,
        bgcolor: utils.systemColor("red")
      },
      layout: (make, view) => {
        make.width.equalTo(view.super);
        make.height.equalTo(view.super);
        make.top.inset(0);
        make.left.equalTo(view.prev.right);
      },
      views: [navigationBar.view({
        style: 1,
        title: "第2页",
        pageName: id[1]
      }),
      {
        type: "label",
        props: {
          text: "第2页"
        },
        layout: $layout.center
      }]
    },
    {
      type: "view",
      props: {
        id: id[2],
        hidden: true,
        bgcolor: utils.systemColor("green")
      },
      layout: (make, view) => {
        make.width.equalTo(view.super);
        make.height.equalTo(view.super);
        make.top.inset(0);
        make.left.equalTo(view.prev.right);
      },
      views: [navigationBar.view({
        style: 1,
        title: "第3页",
        pageName: id[2]
      }),
      {
        type: "label",
        props: {
          text: "第3页"
        },
        layout: $layout.center
      }]
    },
    tabBar.init({
      initialTab: 0,
      views: [{
        title: "第1页",
        tabID: "tabbar.btn0",
        pageID: id[0],
        symbols: ["house", "house.fill"]
      },
      {
        title: "第2页",
        tabID: "tabbar.btn1",
        pageID: id[1],
        symbols: ["heart", "heart.fill"]
      },
      {
        title: "第3页",
        tabID: "tabbar.btn2",
        pageID: id[2],
        symbols: ["gear"]
      }]
    })
  ]
});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
