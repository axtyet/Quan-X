var L = $clipboard.text;

$input.text({
  type: $kbType.text,
  placeholder: L,
  handler: function(link) {
    if (link.length == 0) {
      link = L;
    }
    $ui.toast("正在获取下载链接...");
    $http.get({
      url: link,
      header: {
        host: "www.instagram.com",
        useragent:
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
        cookie: "sessionid=抓包填入;"
      },
      handler: function(resp) {
        $ui.toast("正在解析链接...");
        var data = resp.data;
        var search = new RegExp(/display_url":".*?"/);
        var img = search.exec(data);
        var img1 = JSON.stringify(img);
        img1 = img1.slice(18);
        var img2 = img1.replace(new RegExp(/\\\\u0026/, "gm"), "&");
        var img3 = img2.replace("\\.", ".");
        var imglink = img3.slice(0, -4);
        $http.download({
          url: imglink,
          backgroundFetch: true, // Optional, default is false
          progress: function(bytesWritten, totalBytes) {
            var percentage = (bytesWritten * 1.0) / totalBytes;
            $ui.toast(`下载中(${parseInt(percentage * 100)}%)`);
          },
          handler: function(resp) {
            $photo.save({
              data: resp.data,
              handler: function(success) {
                $ui.success("下载成功");
              }
            });
          }
        });
      }
    });
  }
});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
