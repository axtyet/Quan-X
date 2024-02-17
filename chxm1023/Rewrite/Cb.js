/*************************************

项目名称：Cubox-收藏阅读
下载地址：https://t.cn/A6x4qhyJ
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/cubox\.(pro|cc)\/c\/api\/userInfo url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/Cb.js

[mitm]
hostname = cubox.*

*************************************/


var body = $response.body;
var url = $request.url;
var chxm1023 = JSON.parse(body);
const vip = '/userInfo';

if (url.indexOf(vip) != -1) {
    chxm1023.data.level = 1;
    chxm1023.data.expireTime = "2099-09-09T09:09:09+09:09";
    chxm1023.data.nickName = "chxm1023";
    chxm1023.data.thirdNickName = "chxm1023";
    chxm1023.data.isExpire = false;
    chxm1023.data.active = true;
    chxm1023.data.isThirdUser = true;
    chxm1023.data.payTime = 1660006006;
    body = JSON.stringify(chxm1023);
}

$done({body});
