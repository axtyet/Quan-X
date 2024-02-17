

var body = $response.body.replace(/msg":".*?"/g,'msg":"ok"')
.replace(/code":\d+/g,'code":200')
.replace(/server":"\d+"/g,'server":"1"')
$done({ body });
