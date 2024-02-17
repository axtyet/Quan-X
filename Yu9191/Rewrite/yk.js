let body = $response.body;
let modifiedBody = body.replace(/"switch":".*?"/g, "\"switch\":\"close\"");
$done({ body: modifiedBody });
