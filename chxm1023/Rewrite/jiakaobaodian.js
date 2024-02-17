/*************************************

项目名称：驾考宝典
下载地址：https://t.cn/A6NIJYkf
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
温馨提示：不完全解锁，部分功能可用，vip题库不行
**************************************

[rewrite_local]
^https?:\/\/.*\.kakamobi\.cn\/api\/open url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/jiakaobaodian.js

[mitm]
hostname = *.kakamobi.cn

*************************************/


var body = $response.body;

body = body.replace(/\"expireTime":\w+/g, '\"expireTime":4092599349000');

body = body.replace(/\"effected":\w+/g, '\"effected":true');

body = body.replace(/\"expired":\w+/g, '\"expired":false');

body = body.replace(/\"residualTimes":\w+/g, '\"residualTimes":6666666666666');

body = body.replace(/\"permissionStatus":\d+/g, '\"permissionStatus":0');

body = body.replace(/\"residualTotalTimes":\w+/g, '\"residualTotalTimes":6666666666666');

body = body.replace(/\"subscribeStatus":\d+/g, '\"subscribeStatus":1');

body = body.replace(/\"activityType":\w+/g, '\"activityType":true');

body = body.replace(/\"dataType":\d+/g, '\"dataType":1');

body = body.replace(/\"value":\d+/g, '\"value":0');

body = body.replace(/\"availableQuestionNum":\d+/g, '\"availableQuestionNum":99');

body = body.replace(/\"hasPermission":\w+/g, '\"hasPermission":true');

body = body.replace(/\"userBoughtInfo":\w+/g, '\"userBoughtInfo":true');

body = body.replace(/\"isVip":\w+/g, '\"isVip":true');

body = body.replace(/\"hasRoute":\w+/g, '\"hasRoute":true');

body = body.replace(/\"promotion":\w+/g, '\"promotion":true');

body = body.replace(/\"tiku":"\w+"/g, '\"tiku":"free"');

body = body.replace(/\"times":-1/g, '\"times":1');

body = body.replace(/\"explainVideoCount":"\d+"/g, '\"explainVideoCount":"999"');

body = body.replace(/\"examVideoCount":"\d+"/g, '\"examVideoCount":"999"');

body = body.replace(/\"practiceVideoCount":"\d+"/g, '\"practiceVideoCount":"999"');

body = body.replace(/\"status":0/g, '\"status":3');

body = body.replace(/\"validEndTime":\d+/g, '\"validEndTime":4092599349000');

body = body.replace(/\"validStartTime":-1/g, '\"validStartTime":4092599349000');

body = body.replace(/\"rightsType":-1/g, '\"rightsType":1');

body = body.replace(/\"message":"\w+"/g, '\"message":"已解锁"');

body = body.replace(/\"key":\w+/g, '\"key":true');

body = body.replace(/\"live":false/g, '\"live":true');

body = body.replace(/\"showVipIcon":\w+/g, '\"showVipIcon":true');

$done({body});
