/*************************************
项目名称：音频剪辑大师
软件版本：1.6.2 Time：2023.8.18 仅测试surge
下载地址：商店
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http:\/\/www\.tingniukeji\.com\/audioclip\/queryIosVip url script-echo-response https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/ypjjds.js

[mitm]
hostname = www.tingniukeji.com


*************************************/
var response = {
  "msg": "获取ios用户信息",
  "data": {
    "isVIP": true
  },
  "code": 0
};

$done({ body: JSON.stringify(response) });
