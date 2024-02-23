/**
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 **/
const $ = require("Config");
const ERR = MYERR();

!(async () => {
  if (init() == true) {
    var imglink = await getinfo();
    var flag = Math.floor(Math.random() * 10);
    if ($.headers.statusCode == 200) {
      if (flag >= 0 && flag < 2) {
        console.log(`${flag} 展示备用图片1`);
        var cover = $.thisimglink;
      } else if (flag >= 2 && flag < 4) {
        console.log(`${flag} 展示备用图片2`);
        cover = $.thisimglink2;
      } else {
        console.log(`${flag} 展示NASA图片`);
        cover = imglink[0];
        var title = imglink[1];
        console.log(title);
      }
    } else {
      if (flag >= 0 && flag < 5) {
        console.log(`${flag} 展示备用图片1`);
        cover = $.thisimglink;
      } else {
        console.log(`${flag} 展示备用图片2`);
        cover = $.thisimglink2;
      }
    }
    $widget.setTimeline(ctx => {
      return {
        type: "zstack",
        views: [
          {
            type: "image",
            props: {
              uri: cover,
              resizable: true,
              scaledToFill: true,
              clipped: true,
              widgetURL: cover
            }
          },
          {
            type: "text",
            props: {
              text: title,
              font: {
                name: "Cochin-Italic",
                size: 20
              },
              color: $color("white"),
              lineLimit: 1
            }
          }
        ]
      };
    });
  }
})().catch(err => {
  if (err instanceof ERR.TokenError) {
    $push.schedule({
      title: "NASA - Config配置错误❌",
      body: err.message
    });
  } else if (err instanceof ERR.RequestError) {
    console.log("NASA - 网络错误❌" + err.message);
  } else {
    $push.schedule({
      title: "NASA - 出现错误❌",
      body: JSON.stringify(err, Object.getOwnPropertyNames(err))
    });
  }
});

function init() {
  try {
    $.thisapikey = $.nasaapi();
    $.thisimglink = $.imglink();
    $.thisimglink2 = $.imglink2();
    return true;
  } catch (err) {
    throw new ERR.TokenError("配置文件中未找到NASA API或备用图片地址");
  }
}

function MYERR() {
  class TokenError extends Error {
    constructor(message) {
      super(message);
      this.name = "TokenError";
    }
  }
  class RequestError extends Error {
    constructor(message) {
      super(message);
      this.name = "RequestError";
    }
  }
  return {
    TokenError,
    RequestError
  };
}

async function getinfo() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${$.thisapikey}`;
  var resp = await $http.get({
    url: url,
    timeout: 8
  });
  $.headers = resp.response;
  if ($.headers == null) {
    throw new ERR.RequestError("网络超时获取失败");
  }
  var cover = resp.data.url;
  var title = resp.data.title;
  return [cover, title];
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
