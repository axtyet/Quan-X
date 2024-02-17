/*
‎FlipaClip2 2.8.0

[rewrite_local]
^https://api.purchasely.io/paab/user_purchases url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/FlipaClip.js

[mitm]
hostname = api.purchasely.io

*/

$done({
  body: JSON.stringify({
    "active_subscriptions": [
      {
        "id": "434bf50b-eae9-4d0b-a340-13be11ae9f01",
        "plan_id": "42e9171d-c224-43ca-84c5-9cefbc22af5c",
        "next_renewal_at": "2099-12-20T18:58:50Z",
        "purchase_token": null,
        "offer_type": "FREE_TRIAL",
        "original_purchased_at": "2023-12-13T18:58:51Z",
        "subscription_status": "AUTO_RENEWING",
        "content_id": null,
        "purchased_at": "2023-12-13T18:58:50Z",
        "cancelled_at": null,
        "offer_identifier": null,
        "store_country": "CN",
        "environment": "PRODUCTION",
        "is_family_shared": false,
        "store_type": "APPLE_APP_STORE"
      }
    ],
    "non_consumables": []
  })
});
