/*
小熊录屏
1.7.8
2023.12.21
[rewrite_local]

http://donate-api.recorder.duapps.com/pay/checkAppleSubscribeReceipt? url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/xiaoxiongluping.js


[mitm]
hostname = donate-api.recorder.duapps.com

*/
let obj = JSON.parse($response.body);
obj.result = [
    {
      "productId": "recorder_1_year",
      "expiresDateMs": 4092595200000
    }
];
$done({ body: JSON.stringify(obj) });
