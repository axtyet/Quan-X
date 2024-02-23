//根据doi号下载文献，用的是sci-hub.tw，有问题可反馈pgcrfhht@outlook.com
$app.theme = "auto";
var doi = $clipboard.text;
//var sl = RegExp(/".*?download.*"/);

$ui.render({
  views: [
    {
      type: "input",
      props: {
        title:"请输入doi",
        placeholder:doi,
      },
      layout: function(make, view) {
        make.height.equalTo(60);
        make.top.left.right.inset(50);
      }
    },
    {
      type: "button",
      props: {
        title:"下载",
      },
      layout: function(make, view) {
        make.height.equalTo(50);
        make.width.equalTo(80);
        make.left.inset(50);
        make.bottom.inset(60);
      },
      events: {
        tapped: function(sender) {
          var word = $input.text
          if (word.length == 0){
            word = doi
            var rqurl = "https://sci-hub.tw/"+word
            console.log(rqurl)
          }
          $http.request({
            method:"get",
            url: rqurl,
            header:{
              host: "sci-hub.tw",
            },
            handler: function(resp) {
              var data = resp.data
              console.log(data)
              var cheerio = require("cheerio")
              var $ = cheerio.load(data)
              var link = $("#article").find("iframe").attr("src");
              console.log(link)
              download(link);
              //var dl = link.replace(/\"/g, "");
              //console.log(dl)
//              var links = $detector.link(data)
//              console.log(links)
//              var link = sl.exec(links)
//              console.log(link)
            }
          })
         
        }
      }
    },
    {
      type: "button",
      props: {
        title:"关闭",
      },
      layout: function(make, view) {
        make.height.equalTo(50);
        make.width.equalTo(80);
        make.right.inset(50);
        make.bottom.inset(60);
      },
      events: {
        tapped: function(sender) {
          $app.close()
        }
      }
    }
  ]
})

function download(link){
  $http.download({
    url: link,
    showsProgress: true, // Optional, default is true
    backgroundFetch: true, // Optional, default is false
    progress: function(bytesWritten, totalBytes) {
      var percentage = bytesWritten * 1.0 / totalBytes
    },
    handler: function(resp) {
      $share.sheet(resp.data)
    }
  })
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
