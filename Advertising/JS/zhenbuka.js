var body = $response.body.replace(/<head>/, '<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ddgksf2013/Html/zhenbuka.css" type="text/css">').replace(/'6572'/g, "'6578'");
$done({ body });
