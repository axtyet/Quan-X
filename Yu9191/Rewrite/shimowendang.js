/*
石墨文档
[rewrite_local]
https://shimo.im/lizard-api/users/me url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/shimowendang.js

[mitm]
hostname = shimo.im
*/

var body = $response.body;


body = body.replace(/"isEnterpriseLight":\w+/g, '"isEnterpriseLight":true');


body = body.replace(/"isEnterprisePremium":\w+/g, '"isEnterprisePremium":true');

body = body.replace(/"isPersonalPremium":\w+/g, '"isPersonalPremium":true');

body = body.replace(/"isTrial":\w+/g, '"isTrial":true');


body = body.replace(/"isWework":\s*false/g, '"isWework":true');


// 是否为企业
body = body.replace(/"isEnterprise":\s*false/g, '"isEnterprise":true');

body = body.replace(/"isDingtalk":\s*false/g, '"isDingtalk":true');

body = body.replace(/"isFreeEnterprise":\s*false/g, '"isFreeEnterprise":true');

$done({ body });
