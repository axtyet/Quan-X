/*
项目名称：Anycats VPN
使用说明：开脚本进入 登录解锁
下载地址：美区商店 测试版本2.5
免责声明：仅供学习 禁传播售卖
TG:@ios151 2023.8.30.13.58



[rewrite_local]
^https?:\/\/api\.(tuanleme|fengyunyizu|jianghumeng)\.(net|com)\/ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Anycats.js


[mitm]
hostname = api.tuanleme.net, api.fengyunyizu.com, api.jianghumeng.net


*/

var objc = JSON.parse($response.body);

objc.data.account.expiration_date = 1698903118878734;
objc.data.account.has_password = true;

$done({ body: JSON.stringify(objc) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
