$ui.render("main");

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
