/**
2023.1.6 
[rewrite_local] 
#六六课字表 
^https?:\/\/api\.liupinshuyuan\.com\/liuliuWriteV2\/api\/sync-course url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/llxz.js 
#六六课程 
^https?:\/\/api\.liupinshuyuan\.com\/liuliuWriteV2\/api\/student\/course-detail url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/llxz.js 
 
[mitm] 
hostname = api.liupinshuyuan.com 
**/ 
 
var body = $response.body; 
body = body.replace(/"isFree":\s*0/g, "\"isFree\": 1"); 
body = body.replace(/"isLock":\s*1/g, "\"isLock\": 0"); 
$done({ body });