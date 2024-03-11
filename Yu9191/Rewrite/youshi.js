/*

有诗 1.0.1

[rewrite_local]
https://youshiapp.com/api/v1/users/me url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/youshi.js

[mitm] 
hostname = youshiapp.com
*/

let obj = JSON.parse($response.body);
obj.has_paid = true;
obj.is_lifetime_member = true;
obj.is_member = true;
$done({
  body: JSON.stringify(obj)
});
