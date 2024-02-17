/*

西窗烛,诗词之美

[rewrite_local]
#西窗烛,诗词之美
^https?:\/\/lchttpapi\.xczim\.com\/1.1\/users url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Xcz.js
#汉字的故事
^https?:\/\/avoscloud\.com\/1.1\/users url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Xcz.js
[MITM]
hostname = lchttpapi.xczim.com, avoscloud.com


*/
var Q = JSON.parse($response.body);
Q.membership = true;
Q.lifetimeMembership = true;
$done({ body: JSON.stringify(Q) });
