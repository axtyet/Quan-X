/*************************************

项目名称：revenuecat合集 （此合集只包含10.5及以后的软件）
软件版本：均适配2023.9.8最新 （每一个下载地址对应一个UAMappings）
下载地址：星锤日记 https://is.gd/R5KqD4
下载地址：倒数鸭  https://is.gd/rETAhp
下载地址：星垂专注 https://is.gd/rEG9H5
下载地址：Context https://is.gd/splCnF
下载地址： Vision-个人OKR目标管理 https://t.cn/A6OxXNxK
下载地址：Structured-每日计划 https://t.cn/A6cWhz4X
下载地址：cookie记账 
下载地址：倒数鸭 
下载地址：HTTPBOT 2022.2.1 作者zoo
下载地址：Mypianist 2.08
下载地址：TouchRetouch 5.1.12
下载地址：Appspree https://t.cn/A6otfeAc 3.1
下载地址：Persona 1.824
下载地址：WordSwag 4.56
下载地址：AnkiPro 1.22.1
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
#修改
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Revenuecat.js
#清理
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/Revenuecat.js


[mitm] 
hostname = api.revenuecat.com

************************************/


const anni = {};
const anni1 = JSON.parse(typeof $response != "undefined" && $response.body || null);
if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  anni.headers = $request.headers;
} else if (anni1 && anni1.subscriber) {
  anni1.subscriber.subscriptions = anni1.subscriber.subscriptions || {};
  anni1.subscriber.entitlements = anni1.subscriber.entitlements || {};
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
  const app = '1';
  const UAMappings = {
    'StarDiary':{ name: 'pro', id: 'com.gsdyx.StarDiary.nonConsumable.forever'},
    'CountDuck':{ name: 'premium', id: 'Lifetime'},
    'StarFocus':{ name: 'pro', id: 'com.gsdyx.StarFocus.nonConsumable.forever'},
    'Context_iOS':{ name: 'pro', id: 'ctx_3y_sspai_preorder_angel'},
    'Vision':{ name: 'promo_3.0', id: 'vis_lifetime_3.0_promo'},
    'Structured':{ name: 'pro', id: 'today.structured.pro'},
    'Cookie':{ name: 'allaccess', id: 'app.ft.Bookkeeping.lifetime'},
    'CountDuck':{ name: 'premium', id: 'Lifetime'},
    'HTTPBot':{ name: 'Pro', id: 'httpbot_1499_1y_1w0'},
    'MyPianist':{ name: 'pro', id: 'com.collaparte.mypianist.pro.gift.twelve'},
    'TouchRetouchBasic':{ name: 'premium', id: 'tr5_yearlysubsc_30_and_20_dlrs'},//年底订阅
    'Free':{ name: 'pro', id: 'appspree_pro_lifetime'},
    'Version':{ name: 'pro', id: 'httpbot_1499_1y_1w0'},
    'wordswag':{ name: 'pro', id: 'Pro_Launch_Monthly'},
    'BlackBox':{ name: 'plus', id: 'app.filmnoir.appstore.purchases.lifetime'},
    'LongmaoApp':{ name: 'pro', id: 'douyina_forever_01'},
    'AnkiPro':{ name: 'Premium', id: 'com.ankipro.app.lifetime'},
  };
  const data = {
    "expires_date": "2099-12-31T12:00:00Z",
    "original_purchase_date": "2023-09-01T11:00:00Z",
    "purchase_date": "2023-09-01T11:00:00Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };
  for (const i in UAMappings) {
    if (new RegExp(`^${i}`, 'i').test(UA)) {
      const { name, id } = UAMappings[i];
      anni1.subscriber.subscriptions = {};
      anni1.subscriber.subscriptions[id] = data;
      anni1.subscriber.entitlements[name] = JSON.parse(JSON.stringify(data));
      anni1.subscriber.entitlements[name].product_identifier = id;
      break;
    }
  }
  anni.body = JSON.stringify(anni1);
}
$done(anni);











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
