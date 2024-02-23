/*

Name: 百度网盘@11.14.0
Description: 全局净化
Author: 𝘠𝘶𝘩𝘦𝘯𝘨
Remark: 自用脚本

----------------------------
hostname = pan.baidu.com

^http[s]?://pan.baidu.com/(act/(v2/(welfare|bchannel)/list|api/activityentry)|rest/2.0/(pcs/adv|xpan/smartprogram)).*ver.*=11.14.0 url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/Pure/netdisk@11.14.js
----------------------------
*/

var { body: body } = $response, { url: url } = $request, obj = JSON.parse(body); /(welfare|bchannel)\/list/.test(url) && (obj.data = []), /activityentry/.test(url) && (obj.popup_list = []), /2.0\/pcs\/adv/.test(url) && (obj.open_in_app = 0, obj.scene_list = []), /xpan\/smartprogram/.test(url) && (obj.list = []), $done({ body: JSON.stringify(obj) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
