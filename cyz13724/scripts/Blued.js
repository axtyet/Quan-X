// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz13724/scripts/Blued.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/Blued.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/Blued.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/Blued.stoverride

/*
项目名称：blued
下载地址：https://too.st/7vj
更新日期：2024-01-15
脚本作者：@anyeyey
使用声明：⚠️仅供参考，🈲转载与售卖！
失效请反馈
群组：https://t.me/IPAs_Dd
频道：https://t.me/IPAs_share
不生效就退出后台重新打开
blued功能脚本  悄悄查看消息  地图无需展示头像即可查看全部头像   聊天界面查看会员隐藏的距离
**************************************

[rewrite_local]
^https:\/\/social\.blued\.cn\/users\/.*\/setting url script-response-body https://raw.githubusercontent.com/anyehttp/quantumult-x/main/Adguard/blued.js
^https:\/\/social\.blued\.cn\/users\/shadow url script-response-body https://raw.githubusercontent.com/anyehttp/quantumult-x/main/Adguard/blued.js
^https:\/\/social\.blued\.cn\/users\/.*\/basi url script-response-body https://raw.githubusercontent.com/anyehttp/quantumult-x/main/Adguard/blued.js
[mitm]
hostname = social.blued.cn
*/
var anye = JSON.parse($response.body);
const vip1 = /^https:\/\/social\.blued\.cn\/users\/.*\/setting/;
const vip2 = /^https:\/\/social\.blued\.cn\/users\/shadow/;
const vip3 = /^https:\/\/social\.blued\.cn\/users\/.*\/basi/;
if (vip1.test($request.url) && anye.data && anye.data.length > 0) {
    // 设置
    anye.data.forEach((item) => {
        item.is_global_view_secretly = 1;
        item.is_traceless_access = 1;
        item.is_hide_distance = 1;
        item.black_allowed_count = 999999;
    })
}
if (vip2.test($request.url) && anye.data && anye.data.length > 0) {
    // 地图显示头像和影子功能
    anye.data[0].is_open_shadow = 1;
    anye.data[0].has_right = 1;
}
if (vip3.test($request.url) && anye.data && anye.data.length > 0) {
    // 聊天界面查看会员隐藏的距离
    anye.data[0].is_hide_distance = 0;
}
$done({ body: JSON.stringify(anye) });
