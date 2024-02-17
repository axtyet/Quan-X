/******************************

iKF去广告

[rewrite_local]

^https:\/\/app\.ikeepfun\.com\/(discover\/digestList|adv\/startPage) url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/iKF.js

[mitm] 

hostname = app.ikeepfun.com

*******************************/
var body = $response.body

var obj = JSON.parse(body)

if(/adv\/startPage/.test($request.url)){
  obj.data.open = 0
}
if(/discover\/digestList/.test($request.url)){
  obj.data.productManuals = []
  obj.data.banner = []
}

$done({body:JSON.stringify(obj)})


   
