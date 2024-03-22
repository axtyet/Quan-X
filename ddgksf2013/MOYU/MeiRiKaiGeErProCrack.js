/***********************************

> 应用名称：每日凯格尔
> 下载地址：https://apps.apple.com/cn/app/id6458982553
> 脚本作者：ddgksf2013
> 微信账号：墨鱼手记
> 解锁说明：解锁高级会员权限
> 更新时间：2024-01-29
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️
          
          
[rewrite_local]
  
# > 每日凯格尔☆解锁会员权限（2024-01-29）@ddgksf2013
^https?:\/\/kegelapi\.dailystretch\.app\/api\/v\d\/(profile|subject) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/MeiRiKaiGeErProCrack.js


[mitm]
 
hostname = kegelapi.dailystretch.app


***********************************/




















var body = $response.body.replace(/lock":\w+/g, 'lock":false').replace(/isSubscriber":\w+/g, 'isSubscriber":true')  
$done({ body });
