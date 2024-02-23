const inputtext = $("inputtext");
const switchrename = $("switchrename");
const switchicloud = $("switchicloud");
const switchshare = $("switchshare");
const tabdlpt = $("tabdlpt");
const spin = $("spinner");
const erlist = $("erlist");
const local = $("local");
const icloud = $("icloud");
const linklist = $("linklist");
var reg = new RegExp(/https:/);
var doi = $clipboard.text;
var word;
var name;
var findarticle;
var icljson;
var locjson;
var erjson = [];
var linkjson = [];
var checklinkjson = [];
var array = [];
var outputdoi = [];
var parsefilename = [];
var outputlink;
var i;

function download(i, N, link) {
  //checklink
  if (findarticle == null) {
    $ui.error("文献未找到");
    erjson.push("未找到  " + outputdoi[i]);
    erlist.data = erjson;
    linkjson.push("很抱歉，未找到下载链接");
    linklist.data = linkjson;
    findarticle = "found";
    spin.loading = false;
  } else {
    linkjson.push(link);
    linklist.data = linkjson;
    $http.get({
      url: link,
      handler: function(resp) {
        var result = resp.response;
        if (
          result == null ||
          result.statusCode == 403 ||
          result.statusCode == 404
        ) {
          $ui.error("下载地址连接失败，请尝试手动下载");
          erjson.push("错误   " + outputdoi[i]);
          erlist.data = erjson;
          findarticle = "found";
          spin.loading = false;
        } else if (result.statusCode == 200) {
          var n = i + 1;
          $ui.toast("正在下载第" + n + "篇文献(共" + N + "篇)，请耐心等待");
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
                    path: "articles/" + name
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
                    path: "articles/" + name
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
                erjson.push("完成   " + outputdoi[i]);
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
      if (
        nameresult == null ||
        nameresult.statusCode == 403 ||
        nameresult.statusCode == 404
      ) {
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

function lglcdlrq(i, N, word) {
  if (N > 1) {
    formdoiname(word);
  } else {
    if (switchrename.on == true) {
      getname(word);
    } else {
      formdoiname(word);
    }
  }
  $ui.toast("正在请求数据");
  $http.request({
    method: "get",
    url: "https://libgen.lc/scimag/ads.php?doi=" + word,
    header: {
      host: "libgen.lc"
    },
    handler: function(resp) {
      var result = resp.response;
      if (
        !resp.response ||
        result == null ||
        result.statusCode == 403 ||
        result.statusCode == 404
      ) {
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
        } else {
          findarticle = "found";
        }
        outputlink = link;
        download(i, N, outputlink);
      }
    }
  });
}

function bsxydlrq(i, N, word) {
  if (N > 1) {
    formdoiname(word);
  } else {
    if (switchrename.on == true) {
      getname(word);
    } else {
      formdoiname(word);
    }
  }
  $http.request({
    method: "get",
    url: "https://booksc.xyz/s/?q=" + word,
    header: {
      host: "booksc.xyz"
    },
    handler: function(resp) {
      var result = resp.response;
      if (
        !resp.response ||
        result == null ||
        result.statusCode == 403 ||
        result.statusCode == 404
      ) {
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
        } else {
          findarticle = "found";
        }
        outputlink = link;
        download(i, N, outputlink);
      }
    }
  });
}

function shtwdlrq(i, N, word) {
  if (N > 1) {
    formdoiname(word);
  } else {
    if (switchrename.on == true) {
      getname(word);
    } else {
      formdoiname(word);
    }
  }
  $http.request({
    method: "get",
    url: "https://sci-hub.tw/" + word,
    header: {
      host: "sci-hub.tw"
    },
    handler: function(resp) {
      var result = resp.response;
      if (
        !resp.response ||
        result == null ||
        result.statusCode == 403 ||
        result.statusCode == 404
      ) {
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
        } else {
          findarticle = "found";
          if (link.match(reg) == null) {
            outputlink = "https:" + link;
          } else {
            outputlink = link;
          }
        }
        download(i, N, outputlink);
      }
    }
  });
}

function shimdlrq(i, N, word) {
  if (N > 1) {
    formdoiname(word);
  } else {
    if (switchrename.on == true) {
      getname(word);
    } else {
      formdoiname(word);
    }
  }
  $http.request({
    method: "get",
    url: "https://sci-hub.im/" + word,
    header: {
      host: "sci-hub.im"
    },
    handler: function(resp) {
      var result = resp.response;
      if (
        !resp.response ||
        result == null ||
        result.statusCode == 403 ||
        result.statusCode == 404
      ) {
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
        } else {
          findarticle = "found";
          if (link.match(reg) == null) {
            outputlink = "https:" + link;
          } else {
            outputlink = link;
          }
        }
        download(i, N, outputlink);
      }
    }
  });
}

function shsedlrq(i, N, word) {
  if (N > 1) {
    formdoiname(word);
  } else {
    if (switchrename.on == true) {
      getname(word);
    } else {
      formdoiname(word);
    }
  }
  $http.request({
    method: "get",
    url: "https://sci-hub.se/" + word,
    header: {
      host: "sci-hub.se"
    },
    handler: function(resp) {
      var result = resp.response;
      if (
        !resp.response ||
        result == null ||
        result.statusCode == 403 ||
        result.statusCode == 404
      ) {
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
        } else {
          findarticle = "found";
          if (link.match(reg) == null) {
            outputlink = "https:" + link;
          } else {
            outputlink = link;
          }
        }
        download(i, N, outputlink);
      }
    }
  });
}

exports.gotodownload = sender => {
  spin.loading = true;
  outputdoi = [];
  outputlink = [];
  word = inputtext.text;
  if (word.length == 0) {
    word = doi;
  }
  array = word.split(",");
  var N = array.length;
  if (N == 1) {
    i = 0;
    switch (tabdlpt.items[tabdlpt.index]) {
      case "libgen.lc":
        outputdoi.push(array[i]);
        lglcdlrq(i, N, array[i]);
        break;
      case "booksc.xyz":
        outputdoi.push(array[i]);
        bsxydlrq(i, N, array[i]);
        break;
      case "sci-hub.tw":
        outputdoi.push(array[i]);
        shtwdlrq(i, N, array[i]);
        break;
      case "sci-hub.im":
        outputdoi.push(array[i]);
        shimdlrq(i, N, array[i]);
        break;
      case "sci-hub.se":
        outputdoi.push(array[i]);
        shsedlrq(i, N, array[i]);
        break;
    }
  } else {
    var modnumber = tabdlpt.items.length;
    for (i = 0; i < N; ) {
      switch (tabdlpt.items[i % modnumber]) {
        case "libgen.lc":
          outputdoi.push(array[i]);
          lglcdlrq(i, N, array[i]);
          i = i + 1;
          break;
        case "booksc.xyz":
          outputdoi.push(array[i]);
          bsxydlrq(i, N, array[i]);
          i = i + 1;
          break;
        case "sci-hub.tw":
          outputdoi.push(array[i]);
          shtwdlrq(i, N, array[i]);
          i = i + 1;
          break;
        case "sci-hub.im":
          outputdoi.push(array[i]);
          shimdlrq(i, N, array[i]);
          i = i + 1;
          break;
        case "sci-hub.se":
          outputdoi.push(array[i]);
          shsedlrq(i, N, array[i]);
          i = i + 1;
          break;
      }
    }
    spin.loading = false;
  }
};

exports.close = sender => {
  $app.close();
};

exports.ready = sender => {
  $app.tips("使用技巧请查看readme");
  $app.idleTimerDisabled = true;
  $("spinner").loading = false;
  $("view[0]").hidden = false;
  $("view[1]").hidden = true;
  $("view[2]").hidden = true;
  if (doi == undefined) {
    inputtext.placeholder = "请输入doi...";
  } else {
    inputtext.placeholder = doi;
  }
  switchrename.on = $cache.get("rename");
  switchicloud.on = $cache.get("iCloud");
  switchshare.on = $cache.get("share");
  //检查文件
  if ($file.exists("articles") == false) {
    $file.mkdir("articles");
  }
  if ($drive.exists("articles") == false) {
    $drive.mkdir("articles");
  }
  if ($drive.exists("download") == false) {
    $drive.mkdir("download");
  }
  erjson = [];
  erlist.data = erjson;
  linkjson = [];
  linklist.data = linkjson;
  if ($file.exists("assets/icloudlist.json") == false) {
    $file.write({
      data: $data({ string: "[]" }),
      path: "assets/icloudlist.json"
    });
  }
  if ($file.exists("assets/locallist.json") == false) {
    $file.write({
      data: $data({ string: "[]" }),
      path: "assets/locallist.json"
    });
  }
  //读取文件记录
  refresh();
  if (switchicloud.on == true) {
    local.hidden = true;
    icloud.hidden = false;
    $("tablocation").index = 1;
    $("zip").hidden = true;
  } else {
    local.hidden = false;
    icloud.hidden = true;
    $("tablocation").index = 0;
    $("zip").hidden = false;
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
  //底部menu菜单切换
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

exports.storage = sender => {
  //本机和iCloud的list切换
  if ($("tablocation").index == 0) {
    $("local").hidden = false;
    $("icloud").hidden = true;
    $("zip").hidden = false;
  } else {
    $("local").hidden = true;
    $("icloud").hidden = false;
    $("zip").hidden = true;
  }
};

exports.share = (sender, indexPath, object) => {
  if ($("tablocation").index == 0) {
    var articlename = sender.data[indexPath.row];
    $share.sheet([articlename, $file.read("articles/" + articlename)]);
  } else {
    articlename = sender.data[indexPath.row];
    $share.sheet([articlename, $drive.read("articles/" + articlename)]);
  }
};

exports.refresh = sender => {
  refresh();
  local.endRefreshing();
  icloud.endRefreshing();
};

exports.delete = (sender, indexPath, object) => {
  $ui.alert({
    title: "确定删除此文献吗？",
    actions: [
      {
        title: "删除文件",
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
            $file.delete("articles/" + article);
          } else {
            article = sender.data[indexPath.row];
            icljson = JSON.parse($file.read("assets/icloudlist.json").string);
            icljson.splice(indexPath.row, 1);
            $file.write({
              data: $data({ string: JSON.stringify(icljson) }),
              path: "assets/icloudlist.json"
            });
            $("icloud").data = icljson;
            $drive.delete("articles/" + article);
          }
        }
      },
      {
        title: "仅删除记录",
        handler: function() {
          if ($("tablocation").index == 0) {
            locjson = JSON.parse($file.read("assets/locallist.json").string);
            locjson.splice(indexPath.row, 1);
            $file.write({
              data: $data({ string: JSON.stringify(locjson) }),
              path: "assets/locallist.json"
            });
            $("local").data = locjson;
          } else {
            icljson = JSON.parse($file.read("assets/icloudlist.json").string);
            icljson.splice(indexPath.row, 1);
            $file.write({
              data: $data({ string: JSON.stringify(icljson) }),
              path: "assets/icloudlist.json"
            });
            $("icloud").data = icljson;
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
  var dlmalink = sender.data[indexPath.row];
  $safari.open({
    url: dlmalink
  });
};

exports.clearall = sender => {
  $ui.alert({
    title: "确定清空文献记录吗？\n(会删除目录下全部文献)",
    actions: [
      {
        title: "删除",
        disable: false,
        handler: function() {
          if ($("tablocation").index == 0) {
            $file.delete("articles");
            locjson = JSON.parse($file.read("assets/locallist.json").string);
            locjson.splice(0);
            $file.write({
              data: $data({ string: JSON.stringify(locjson) }),
              path: "assets/locallist.json"
            });
            local.data = locjson;
            $file.mkdir("articles");
          } else {
            $drive.delete("articles");
            icljson = JSON.parse($file.read("assets/icloudlist.json").string);
            icljson.splice(0);
            $file.write({
              data: $data({ string: JSON.stringify(icljson) }),
              path: "assets/icloudlist.json"
            });
            icloud.data = icljson;
            $drive.mkdir("articles");
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

exports.zip = sender => {
  var dest = "本地文献.zip";
  $archiver.zip({
    directory: "download",
    dest: dest,
    handler: function(success) {
      if (success) {
        $share.sheet({
          items: [
            {
              name: dest,
              data: $file.read(dest)
            }
          ],
          handler: function(success) {
            $ui.alert({
              title: "要删除此压缩包吗？",
              actions: [
                {
                  title: "删除",
                  disable: false,
                  handler: function() {
                    $file.delete("本地文献.zip");
                  }
                },
                {
                  title: "取消",
                  handler: function() {}
                }
              ]
            });
          }
        });
      }
    }
  });
};

exports.loadfiles = sender => {
  spin.loading = true;
  //从iCloud载入文件
  parsefilename = $drive.list("download");
  for (i = 0; i < parsefilename.length; ) {
    var DI = [];
    var cheerio = require("cheerio");
    var $ = cheerio.load($drive.read("download/" + parsefilename[i]).string);
    $("td").map(function(i, el) {
      if ($(this).text() == "DI ") {
        DI.push(
          $(this)
            .next()
            .text()
        );
      }
    });
    if (i == parsefilename.length - 1) {
      inputtext.text = DI;
    }
    $drive.write({
      data: $data({ string: JSON.stringify(DI) }),
      path: "articles/" + parsefilename[i] + ".txt"
    });
    i = i + 1;
  }
  $ui.success("解析完成");
  spin.loading = false;
};

exports.paste = sender => {
  inputtext.text = inputtext.text + $clipboard.text;
};

exports.copydoi = (sender, indexPath, object) => {
  var copydoi = sender.data[indexPath.row];
  var pdoi = copydoi.slice(5);
  $clipboard.text = pdoi;
  $ui.toast("doi已拷贝至剪贴板");
};

exports.checklink = async sender => {
  spin.loading = true;
  $device.taptic(3);
  checklinkjson = [];
  var resp = await $http.get({ url: "http://gen.lib.rus.ec/scimag/" });
  var code = resp.response;
  if (
    !resp.response ||
    code == null ||
    code.statusCode == 403 ||
    code.statusCode == 404
  ) {
    $ui.toast("libgen.lc连接超时");
  } else if (code.statusCode == 200) {
    checklinkjson.push("libgen.lc");
  }
  resp = await $http.get({ url: "https://booksc.xyz/s/?" });
  code = resp.response;
  if (
    !resp.response ||
    code == null ||
    code.statusCode == 403 ||
    code.statusCode == 404
  ) {
    $ui.toast("booksc.xyz连接超时");
  } else if (code.statusCode == 200) {
    checklinkjson.push("booksc.xyz");
  }
  resp = await $http.get({ url: "https://sci-hub.tw/" }); //检测用doi:10.1021/ja0481124-45kb
  code = resp.response;
  if (
    !resp.response ||
    code == null ||
    code.statusCode == 403 ||
    code.statusCode == 404 ||
    resp.response == null
  ) {
    $ui.toast("sci-hub.tw连接超时");
  } else if (code.statusCode == 200) {
    checklinkjson.push("sci-hub.tw");
  }
  resp = await $http.get({ url: "https://sci-hub.im/" });
  code = resp.response;
  if (
    !resp.response ||
    code == null ||
    code.statusCode == 403 ||
    code.statusCode == 404 ||
    resp.response == null
  ) {
    $ui.toast("sci-hub.im连接超时");
  } else if (code.statusCode == 200) {
    checklinkjson.push("sci-hub.im");
  }
  resp = await $http.get({ url: "https://sci-hub.se/" });
  code = resp.response;
  if (
    !resp.response ||
    code == null ||
    code.statusCode == 403 ||
    code.statusCode == 404 ||
    resp.response == null
  ) {
    $ui.toast("sci-hub.se连接超时");
  } else if (code.statusCode == 200) {
    checklinkjson.push("sci-hub.se");
  }
  tabdlpt.items = checklinkjson;
  if (checklinkjson.length == 0) {
    $ui.toast("暂无可用下载地址，请检查网络或稍后再试❌");
  } else {
    $ui.toast("可用链接检测完成✅");
  }
  spin.loading = false;
};

function refresh() {
  icljson = $drive.list("articles");
  $file.write({
    data: $data({ string: JSON.stringify(icljson) }),
    path: "assets/icloudlist.json"
  });
  icloud.data = icljson;
  locjson = $file.list("articles");
  $file.write({
    data: $data({ string: JSON.stringify(locjson) }),
    path: "assets/locallist.json"
  });
  local.data = locjson;
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
