
[rewrite_local]

# JavDB //api.yijingluowangluo.xyz, jdforrepam.com
^https:\/\/(api\.yijingluowangluo\.xyz|jdforrepam\.com)\/api\/(v1\/(ads|startup|users)|v4\/movies\/\w+) url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
^https:\/\/(api\.yijingluowangluo\.xyz|jdforrepam\.com)\/api\/v1\/movies\/\w+\/play\? url script-request-header https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/javdb.js
# JavDB //api.hechuangxinxi.xyz, jdforrepam.com
^https:\/\/(api\.hechuangxinxi\.xyz|jdforrepam\.com)\/api\/(v1\/(ads|startup|users)|v4\/movies\/\w+) url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
^https:\/\/(api\.hechuangxinxi\.xyz|jdforrepam\.com)\/api\/v1\/movies\/\w+\/play\? url script-request-header https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/javdb.js
[mitm]

hostname=api.hechuangxinxi.xyz, jdforrepam.com

***********************************/











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
