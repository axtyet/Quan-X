/*

项目名称：解压动画
下载地址：https://apps.apple.com/cn/app/%E8%A7%A3%E5%8E%8B%E5%8A%A8%E7%94%BB/id1525164222
脚本作者：ios151
使用声明：⚠️仅供参考，🈲转载与售卖！


[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/jieyadonghua.js
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/jieyadonghua.js

[MITM]
hostname = api.revenuecat.com


*/
const baby = {};
const lovebaby = JSON.parse(typeof $response != "undefined" && $response.body || null);
const name = "Pro"; //解锁
const love = "Drowsy_Life";

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  baby.headers = $request.headers;
} else if (lovebaby && lovebaby.subscriber) {
  data = {
    "Author": "baby",
    "Telegram": "https://t.me/chxm1023",
    "warning": "仅供学习，禁止转载或售卖",
    "expires_date": "2099-09-09T09:09:09Z",
    "purchase_date": "2022-09-09T09:09:09Z"
  };
  lovebaby.subscriber.subscriptions[(love)] = {
    "Author": "baby",
    "Telegram": "https://t.me/chxm1023",
    "warning": "仅供学习，禁止转载或售卖",
    "original_purchase_date": "2022-09-09T09:09:09Z",
    "period_type": "trial",
    "purchase_date": "2022-09-09T09:09:09Z",
    "expires_date": "2099-09-09T09:09:09Z",
    "store": "app_store",
    "ownership_type": "PURCHASED"
  };
  lovebaby.subscriber.entitlements[(name)] = JSON.parse(JSON.stringify(data));
  lovebaby.subscriber.entitlements[(name)].product_identifier = (love);
  baby.body = JSON.stringify(lovebaby);
}

$done(baby);





