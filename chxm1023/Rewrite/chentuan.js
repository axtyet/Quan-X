/*************************************

项目名称：陈抟八字
下载地址：https://t.cn/A6WbjMn7
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http[s]?:\/\/api\.chentuanbazi\.cn\/(recharge\/vipRechargeList|user\/userInfo) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/chentuan.js

[mitm]
hostname = api.chentuanbazi.cn

*************************************/


var chxm1023 = JSON.parse($response.body);
const vip1 = '/recharge/vipRechargeList';
const vip2 = '/user/userInfo';

if ($request.url.indexOf(vip1) != -1){
  chxm1023.data.userVipText = "恭喜成为钻石会员";
  chxm1023.data.validityPeriod = "会员无时间限制";
}

if ($request.url.indexOf(vip2) != -1){
  chxm1023.data.vipType = "diamond";
  chxm1023.data.title = "已加入钻石会员";
  chxm1023.data.vipExpireTimeStr = "(不限时)";
}

$done({body : JSON.stringify(chxm1023)});
