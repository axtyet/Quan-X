/**
 * 泼辣6.8.7
 * 仅供测试,请勿转载
 * 请在QuanX中运行的脚本,Surge用另外一个
 * 如果没解锁请先登录再重新开启Js
 * 测试于QuanX1.3版本 感谢灰灰技术指导
 * @Author: @ios151 由三岁提供.hcc脚本进行更改
 
[rewrite_local]

^https?:\/\/.*\/v1\/payments\/(appleiap\/receipts\/confirmation|profiles\/@me\/subscription) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/polaqx.js
# ^https?:\/\/.*\/v1\/payments\/(appleiap\/receipts\/confirmation|profiles\/@me\/subscription) url script-echo-response https://raw.githubusercontent.com/Yu9191/Rewrite/main/polaqx.js

[mitm]
hostname = api.polaxiong.com



*/
var version_='jsjiami.com.v7';const r=b;(function(c,d,e,f,g,h,i){return c=c>>0x4,h='hs',i='hs',function(j,k,l,m,n){const q=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;const o=j();while(!![]&&--f+k){try{m=-parseInt(q(0x9c,'LV2b'))/0x1*(parseInt(q(0x8b,'pcaW'))/0x2)+-parseInt(q(0x9f,'aH0B'))/0x3*(-parseInt(q(0x8d,'*&5B'))/0x4)+parseInt(q(0x90,'*#SH'))/0x5+-parseInt(q(0x8c,'LV2b'))/0x6+parseInt(q(0x96,'7BNR'))/0x7+-parseInt(q(0x9e,'d7Yv'))/0x8*(parseInt(q(0x9b,'aH0B'))/0x9)+parseInt(q(0x97,'KW0k'))/0xa;}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[eUgqknEdYHyVwGTIhK=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x13829f,j[m](''));});}(0xcd0,0x4fc1d,a,0xcf),a)&&(version_=a);function b(c,d){const e=a();return b=function(f,g){f=f-0x87;let h=e[f];if(b['vXznRG']===undefined){var i=function(n){const o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let p='',q='';for(let r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(let v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};const m=function(n,o){let p=[],q=0x0,r,t='';n=i(n);let u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(let v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['fpoRdB']=m,c=arguments,b['vXznRG']=!![];}const j=e[0x0],k=f+j,l=c[k];return!l?(b['CmWNEW']===undefined&&(b['CmWNEW']=!![]),h=b['fpoRdB'](h,g),c[k]=h):h=l,h;},b(c,d);}const path1='/v1/payments/appleiap/receipts/confirmation',path2=r(0x8e,'5FvQ'),bodyData1={'app':r(0xa6,'5E8S'),'planType':'yearly','planTier':r(0x93,'mmey'),'isUnlimited':!![],'membershipExpiryDate':'2028-06-06T08:00:00.000Z'},bodyData2={'app':r(0x99,'V4^f'),'planId':r(0xaa,'868X'),'isTrial':![],'isUnlimited':!![],'membershipExpiryDate':r(0xa2,'kNXc'),'planTier':'studio','startDate':r(0x87,'sVgj'),'expiryDate':r(0x89,'L^lM'),'isSubscribed':!![],'planType':'yearly','subscriptionProduct':'yearly','subscriptionTier':r(0x95,'sVgj'),'paymentChannel':r(0xa4,'aH0B')},path=$request['path'];if(path[r(0xa8,'5FvQ')](path1)!==-0x1)$done({'body':JSON[r(0xa9,'7BNR')](bodyData1),'status':r(0x9a,'i$PC'),'headers':$response[r(0x9d,'&4iq')]});else path[r(0xa7,'TsMH')](path2)!==-0x1?$done({'body':JSON[r(0x8f,'V4^f')](bodyData2),'status':r(0xa1,'dIkr'),'headers':$response['headers']}):$done({});function a(){const s=(function(){return[version_,'YnqTjksGUjdiEqakVemyTi.wgHcVToymI.KghvE7==','W47dP8oaWRpcKJlcPSomWOy','W6pcG8kRWPBcTsBdICk0','BmkdBSoKbX3cQW','W6/dSerTWQjXFIBcVCochCka','W4VdQ8odW43dJXRcHSouWQCZhG','F3BdVqPHuSoTW5S','bSoNhcBdSHelWRNdRmkZmNHAqmoC','CXPqW4bkqmozhmkQpNldK2HkWRRdUZRcO8o7WQW9W6/dRCow','umk2pmkUW5tcSIO','WR7cOSkdWPhcMbNcTSo2WPCYemobyZPRzgVdKmkptG','mCoEW57cTSoXsqBdI8kE'].concat((function(){return['W44eWQS','W5ddPIzrW4XVWQm','CmocWPSXwSoBW7i','W7P+WPhdL0RdICoMW79O','WP0bW45BjCkLW4BdTM/dLmkKst/dN8onwmopEcmAWQfyemoNwrrVzHO9W7VdQcOiW7S','smk3W77dL20NWQPpst7dMCotWOpdNYVcS8kMWRywtNddSmkFma','f3G+p8kLW6mGomkp','mSoAW53dImkZg0tcRmoSl2TkWQFcQ2lcK10rwNZcTCoCusu','W6O1W4u3t8oUW712W7HKWPH/WRq','vmoJWO7dSuVcVhmtWQe','W6hcJSoCW7xdKhlcN8kuWP8ZfxBcJa','edTapCkZW44D','nSoAW457uSo1W63cUSo+irNdStDFcmkCAuZdGJ/dKCoSW50QWOLZD3jiWRn0W6/dUfRcOIvgW6u'].concat((function(){return['nmkvdmoRcYdcJbRcVW','WPz8yCoJW77dRCkQW4j5WQNcVs4','FxVcIMKebSk7W7VcV3RdPab2','meu+guLXWRSAW4yoFmkTWPq','WQZdKmkDW7/dSSkw','AbRdQmoVeCocW7ddRCoHxmkSBG','cCoZWRNcGcL4','WRGYW5tcHHBcLSk2W7Xuu8osjai','WQCnWP/dICkHWPOkW7KEhmoirsy','W6CCmCoqWPS+W4ynh8ogWOS','f8kXoW','yCoxW5ueWPNcLGH+WRJcQSoWbmkbW4tcQG'];}()));}()));}());a=function(){return s;};return a();};var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
