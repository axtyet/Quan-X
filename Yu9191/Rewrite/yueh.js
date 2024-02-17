/*************************************

1项目名称：SODA相机
软件版本：1.9.1
下载地址：https://is.gd/8g1S7y
2项目名称：CCD相机
软件版本：5.8
下载地址：https://is.gd/5Q1lNE
3项目名称：Dispo相机
软件版本：3.2
下载地址：https://is.gd/Cxov3O
4项目名称：拍立得相机
软件版本：3.1
下载地址：https://is.gd/ilhTk0
5项目名称:ZAPAN
软件版本：3.9
下载地址：https://is.gd/dShGYd
软件作者：安妮
特别说明：这个作者的通杀其他自己测试
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^http:\/\/yueh\.app168\.cc\/(first|panda|jiaopian|emoji|manghe)\/iap\/check\.php$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yueh.js

[mitm]
hostname = yueh.app168.cc

*************************************/


var body = JSON.parse($response.body);

body.vip_date = 4102366850,

$done({ body: JSON.stringify(body) });
