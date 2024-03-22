/***********************************

> 应用名称：Nicegram
> 软件版本：1.5.6
> 脚本作者：ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2024-02-24
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 解锁步骤：https://t.me/ddgksf2021/5439
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# > Nicegram☆解锁会员权限（2024-02-24）@ddgksf2013
^https?:\/\/nicegram\.cloud\/api\/v\d\/(ai-assistant\/purchase-list|user\/info|telegram\/auth) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/NicegramProCrack.js

[mitm] 

hostname=nicegram.cloud

***********************************/


var body=$response.body.replace(/subscription":\w+/g,'subscription":true');
$done({body});
