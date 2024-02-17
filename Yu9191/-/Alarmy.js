/*

使命闹钟

[rewrite_local]
^https://ars.alar.my/api/v2/user/sync url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Alarmy.js

[MITM]
hostname = ars.alar.my

*/

var objc = JSON.parse($response.body);

var newSubscription = [
  {
    "expiresDateMs": 4669109147000,
    "periodType": "TRIAL",
    "latestPurchaseDateMs": 1668504347000,
    "originalPurchaseDateMs": 1668504348000,
    "originalTransactionID": "550001242190807",
    "productID": "droom.sleepIfUCanFree.premium.yearly01.4",
    "willAutoRenew": false,
    "isActive": true
  }
];

objc.subscription = newSubscription;

$done({ body: JSON.stringify(objc) });
