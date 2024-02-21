/**

脚本名称:Speak 学习英语
仅测试surge

[rewrite_local]

https://api.revenuecat.com/v1/(receipts|subscribers)/* url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Speak.js

[mitm] 

hostname = api.revenuecat.com

*/

let obj = {
  "request_date_ms": 1704664060864,
  "request_date": "2024-01-07T21:47:40Z",
  "subscriber": {
    "last_seen": "2024-01-07T21:42:02Z",
    "first_seen": "2024-01-07T21:42:02Z",
    "original_application_version": "1",
    "other_purchases": {
    },
    "management_url": null,
    "subscriptions": {
      "launch_special": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual_subscription_no_trial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.plus.69.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.unlimited.119.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly_subscription": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.unlimited.450.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.159.notrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.monthly.880yen.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.monthly.unlimited.6800.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.69k.trial_3d": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.plus.249krw.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.plus.299k.payasyougo.239k_1y": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.annual.8800yen.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.29k.payasyougo.14.5k_for_6months": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.129.cancellation_offer": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.monthly.600yen.7daytrial.launch_promotion": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.unlimited.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.29.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.plus.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.plus.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.annual.unlimited.44800.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly_subscription_no_trial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.plus.69.payasyougo.49k_12m": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.monthly.2900yen.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.99k.trial_3d.v2": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.annual.12800yen.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.annual.plus.29800.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.unlimited.119.payasyougo.89k_12m": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.annual.14800yen.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.unlimited.490.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.35.3daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.129.notrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "monthly.29k.payupfront.29k_for_3months": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.unlimited.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.159.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.monthly.1800yen.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.unlimited.450.payasyougo.399k_1y": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.monthly.2800yen.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.129": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.159.3daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.plus.299k.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.99k.trial_3d": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.monthly.2200yen.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.monthly.plus.4000.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "jp.annual.2600yen.7daytrial.launch_promotion": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "lifetime_membership": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.129.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.69.7daytrial": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual.129.cancellation_offer.v2": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "annual_subscription": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      }
    },
    "entitlements": {
      "premium": {
        "purchase_date": "2020-02-11T07:52:54Z",
        "product_identifier": "monthly_subscription_no_trial",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "expires_date": "2099-02-18T07:52:54Z"
      }
    },
    "original_purchase_date": "2024-01-07T21:38:41Z",
    "original_app_user_id": "$RCAnonymousID:06923c3f1dfc4f23b1b56c9e24dbdffc",
    "non_subscriptions": {
    }
  }
}
$done({ body: JSON.stringify(obj), status: 200 });