/*

Slopes 
2023.12.5更新

[rewrite_local]
https://my.getslopes.com/api/v2/account url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Slopes.js

[mitm] 
hostname = my.getslopes.com
1
*/

var obj = JSON.parse($response.body);
obj.pass_expiration = 4070880000;
obj.pass_ranges = [
  {
    "is_trial_period": false,
    "end": 4070880000,
    "subscription_origin": "apple",
    "auto_renewing": "on",
    "start": 1701704386
  }
];
//obj.lastname = "叼毛安妮";
$done({ body: JSON.stringify(obj) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
