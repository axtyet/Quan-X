// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/ReminiLifetime.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/ReminiLifetime.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/ReminiLifetime.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/ReminiLifetime.stoverride

/*
项目名称：Remini
项目作者：David
下载地址：https://apps.apple.com/us/app/remini-ai-photo-enhancer/id1470373330?l=en-GB
使用说明：无
使用声明：仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https?:\/\/.*\.oracle\.bendingspoonsapps\.com\/v\d\/(users\/.+|purchases\/verify) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/ReminiLifetime.js

[mitm]
hostname = *.oracle.bendingspoonsapps.com
*/

if ($response.body != 'undefined'){
var mgmdev = JSON.parse($response.body);
const url = $request.url;

if (url.indexOf('remini') != -1) { ids = "com.bigwinepot.nwdn.international.1w_p9_99_pro";}

mgmdev["me"]["active_subscriptions_ids"] = [(ids)];
mgmdev["me"]["active_bundle_subscriptions"] = [{
   "expiry" : "2080-08-08T08:08:08+00:00",
   "product_id" : (ids),
   "features" : ["unlock"]
  }];
mgmdev["settings"]["__identity__"]["expiration"] = "2080-08-08T08:08:08+00:00";
$done({body : JSON.stringify(mgmdev)});
}
