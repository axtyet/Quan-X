/*************************************

项目名称：Context
软件版本：1.0.3
下载地址：https://is.gd/splCnF
使用声明：⚠️仅供参考，🈲️转载与售卖！
零元解锁：直接0元购买 解锁到自己账户 同步iCloud
1.首先添加js到qx并开启规则进入软件 解锁会员
2.点进去立即购买（显示0元就代表成功）可以同步到苹果服务器 
3.然后关闭脚本 就可以奔放了 
4.换设备也一样可以 就是同步iCloud 愉快的玩耍了

**************************************

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Context.js

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
    'Context_iOS':{ name: 'pro', id: 'ctx_3y_sspai_preorder_angel'},
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
