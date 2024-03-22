/***********************************

> 应用名称：极简汇率
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
  
# > 极简汇率☆解锁会员权限（2023-12-30）@ddgksf2013
^https?:\/\/explorer\.tratao\.com\/api\/client\/xtool\/vip url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/JiJianHuiLvProCrack.js


[mitm] 

hostname=explorer.tratao.com

***********************************/
























var ddgksf2013 = JSON.parse($response.body);
ddgksf2013.data=[{vipStatus:"paid",vipLevel:"senior",expire:"2099-12-18 10:10:00",vipPayType:"auto_sub",vipPayUnit:"year",vipPayNum:1}];
$done({
    body: JSON.stringify(ddgksf2013),
});
