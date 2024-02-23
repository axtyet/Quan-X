var obj = JSON.parse($response.body);
var xToken = $request.headers["x-token"];
 obj = {
        "code": "SUCCESS",
        "success": true,
        "data": {
            "expireUnix": 4000103307,
            "appleSub": "apple_pay",
            "id": "4",
            "productNo": "com.xback.subscription.1year",
            "limited_offer": false,
            "duration": 366,
            "type": "yearly",
            "newToken": xToken,
            "isEnable": true,
            "desc": "Yearly",
      "productNo": "com.xback.paypal.subscription.1year",
      "limited_offer": false,
      "duration": 366,
      "type": "subscribe",
      "isEnable": true,
      "desc": "Yearly",
            "vipNo": "1",
            "duration": 99999999,
            "paypalSub": "",
            "isPaySinceRegister": true
        },
        "msg": "success",
        "requestId": "2f2bfc10df558190db386c141b24d1a1"
    };
  
$done({ body: JSON.stringify(obj)});
