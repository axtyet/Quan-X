const app = require("./scripts/app");
const closebutton = $("closebutton");
const inputtext = $("inputtext");
const downloadbutton = $("downloadbutton");
const setting = $("setting");
const switchrename = $("switchrename");
const switchicloud = $("switchicloud");
const switchshare = $("switchshare");
const tabdlpt = $("tabdlpt");
const label = $("label");
var doi = $clipboard.text;
var word = inputtext.text;
var getdatalink;
var flag;
var name;
var rqurl;

exports.hostchange = sender => {
  switch (tabdlpt.index) {
    case 0:
      getdatalink = "https://libgen.lc/scimag/ads.php?doi=";
      flag = 0;
      //console.log(getdatalink)
      //console.log(flag)
      break;
    case 1:
      getdatalink = "https://booksc.xyz/s/?q=";
      flag = 1;
      //console.log(flag)
      //console.log(getdatalink)
      break;
    case 2:
      getdatalink = "https://sci-hub.tw/";
      flag = 2;
      //console.log(flag)
      //console.log(getdatalink)
      break;
    case 3:
      getdatalink = "https://sci-hub.im/";
      flag = 3;
      //console.log(flag)
      //console.log(getdatalink)
      break;
    case 4:
      getdatalink = "https://sci-hub.se/";
      flag = 4;
      //console.log(flag)
      //console.log(getdatalink)
      break;
  }
};

function requestdata(link) {
  if (word.length == 0) {
    word = doi;
    rqurl = link + word;
  } else {
    rqurl = link + word;
  }
}

exports.gotodownload = sender => {
  flag = 2;
  getdatalink = "https://sci-hub.tw/";
  requestdata(getdatalink);
  if ($("switchrename").on == true) {
    getname(word);
  } else {
    formdoiname(word);
  }
  $ui.toast("正在请求数据");
  switch (flag) {
    case 0:
      lglcdlrq(rqurl);
      break;
    case 1:
      bsxydlrq(rqurl);
      break;
    case 2:
      shtwdlrq(rqurl);
      break;
    case 3:
      shimdlrq(rqurl);
      break;
    case 4:
      shsedlrq(rqurl);
      break;
  }
};

exports.close = sender => {
  $app.close();
};

exports.ready = sender => {
  inputtext.text = doi;
  inputtext.hidden = false;
  downloadbutton.hidden = false;
  closebutton.hidden = false;
  //$("file").hidden = true;
  setting.hidden = true;
  switchrename.hidden = true;
  switchicloud.hidden = true;
  switchshare.hidden = true;
  tabdlpt.hidden = false;
  label.hidden = false;
  switchrename.on = $cache.get("rename");
  switchicloud.on = $cache.get("iCloud");
  switchshare.on = $cache.get("share");
};

exports.setrename = sender => {
  $cache.set("rename", sender.on);
};

exports.setshare = sender => {
  $cache.set("share", sender.on);
};

exports.seticloud = sender => {
  $cache.set("iCloud", sender.on);
};

exports.menuchange = sender => {
  switch ($("menu").index) {
    case 0:
      inputtext.hidden = false;
      downloadbutton.hidden = false;
      closebutton.hidden = false;
      tabdlpt.hidden = false;
      label.hidden = false;
      //$("file").hidden = true;
      setting.hidden = true;
      switchrename.hidden = true;
      switchicloud.hidden = true;
      switchshare.hidden = true;
      break;
    case 1:
      inputtext.hidden = true;
      downloadbutton.hidden = true;
      closebutton.hidden = true;
      tabdlpt.hidden = true;
      label.hidden = true;
      //$("file").hidden = false;
      setting.hidden = true;
      switchrename.hidden = true;
      switchicloud.hidden = true;
      switchshare.hidden = true;
      break;
    case 2:
      inputtext.hidden = true;
      downloadbutton.hidden = true;
      closebutton.hidden = true;
      tabdlpt.hidden = true;
      label.hidden = true;
      //$("file").hidden = true;
      setting.hidden = false;
      switchrename.hidden = false;
      switchicloud.hidden = false;
      switchshare.hidden = false;
      break;
  }
};

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
        if (switchicloud.on == true) {
          $drive.write({
            data: resp.data,
            path: "download/" + name
          });
        } else {
          $file.write({
            data: resp.data,
            path: "download/" + name
          });
        }
        $ui.success("下载成功");
        if (switchshare.on == true) {
          $share.sheet([name, resp.data]);
        }
      }
    }
  });
}

function getname(text) {
  $http.request({
    method: "get",
    url: "http://gen.lib.rus.ec/scimag/?q=" + text,
    header: {
      host: "gen.lib.rus.ec"
    },
    handler: function(resp) {
      var nameresult = resp.response;
      if (nameresult == null) {
        $ui.toast("网络请求失败，将使用默认名称");
        formdoiname(text);
      } else if (nameresult.statusCode == 403) {
        $ui.toast("网络请求失败，将使用默认名称");
        formdoiname(text);
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
        var dire = dihou.replace(new RegExp("/", "g"), "_");
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
        name = title + "__" + journal + "__" + vol + "__" + dire + ".pdf";
      }
    }
  });
}

function formdoiname(text) {
  var dire = text.replace(new RegExp("/", "g"), "_");
  name = dire + ".pdf";
}

function lglcdlrq(rqurl) {
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
      } else if (result.statusCode == 403) {
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

function shtwdlrq(rqurl) {
  $http.request({
    method: "get",
    url: rqurl,
    header: {
      host: "sci-hub.tw"
    },
    handler: function(resp) {
      var result = resp.response;
      if (result == null || result.statusCode == 403) {
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

function shimdlrq(rqurl) {
  $http.request({
    method: "get",
    url: rqurl,
    header: {
      host: "sci-hub.im"
    },
    handler: function(resp) {
      var result = resp.response;
      if (result == null || result.statusCode == 403) {
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

function shsedlrq(rqurl) {
  $http.request({
    method: "get",
    url: rqurl,
    header: {
      host: "sci-hub.se"
    },
    handler: function(resp) {
      var result = resp.response;
      if (result == null || result.statusCode == 403) {
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

function bsxydlrq(rqurl) {
  $http.request({
    method: "get",
    url: rqurl,
    header: {
      host: "booksc.xyz"
    },
    handler: function(resp) {
      var result = resp.response;
      if (result == null || result.statusCode == 403) {
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











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
