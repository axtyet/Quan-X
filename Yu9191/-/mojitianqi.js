/*
墨迹天气 
原：叮当猫

[rewrite_local]
^https?:\/\/.*\.api\.moji\.com\/(sns\/json\/profile\/get_info_.+|json\/member_new\/homepage_info.+|user\/personal\/json\/profile_.+|flycard\/novice|shortvideo\/.+) url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/mojitianqi.js

[mitm]
hostname = *.api.moji.com

*/


var Q = JSON.parse($response.body);
const vip1 = '/sns/json/profile/get_info';
const vip2 = '/json/member_new/homepage_info';
const vip3 = '/user/personal/json/profile';
const vip4 = '/flycard/novice';
const AD1 = '/shortvideo';

if ($request.url.indexOf(vip1) != -1){
  Q.is_vip = 1;
  Q.type = 7;
  Q.grade = 1;
  Q.is_adver_free = 0;
  Q.expire_time = 4092599349000;
  Q.member_type = 1;
  Q.member_level = 1;
  Q.max_expiration_days = 9999999;
  Q.is_expire = 0;
  Q.remain_day = 9999999;
  Q.inkrity = 9999999;
  Q.status = 1;
  Q.is_purchase = true;
}

if ($request.url.indexOf(vip2) != -1){
  Q.userTips = ["将在2099-09-09到期"];
  Q.user_tips = ["将在2099-09-09到期"];
  Q.is_member = true; 
  Q.user_member_info.vip = 1;
  Q.user_member_info.is_auto_member = 1;
}

if ($request.url.indexOf(vip3) != -1){
  Q.personal_profile.inkrity = 9999999;
  Q.personal_profile.is_vip = true;
  Q.personal_profile.grade = 1;
  Q.personal_profile.user_flag = true;
}

if ($request.url.indexOf(vip4) != -1){
  Q.data.novice.adShow= 0;
  Q.data.novice.expireTime = 4092599349000;
  Q.data.novice.vipShow = 1;
}

if ($request.url.indexOf(AD1) != -1){
  Q.item_list = [];
  Q.rcmList = [];
  Q.add_card_list = [];
}

$done({body : JSON.stringify(Q)});
