/*************************************
项目名称：题库343个软件合集
下载地址：https://t.cn/A6W2GEer 同作者全部软件
下载地址：https://t.cn/A6W2VKyO 同作者全部软件
下载地址: https://t.cn/A6W2IIWG 同作者全部软件
下载地址: https://t.cn/A6W2auz1 同作者全部软件
下载地址: https://t.cn/A6WLb5H7 同作者全部软件（题库最新）
下载地址：https://t.cn/A6WL6A7h 同作者全部软件（题库较新）
下载地址：https://t.cn/A6l20jRY 同作者全部软件（题库较新）
下载地址：https://t.cn/A6lLMblK 同作者全部软件（题库最新）
脚本作者：ios151
免责声明：请勿传播 仅供学习测试
特别说明：部分域名只有QuanX才能匹配到,规则转换不一定有效
[rewrite_local]
#19个软件
^https:\/\/iosapi\.yueshuian\.com(\/){1,2}front\/customer\/findById\.json\? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
#39个软件 66个软件 96个软件
^https:\/\/question.*findById\.json\? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
#59个软件
https://app.bftk.com.cn/front/customer/findById.json url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
#20个软件
https://app.bftk.com.cn//common/guestLogin.json url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
https://app.bftk.com.cn/common/guestLogin.json url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
https://base.cmoe.top/common/passwordLogin.json url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
https://base.cmoe.top//common/guestLogin.json url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
#24个软件
https://yyapi.yayingtk.com/front/customer/findById.json url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
#27个软件
^https://api\.sryx\.net.*vip/getValidTime url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Tikuheji19.js
[mitm]
hostname = iosapi.yueshuian.com, question.tiku.cqxcj.top, question.api.anjiazui.com, base.cmoe.top, app.bftk.com.cn, yyapi.yayingtk.com, question.civil.shaoeyy.com, api.sryx.net


*/


var baby = JSON.parse($response.body);
const one = '//front/customer';
const two = '/front/customer';
const three = '//question.tiku.cqxcj.top/';
const four = '//question.api.anjiazui.com/';
const five = '//app.bftk.com.cn/';
const six = '/passwordLogin.json';
const seven = '//common/guestLogin.json';
const E = 'vip/getValidTime';

if ($request.url.indexOf(one) != -1){
baby.data.isVip = true;//是否开通vip服务
baby.data.vipDueDate = "5201-03-14 00:00:00";//到期时间
baby.data.vipDueDateStr = "5201-03-14";//到期时间
baby.data.vipMonth = 111111;//月份
}
if ($request.url.indexOf(two) != -1){
baby.data.isVip = true;//是否开通vip服务
baby.data.vipDueDate = "5201-03-14 00:00:00";//到期时间
baby.data.vipDueDateStr = "5201-03-14";//到期时间
baby.data.vipMonth = 111111;//月份
}
if ($request.url.indexOf(three) != -1){
baby.data.isVip = true;//是否开通vip服务
baby.data.vipDueDate = "5201-03-14 00:00:00";//到期时间
baby.data.vipDueDateStr = "5201-03-14";//到期时间
baby.data.vipMonth = 111111;//月份
}
if ($request.url.indexOf(four) != -1){
baby.data.isVip = true;//是否开通vip服务
baby.data.vipDueDate = "5201-03-14 00:00:00";//到期时间
baby.data.vipDueDateStr = "5201-03-14";//到期时间
baby.data.vipMonth = 111111;//月份
}
if ($request.url.indexOf(five) != -1){
baby.data.isVip = true;//是否开通vip服务
baby.data.vipDueDate = "5201-03-14 00:00:00";//到期时间
baby.data.vipDueDateStr = "5201-03-14";//到期时间
baby.data.vipMonth = 111111;//月份
}
if ($request.url.indexOf(six) != -1){
baby.data.isVip = true;//是否开通vip服务
baby.data.vipDueDate = "5201-03-14 00:00:00";//到期时间
baby.data.vipDueDateStr = "5201-03-14";//到期时间
baby.data.vipMonth = 111111;//月份
}
if ($request.url.indexOf(seven) != -1){
baby.data.isVip = true;//是否开通vip服务
baby.data.vipDueDate = "5201-03-14 00:00:00";//到期时间
baby.data.vipDueDateStr = "5201-03-14";//到期时间
baby.data.vipMonth = 111111;//月份
}
if ($request.url.indexOf(E) != -1){
baby.VaildEndTime = "5201-03-14 00:00:00";
baby.Status = 1;
}
$done({body : JSON.stringify(baby)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
