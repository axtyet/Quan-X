/******************************************
 * @name 彩云天气
 * @desc 解锁彩云天气SVIP
 * @statement 仅供学习交流，禁止用于商业用途
 * @author yuheng
 * @create 20230519
 * @version 1.0.0
******************************************

[mitm]
hostname = *.caiyunapp.*,*cyapi*

[rewrite_local]
^http[s]?:\/\/biz\.(caiyunapp|cyapi)\.(com|cn)\/v2\/user.*$ url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/caiyun.js

******************************************/
const body = $response.body
    .replace(/xy_vip_expire":\d+/g, 'xy_vip_expire":0')
    .replace(/svip_expired_at":\d+/g, 'svip_expired_at":32494698549.41677')
    .replace(/is_xy_vip":\w+/g, 'is_xy_vip":true')
    .replace(/is_vip":\w+/g, 'is_xy_vip":true')
    .replace(/xy_svip_expire":\d+/g, 'xy_svip_expire":2061894341')
    .replace(/vip_type":".*?"/g, 'vip_type":"s"');
$done({ body });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
