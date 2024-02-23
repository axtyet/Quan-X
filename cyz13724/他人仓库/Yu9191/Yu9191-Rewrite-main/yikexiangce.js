/*
项目名称：一刻相册
下载地址：商店
脚本作者：@ios151原@chxm1023
使用说明：即开即用
免责声明：仅供参考,严禁售卖
特别提醒：同时解锁百度网盘svip
[rewrite_local]
^https?:\/\/pan\.baidu\.com\/(youai\/(user\/.+\/getminfo|membership\/.+\/adswitch)|(rest\/.+\/membership\/user|act\/.+\/(bchannel|welfare)\/list|api\/usercfg)) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/yikexiangce.js

[mitm]
hostname = pan.baidu.com

*/
var body = $response.body;
var love = JSON.parse(body);

const yike = '/youai/user/v1/getminfo';
const ad = '/youai/membership/v1/adswitch';
const wangpan = '/youai/membership/user';
const list = '/bchannel/list';
const hf = '/welfare/list';
const usercfg = '/api/usercfg';

if ($request.url.indexOf(yike) != -1){
  love = {
    "errno": 0,
    "request_id": 342581654394297772,
    "has_purchased": 1,
    "has_buy_1m_auto_first": 0,
    "can_buy_1m_auto_first": 0,
    "can_buy_1m_auto_first_6": 0,
    "has_received_7dfree": 1,
    "product_tag": 3,
    "sign_status": 1,
    "sign_infos": [{
      "product_id": "12745849497343294855",
      "order_no": "2203060931530010416",
      "ctime": 1646537208,
      "mtime": "2022-05-06 11:26:48",
      "status": 1,
      "sign_price": 1000,
      "sign_channel": 0
    }],
    "vip_tags": ["album_vip"],
    "product_infos": [{
      "product_id": "12745849497343294855",
      "start_time": 1646534568,
      "end_time": 4092599349,
      "buy_time": 1649994533,
      "tag": "album_vip",
      "order_no": "2203060931530010416"
    }],
    "vip_infos": [{
      "tag": "album_vip",
      "start_time": 1646537208,
      "end_time": 4092599349
    }],
    "expire_time": 0
  };
}

if ($request.url.indexOf(ad) != -1){
  love.switch = "open";
}

if ($request.url.indexOf(wangpan) != -1){
  love.product_infos = [
    {
      "product_id": "5310897792128633390",
      "end_time": 4092600296,
      "buy_time": "1417260485",
      "cluster": "offlinedl",
      "start_time": 1417260485,
      "detail_cluster": "offlinedl",
      "product_name": "gz_telecom_exp"
    },
    {
      "product_name": "svip2_nd",
      "product_description": "超级会员",
      "function_num": 0,
      "start_time": 1417260485,
      "buy_description": "",
      "buy_time": 1417260485,
      "product_id": "1",
      "auto_upgrade_to_svip": 1,
      "end_time": 4092600296,
      "cluster": "vip",
      "detail_cluster": "svip",
      "status": 1
    }
  ];
  love.guide_data = {
    "title": "超级会员 SVIP-Baby",
    "content": "已拥有极速下载+视频倍速特权",
    "button": {
      "text": "会员中心",
      "action_url": "https://pan.baidu.com/wap/vip/user?from=myvip2#svip"
    }
  };
  love.identity_icon = {
    "vip": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452237582/78b88bf113b7.png",
    "common": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452539056/bf72cf66fae1.png",
    "svip": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png",
    "contentvip": ""
  };
  love.error_code = 1;
  delete love.tips_data_list;
  delete love.status_data_arr;
  delete love.sub_card_list;
}

if ($request.url.indexOf(list) != -1){
  love.data = [
    {
      "sub_title": "",
      "id": 856,
      "bg_icon": "",
      "button_text": "",
      "web_url": "",
      "type": 3,
      "name": "已解锁SVIP，未完整解锁"
    },
    {
      "sub_title": "",
      "id": 460,
      "bg_icon": "",
      "button_text": "",
      "web_url": "",
      "type": 3,
      "name": "已拥有极速下载+视频倍速特权"
    }
  ];
}

if ($request.url.indexOf(hf) != -1){
  delete love.data;
}

if ($request.url.indexOf(usercfg) != -1){
  love.user_new_define_cards = [
    {
      "card_id" : "1",
      "card_type" : "4",
      "card_area_name" : "首页笔记-卡片"
    },
    {
      "is_manager" : 1,
      "card_area_name" : "最近",
      "card_id" : "1",
      "card_type" : "7"
    },
    {
      "card_id" : "1",
      "card_type" : "13",
      "card_area_name" : "卡片管理-卡片"
    }
  ];
}

$done({body : JSON.stringify(love)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
