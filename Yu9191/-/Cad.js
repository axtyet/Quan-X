/*

项目名称：CAD快速看图
下载地址：https://t.cn/A60VKj9S
脚本作者：@ios151
特别感谢：@chxm1023,@GuDing
电报频道：https://t.me/chxm1023
使用声明：本人共享token 请勿随意删除“快看云盘”里面的图纸 否则删库
使用方法：账号：baby 密码：1

[rewrite_local]
^https?:\/\/cad\.glodon\.com\/(account|authorize\/query|alipay\/auth) url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Cad.js


[MITM]
hostname = cad.glodon.com

*/

var body = $response.body;
var baby = JSON.parse(body);
const vip1 = '/account';
const vip2 = '/alipay/auth';
const vip3 = '/authorize/query';

if ($request.url.indexOf(vip1) != -1){
  var requestData = {
  "data": {
    "platformNumber": "1",
    "appId": "1108096074",
    "spaceId": "7080056040259444"
  },
  "code": 0
};
  var responseData = {
  "body": {
    "cadToken": "761b03f5-c01e-4e66-97dc-cc1fd2011d4f",
    "loginIdentity": "1689926495150",
    "userinfo": {
      "id": "7054044042028241822",
      "email": "baby@ios151",
      "mobile": "1",
      "globalId": "7054044042028241822",
      "gender": null,
      "birthday": null,
      "verified": true,
      "emailVerified": true,
      "mobileVerified": true,
      "enterpriseUser": false
    }
  },
  "code": 1
};
  function handleRequest(requestData) {
  return responseData;
};
  var response = handleRequest(requestData);
  body = JSON.stringify(response);
}

if ($request.url.indexOf(vip2) != -1){
  baby = {
  "endDate": "5201-03-14 19:57:57",
  "code": "1"
};
  body = JSON.stringify(baby);
}

if ($request.url.indexOf(vip3) != -1){
  baby = {
  "endDate": "5201-03-14 19:57:57",
  "code": "1"
};
  body = JSON.stringify(baby);
}

$done({body});
