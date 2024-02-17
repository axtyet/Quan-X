/*

Vista看天下+解锁VIP


[rewrite_local]
#我的photo
https://open3.vistastory.com/v3/api/poster/share_poster? url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Vista.js
#我的
https://open3.vistastory.com/v3/api/my/home/get_home_center? url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Vistamy.js
#vip
https://open3.vistastory.com/v3/api url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Vistavip.js
^https:\/\/open3\.vistastory\.com\/v3\/api\/notice\/need_read_notice_number? url reject

^https:\/\/open3\.vistastory\.com\/v3\/api\/index\/loading_ad2? url reject



[mitm] 

hostname = open3.vistastory.com

**/




var objc = JSON.parse($response.body);

    objc = {
  "status": 1,
  "number": 0,
  "msg": "success",
  "posterList": [
    {
      "status": 1,
      "id": 6,
      "title": "                                                                ",
      "imgUrl": "https://raw.githubusercontent.com/Yu9191/-/main/A559C8EF-B4C6-4A94-8488-3D0BF36A6673.jpeg",
      "imgPath": "https://raw.githubusercontent.com/Yu9191/-/main/A559C8EF-B4C6-4A94-8488-3D0BF36A6673.jpeg",
      "position": 0
    }
  ],
  "inviteUrl": "https:\/\/ktx.cn\/webshare\/?a=1#\/inviteBuyList?redirectType=inviteBuyList&parentid=708628"
}

$done({body : JSON.stringify(objc)});
