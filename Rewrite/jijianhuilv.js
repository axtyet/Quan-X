/*************************************

项目名称：极简汇率
下载地址：https://too.st/60a
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(xremit\.xcurrency|explorer.tratao)\.com\/api\/client\/xtool\/vip url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/jijianhuilv.js

[mitm]
hostname = xremit.xcurrency.com, explorer.tratao.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = [
    {
      "uuid" : "D53A4774-B52D-4B2C-A9EB-2ECAD9999999",
      "id" : "dd9ce407ea984500a65957c2e0659999",
      "vipPayUnit" : "year",
      "benefits" : [

      ],
      "expire" : "2099-09-09 09:09:09",
      "vipStatus" : "paid",
      "update" : "2023-10-23 08:21:57",
      "vipLevel" : "senior",
      "userId" : "93fa3b800daa451646a5825c249c9999",
      "vipPayNum" : 1,
      "vipPayType" : "auto_sub",
      "created" : "2023-10-23 08:21:52"
    }
  ];

$done({body : JSON.stringify(chxm1023)});
