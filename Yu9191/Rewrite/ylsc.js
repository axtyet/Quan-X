/*************************************

项目名称：乐理手册
软件版本：2.2.0
下载地址：https://is.gd/dPoh2n
脚本作者：安妮
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https:\/\/music-knowledge-api\.quthing\.com\/vip\/state url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/ylsc.js

[mitm]
hostname = music-knowledge-api.quthing.com

*************************************/


var body = JSON.parse($response.body);

body.data.vipType = 7,
body.data.trialPeriod = false,
body.data.validVip = true,
body.data.expireTime = 4102372800000,
body.data.vipCount = 765700,

$done({ body: JSON.stringify(body) });
