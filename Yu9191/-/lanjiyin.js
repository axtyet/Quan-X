/*
蓝基因题目视频解析
TG：ios151

[rewrite_local]
^https?:\/\/tk\.lanjiyin\.com\.cn\/tiku\/get_question_new_media.*? url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/lanjiyin.js


[mitm]
hostname = tk.lanjiyin.com.cn

**/
var body=$response.body;
body = body.replace(/is_unlock\":"\d"/g,'is_unlock":"1"');
$done(body);
