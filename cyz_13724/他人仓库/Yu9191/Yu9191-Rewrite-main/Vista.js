/*

脚本名称: Vista看天下+解锁VIP
脚本作者：ios151
下载地址：https://is.gd/nSYfBn
软件版本：3.4.3
更新时间：2023年10月24日 下午15.00

[rewrite_local]
#我的photo
https://open3.vistastory.com/v3/api/poster/share_poster? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Vista.js
#我的
https://open3.vistastory.com/v3/api/my/home/get_home_center? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/vistamy.js
#vip
https://open3.vistastory.com/v3/api/vip/get_vip url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/vistavip.js
#vip2
https://open3.vistastory.com/v3/api/magazine url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/vistavip.js
#vip3
https://open3.vistastory.com/v3/api/featured/column/get_content? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/vistavip.js
#vip4
https://open3.vistastory.com/v3/api/article/article_detail2? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/vistavip.js

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
      "imgUrl": "https://raw.githubusercontent.com/Yu9191/-/main/dingdangmao.jpg",
      "imgPath": "https://raw.githubusercontent.com/Yu9191/-/main/dingdangmao.jpg",
      "position": 0
    }
  ],
  "inviteUrl": "https:\/\/ktx.cn\/webshare\/?a=1#\/inviteBuyList?redirectType=inviteBuyList&parentid=708628"
}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
