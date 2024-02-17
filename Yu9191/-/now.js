var body = $response.body;
var obj = JSON.parse(body);

obj.result.now_vip.is_forever = true,
obj.result.now_vip.is_vip = true,  
obj.result.now_vip.expire_time = 490001314520000,  
  
obj.result.yoga.is_vip = true,  
obj.result.yoga.expire_time = 490001314520000,
  
obj.result.excellent.is_vip = true,  
obj.result.excellent.expire_time = 490001314520000,    
  

body = JSON.stringify(obj);
$done({body});
