var dic = JSON.parse($drive.read("funkoimg/itemlist.json").string);
var notdl = [];

async function download(title, url) {
  await $wait(1);
  var exist = $drive.exists("funkoimg/" + title + ".jpg");
  //console.log(exist);
  if (exist == false) {
    console.log(url);
    notdl.push({
      name: title,
      link: url
    });
    $http.download({
      url: "https://" + url,
      backgroundfetch: true,
      handler: function(resp) {
        //console.log(resp.data)
        $drive.write({
          data: resp.data,
          path: "funkoimg/" + title + ".jpg"
        });
        console.log(notdl);
      }
    });
  }
  i = i + 1;
}

for (var i = 0; i < dic.length; i++) {
  download(dic[i].title, dic[i].url);
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
