/*************************************

项目名称：架子鼓
软件版本：1.1.2
下载地址：https://is.gd/w25QjR
脚本作者：安妮
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https:\/\/drum-api\.quthing\.com\/vip\/goods\/v2 url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jiazigu.js

[mitm]
hostname = drum-api.quthing.com

*************************************/


var Anni = JSON.parse($response.body);

Anni = {
  "data" : [
    {
      "isRenewVip" : true,
      "skuName" : "drumguideautomonthvip",
      "originalPrice" : 5800,
      "trialDays" : "99999",
      "month" : "999",
      "goodsId" : "1jvug8p",
      "price" : 3000,
      "showScheme" : 2,
      "currency" : "CNY",
      "name" : "安妮破解",
      "cnButtonTip" : "安妮破解"
    }
  ]
}

$done({
    body: JSON.stringify(Anni)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
