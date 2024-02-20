/*
日语学习神器
无效请开试用 恢复购买
[rewrite_local]


http://api.528529.com/apple_product/ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/riyuxuexi.js

[mitm] 

hostname = api.528529.com
*/
let obj = {
  "msg": "success",
  "data": [
    {
      "due_time": "2099-09-09 11:45:34",
      "vip_type": "vip_free_test",
      "now_time": "2024-02-20 11:47:38",
      "isExpire": false,
      "isExist": true,
      "in_app": "[{\"quantity\": \"1\", \"product_id\": \"vip_1_year_auto_1402940424\", \"transaction_id\": \"190001911226523\", \"original_transaction_id\": \"190001911226523\", \"purchase_date\": \"2024-02-20 03:45:34 Etc\/GMT\", \"purchase_date_ms\": \"1708400734000\", \"purchase_date_pst\": \"2024-02-19 19:45:34 America\/Los_Angeles\", \"original_purchase_date\": \"2024-02-20 03:45:35 Etc\/GMT\", \"original_purchase_date_ms\": \"1708400735000\", \"original_purchase_date_pst\": \"2024-02-19 19:45:35 America\/Los_Angeles\", \"expires_date\": \"2024-02-23 03:45:34 Etc\/GMT\", \"expires_date_ms\": \"4092595200000\", \"expires_date_pst\": \"2099-09-09 19:45:34 America\/Los_Angeles\", \"web_order_line_item_id\": \"190000871634788\", \"is_trial_period\": \"true\", \"is_in_intro_offer_period\": \"false\", \"in_app_ownership_type\": \"PURCHASED\"}]"
    }
  ],
  "code": 1
}


$done({ body: JSON.stringify(obj), status: 200 });