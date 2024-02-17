/*
alltrails
2023.12.13最新版

[rewrite_local]
https://api-v5.alltrails.com/api/alltrails/me? url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Alltrails.js

[mitm]
hostname = api-v5.alltrails.com

*/

let obj = JSON.parse($response.body);

if (obj.users && obj.users.length > 0) {
  obj.users[0].appleConnected = true;
  obj.users[0].expirationDate = "2099-12-11T13:02:15Z";
  obj.users[0].pro = true;
  //admin不确定是否有用
  obj.users[0].admin = true;
  obj.users[0].created = "2021-12-04T13:00:43Z";
  obj.users[0].subscription.startDate = "2099-12-04T13:02:15Z";
}

$done({
  body: JSON.stringify(obj)
});
