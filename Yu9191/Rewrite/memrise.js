/*
memrise

[rewrite_local]

^https:\/\/api\.memrise\.com url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/memrise.js

[mitm] 

hostname = api.memrise.com
*/

var body = $response.body;


body = body.replace(/"is_pro":\s*false/g, '"is_pro":true');

body = body.replace(/"is_premium":\s*false/g, '"is_premium":true');

//body = body.replace(/"is_locked":\s*false/g, '"is_locked":true');

$done({ body });