//根据doi号下载文献，有问题可反馈pgcrfhht@outlook.com
$app.theme = "auto";
var doi = $clipboard.text;
var name;
if (typeof $cache.get("status") == "undefined") {
  $cache.set("status", false);
}

$ui.render({
  views: [
    {
      type: "label",
      props: {
        font: $font(18),
        text: "是否对文献重命名"
      },
      layout: function(make, view) {
        make.height.equalTo(50);
        make.width.equalTo(170);
        make.left.inset(50);
        make.top.inset(120);
      }
    },
    {
      type: "switch",
      props: {
        id: "switch",
        on: $cache.get("status")
      },
      layout: function(make, view) {
        make.height.equalTo(50);
        make.width.equalTo(80);
        make.left.inset(200);
        make.top.inset(130);
      },
      events: {
        changed: function(sender) {
          $cache.set("status", sender.on);
        }
      }
    },
    {
      type: "input",
      props: {
        id: "inputtext",
        placeholder: doi
      },
      layout: function(make, view) {
        make.height.equalTo(40);
        make.top.inset(30);
        make.left.right.inset(50);
      }
    },
    {
      type: "button",
      props: {
        id: "downloadbutton",
        title: "下载",
        font: $font(18),
        menu: {
          title: "下载地址选择",
          items: [
            {
              title: "libgen.lc",
              handler: sender => {
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://libgen.lc/scimag/ads.php?doi=" + word;
                } else {
                  rqurl = "https://libgen.lc/scimag/ads.php?doi=" + word;
                }
                if ($("switch").on == true) {
                  getname();
                }
                $ui.toast("正在请求数据");
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "libgen.lc"
                  },
                  handler: function(resp) {
                    var result = resp.response;
                    if (result == null) {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    } else if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var link = $("table a").attr("href");
                      download(link);
                    }
                  }
                });
              }
            },
            {
              title: "sci-hub.tw",
              handler: sender => {
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://sci-hub.tw/" + word;
                } else {
                  rqurl = "https://sci-hub.tw/" + word;
                }
                if ($("switch").on == true) {
                  getname();
                }
                $ui.toast("正在请求数据");
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "sci-hub.tw"
                  },
                  handler: function(resp) {
                    var result = resp.response;
                    if (result == null) {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    } else if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var link = $("#article")
                        .find("iframe")
                        .attr("src");
                      download(link);
                    }
                  }
                });
              }
            },
            {
              title: "sci-hub.im",
              handler: sender => {
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://sci-hub.im/" + word;
                } else {
                  rqurl = "https://sci-hub.im/" + word;
                }
                if ($("switch").on == true) {
                  getname();
                }
                $ui.toast("正在请求数据");
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "sci-hub.im"
                  },
                  handler: function(resp) {
                    var result = resp.response;

                    if (result == null) {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    } else if (result.statusCode == 403) {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    } else if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var link = $("#article")
                        .find("iframe")
                        .attr("src");
                      download(link);
                    }
                  }
                });
              }
            },
            {
              title: "sci-hub.se",
              handler: sender => {
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://sci-hub.se/" + word;
                } else {
                  rqurl = "https://sci-hub.se/" + word;
                }
                if ($("switch").on == true) {
                  getname();
                }
                $ui.toast("正在请求数据");
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "sci-hub.se"
                  },
                  handler: function(resp) {
                    var result = resp.response;
                    if (result == null) {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    } else if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var link = $("#article")
                        .find("iframe")
                        .attr("src");
                      download(link);
                    }
                  }
                });
              }
            },

            {
              title: "booksc.xyz",
              handler: sender => {
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://booksc.xyz/s/?q=" + word;
                } else {
                  rqurl = "https://booksc.xyz/s/?q=" + word;
                }
                if ($("switch").on == true) {
                  getname();
                }
                $ui.toast("正在请求数据");
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "booksc.xyz"
                  },
                  handler: function(resp) {
                    var result = resp.response;
                    if (result == null) {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    } else if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var postlink = $(".btn-group")
                        .find("a")
                        .attr("href");
                      var link = "https://booksc.xyz" + postlink;
                      download(link);
                    }
                  }
                });
              }
            }
          ]
        }
      },
      layout: function(make, view) {
        make.height.equalTo(40);
        make.width.equalTo(64);
        make.left.inset(50);
        make.top.equalTo($("inputtext").bottom).offset(10);
      },
      events: {
        tapped: function(sender) {
          var word = $("inputtext").text;
          if (word.length == 0) {
            word = doi;
            var rqurl = "https://sci-hub.tw/" + word;
          } else {
            rqurl = "https://sci-hub.tw/" + word;
          }
          if ($("switch").on == true) {
            getname();
          }
          $ui.toast("正在请求数据");
          $http.request({
            method: "get",
            url: rqurl,
            header: {
              host: "sci-hub.tw"
            },
            handler: function(resp) {
              var result = resp.response;
              if (result == null) {
                $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
              } else if (result.statusCode == 200) {
                $ui.toast("正在分析返回数据");
                var data = resp.data;
                var cheerio = require("cheerio");
                var $ = cheerio.load(data);
                var link = $("#article")
                  .find("iframe")
                  .attr("src");
                download(link);
              }
            }
          });
        }
      }
    },
    {
      type: "button",
      props: {
        font: $font(18),
        title: "关闭"
      },
      layout: function(make, view) {
        make.height.equalTo(40);
        make.width.equalTo(64);
        make.right.inset(50);
        make.top.equalTo($("inputtext").bottom).offset(10);
      },
      events: {
        tapped: function(sender) {
          $app.close();
        }
      }
    },
    {
      type: "text",
      props: {
        font: $font(18),
        id: "textconsle",
        editable: false,
        text:
          "请输入doi号(默认复制剪贴板文本)，点击“下载”按钮即可下载文献。默认选择sci-hub.tw，若下载失败请长按“下载”按钮更换地址。如果需要采用标题-期刊-卷-doi方式命名请打开重命名开关。如果需要转存PC，个人推荐利用iOS的文件App，在局域网使用smb服务，这样下载完成可直接转存。"
      },
      layout: function(make, view) {
        make.height.equalTo(300);
        make.left.right.inset(40);
        make.top.inset(200);
      }
    }
  ]
});

function download(link) {
  $http.download({
    url: link,
    showsProgress: false, // Optional, default is true
    backgroundFetch: true, // Optional, default is false
    progress: function(bytesWritten, totalBytes) {
      var percentage = (bytesWritten * 1.0) / totalBytes;
      $ui.toast(`下载中(${parseInt(percentage * 100)}%)`);
    },
    handler: function(resp) {
      if (resp.error) {
        $ui.error("下载出错，请更换下载地址或检查doi");
      } else {
        $ui.success("下载成功");
        if (name == undefined) {
          $share.sheet(resp.data);
        } else {
          $share.sheet([name, resp.data]);
          name = undefined;
        }
      }
    }
  });
}

function getname(word) {
  word = $("inputtext").text;
  if (word.length == 0) {
    word = doi;
  }
  $http.request({
    method: "get",
    url: "http://gen.lib.rus.ec/scimag/?q=" + word,
    header: {
      host: "gen.lib.rus.ec"
    },
    handler: function(resp) {
      var nameresult = resp.response;
      if (nameresult == null) {
        $ui.toast("网络请求失败，将使用默认名称");
        name;
      } else if (nameresult.statusCode == 200) {
        $ui.toast("正在获取名称");
        var data = resp.data;
        var cheerio = require("cheerio");
        var $ = cheerio.load(data);
        var title = $(".catalog")
          .find("p")
          .slice(0)
          .eq(0)
          .text();
        var di = $(".catalog")
          .find("p")
          .slice(1)
          .eq(0)
          .text();
        var dihou = di.slice(4);
        var dire = dihou.replace(new RegExp("/"), "_");
        var journal = $(".catalog")
          .find("p")
          .slice(2)
          .eq(0)
          .text();
        var vol = $(".catalog")
          .find("p")
          .slice(2)
          .eq(1)
          .text();
        var extension = ".pdf";
        name = title + "__" + journal + "__" + vol + "__" + dire + extension;
      }
    }
  });
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
