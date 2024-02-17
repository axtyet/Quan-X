/*************************************

项目名称：畅玩空间
下载地址：https://play.wo1wan.com
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/play\.wo1wan\.com\/nextgame\/igwuser\/userinfo url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/changwan.js

[mitm]
hostname = play.wo1wan.com

*************************************/



var chxm1023 = JSON.parse($response.body);

chxm1023.info.LevelInfo = {
      "LastTime" : "0001-01-01T00:00:00Z",
      "AllVipXP" : 1,
      "SVipExpires" : "2099-09-09T09:09:09Z",
      "VipLevel" : 5,
      "Svip" : 1,
      "NextVipXP" : 1,
      "VipExpires" : "2099-09-09T09:09:09Z",
      "Level" : 99,
      "NowXP" : 999,
      "NowVipXP" : 1,
      "AllXP" : 1,
      "NextLevel" : 999
    };

$done({body : JSON.stringify(chxm1023)});