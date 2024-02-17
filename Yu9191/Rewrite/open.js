let body = $response.body;
let modifiedBody = body.replace(/"switch":".*?"/g, "\"switch\":\"open\"");
$done({ body: modifiedBody });
