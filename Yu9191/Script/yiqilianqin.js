/*************************************

项目名称：一起练琴
下载地址：https://t.cn/A6OT6Ald
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?://.*\/client\/.*\/(my_info|user_vip)$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Script/yiqilianqin.js

[mitm]
hostname = *

*************************************/


var body = $response.body;
function replaceInBody(regex, replacement) {
  body = body.replace(regex, replacement);
}

replaceInBody(/\"last_day":".*?"/g, '"last_day":"2099-09-09"');
replaceInBody(/\"vip_last_day":".*?"/g, '"vip_last_day":"2099-09-09"');
replaceInBody(/\"last_day":null/g, '"last_day":"2099-09-09"');
replaceInBody(/\"vip_last_day":null/g, '"vip_last_day":"2099-09-09"');
replaceInBody(/\"is_vip_valid":\w+/g, '"is_vip_valid":true');
replaceInBody(/\"purchased":\w+/g, '"purchased":true');
replaceInBody(/\"authenticated":\w+/g, '"authenticated":true');
replaceInBody(/\"vip_status_string":".*?"/g, '"vip_status_string":"VIP 有效期至 2099-09-09"');
replaceInBody(/\"buy_or_continue":"购买"/g, '"buy_or_continue":"续费"');
replaceInBody(/\"info_json":{    "new_red_points": {      "bind_main_teacher_remind": false    },    "student": {      "is_teacher_exist": false    }  }/g, '"info_json":{    "new_red_points": {      "bind_main_teacher_remind": false    },    "student": {      "is_teacher_exist": false    },    "vip": {      "last_day": "2099-09-09"    }  }');

$done({body});