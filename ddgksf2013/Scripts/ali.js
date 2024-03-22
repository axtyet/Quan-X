/*

* ==UserScript==
* @ScriptName        FileBall挂载阿里云盘、Alist
* @Author            @Changes,@ddgksf2013
* @TgChannel         https://t.me/ddgksf2021
* @Contribute        https://t.me/ddgksf2013_bot
* @Feedback          📮 ddgksf2013@163.com 📮
* @WechatID          墨鱼手记
* @UpdateTime        2023-02-08
* @ScriptFunction    FileBall挂载阿里云盘、Alist，播放云盘中的音乐和视频文件
* @Attention         如需引用请注明出处，谢谢合作！
* @Suit              仅适配QuantumultX工具
* @ScriptURL         https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/Scripts/ali.js
* ==/UserScript==


[rewrite_local]

^https?:\/\/.*\.example\.com url script-analyze-echo-response https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/Scripts/ali.js

[mitm]

hostname = *.example.com


FileBall操作步骤[仅适配QuantumultX工具]

请认真仔细阅读下方使用说明：
*************************************
1.0挂载Aliyun[仅单个账户，修复bug，增加token过期提醒]
1.1添加Synology协议
1.2地址填 aliyun.example.com
1.3用户名随意
1.4密码填【refresh_token】Token获取地址(需要用阿里云盘扫描alist的二维码获得)[ https://alist.nn.ci/zh/guide/drivers/aliyundrive.html ]
1.5目前阿里云盘仅支持单账户
1.6连接&Enjoy
1.7如需更换账户[如换账号或token过期]，请删除【所有】的阿里云盘账户，重新按照1.1-1.4步骤添加
*************************************
2.0挂载Alist[已更新至alist_api_v3]
2.1添加Synology协议
2.2地址填 alist.example.com
2.3用户名填Alist地址，如墨鱼推荐的小雅[碉堡了]：http://alist.xiaoya.pro
2.4密码随意
2.5按照2.1-2.4步骤可添加多个alist
2.6当存在多个alist列表，需要使用某个alsit，请【左滑】，点击【画笔】，点击右上角【连接】使用
2.7单alist使用时，无需2.6步骤
2.8连接&Enjoy
2.9使用问题请邮箱联系 ddgksf2013@163.com
*************************************


*/





const version="V2.0.23";

var date=new Date,isDebug=!1;"undefined"==typeof $request&&($notify("ALI","","请勿手动执行本脚本！"),$done({}));var url=$request.url,host=$prefs.valueForKey("alist_host"),alistUrl=$prefs.valueForKey("alist_url"),refreshToken=$prefs.valueForKey("aliyun_refresh_token"),accessToken=$prefs.valueForKey("aliyun_access_token"),driveId=$prefs.valueForKey("aliyun_drive_id");const method="POST";var headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36","Content-Type":"application/json"},myResponse={status:"HTTP/1.1 200 OK"},obj={};async function AliyunAuth(){return new Promise(e=>{let t=$request.body,a=t.match(/passwd=([^&]*)/)[1];t.match(/account=([^&]*)/)[1],log("password:"+a);let s={url:"https://auth.aliyundrive.com/v2/account/token",method:method,headers:headers,body:JSON.stringify({refresh_token:a,grant_type:"refresh_token"})};$task.fetch(s).then(t=>{try{let a=JSON.parse(t.body);a.refresh_token&&a.access_token&&a.default_drive_id?($prefs.setValueForKey(a.refresh_token,"aliyun_refresh_token"),$prefs.setValueForKey(a.access_token,"aliyun_access_token"),$prefs.setValueForKey(a.default_drive_id,"aliyun_drive_id"),log("body.refresh_token:"+a.refresh_token),log("body.access_token:"+a.access_token),log("body.default_drive_id:"+a.default_drive_id),obj={success:!0,data:{sid:a.access_token}},myResponse.body=JSON.stringify(obj),$done(myResponse)):$done()}finally{e()}},e=>{$done()})})}async function AliyunEntry(){return new Promise(e=>{let t=$request.body;if("string"==typeof t){if(-1!=t.indexOf("list_share")||-1!=t.indexOf("method=list")){headers.authorization="Bearer "+accessToken;var a=null===t.match(/folder_path=([^&]*)/)?"root":t.match(/folder_path=([^&]*)/)[1];let s="root"===a;log(a=a.replace(/%25/g,"%"));let o={drive_id:driveId,fields:"*",parent_file_id:a,limit:200},i={url:"https://api.aliyundrive.com/v2/file/list",method:method,headers:headers,body:JSON.stringify(o)};log(JSON.stringify(i)),$task.fetch(i).then(t=>{try{-1!=t.body.indexOf("password")&&$notify("ALI","","此文件夹需要密码！");let a=JSON.parse(t.body).items;var o=[];a.forEach(function(e){let t={isdir:"folder"===e.type,path:e.file_id,name:e.name,additional:{size:e.size}};o.push(t)}),obj={success:!0,data:s?{total:0,offset:0,shares:o}:{total:0,offset:0,files:o}},myResponse.body=JSON.stringify(obj),$done(myResponse)}finally{e()}},e=>{$done()})}}else $done()})}async function AliyunDownLoad(){return new Promise(e=>{let t=url.match(/dlink=%22(.*)%22/)[1],a=hexToUtf8(t);log("fileId : "+a),headers.authorization="Bearer "+accessToken;let s={url:"https://api.aliyundrive.com/v2/file/get_download_url",method:method,headers:headers,body:JSON.stringify({drive_id:driveId,expire_sec:14400,file_id:a})};$task.fetch(s).then(t=>{try{let a=JSON.parse(t.body).url;log(a),$done({status:"HTTP/1.1 302 Found",headers:{Location:a}})}finally{e()}},e=>{$done()})})}async function AlistAuth(){return new Promise(e=>{let t=$request.body,a=decodeURIComponent(t.match(/account=([^&]*)/)[1]);log("host:"+a),$prefs.setValueForKey(a,"alist_host"),obj={success:!0,data:{sid:""}},myResponse.body=JSON.stringify(obj),$done(myResponse)})}async function AlistEntry(){return new Promise(e=>{let t=$request.body;if("string"==typeof t){if(-1!=t.indexOf("list_share")||-1!=t.indexOf("method=list")){var a=null===t.match(/folder_path=([^&]*)/)?"/":t.match(/folder_path=([^&]*)/)[1];let s="/"===a;a=a.replace(/%25/g,"%");let o={page_num:1,page_size:100,password:"",path:decodeURIComponent(a)},i={url:host+"/api/fs/list",method:method,headers:headers,body:JSON.stringify(o)};$task.fetch(i).then(t=>{try{-1!=t.body.indexOf("password")&&$notify("ALI","","此文件夹需要密码！");let o=JSON.parse(t.body).data.content,i="/"===a?"":a;var r=[],n=[];"string"==typeof $prefs.valueForKey("alist_url")&&(n=$prefs.valueForKey("alist_url"),log("get persistentstore data: "+n)),o.forEach(function(e){let t={isdir:1===e.type,path:i+"/"+e.name,name:e.name,additional:{size:e.size}};if(r.push(t),30==e.type||40==e.type){let a={url:e.url,name:e.name};n.push(a),n.length>100&&n.shift()}}),n.length>0&&$prefs.setValueForKey(n,"alist_url"),obj={success:!0,data:s?{total:0,offset:0,shares:r}:{total:0,offset:0,files:r}},myResponse.body=JSON.stringify(obj),$done(myResponse)}finally{e()}},e=>{$done()})}}else $done()})}async function AlistDownLoad(){return new Promise(e=>{let t=$request.url.match(/dlink=%22(.*)%22/)[1],a=hexToUtf8(t);log(a);let s={password:"",path:decodeURIComponent(a)},o={url:host+"/api/fs/get",method:method,headers:headers,body:JSON.stringify(s)};$task.fetch(o).then(t=>{try{let a=JSON.parse(t.body);a.data?.raw_url?(log(a.data.raw_url),$done({status:"HTTP/1.1 302 Found",headers:{Location:a.data.raw_url}})):$done()}finally{e()}},e=>{$done()})})}function log(e){isDebug&&console.log(e)}function hexToUtf8(e){return decodeURIComponent("%"+e.match(/.{1,2}/g).join("%"))}(async()=>{/aliyun.*?\/webapi\/auth\.cgi/.test($request.url)?await AliyunAuth():/aliyun.*?webapi\/entry\.cgi/.test($request.url)?await AliyunEntry():/aliyun.*?fbdownload/.test($request.url)?await AliyunDownLoad():/alist.*?\/webapi\/auth\.cgi/.test($request.url)?await AlistAuth():/alist.*?webapi\/entry\.cgi/.test($request.url)?await AlistEntry():/alist.*?fbdownload/.test($request.url)&&await AlistDownLoad()})();
