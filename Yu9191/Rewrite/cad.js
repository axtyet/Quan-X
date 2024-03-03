/*

项目名称：CAD快速看图
更新时间：2024.2.28 会员到期时间：2024.11.8
下载地址：https://t.cn/A60VKj9S
脚本作者：@ios151
使用声明：本人共享token 请勿随意删除“快看云盘”里面的图纸 否则删库
使用方法：账号：baby 密码：1

[rewrite_local]
https://cad.glodon.com/account/gld/loginByPassword url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/cad.js


[MITM]
hostname = cad.glodon.com

*/


var url = $request.url;

if (url.match(/^https:\/\/cad\.glodon\.com\/(account\/gld\/loginByPassword|authorize\/query)$/)) {
    if (url.includes("loginByPassword")) {
        var responseBody = JSON.stringify({
  "code": 1,
  "body": {
    "hasEnt": false,
    "loginIdentity": "1709447589457",
    "userId": "7127939710550418240",
    "cadToken": "3eb16cf4-e177-4c98-86e8-a8dff3fc3a58"
  }
});
        $done({ body: responseBody });
    } else if (url.includes("authorize/query")) {
        var body = $response.body;

        body = body.replace(/("endDate"\s*:\s*")2024-11-08 17:02:13"/g, '$19999-09-09 13:14:21"');
        $done({ body });
    }
}