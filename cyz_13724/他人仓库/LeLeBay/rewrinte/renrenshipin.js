/*************************************

项目名称：人人视频
下载地址：https://t.cn/A60DZeo4
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.(hujuvod\.com|qwapp\.top)\/(user\/personal\/information|app\/drama\/page) url script-response-body https://raw.githubusercontent.com/LeLeBay/rewrinte/main/AnyDown.js 
^https:\/\/mi-eo\.gdt\.qq\.com\/gdt_mview\.fcg\?spsa= url reject-dict
[mitm]
hostname = api.hujuvod.com, api.qwapp.top, mi-eo.gdt.qq.com

*************************************/


if ($response.body != 'undefined'){
var body = $response.body;
var chxm1023 = JSON.parse(body);
const urla = '/user/personal/information';
const urlb = '/app/drama/page';

if ($request.url.indexOf(urla) != -1){
  chxm1023.data.user["vipInfo"] = { "level" : "3",        "valid" : true, "expiredTime" : 4092599349000 };
  chxm1023.data.user.level = 3;
  chxm1023.data.user.vipLevel = 3;
  body = JSON.stringify(chxm1023);
}

if ($request.url.indexOf(urlb) != -1){
  body = body.replace(/\"canShowVip":\w+/g, '\"canShowVip":false');
  body = body.replace(/\"externalAds":\w+/g, '\"externalAds":false');
  body = body.replace(/\"feeMode":\w+/g, '\"feeMode":free');
  body = body.replace(/\"enable":\w+/g, '\"enable":true');
  body = body.replace(/\"canPlay":false/g, '\"canPlay":true');
}
$done({body});}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
