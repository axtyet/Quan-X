// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/CerealTrans.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/CerealTrans.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/CerealTrans.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/CerealTrans.stoverride

/*
项目名称：cereal-translator
项目作者：David
使用说明：先开脚本再重新进入，未成功点击recharge栏恢复。
下载地址：https://apps.apple.com/app/id6466264767

[rewrite_local]
^https:\/\/youxifanyizhushou\.com\/ios\/api\/product\/user\/remain\/ios$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/CerealTrans.js

[mitm]
hostname = youxifanyizhushou.com
*/

var objc = JSON.parse($response.body);
objc.data.forEach(item => {
  item.times = 20000;
  item.targetProductId = "mp_subscription_level_30";
  item.expireDay = 99999;
 item.premium = true;
  item.productId = 32;
  item.expireTime = "2080-02-29 12:54:58";
  item.level = 3;
});
objc.code = 0;
objc.data.forEach(item => {
  item.productPayType = "Apple";
});
$done({ body: JSON.stringify(objc) });







// Adding stoverride commit(4)
// Adding sgmodule commit(1)
// Add plugin commit(6)



// Adding a dummy sgmodule commit(2)






// Adding a dummy plugin commit(5)
// Adding a dummy stoverride commit(7)
