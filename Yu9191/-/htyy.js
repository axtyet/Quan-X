var body = $response.body.replace(/hasBought":\d+/g,'hasBought":1')
.replace(/freed":\d+/g,'freed":1')
.replace(/locked":\d+/g,'locked":0')
.replace(/canStudy":\d+/g,'canStudy":1')
.replace(/boughtStatus":\d+/g,'boughtStatus":1')
$done({ body });