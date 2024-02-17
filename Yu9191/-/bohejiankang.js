/*

项目名称：薄荷健康
脚本作者：chxm1023




[rewrite_local]
^https?:\/\/api\.boohee\.com\/app-interface\/.+\/user\/user_info url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/bohejiankang.js

[mitm]
hostname = api.boohee.com

*************************************/


var chxm1023 = JSON.parse($response.body);

  chxm1023.data.vip.is_member = true;
  chxm1023.data.vip.state = "1";
  chxm1023.data.vip.expired_at = "2099-09-09 09:09:09";
  chxm1023.data.vip.integral_member = {
        "integral": 0,
        "level": 1,
        "level_name": "蓝钻会员"
      };

$done({body : JSON.stringify(chxm1023)});
