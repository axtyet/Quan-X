/*
Triplens 

[rewrite_local]
https://subscription.aresframework.com/api/purchase url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Triplens.js

[mitm]
hostname = subscription.aresframework.com

*/

let obj = JSON.parse($response.body);
obj.data.subscriptions = [
  {
    "id": 1447533,
    "inGracePeriod": 0,
    "inPremiumPeriod": 1,
    "expiresDateTime": "2099-09-09 09:09:36",
    "storeOrderId": "330001597115644",
    "productCode": "triplens_yearly",
    "cancellationDateTime": null,
    "inTrialPeriod": 1,
    "price": 7.99,
    "productProvider": "apple",
    "isRefunded": 0,
    "isActive": 1
  }
];
$done({
  body: JSON.stringify(obj)
});
