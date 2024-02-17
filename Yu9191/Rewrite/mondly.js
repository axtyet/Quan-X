/*
mondly

[rewrite_local]


^https:\/\/api\.mondlylanguages\.com\/v3\/ios\/user\/sync url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/mondly.js

[mitm] 

hostname = api.mondlylanguages.com
*/
$done({
  body: JSON.stringify({
    purchased_products: [{
      id: "12month_all_4_trial",
      role: "12month",
      expiration_date: 4079776553,
      is_from_current_platform: true,
      is_auto_renewing: true,
      is_grace_period: false,
      is_billing_retry_period: false,
      is_initial_purchase: false,
      is_upgraded: true,
      is_in_free_trial_period: false
    }],
    is_premium: true,
    pucharses: ["me"],
    subscriptions: { me: "2099-09-09 09:09:09" },
    subscription: { me: "2099-09-09 09:09:09" },
    parsed_transactions: ["394957530283285"]
  })
});
