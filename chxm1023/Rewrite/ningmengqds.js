/*************************************

项目名称：柠檬轻断食
下载地址：https://t.cn/A6OOKolN
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/fast\.lmfasting\.cn\/api url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/ningmengqds.js

[mitm]
hostname = fast.lmfasting.cn

*************************************/


var body = $response.body;

body = body.replace(/\"display":\w+/g, '\"display":true');

body = body.replace(/\"is_plan":\w+/g, '\"is_plan":true');

body = body.replace(/\"need_vip":\w+/g, '\"need_vip":false');

body = body.replace(/\"is_vip":\w+/g, '\"is_vip":false');

$done({body});
