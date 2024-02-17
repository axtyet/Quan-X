/*
知音律
需要先开试用,记得关闭避免扣费
6.14.3
2023.12.21

[rewrite_local]
https://auth.production.metronautapp.cn/jwt/refresh/ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Zhiyinlv.js

[mitm]
hostname = auth.production.metronautapp.cn

*/

let obj = JSON.parse($response.body);
obj.user.subscription = {
      "product_id": "yearly_plus_7DaysTrial_china",
      "is_free_subscription": true,//改
      "is_in_intro_offer_period": false,
      "expires_date": "2099-12-27T19:52:14Z",
      "is_grace_period": false,
      "is_switched_off": false,
      "is_trial_period": false,//改，试用
      "is_promotion": true,//改
      "purchase_date": "2023-12-20T19:52:14Z",
      "store": "apple"
    };
//obj.user.nickname = "lovebabyforever";
$done({ body: JSON.stringify(obj) });
