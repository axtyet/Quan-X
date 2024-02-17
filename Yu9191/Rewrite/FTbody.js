
var body = $response.body;

// 替换 "paywall":\d+ 为 "paywall":1
body = body.replace(/"paywall":\d+/g, '"paywall":1');

// 替换 "accessright":"\d+ 为 "accessright":"1
body = body.replace(/"accessright":"\d+/g, '"accessright":"1');

$done({ body });
