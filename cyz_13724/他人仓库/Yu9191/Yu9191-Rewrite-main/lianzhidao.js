
/***

恋知道 https://apps.apple.com/cn/app/%E6%81%8B%E7%9F%A5%E9%81%93-%E9%AB%98%E6%83%85%E5%95%86%E6%81%8B%E7%88%B1%E8%81%8A%E5%A4%A9%E8%AF%9D%E6%9C%AF-%E8%BF%BD%E7%88%B1%E9%94%AE%E7%9B%98/id1645042353



[rewrite_local]
^http?:\/\/api\.lianzhidao123\.com\/v2\/account.*? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/lianzhidao.js


[mitm]
hostname = api.lianzhidao123.com

*/






var objc = JSON.parse($response.body);

    objc = {
  "message": "操作成功",
  "data": "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",
  "code": 0
}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
