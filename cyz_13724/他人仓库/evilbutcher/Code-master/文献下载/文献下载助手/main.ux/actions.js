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
var name = [];
var findarticle;
var icljson;
var locjson;
var erjson = [];
var linkjson = [];
var checklinkjson = [];
var array = [];
var parsefilename = [];
var outputlink;
var i;

exports.gotodownload = async sender => {
  spin.loading = true;
  outputlink = [];
  name = [];
  word = inputtext.text;
  if (word.length == 0) {
    word = doi;
  }
  array = word.split(",");
  var N = array.length;
  $ui.toast("正在命名...");
  if (N > 5) {
    for (i = 0; i < N; ) {
      //formname
      var dire = array[i].replace(new RegExp("/", "g"), "_");
      name.push(dire + ".pdf");
      i = i + 1;
    }
  } else {
    for (i = 0; i < N; ) {
      if (switchrename.on == true) {
        //getname
        var resp = await $http.request({
          method: "get",
          url: "http://gen.lib.rus.ec/scimag/?q=" + array[i],
          header: {
            host: "gen.lib.rus.ec"
          }
        });
        var nameresult = resp.response;
        if (
          nameresult == null ||
          nameresult.statusCode == 403 ||
          nameresult.statusCode == 404
        ) {
          //formname
          $ui.toast("网络请求失败，将使用默认名称❌");
          dire = array[i].replace(new RegExp("/", "g"), "_");
          name.push(dire + ".pdf");
        } else if (nameresult.statusCode == 200) {
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
          var dire2 = dihou.replace(new RegExp("/", "g"), "_");
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
          name.push(title + "_" + journal + "_" + vol + "_" + dire2 + ".pdf");
        }
      } else {
        //formname
        dire = array[i].replace(new RegExp("/", "g"), "_");
        name.push(dire + ".pdf");
      }
      i = i + 1;
    }
  }
  if (N == 1) {
    i = 0;
    switch (tabdlpt.items[tabdlpt.index]) {
      case "libgen.lc":
        lglcdlrq(i, N, array[i]);
        break;
      case "booksc.xyz":
        bsxydlrq(i, N, array[i]);
        break;
      case "sci-hub.tw":
        shtwdlrq(i, N, array[i]);
        break;
      case "sci-hub.im":
        shimdlrq(i, N, array[i]);
        break;
      case "sci-hub.se":
        shsedlrq(i, N, array[i]);
        break;
    }
  } else {
    var modnumber = tabdlpt.items.length;
    for (i = 0; i < N; ) {
      switch (tabdlpt.items[i % modnumber]) {
        case "libgen.lc":
          lglcdlrq(i, N, array[i]);
          i = i + 1;
          break;
        case "booksc.xyz":
          bsxydlrq(i, N, array[i]);
          i = i + 1;
          break;
        case "sci-hub.tw":
          shtwdlrq(i, N, array[i]);
          i = i + 1;
          break;
        case "sci-hub.im":
          shimdlrq(i, N, array[i]);
          i = i + 1;
          break;
        case "sci-hub.se":
          shsedlrq(i, N, array[i]);
          i = i + 1;
          break;
      }
    }
  }
};

exports.close = sender => {
  $app.close();
};

exports.ready = sender => {
  if ($app.env == 1 || $app.env == 2 || $app.env == 4) {
    $app.tips(
      "通过doi号(复制剪贴板文本)下文献；\n批量下载时doi号用英文逗号隔开；\n长按地址栏检测可用链接；\n长按对应的链接手动下载文献；\n文献界面单点删除、长按分享；\n重命名采用标题-期刊-卷-doi方式；\n批量下载大于5篇重命名默认关闭；\n关闭iCloud Drive，文献存储在脚本目录articles下(可打包分享)；\n打开iCloud Drive，文献存储在JSBox/ArticlesHelper/articles中（Windows可在Microsoft Store下载iCloud同步）；\niCloud中的ArticlesHelper/download目录用来存储wos下载的html记录；\n具体方法：Safari下载html格式的wos文献记录，下载完成后打开目录，转存至ArticlesHelper/download文件夹，打开脚本，通过载入文件解析doi，若有多篇文献记录默认载入最后一个文件的doi。所有文献记录以txt格式保存在ArticlesHelper/articles目录下，可通过文献界面下拉刷新对解析记录进行管理；\n如有问题可查看readme。"
    );
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
    if ($drive.exists("ArticlesHelper/articles") == false) {
      $drive.mkdir("ArticlesHelper/articles");
    }
    if ($drive.exists("ArticlesHelper/download") == false) {
      $drive.mkdir("ArticlesHelper/download");
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
    $file.delete("assets/locallist 2.json");
    $file.delete("assets/icloudlist 2.json");
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
  } else {
    $push.schedule({
      title: "请避免在此环境下运行。"
    });
    $app.close();
  }
};

function download(i, N, link) {
  //checklink
  if (findarticle == null) {
    $ui.toast("文献未找到❌");
    erjson.push("未找到  " + array[i]);
    erlist.data = erjson;
    linkjson.push("未找到下载链接");
    linklist.data = linkjson;
    findarticle = "found";
    spin.loading = false;
  } else {
    linkjson.push(link);
    linklist.data = linkjson;
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
          $ui.toast("下载出错，请更换下载地址或检查doi❌");
        } else {
          if (switchicloud.on == true) {
            $drive.write({
              data: resp.data,
              path: "ArticlesHelper/articles/" + name[i]
            });
            icljson = JSON.parse($file.read("assets/icloudlist.json").string);
            icljson.push(name[i]);
            $file.write({
              data: $data({ string: JSON.stringify(icljson) }),
              path: "assets/icloudlist.json"
            });
            icloud.data = icljson;
          } else {
            $file.write({
              data: resp.data,
              path: "articles/" + name[i]
            });
            locjson = JSON.parse($file.read("assets/locallist.json").string);
            locjson.push(name[i]);
            $file.write({
              data: $data({ string: JSON.stringify(locjson) }),
              path: "assets/locallist.json"
            });
            local.data = locjson;
          }
          $ui.toast("下载成功✅");
          if (switchshare.on == true) {
            $share.sheet([name[i], resp.data]);
          }
          erjson.push("完成   " + array[i]);
          erlist.data = erjson;
          findarticle = "found";
          if (i == N - 1) {
            spin.loading = false;
          }
        }
      }
    });
  }
}

function lglcdlrq(i, N, word) {
  $ui.toast("正在请求数据");
  $http.request({
    method: "get",
    url: "https://libgen.lc/scimag/ads.php?doi=" + word,
    header: {
      host: "libgen.lc"
    },
    handler: function(resp) {
      var result = resp.response;
      if (!resp.response || result == null || result.statusCode == 403) {
        $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络❌");
        findarticle = "found";
        spin.loading = false;
      } else if (result.statusCode == 404) {
        $ui.toast("文献未找到❌");
        erjson.push("未找到  " + array[i]);
        erlist.data = erjson;
        linkjson.push("未找到下载链接");
        linklist.data = linkjson;
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
        $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络❌");
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
        $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络❌");
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
  $http.request({
    method: "get",
    url: "https://sci-hub.st/" + word,
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
        $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络❌");
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
        $ui.toast("该地址暂时无法连接，请更换下载地址或检查网络❌");
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
      refresh();
      $("view[0]").hidden = false;
      $("view[1]").hidden = true;
      $("view[2]").hidden = true;
      break;
    case 1:
      refresh();
      $("view[0]").hidden = true;
      $("view[1]").hidden = false;
      $("view[2]").hidden = true;
      break;
    case 2:
      refresh();
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
    $share.sheet([
      articlename,
      $drive.read("ArticlesHelper/articles/" + articlename)
    ]);
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
            $drive.delete("ArticlesHelper/articles/" + article);
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
            $drive.delete("ArticlesHelper/articles");
            icljson = JSON.parse($file.read("assets/icloudlist.json").string);
            icljson.splice(0);
            $file.write({
              data: $data({ string: JSON.stringify(icljson) }),
              path: "assets/icloudlist.json"
            });
            icloud.data = icljson;
            $drive.mkdir("ArticlesHelper/articles");
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
  //从iCloud载入文件
  parsefilename = $drive.list("ArticlesHelper/download");
  if (parsefilename.length == 0) {
    $ui.toast("未找到待解析文件❌");
  } else {
    for (i = 0; i < parsefilename.length; ) {
      var DI = [];
      var cheerio = require("cheerio");
      var $ = cheerio.load(
        $drive.read("ArticlesHelper/download/" + parsefilename[i]).string
      );
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
      var writename = parsefilename[i].replace(".html", ".txt");
      $drive.write({
        data: $data({ string: JSON.stringify(DI) }),
        path: "ArticlesHelper/articles/" + writename
      });
      i = i + 1;
    }
    $ui.toast("解析完成✅");
  }
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
  icljson = $drive.list("ArticlesHelper/articles");
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
