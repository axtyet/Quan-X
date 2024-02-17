/*
安安车生活
解锁vip权益

[rewrite_local]


https://lifeserver.clifes.cn/exam/vip/info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/ananche.js

[mitm] 

hostname = lifeserver.clifes.cn
*/
let obj = {
  "result": true,
  "data": {
    "flag": true,
    "vVip": true,
    "buy": true
  },
  "code": "200"
}


$done({ body: JSON.stringify(obj), status: 200 });