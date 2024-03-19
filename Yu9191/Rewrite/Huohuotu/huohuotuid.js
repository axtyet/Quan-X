/**
 * @火火兔id 通知


[rewrite_local]
https://api.cloud.alilo.com.cn/api/v4/user-activation/check-sowing url script-request-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Huohuotu/huohuotuid.js
[mitm] 

hostname = api.cloud.alilo.com.cn

**/


var requestBody = $request.body;
const userIdMatch = requestBody.match(/"userId":(\d+)/);
const albumIdMatch = requestBody.match(/"albumId":"(\d+)"/);
$notify("火火兔", "用户id和文章id", `用户: ${userIdMatch ? userIdMatch[1] : '未匹配到'}, 文章: ${albumIdMatch ? albumIdMatch[1] : '未匹配到'}`);
$done();
