const app = require("./scripts/app");
const inputtext = $("inputtext");
const switchrename = $("switchrename");
const switchicloud = $("switchicloud");
const switchshare = $("switchshare");
const tabdlpt = $("tabdlpt");
const spin = $("spinner");
const erlist = $("erlist");
const local = $("local");
const icloud = $("icloud");
var doi = $clipboard.text;
var word;
var getdatalink;
var flag;
var name;
var rqurl;
var erjson;
var errorlink;
var findarticle;
var icljson;
var locjson;

exports.hostchange = sender => {
  switch (tabdlpt.index) {
    case 0:
      getdatalink = "https://libgen.lc/scimag/ads.php?doi=";
      flag = 0;
      break;
    case 1:
      getdatalink = "https://booksc.xyz/s/?q=";
      flag = 1;
      break;
    case 2:
      getdatalink = "https://sci-hub.tw/";
      flag = 2;
      break;
    case 3:
      getdatalink = "https://sci-hub.im/";
      flag = 3;
      break;
    case 4:
      getdatalink = "https://sci-hub.se/";
      flag = 4;
      break;
  }
};

exports.gotodownload = sender => {
  spin.loading = true;
  doi = $clipboard.text;
  word = inputtext.text;
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
  $("spinner").loading = false;
  $("view[0]").hidden = false;
  $("view[1]").hidden = true;
  $("view[2]").hidden = true;
  inputtext.text = doi;
  switchrename.on = $cache.get("rename");
  switchicloud.on = $cache.get("iCloud");
  switchshare.on = $cache.get("share");
  flag = 2;
  getdatalink = "https://sci-hub.tw/";
  erjson = JSON.parse($file.read("assets/errorlist.json").string);
  erjson.splice(0);
  $file.write({
    data: $data({ string: JSON.stringify(erjson) }),
    path: "assets/errorlist.json"
  });
  erlist.data = erjson;
  icljson = JSON.parse($file.read("assets/icloudlist.json").string);
  icloud.data = icljson;
  locjson = JSON.parse($file.read("assets/locallist.json").string);
  local.data = locjson;
  if (switchicloud.on == true) {
    local.hidden = true;
    icloud.hidden = false;
    $("tablocation").index = 1;
  } else {
    local.hidden = false;
    icloud.hidden = true;
    $("tablocation").index = 0;
  }
  findarticle = "found";
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
      $("view[0]").hidden = false;
      $("view[1]").hidden = true;
      $("view[2]").hidden = true;
      break;
    case 1:
      $("view[0]").hidden = true;
      $("view[1]").hidden = false;
      $("view[2]").hidden = true;
      break;
    case 2:
      $("view[0]").hidden = true;
      $("view[1]").hidden = true;
      $("view[2]").hidden = false;
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

function download(link) {
  //checklink
  if (findarticle == null) {
    $ui.error("文献未找到");
    erjson = JSON.parse($file.read("assets/errorlist.json").string);
    errorlink = String(link);
    erjson.push("Not found    " + word);
    $file.write({
      data: $data({ string: JSON.stringify(erjson) }),
      path: "assets/errorlist.json"
    });
    erlist.data = erjson;
    findarticle = "found";
    spin.loading = false;
  } else {
    $http.get({
      url: link,
      handler: function(resp) {
        var result = resp.response;
        if (result == null || result.statusCode == 403) {
          $ui.error("下载地址连接失败，请尝试手动下载");
          erjson = JSON.parse($file.read("assets/errorlist.json").string);
          errorlink = String(link);
          erjson.push(errorlink);
          $file.write({
            data: $data({ string: JSON.stringify(erjson) }),
            path: "assets/errorlist.json"
          });
          erlist.data = erjson;
          findarticle = "found";
          spin.loading = false;
        } else if (result.statusCode == 200) {
          $ui.toast("已请求下载，请耐心等待");
          //startdownload
          $http.download({
            url: link,
            showsProgress: false, // Optional, default is true
            backgroundFetch: true, // Optional, default is false
            progress: function(bytesWritten, totalBytes) {
              var percentage = (bytesWritten * 1.0) / totalBytes;
              $ui.toast(`下载中(${parseInt(percentage * 100)}%)`);
            },
            handler: function(resp) {
              if (!resp.response) {
                $ui.error("下载出错，请更换下载地址或检查doi");
              } else {
                if (switchicloud.on == true) {
                  $drive.write({
                    data: resp.data,
                    path: "download/" + name
                  });
                  icljson = JSON.parse(
                    $file.read("assets/icloudlist.json").string
                  );
                  icljson.push(name);
                  $file.write({
                    data: $data({ string: JSON.stringify(icljson) }),
                    path: "assets/icloudlist.json"
                  });
                  icloud.data = icljson;
                } else {
                  $file.write({
                    data: resp.data,
                    path: "download/" + name
                  });
                  locjson = JSON.parse(
                    $file.read("assets/locallist.json").string
                  );
                  locjson.push(name);
                  $file.write({
                    data: $data({ string: JSON.stringify(locjson) }),
                    path: "assets/locallist.json"
                  });
                  local.data = locjson;
                }
                $ui.success("下载成功");
                if (switchshare.on == true) {
                  $share.sheet([name, resp.data]);
                }
                erjson = JSON.parse($file.read("assets/errorlist.json").string);
                errorlink = String(link);
                erjson.push("Done    " + word);
                $file.write({
                  data: $data({ string: JSON.stringify(erjson) }),
                  path: "assets/errorlist.json"
                });
                erlist.data = erjson;
                findarticle = "found";
                spin.loading = false;
                name = undefined;
              }
            }
          });
        }
      }
    });
  }
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
      if (nameresult == null || nameresult.statusCode == 403) {
        $ui.error("网络请求失败，将使用默认名称");
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
      if (result == null || result.statusCode == 403) {
        $ui.error("该地址暂时无法连接，请更换下载地址或检查网络");
        findarticle = "found";
        spin.loading = false;
      } else if (result.statusCode == 200) {
        $ui.toast("正在分析返回数据");
        var data = resp.data;
        var cheerio = require("cheerio");
        var $ = cheerio.load(data);
        var link = $("table a").attr("href");
        if (link == undefined) {
          findarticle = null;
          download(link);
        } else {
          findarticle = "found";
          download(link);
        }
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
        $ui.error("该地址暂时无法连接，请更换下载地址或检查网络");
        findarticle = "found";
        spin.loading = false;
      } else if (result.statusCode == 200) {
        $ui.toast("正在分析返回数据");
        var data = resp.data;
        var cheerio = require("cheerio");
        var $ = cheerio.load(data);
        var postlink = $(".btn-group")
          .find("a")
          .attr("href");
        var link = "https://booksc.xyz" + postlink;
        if (postlink == undefined) {
          findarticle = null;
          download(link);
        } else {
          findarticle = "found";
          download(link);
        }
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
      if (!resp.response || result == null || result.statusCode == 403) {
        $ui.error("该地址暂时无法连接，请更换下载地址或检查网络");
        findarticle = "found";
        spin.loading = false;
      } else if (result.statusCode == 200) {
        var data = resp.data;
        $ui.toast("正在分析返回数据");
        var cheerio = require("cheerio");
        var $ = cheerio.load(data);
        var link = $("#article")
          .find("iframe")
          .attr("src");
        if (link == undefined) {
          findarticle = null;
          download(link);
        } else {
          findarticle = "found";
          download(link);
        }
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
        $ui.error("该地址暂时无法连接，请更换下载地址或检查网络");
        findarticle = "found";
        spin.loading = false;
      } else if (result.statusCode == 200) {
        $ui.toast("正在分析返回数据");
        var data = resp.data;
        var cheerio = require("cheerio");
        var $ = cheerio.load(data);
        var link = $("#article")
          .find("iframe")
          .attr("src");
        if (link == undefined) {
          findarticle = null;
          download(link);
        } else {
          findarticle = "found";
          download(link);
        }
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
        $ui.error("该地址暂时无法连接，请更换下载地址或检查网络");
        findarticle = "found";
        spin.loading = false;
      } else if (result.statusCode == 200) {
        $ui.toast("正在分析返回数据");
        var data = resp.data;
        var cheerio = require("cheerio");
        var $ = cheerio.load(data);
        var link = $("#article")
          .find("iframe")
          .attr("src");
        if (link == undefined) {
          findarticle = null;
          download(link);
        } else {
          findarticle = "found";
          download(link);
        }
      }
    }
  });
}

exports.storage = sender => {
  if ($("tablocation").index == 0) {
    $("local").hidden = false;
    $("icloud").hidden = true;
  } else {
    $("local").hidden = true;
    $("icloud").hidden = false;
  }
};

exports.share = (sender, indexPath, object) => {
  if ($("tablocation").index == 0) {
    var article = sender.data[indexPath.row];
    $share.sheet($file.read("download/" + article));
  } else {
    article = sender.data[indexPath.row];
    $share.sheet($drive.read("download/" + article));
  }
};

exports.fresh = sender => {
  icljson = JSON.parse($file.read("assets/icloudlist.json").string);
  icloud.data = icljson;
  locjson = JSON.parse($file.read("assets/locallist.json").string);
  local.data = locjson;
  local.endRefreshing();
  icloud.endRefreshing();
};

exports.delete = (sender, indexPath, object) => {
  $ui.alert({
    title: "确定删除此文献吗？",
    actions: [
      {
        title: "删除",
        disable: false,
        handler: function() {
          if ($("tablocation").index == 0) {
            var article = sender.data[indexPath.row];
            locjson = JSON.parse($file.read("assets/locallist.json").string);
            locjson.splice(indexPath.row, 1);
            $file.write({
              data: $data({ string: JSON.stringify(locjson) }),
              path: "assets/locallist.json"
            });
            $("local").data = locjson;
            $file.delete("download/" + article);
          } else {
            article = sender.data[indexPath.row];
            icljson = JSON.parse($file.read("assets/icloudlist.json").string);
            icljson.splice(indexPath.row, 1);
            $file.write({
              data: $data({ string: JSON.stringify(icljson) }),
              path: "assets/icloudlist.json"
            });
            $("icloud").data = icljson;
            $drive.delete("download/" + article);
          }
        }
      },
      {
        title: "取消",
        handler: function() {}
      }
    ]
  });
};

exports.dlmanually = (sender, indexPath, object) => {
  var plink = sender.data[indexPath.row];
  $clipboard.text = plink.slice(2);
  $ui.toast("已拷贝至剪贴板，请用浏览器打开尝试下载");
};

exports.doubleTapped = sender => {
  if ($("tablocation").index == 0) {
    locjson = JSON.parse($file.read("assets/locallist.json").string);
    locjson.splice(0);
    $file.write({
      data: $data({ string: JSON.stringify(locjson) }),
      path: "assets/locallist.json"
    });
    local.data = locjson;
  } else {
    icljson = JSON.parse($file.read("assets/icloudlist.json").string);
    icljson.splice(0);
    $file.write({
      data: $data({ string: JSON.stringify(icljson) }),
      path: "assets/icloudlist.json"
    });
    icloud.data = icljson;
  }
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
