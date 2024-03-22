/***********************************

> 应用名称：易截图2
> 软件版本：1.2.2
> 脚本作者：ddgksf2013
> 下载地址：https://apps.apple.com/cn/app/id1633186528
> 微信账号：墨鱼手记
> 解锁说明：去除水印，解锁高级功能
> 更新时间：2023-09-05
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# > 易截图2☆去除水印（2023-08-02）@ddgksf2013
^https?:\/\/.*jietu.*com/apiv\d/user url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/YiJieTu2ProCrack.js


[mitm] 

hostname=*jietu*

***********************************/





var body = $response.body.replace(/group_id":"\d/g, 'group_id":"3')
$done({ body })
