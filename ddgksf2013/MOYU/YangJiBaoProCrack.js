/***********************************

> 应用名称：养基宝
> 脚本作者：ddgksf2013
> 微信账号：墨鱼手记
> 解锁说明：解锁钻石会员权限
> 更新时间：2023-12-30
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# > 养基宝☆解锁会员权限（2023-12-30）@ddgksf2013
^https?:\/\/.*yangjibao\.com\/(wxapi\/)?account url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/YangJiBaoProCrack.js


[mitm] 

hostname=*.yangjibao.com

***********************************/














var body = $response.body.replace(/vip_label":false/g, 'vip_label":true')
						 .replace(/vip_expiry_date":null/g, 'vip_expiry_date":"2099-12-31"')
						 .replace(/is_pay":false/g, 'is_pay":true');
$done({ body });
