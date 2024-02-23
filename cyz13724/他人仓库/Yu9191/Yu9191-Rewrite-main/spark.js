/* 

Name：Spark 3.7.0 
Name：Airmail
download：https://t.cn/A60o4pn5
download：https://suo.yt/5kIFilB
To：@ios151
disclaimers：Study, not spread


[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/spark.js


[MITM]
hostname = api.revenuecat.com


*/

const lovebaby = {};
const lovelovebabyforevey = JSON.parse(typeof $response != "undefined" && $response.body || null);

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  lovebaby.headers = $request.headers;
} else if (lovelovebabyforevey && lovelovebabyforevey.subscriber) {
  lovelovebabyforevey.subscriber.subscriptions = lovelovebabyforevey.subscriber.subscriptions || {};
  lovelovebabyforevey.subscriber.entitlements = lovelovebabyforevey.subscriber.entitlements || {};

  const data = {
    "expires_date": "52013-01-14T00:00:00Z",
    "original_purchase_date": "2022-11-18T03:57:16Z",
    "purchase_date": "2022-11-18T04:00:12Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };

  lovelovebabyforevey.subscriber.subscriptions["spark_5999_1y_1w0"] = data;
  lovelovebabyforevey.subscriber.entitlements["premium"] = JSON.parse(JSON.stringify(data));
  lovelovebabyforevey.subscriber.entitlements["premium"].product_identifier = "spark_5999_1y_1w0";

  lovebaby.body = JSON.stringify(lovelovebabyforevey);
}

$done(lovebaby);











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
