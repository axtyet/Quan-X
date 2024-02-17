/*************************************

项目名称：配音秀 解锁会员
下载地址：https://t.cn/A6hiqy80
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/iosapi\.peiyinxiu\.com url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/peiyinxiu.js

[mitm]
hostname = iosapi.peiyinxiu.com

*************************************/


var chxm1023 = JSON.parse($response.body); 
const vipa = '/GetMyInfo';
const vipb = '/GetVipDetail';
const vipc = '/GetUserSpaceInfo';

//会员信息
if ($request.url.indexOf(vipa) != -1){
  chxm1023.data.is_vip = 1;
  chxm1023.data.vip_end_time = "2099-09-09 09:09:09";
  chxm1023.data.end_time = "2099-09-09 09:09:09";
  chxm1023.data.gold = 999999;
  chxm1023.data.gold2 = 999999;
  chxm1023.data.fanscount = 999999; //粉丝
  chxm1023.data.followcount = 999999; //关注
  chxm1023.data.filmcount = 999; //作品
  chxm1023.data.invite_coopera_count = 999;//合作
  chxm1023.data.sourcecount = 999;//素材
  chxm1023.data.is_can_apply = 1;
  chxm1023.data.verified = 1;
  chxm1023.data.vipNoticeCode = 2;
  chxm1023.data.avatar_tool_id = 1;
  chxm1023.data.isExposure = 1;
  chxm1023.data.verifieds = [1];
}

//开通会员面板
if ($request.url.indexOf(vipb) != -1){
  chxm1023.data.is_vip = 1;
  chxm1023.data.isRenewal = 1;
  chxm1023.data.vip_end_time = "2099-09-09 09:09:09";
  chxm1023.data.end_time = "2099-09-09 09:09:09";
  chxm1023.data.eventEndText = "2099-09-09 09:09:09";
  chxm1023.data.vipLevel = 1;
  chxm1023.data.is_can_apply = 1;
  chxm1023.data.tools.status = 1;
  chxm1023.data.avatar_tool_id = 1;
}

//用户信息
if ($request.url.indexOf(vipc) != -1){
  chxm1023.data.is_vip = 1;
  chxm1023.data.verified = 1;
  chxm1023.data.badgeToolId = true;
  chxm1023.data.gold = 999999;
  chxm1023.data.gold2 = 999999;
  chxm1023.data.perform_level =99; //演绎等级
  chxm1023.data.scriptwriter_level = 99; //制作等级
  chxm1023.data.good_count = 999999; //点赞
  chxm1023.data.forward_count = 999999; //转发
  chxm1023.data.union_count = 999999; //社团
  chxm1023.data.fanscount = 999999; //粉丝
  chxm1023.data.followcount = 999999; //关注
  chxm1023.data.rank_count = 999999; //上榜
  chxm1023.data.badge_count = 999999; //徽章
  chxm1023.data.topic_count = 999999; //帖子
  chxm1023.data.live_count = 999999; //语聊
  chxm1023.data.filmcount = 999; //作品
  chxm1023.data.invite_coopera_count = 999;//合作
  chxm1023.data.sourcecount = 999;//素材
  chxm1023.data.space_tool_id = 1;
}

$done({body : JSON.stringify(chxm1023)});
