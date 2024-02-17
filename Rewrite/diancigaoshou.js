/*************************************

项目名称：电磁高手-云解析
下载地址：https://t.cn/A6N23Igg
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.diancigaoshou\.com\/api\/cards\/valid url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/diancigaoshou.js

[mitm]
hostname = api.diancigaoshou.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "cards" : [
    {
      "orderNo" : null,
      "magsTotal" : 1000000,
      "cardTypeTitle" : {
        "zh-CN" : "超级VIP",
        "en" : "Super VIP"
      },
      "type" : "SVIP",
      "expireTime" : "2099-09-09T09:09:09.000Z",
      "magsUsed" : 1
    }
  ]
};

$done({body : JSON.stringify(chxm1023)});
