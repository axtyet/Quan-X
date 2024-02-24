/*
欣师网校
全课程 全题库 解锁
（课程里面"讲义"无法下载 可以去搜索下载）

[rewrite_local]
#课程题库
https:\/\/api\.xinxuejy\.com\/api\/(course\/detail|package\/liveDetail|know\/index|paper\/index|search\/getList|search\/getLibraryById|index\/banner\/type\/app_mall|user\/myInfo) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/xswx.js
#欢迎加入叮当猫频道
https://www31c1.53kf.com/m.php url 302 https://t.me/chxm1023

[mitm] 

hostname = app.xinxuejy.com
*/

var body = $response.body;

body = body.replace(/("is_free"\s*:\s*)"0"/g, '$1"1"');
body = body.replace(/("is_delete"\s*:\s*)"0"/g, '$1"1"');
body = body.replace(/("last_time"\s*:\s*)null/g, '$1"2099-01-25 23:29:26"');
body = body.replace(/("is_try"\s*:\s*)"0"/g, '$1"1"');
body = body.replace(/("bought"\s*:\s*)\d+/g, '$11');
body = body.replace(/("balance"\s*:\s*)"\d+"/g, '$1"99999"');
body = body.replace(/("nickname"\s*:\s*)(".*?"|""|null)/g, '$1"欢迎叮当猫TG频道点这里👇🏻"');
body = body.replace(/("data"\s*:\s*\[\s*{[^}]+)("path"\s*:\s*").+?"/, '$1"path":"https://raw.githubusercontent.com/Yu9191/-/main/babylogo2.png"');
body = body.replace(/("data"\s*:\s*\[\s*{[^}]+)("img_url"\s*:\s*").+?"/, '$1"img_url":"https://t.me/chxm1023"');

$done({ body });
