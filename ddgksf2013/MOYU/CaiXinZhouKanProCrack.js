/***********************************

> 应用名称：财新周刊
> 软件版本：4.0.6
> 脚本作者：ddgksf2013
> 微信账号：墨鱼手记
> 解锁说明：无需登录，直接看文章，解锁的是文章阅读权限
> 更新时间：2023-08-02
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# > 财新周刊☆解锁阅读权限（2023-08-02）@ddgksf2013
https?:\/\/ipadcms\.caixin\.com\/tmp\/articles url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/CaiXinZhouKanProCrack.js


[mitm] 

hostname=ipadcms.caixin.com

***********************************/





var body = $response.body.replace(/isfree":0/g, 'isfree":1')
$done({ body })
