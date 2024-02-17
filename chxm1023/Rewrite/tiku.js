/*************************************

项目名称：题库大全
下载地址：https://t.cn/A6W2GEer
下载地址：https://t.cn/A6W2VKyO
下载地址：https://t.cn/A6W2IIWG
下载地址：https://t.cn/A6W2auz1
下载地址：https://t.cn/A6WLb5H7
下载地址：https://t.cn/A6WL6A7h
下载地址：https://t.cn/A6l20jRY
下载地址：https://t.cn/A6lLMblK
下载地址：https://t.cn/A6loA1L5
下载地址：https://t.cn/A6loArwA
下载地址：https://t.cn/A6loAg2d
下载地址：https://t.cn/A6loADPp
下载地址：https://t.cn/A6loAsh7
下载地址：https://t.cn/A6lo2vWo
更新日期：2023-12-18
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
特别说明：以上下载链接解锁同作者的所有APP
**************************************

[rewrite_local]
^https?:\/\/(iosapi\.yueshuian|question\.tiku\.cqxcj|base\.cmoe|yyapi\.yayingtk|learn\.cqrry|api\.sryx|api\.meigit|question\.api\.anjiazui|app\.bftk|question\.civil\.shaoeyy)\.(com|top|net).+(common|front\/customer|vip\/getValidTime) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/tiku.js

[mitm]
hostname = iosapi.yueshuian.com, question.tiku.cqxcj.top, base.cmoe.top, yyapi.yayingtk.com, learn.cqrry.com, api.sryx.net, api.meigit.com, question.api.anjiazui.com, app.bftk.com.cn, question.civil.shaoeyy.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const vipa = /(common|front\/customer)/;
const vipb = /vip\/getValidTime/;

if(vipa.test($request.url)){
  chxm1023.data = {
   ...chxm1023.data,
   isVip: true,
   vipDueDate: 4092599349,
   vipDueDateStr: "2099-09-09 09:09:09",
   vipMonth: 1
  };
}

if(vipb.test($request.url)){
  chxm1023.VaildEndTime = "2099-09-09 09:09:09";
  chxm1023.Status = 1;
}

$done({body : JSON.stringify(chxm1023)});