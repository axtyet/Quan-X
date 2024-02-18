/*
[rewrite_local]

https://afzs.iosoi.cn/appstore url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/afzs.js

[mitm]
hostname = afzs.iosoi.cn
*/

var updatedUrl = $request.url.replace(/udid=[^&]*/, 'udid=00008110-001C2DEC1A9B801E');
$done({ url: updatedUrl });
