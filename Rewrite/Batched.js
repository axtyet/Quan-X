/*************************************

项目名称：Batched-多量图片编辑器 解锁订阅
下载地址：https://t.cn/A69YGbhk
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️

**************************************

[rewrite_local]

^https:\/\/api\.adapty\.io\/api\/.+\/sdk\/analytics\/profiles\/(.*?)\/ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/Batched.js

[mitm]

hostname = api.adapty.io

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
    "type" : "adapty_analytics_profile",
    "id" : "150ffc20-2126-43bb-ad24-c62c881e4c35",
    "attributes" : {
      "app_id" : "56eb457c-6ad4-40aa-9b29-ea29e10e3505",
      "total_revenue_usd" : 0,
      "customer_user_id" : null,
      "subscriptions" : {
        "com.advasoft.batched.premium_year_3days_trial_60usd" : {
          "vendor_transaction_id" : "490001271881589",
          "billing_issue_detected_at" : null,
          "is_lifetime" : false,
          "store" : "app_store",
          "vendor_product_id" : "com.advasoft.batched.premium_year_3days_trial_60usd",
          "vendor_original_transaction_id" : "490001271881589",
          "will_renew" : true,
          "renewed_at" : "2023-01-23T09:09:08.000000+0000",
          "cancellation_reason" : null,
          "active_promotional_offer_id" : null,
          "active_promotional_offer_type" : null,
          "unsubscribed_at" : null,
          "is_active" : true,
          "activated_at" : "2023-01-23T09:09:09.000000+0000",
          "is_refund" : false,
          "is_in_grace_period" : false,
          "active_introductory_offer_type" : "free_trial",
          "expires_at" : "2099-09-09T09:09:09.000000+0000",
          "starts_at" : null,
          "is_sandbox" : false
        }
      },
      "promotional_offer_eligibility" : false,
      "custom_attributes" : {

      },
      "profile_id" : "150ffc20-2126-43bb-ad24-c62c881e4c35",
      "paid_access_levels" : {
        "premium" : {
          "id" : "premium",
          "is_lifetime" : false,
          "vendor_product_id" : "com.advasoft.batched.premium_year_3days_trial_60usd",
          "active_promotional_offer_type" : null,
          "cancellation_reason" : null,
          "billing_issue_detected_at" : null,
          "unsubscribed_at" : null,
          "expires_at" : "2099-09-09T09:09:09.000000+0000",
          "will_renew" : true,
          "is_active" : true,
          "active_promotional_offer_id" : null,
          "is_in_grace_period" : false,
          "activated_at" : "2023-01-23T09:09:09.000000+0000",
          "renewed_at" : "2023-01-23T09:09:08.000000+0000",
          "is_refund" : false,
          "active_introductory_offer_type" : "free_trial",
          "store" : "app_store",
          "starts_at" : null
        }
      },
      "introductory_offer_eligibility" : false,
      "non_subscriptions" : null
  }
};

$done({body : JSON.stringify(chxm1023)});
