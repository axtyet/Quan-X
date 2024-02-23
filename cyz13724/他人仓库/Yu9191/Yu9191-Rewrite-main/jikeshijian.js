/*

#小程序://极客时间/GXdRaLCdInCX2Lg
解锁全课程播放以及文章

[rewrite_local]


https://time.geekbang.org/serv/v1 url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jikeshijian.js

[mitm] 

hostname = time.geekbang.org


*/

var body = $response.body;

body = body.replace(/"article_could_preview":\w+/g, '"article_could_preview":true');

body = body.replace(/article_could_preview":".*?"/g,'article_could_preview":true');

body = body.replace(/is_video_preview":".*?"/g,'is_video_preview":true');

body = body.replace(/column_had_sub":".*?"/g,'column_had_sub":true');
$done({ body });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
