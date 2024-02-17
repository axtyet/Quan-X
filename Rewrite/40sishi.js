/*************************************

项目名称：计算器HD，万能播放器，万能变声器，塔罗牌，Art Widget(小组件)，memo(标签小组件)，NFC标签读写器工具
下载地址：http://t.cn/A6xF7wam
下载地址：https://t.cn/A6CojaZe
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：基本全家桶全解锁，NFC不确定解锁没有

**************************************

[rewrite_local]

^http[s]?:\/\/www\.40sishi\.com url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/40sishi.js

[mitm]

hostname = www.40sishi.com

*************************************/


body = $response.body.replace(/\"forever":\w+/g, '\"forever":true').replace(/\"expireTime":\d+/g, '\"expireTime":4092599349').replace(/\"state":\d+/g, '\"state":1');

$done({body});
