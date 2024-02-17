/* 

Lento  



[rewrite_local]
https://lentoapp.com:8081/getUserMemberShipInfo url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Lento.js


[MITM]

hostname = lentoapp.com:8081


*/

let obj = {
  "meta" : {
    "message" : "获取作者信息成功",
    "code" : 200
  },
  "data" : {
    "paytype" : 1,
    "expiretime" : "null"
  }
}



$done({ body: JSON.stringify(obj), status: 200 });
