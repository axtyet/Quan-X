/*

项目名称：iTranslate 翻译
下载地址：https://t.cn/A6p2IR1g
脚本作者：chxm1023，ios151更新8.1号
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：进入App出现付费按[恢复购买]

**************************************

[rewrite_local]
^https:\/\/ssl-api\.itranslateapp\.com\/accounts\/v4\/users\/896516346808177\/subscriptions url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/itranslate.js

[mitm]
hostname = ssl-api.itranslateapp.com

*/
var lovebaby = JSON.parse($response.body);
const vip = '/subscriptions/verify';
const active = '/marketing/consent/status';

if ($request.url.indexOf(vip) != -1){
  lovebaby.licenses = [
    {
      "product_id" : "com.itranslate.pro.yearly",
      "bundle_id" : "com.outerspaceapps.itranslate",
      "is_trial_period" : true,
      "original_transaction_id" : "160001314520000",
      "expires_date_ms" : 4092599350000,
      "transaction_id" : "160001314520000"
    }
  ];
}

if ($request.url.indexOf(active) != -1){
  lovebaby ={
  "is_active" : true
  };
}

$done({ body: JSON.stringify(lovebaby) });

