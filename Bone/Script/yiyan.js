/*

[rewrite_local]
^https?:\/\/app\.yiyan\.art\/yiyan url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Guding88/Script/yiyan.js

[MITM]
hostname = app.yiyan.art

*/
var guding = JSON.parse($response.body);
guding = JSON.stringify(guding).replace(/"viptype":"\d+"/g, '"viptype":"4"');
$done({ body: guding });
