/*
DreamFace 3.0.0

[rewrite_local]
https://www.dreamfaceapp.com/df-server/user/save_user_login url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/DreamFace.js

[mitm]
hostname = www.dreamfaceapp.com

*/


let obj = JSON.parse($response.body);

obj.data.rights = {
      "expires_date_format": "2099-09-09 19:27:05.000",
      "vip_type": "TRY_YEAR_PACKAGE",
      "have_trial": false,
      "vip_remainder_day": 9999,
      "vip_label": true,
      "expires_date": 4092595200000
    };

$done({
  body: JSON.stringify(obj)
});
