// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/Language_iTunes.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/Language_iTunes.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/Language_iTunes.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/Language_iTunes.stoverride

/*
项目名称：语言类iTunes合集（此合集只包含learn xx with flashcards）
项目作者：Levi
软件版本：截止2024.2.2最新版（每一个下载地址对应一个uaProductMapping）
下载地址：Learn Italian https://apps.apple.com/app/id1513029876
下载地址：Learn English https://apps.apple.com/app/id1324697387
下载地址：Learn Spanish https://apps.apple.com/app/id1397753065
下载地址：Learn French https://apps.apple.com/app/id1452065314
下载地址：Learn Japanese https://apps.apple.com/app/id1572852037
下载地址：Learn Korean https://apps.apple.com/app/id1462517909
下载地址：Learn Czech  https://apps.apple.com/app/id1551554809
下载地址：Learn Portuguese https://apps.apple.com/app/id1615734582
下载地址：Learn Dutch https://apps.apple.com/app/id6444714714
下载地址：Learn Russian https://apps.apple.com/app/id1615737294
下载地址：Learn Turkish https://apps.apple.com/app/id1551554687
下载地址：Learn Polish https://apps.apple.com/app/id1551554802
下载地址：Learn Chinese https://apps.apple.com/app/id1506394878
下载地址：Learn Finnish https://apps.apple.com/app/id1512597815
下载地址：Learn German https://apps.apple.com/app/id1397752797
使用说明：先开脚本再重新进入一次应用，即可解锁订阅；未解锁需要点击菜单恢复购买。下载链接请通过script-path链接获取。
使用声明：⚠️仅供参考，🈲️转载与售卖！
**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/Language_iTunes.js

[mitm]
hostname = buy.itunes.apple.com
*/

var Levi = {};
var Levi01 = JSON.parse(typeof $response != "undefined" && $response.body || null);
var headers = {};
for (var key in $request.headers) {
  const reg = /^[a-z]+$/;
  if (key === "User-Agent" && !reg.test(key)) {
    var lowerkey = key.toLowerCase();
    $request.headers[lowerkey] = $request.headers[key];
    delete $request.headers[key];
  }
}
var UA = $request.headers['user-agent'];
var uaProductMapping = {
  'ReWord%20it_en/2': {product_id: 'sub_it_en_12_600'},
  'ReWord%20en_ru/2': {product_id: 'sub_en_ru_12_600'},
  'ReWord%20es_en/2': {product_id: 'sub_es_en_12_600'},
  'ReWord%20fr_en/2': {product_id: 'sub_fr_en_12_600'},
  'ReWord%20ja_en/2': {product_id: 'sub_ja_en_12_600'},
  'ReWord%20ko_en/2': {product_id: 'sub_ko_en_12_600'},
  'ReWord%20cs_en/2': {product_id: 'sub_cs_en_12_600'},
  'ReWord%20pt_en/2': {product_id: 'sub_pt_en_12_600'},
  'ReWord%20nl_en/2': {product_id: 'sub_nl_en_12_600'},
  'ReWord%20ru_en/2': {product_id: 'sub_ru_en_12_600'},
  'ReWord%20tr_en/2': {product_id: 'sub_tr_en_12_600'},
  'ReWord%20pl_en/2': {product_id: 'sub_pl_en_12_600'},
  'ReWord%20zh_en/2': {product_id: 'sub_zh_en_12_600'},
  'ReWord%20fi_ru/2': {product_id: 'sub_fi_ru_12_600'},
  'ReWord%20de_ru/2': {product_id: 'sub_de_ru_12_600'},
};
var receipt = {
  "quantity": "1",
  "purchase_date_ms": "1686776705000",
  "expires_date": "2099-12-31 05:05:05 Etc\/GMT",
  "expires_date_pst": "2099-12-31 05:05:05 America\/Los_Angeles",
  "is_in_intro_offer_period": "false",
  "transaction_id": "999999999999999",
  "is_trial_period": "false",
  "original_transaction_id": "999999999999999",
  "purchase_date": "2023-06-15 05:05:05 Etc\/GMT",
  "product_id": "888888888888888",
  "original_purchase_date_pst": "2023-06-15 05:05:05 America\/Los_Angeles",
  "in_app_ownership_type": "PURCHASED",
  "subscription_group_identifier": "20877951",
  "original_purchase_date_ms": "1686776705000",
  "web_order_line_item_id": "999999999999999",
  "expires_date_ms": "4102347905000",
  "purchase_date_pst": "2023-06-15 05:05:05 America\/Los_Angeles",
  "original_purchase_date": "2023-06-15 05:05:05 Etc\/GMT"
}
var renewal = {
  "expiration_intent": "1",
  "product_id": "888888888888888",
  "is_in_billing_retry_period": "0",
  "auto_renew_product_id": "888888888888888",
  "original_transaction_id": "999999999999999",
  "auto_renew_status": "0"
}
for (var uaKey in uaProductMapping) {
  if (UA && UA.includes(uaKey)) {
    var productInfo = uaProductMapping[uaKey];
    var product_id = productInfo.product_id;
    receipt.product_id = product_id;
    renewal.product_id = product_id;
    renewal.auto_renew_product_id = product_id;
    Levi01.receipt.in_app = [receipt];
    Levi01.latest_receipt_info = [receipt];
    Levi.pending_renewal_info = [renewal];
    break;
  }
}
Levi = Levi01;
$done({ body: JSON.stringify(Levi) });
