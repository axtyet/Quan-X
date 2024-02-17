/*
脚本引用
*/
// 2024-01-23 10:45

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/chat/limitInfo")) {
  if (obj?.data?.limit) {
    obj.data.limit = false;
  }
} else if (
  url.includes("/furion/position/content") ||
  url.includes("/hot/soul/rank") ||
  url.includes("/mobile/app/version/queryIos") ||
  url.includes("/post/gift/list") ||
  url.includes("/post/homepage/guide/card") ||
  url.includes("/teenager/config")
) {
  if (obj?.data) {
    delete obj.data;
  }
} else {
  $done({});
}

$done({ body: JSON.stringify(obj) });
