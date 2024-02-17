/*
光影边框

[rewrite_local]
https://prod.dengziwl.com/light-shadow/member/info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/gybk.js

[mitm]
hostname = prod.dengziwl.com

*/

let obj = {
  "code": 200,
  "errorCode": null,
  "result": {
    "expireDate": "2099-09-09",
    "id": "1751545386746535937",
    "type": {
      "name": "PAID",
      "display": "付费会员"
    },
    "limitedTimeFree": false
  },
  "description": null
}

$done({ body: JSON.stringify(obj), status: 200 });