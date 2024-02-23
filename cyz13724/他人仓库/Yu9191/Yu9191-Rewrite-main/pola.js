/**
 * 泼辣6.8.7
 * 仅供测试,请勿转载
 * 请在Surge,Loon中运行的脚本 QX用polaqx.js
 * 如果没解锁请先登录再重新开启Js
 * 2023.8.6
 * @Author: @ios151 由三岁提供.hcc脚本进行更改
[rewrite_local]

^https?:\/\/.*\/v1\/payments\/(appleiap\/receipts\/confirmation|profiles\/@me\/subscription) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/pola.js


[mitm]
hostname = api.polaxiong.com

*/
var version_='jsjiami.com.v7';const r=b;(function(c,d,e,f,g,h,i){return c=c>>0x5,h='hs',i='hs',function(j,k,l,m,n){const q=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;const o=j();while(!![]&&--f+k){try{m=-parseInt(q(0x196,'J1Td'))/0x1+parseInt(q(0x1aa,'bL!R'))/0x2*(-parseInt(q(0x1af,'fZ!]'))/0x3)+parseInt(q(0x19d,'Frp@'))/0x4+-parseInt(q(0x18b,'[3s]'))/0x5+parseInt(q(0x1a1,'bWP^'))/0x6*(parseInt(q(0x1ac,'&dym'))/0x7)+-parseInt(q(0x1ad,'fZ!]'))/0x8*(parseInt(q(0x1b2,'IbnW'))/0x9)+parseInt(q(0x1a3,'UVjZ'))/0xa*(parseInt(q(0x18c,'W5e7'))/0xb);}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[JuKYdHSCbThglnfGrqDBtMx=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x13847c,j[m](''));});}(0x1880,0x5870f,a,0xc6),a)&&(version_=a);function a(){const t=(function(){return[version_,'fhhjBbsSGjtKiMJHaTYgmdilrD.qxcuGoCmnq.v7==','gmoOWQ3cVCohvurb','umkOxmozoCkpWPhdQq','W7ddQXC','a3yiseJcOsuaWOZcK8olWRv1ASoUA8o9g8kSW5K','W43dLaldKGpdLG','WQZcSH4','s8omaSorpq','WRdcPSkixSoqzX4WE8o8pGC','WRxcS8kq','krPXDw0TW7dcJSoL','WQCWW7faFZRcQSkxrSkzo0GN','hmonW4VdGantgJC','krP2EgOL','AY/cQGpcHHVdOmooyLKLW7GcWQJcUSkNzmkxW4BcUIzEWRqr','t8o5kq'].concat((function(){return['dYNdVfldJcC','d33cSxGfFCoWa8oVW53dNmkiW43dMSorW4lcQWlcNCkScKTRcW','a8oCWQK','scldPs1ojmkTs8k7','tCoBWRbW','cmobW6rTcCklW7/dMs4jsmoBW5W','W4RdLNWPW53dISoDBCkmfmoPcW','k1Hdamkkia','rH7dKI3cNuS5Fq','WPHQW4uqs8obCSodWOz9W7m8W55bW7dcGmkdgI/dRubIfMq','x209mutdLCk5','W5NdNJpcRSonW5G','xmoaWQfTnt4','gvytW4/cQd4YW5XAWRhdTSk9WOW','btHUzGZcL8o4paRdRSo7WQNdGmoyk30nW7BcHx7dN1BdImo8','W6rcWQe','xGXeWPNdUwfOW5bF'].concat((function(){return['W7hdS8kDWQrVBqpdRq','W4FdNeeMeCoPnfjPg8o5W4a','WQ46nmkxW5ddVt/dK19KW74IW5K','h2/cU8k2','mmoGW7NcM8kzWR8IW57dIvjdntW','dmo5WPddU1nC','W4C+WOficCkv','WQxcIJRdVSk3W6dcO3u','W4G0WPfz','WQzdW6eeW6DNW5dcH2JcIqtcVG','lCkzxSk8wCk6ASkEWR3cSXdcUHyjpmoNCJ1RW4D/W5/cM8k/','WPTJW4azu8oiEmkzW74bW6v9WQK','bJKEWRJcLmoyWPtdLCoYhmop','Ar0ovmosEKlcR0GAD8kUcq','aZj9W6pdNCoQWQ3dPa','C8kzd8kwW6hcOtBcRLldIfldSeq1fCkPqSk+jMa'];}()));}()));}());a=function(){return t;};return a();};const res=$response,req=$request,p1=/appleiap\/receipts\/confirmation/,p2=/profiles\/@me\/subscription/,p3=/ppe\/users\/[0-9a-fA-F]{32}/;let isQX=typeof $task!==r(0x193,'&G!L'),isSurge=typeof $httpClient!=='undefined'&&!isQX,isLoon=typeof $loon!==r(0x1a0,'Frp@'),statusCode=0xc8;function b(c,d){const e=a();return b=function(f,g){f=f-0x187;let h=e[f];if(b['dqvKxT']===undefined){var i=function(n){const o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let p='',q='';for(let r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(let v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};const m=function(n,o){let p=[],q=0x0,r,t='';n=i(n);let u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(let v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['qkTuNt']=m,c=arguments,b['dqvKxT']=!![];}const j=e[0x0],k=f+j,l=c[k];return!l?(b['RcATwO']===undefined&&(b['RcATwO']=!![]),h=b['qkTuNt'](h,g),c[k]=h):h=l,h;},b(c,d);}isQX&&(statusCode='HTTP/1.1\x20200\x20OK');function handleResponse(c){const s=r,d={'TenUI':function(e,f){return e(f);}};d[s(0x187,'SFlw')]($done,{'body':JSON[s(0x18a,'5yOj')](c),'status':statusCode,'headers':res[s(0x19a,'eR)Y')]});}if(res[r(0x1a4,'Kr4(')]&&req[r(0x1a7,'&dym')]===r(0x1b6,'J1Td')&&p1['test'](req[r(0x192,'6y!4')])){const data={'app':r(0x1b3,'5K9U'),'planType':r(0x1b5,'fi^2'),'planTier':'studio','isUnlimited':!![],'membershipExpiryDate':r(0x1ab,'SFlw')};handleResponse(data);}if(res[r(0x1a9,'&dym')]&&req['method']==='GET'&&p2['test'](req[r(0x189,'bWP^')])){const data={'app':'PPE','planId':'co.polarr.ppe.premium.studio.yearly','isTrial':![],'isUnlimited':!![],'membershipExpiryDate':r(0x199,'&dym'),'planTier':r(0x190,'MuMj'),'startDate':r(0x18e,'&HD#'),'expiryDate':'2100-03-03T06:10:24.000Z','isSubscribed':!![],'planType':'yearly','subscriptionProduct':r(0x1a6,'XUFT'),'subscriptionTier':r(0x197,'ZdEA'),'paymentChannel':r(0x1b0,'qe]C')};handleResponse(data);}if(res[r(0x194,'*a@r')]&&req['method']===r(0x19f,'x0xX')&&p3['test'](req['url'])){const data={'app':r(0x18f,'SFlw'),'planId':'co.polarr.ppe.premium.studio.yearly','isTrial':![],'isUnlimited':!![],'membershipExpiryDate':r(0x191,'&G!L'),'planTier':r(0x18d,'5yOj'),'startDate':r(0x19e,'eR)Y'),'expiryDate':'2100-03-03T06:10:24.000Z','isSubscribed':!![],'planType':'yearly','subscriptionProduct':r(0x19b,'5K9U'),'subscriptionTier':r(0x19c,'*a@r'),'paymentChannel':r(0x1b4,'%4]A')};handleResponse(data);}$done({});var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
