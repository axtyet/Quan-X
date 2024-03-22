/***********************************

> 应用名称：莉景天气
> 下载地址：https://apps.apple.com/cn/app/id1516766040
> 脚本作者：ddgksf2013
> 微信账号：墨鱼手记
> 解锁说明：解锁高级会员权限
> 更新时间：2024-01-28
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️
          
          
[rewrite_local]
  
# > 莉景天气☆解锁会员权限（2024-01-28）@ddgksf2013
^https?:\/\/ljwapi\.baichuan\.tech\/(VIP\/GetState|Login\/Device|User\/GetPrivateUsers|Vip\/GetVipType) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/LiJingTianQiProCrack.js


[mitm]
 
hostname = ljwapi.baichuan.tech


***********************************/




















var body = $response.body.replace(/vipType":0/g, 'vipType":2').replace(/isVIP":false/g, 'isVIP":true')
$done({ body });
