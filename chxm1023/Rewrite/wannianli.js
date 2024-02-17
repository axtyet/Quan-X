/*************************************

项目名称：万年历
下载地址：https://t.cn/A6lrFCm4
更新日期：2024-01-05
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.jiemengjia\.com\/(member\/(member_info|pay_verify_new|create_order)|dialogue\/adspace) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/wannianli.js

[mitm]
hostname = *.jiemengjia.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const member = /member_info/;
const pay = /pay_verify_new/;
const order = /create_order/;
const ad = /dialogue\/adspace/;

if(member.test($request.url)){
  chxm1023.data = {
    ...chxm1023.data,
    "vip_state" : "1",
    "start_time" : "2024-01-01 00:00:00",
    "end_time" : "2099-09-09 09:09:09",
    "member_type" : "1"
  };
}

if(pay.test($request.url)){
  chxm1023.data.is_pay = "1";
}

if(order.test($request.url)){
  chxm1023.data.order_code = "VIP-1704300495021WYN4G";
}

if(ad.test($request.url)){
  chxm1023.data.member_banner = {};
  chxm1023.data.my_banner = {};
}

$done({body : JSON.stringify(chxm1023)});