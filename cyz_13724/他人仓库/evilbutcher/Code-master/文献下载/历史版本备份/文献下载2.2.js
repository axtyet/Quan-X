//根据doi号下载文献，有问题可反馈pgcrfhht@outlook.com
$app.theme = "auto";
var doi = $clipboard.text;
//var sl = RegExp(/".*?download.*"/);

$ui.render({
  views: [
    {
      type: "input",
      props: {
        id: "inputtext",
        placeholder: doi
      },
      layout: function(make, view) {
        make.height.equalTo(40);
        make.top.left.right.inset(50);
      }
    },
    {
      type: "button",
      props: {
        id: "downloadbutton",
        title: "下载",
        menu: {
          title: "下载地址选择",
          items: [
            {
              title: "企鹅论文",
              handler: sender => {
                $ui.toast("地址解析中……请稍等");
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://libgen.lc/scimag/ads.php?doi=" + word;
                } else {
                  rqurl = "https://libgen.lc/scimag/ads.php?doi=" + word;
                }
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "libgen.lc"
                  },
                  handler: function(resp) {
                    var result = resp.response;
                    if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var link = $("table a").attr("href");
                      download(link);
                    } else {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    }
                  }
                });
              }
            },
            {
              title: "sci-hub.tw",
              handler: sender => {
                $ui.toast("地址解析中……请稍等");
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://sci-hub.tw/" + word;
                } else {
                  rqurl = "https://sci-hub.tw/" + word;
                }
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "sci-hub.tw"
                  },
                  handler: function(resp) {
                    var result = resp.response;
                    if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var link = $("#article")
                        .find("iframe")
                        .attr("src");
                      download(link);
                    } else {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    }
                  }
                });
              }
            },
            {
              title: "sci-hub.im",
              handler: sender => {
                $ui.toast("地址解析中……请稍等");
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://sci-hub.im/" + word;
                } else {
                  rqurl = "https://sci-hub.im/" + word;
                }
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "sci-hub.im"
                  },
                  handler: function(resp) {
                    var result = resp.response;
                    if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var link = $("#article")
                        .find("iframe")
                        .attr("src");
                      download(link);
                    } else {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    }
                  }
                });
              }
            },
            {
              title: "sci-hub.se",
              handler: sender => {
                $ui.toast("地址解析中……请稍等");
                var word = $("inputtext").text;
                if (word.length == 0) {
                  word = doi;
                  var rqurl = "https://sci-hub.se/" + word;
                } else {
                  rqurl = "https://sci-hub.se/" + word;
                }
                $http.request({
                  method: "get",
                  url: rqurl,
                  header: {
                    host: "sci-hub.se"
                  },
                  handler: function(resp) {
                    var result = resp.response;
                    if (result.statusCode == 200) {
                      $ui.toast("正在分析返回数据");
                      var data = resp.data;
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(data);
                      var link = $("#article")
                        .find("iframe")
                        .attr("src");
                      download(link);
                    } else {
                      $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
                    }
                  }
                });
              }
            }

            //            {
            //              title: "谷歌学术",
            //              handler: sender => {}
            //            },
            //            {
            //              title: "GFsoso",
            //              handler: sender => {}
            //            }
          ]
        }
      },
      layout: function(make, view) {
        make.height.equalTo(50);
        make.width.equalTo(80);
        make.left.inset(50);
        make.top.inset(120);
      },
      events: {
        tapped: function(sender) {
          $ui.toast("地址解析中……请稍等");
          var word = $("inputtext").text;
          if (word.length == 0) {
            word = doi;
            var rqurl = "https://sci-hub.tw/" + word;
          } else {
            rqurl = "https://sci-hub.tw/" + word;
          }
          $http.request({
            method: "get",
            url: rqurl,
            header: {
              host: "sci-hub.tw"
            },
            handler: function(resp) {
              var result = resp.response;
              if (result.statusCode == 200) {
                $ui.toast("正在分析返回数据");
                var data = resp.data;
                var cheerio = require("cheerio");
                var $ = cheerio.load(data);
                var link = $("#article")
                  .find("iframe")
                  .attr("src");
                download(link);
              } else {
                $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络");
              }
            }
          });
        }
      }
    },
    {
      type: "button",
      props: {
        title: "关闭"
      },
      layout: function(make, view) {
        make.height.equalTo(50);
        make.width.equalTo(80);
        make.right.inset(50);
        make.top.inset(120);
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
        id: "textconsle",
        text:
          "请输入doi号(默认复制剪贴板文本)，点击“下载”按钮即可下载文献。默认选择sci-hub.tw，若下载失败请长按“下载”按钮更换地址。如果需要转存PC，个人推荐利用iOS的文件App，在局域网使用smb服务，这样下载完成可直接转存。"
      },
      layout: function(make, view) {
        make.height.equalTo(300);
        make.left.right.inset(50);
        make.top.inset(200);
      }
    }

    //textField.addEventHandler({
    //events: {$("downloadbutton").tapped,
    //handler: sender=>{

    //}
    //}
    //})
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
        $share.sheet(resp.data);
      }
    }
    //flag = 1
  });
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
