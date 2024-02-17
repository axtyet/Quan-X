
var body = $response.body;


body = body.replace(/"courseType":\s*\d+/g, '"courseType":1');

body = body.replace(/"serviceType":\s*\d+/g, '"serviceType":1');

$done({ body });