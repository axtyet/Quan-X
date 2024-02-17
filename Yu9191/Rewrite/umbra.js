
/*
Umbra VPN 
下载地址 https://apps.apple.com/se/app/umbra-vpn-private-proxy/id1631206459?l=en-GB

[rewrite_local]
^https:\/\/api\.adapty\.io\/api\/v1\/sdk\/in-apps\/purchase-containers url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/umbra.js

[mitm]
hostname = api.adapty.io
*/
var vpn = JSON.parse($response.body);
vpn.data = {
    "type" : "adapty_inapps_purchase_container_compact",
    "id": "e74724e2-bd0b-4982-bed7-ca6db95b3e29",
    "attributes": {
      "app_id": "56eb457c-6ad4-40aa-9b29-ea29e10e3505",
      "total_revenue_usd": 0,
      "customer_user_id": null,
      "developer_id": "com.placements.general",
      "subscriptions": {
        "com.name.vpn.month": {
          "vendor_transaction_id": "490001271881589",
          "billing_issue_detected_at": null,
          "store": "app_store",
          "vendor_product_id": "com.name.vpn.month",
          "vendor_original_transaction_id": "490001271881589",
          "will_renew": true,
          "renewed_at": "2023-01-23T09:09:08.000000+0000",
          "cancellation_reason": null,
   "variation_id": "98dfa32d-8177-4315-beff-91481f489fd4",
          "active_promotional_offer_id": null,
          "active_promotional_offer_type": null,
          "unsubscribed_at": null,
          "is_active": true,
          "activated_at": "2023-01-23T09:09:09.000000+0000",
          "is_refund": false,
          "is_in_grace_period": false,
          "active_introductory_offer_type": "free_trial",
          "starts_at": null,
          "expires_at": "2099-09-09T09:09:09.000000+0000",
          "is_sandbox": false
        }
      },
      "promotional_offer_eligibility": false,
      "custom_attributes": {},
      "profile_id": "150ffc20-2126-43bb-ad24-c62c881e4c35",
      "paid_access_levels": {
        "premium": {
          "id": "premium",
          "vendor_product_id": "com.name.vpn.month",
          "store": "app_store",
          "starts_at": null,
          "billing_issue_detected_at": null,
          "active_promotional_offer_id": null,
          "expires_at": "2099-09-09T09:09:09.000000+0000",
            "will_renew": true,
            "unsubscribed_at": null,
            "is_active": true,
            "is_in_grace_period": false,
            "activated_at": "2023-01-23T09:09:09.000000+0000",
            "renewed_at": "2023-01-23T09:09:08.000000+0000",
            "is_refund": false,
            "active_introductory_offer_type": "free_trial",
            "cancellation_reason": null,
            "active_promotional_offer_type": null
        }
        },
        "introductory_offer_eligibility": false,
        "non_subscriptions": null
    }
};
$done({body : JSON.stringify(vpn)});
