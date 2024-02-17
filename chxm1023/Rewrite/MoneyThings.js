/*************************************

项目名称：MoneyThings-记账
下载地址：https://t.cn/A6pg9nPW
项目名称：SalesCat-RevenueCat客户端
下载地址：https://t.cn/A6pFPFKM
项目名称：MatrixClocca-矩阵时钟
下载地址：https://t.cn/A6pFhtw1
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/MoneyThings.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/MoneyThings.js

[mitm]
hostname = api.revenuecat.com

*************************************/


const chxm1023 = {};
const chxm1024 = JSON.parse(typeof $response != "undefined" && $response.body || null);const app = 'cm';const list = {'cm':{name: 'Premium', id: 'com.lishaohui.cashflow.lifetime'}};
const data = {
	"Author": "chxm1023",
	"Telegram" : "https://t.me/chxm1023",
	"warning": "仅供学习，禁止转载或售卖",
	"original_purchase_date": "2022-09-09T09:09:09Z",
	"purchase_date": "2022-09-09T09:09:09Z",
	"expires_date": "2099-09-09T09:09:09Z",
	"ownership_type": "PURCHASED"
};

if (typeof $response == "undefined") {
	delete $request.headers["x-revenuecat-etag"];
	delete $request.headers["X-RevenueCat-ETag"];
	chxm1023.headers = $request.headers;
} else if (chxm1024 && chxm1024.subscriber) {
	chxm1024.subscriber.subscriptions = chxm1024.subscriber.subscriptions || {};
	chxm1024.subscriber.entitlement = chxm1024.subscriber.entitlement || {};
     for (const i in list) {
if (new RegExp(`^${i}`, `i`).test(app)) {
	chxm1024.subscriber.subscriptions[list[i].id] = data;
	chxm1024.subscriber.entitlements[list[i].name] = JSON.parse(JSON.stringify(data));
	chxm1024.subscriber.entitlements[list[i].name].product_identifier = list[i].id;
			break;
		}
	}
   chxm1023.body = JSON.stringify(chxm1024);
}

$done(chxm1023);