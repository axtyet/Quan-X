/*
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 * 感谢Nicked大佬的不用微博脚本，让本菜鸡得以有模版参考🙏
 */

const $ = require("Config");
const family = $widget.family;
var rsslink = "https://github.com/evilbutcher/Scriptables/commits/master.atom";
try {
  $.thisnum = $.rssnum();
  $.rancolor = $.rssrancolor();
  $.rsslink = $.rsslink();
  console.log("将使用配置文件内RSS配置");
} catch (e) {
  console.log("将使用脚本内RSS配置");
}

const res = await getinfo();
var titles = [];
if (res.status == "ok") {
  for (var i = 0; i < res.items.length; i++) {
    titles = titles.concat({
      type: "text",
      props: {
        text: res.items[i].title,
        font: $font(15),
        offset: $point(7, 0),
        lineLimit: 1
      }
    });
  }
  console.log(titles);
  $widget.setTimeline(ctx => {
    return {
      type: "zstack",
      props: {
        alignment: $widget.alignment.center
      },
      views: [
        {
          type: "vstack",
          props: {
            spacing: 5,
            alignment: $widget.horizontalAlignment.leading
          },
          views: [getGrid(family, titles)]
        }
      ]
    };
  });
}

async function getinfo() {
  const rssRequest = {
    url:
      "https://api.rss2json.com/v1/api.json?rss_url=" +
      encodeURIComponent(rsslink)
  };
  const res = await $http.get(rssRequest);
  console.log(res);
  return res.data;
}

//by Nicked
function getGrid(family, data) {
  if (family == 1)
    return {
      type: "vgrid",
      props: {
        columns: Array(2).fill({
          flexible: {
            minimum: 10,
            maximum: Infinity
          }
        })
      },
      views: [
        {
          type: "vstack",
          props: {
            spacing: 8,
            alignment: $widget.horizontalAlignment.leading,
            offset: $point(2, 7),
            frame: {
              width: 150
            }
          },
          views: data.slice(0, 5)
        },
        {
          type: "vstack",
          props: {
            spacing: 8,
            alignment: $widget.horizontalAlignment.leading,
            offset: $point(-15, 7),
            frame: {
              width: 145
            }
          },
          views: data.slice(5, 10)
        }
      ]
    };
  else
    return {
      type: "vstack",
      props: {
        spacing: 8,
        alignment: $widget.horizontalAlignment.leading,
        offset: $point(0, 7),
        frame: {
          width: 150
        }
      },
      views: data.slice(0, 5)
    };
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
