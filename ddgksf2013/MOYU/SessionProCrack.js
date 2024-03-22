/***********************************

> 应用名称：Session
> 软件版本：2.9.15
> 脚本作者：@ddgksf2013, @Caster
> 微信账号：墨鱼手记
> 更新时间：2024-02-25
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# > Session☆解锁会员权限（2024-02-24）@ddgksf2013
^https:\/\/api\.stayinsession\.com\/user\/detail url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/SessionProCrack.js
(^https:\/\/api\.stayinsession\.com\/\?token=.*?&)(is_setapp\=false) url 302 $1is_setapp=true
^https:\/\/api\.stayinsession\.com\/user\/detail url request-header (\r\n)If-None-Match:.+(\r\n) request-header $1If-None-Match:$2

[mitm] 

hostname=api.stayinsession.com

***********************************/




var obj=JSON.parse($response.body);obj.subscription_status="active",obj.subscription_expiry_date="2099-02-27T10:33:57Z",$done({body:JSON.stringify(obj)});
