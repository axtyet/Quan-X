/*
项目：考途大学搜题
下载：https://apps.apple.com/cn/app/%E8%80%83%E9%80%94%E5%A4%A7%E5%AD%A6%E6%90%9C%E9%A2%98-%E6%95%99%E6%9D%90%E7%BD%91%E8%AF%BE%E8%AF%95%E5%8D%B7%E7%AD%94%E6%A1%88/id1552320685
作者：@ios151原@mcdasheng688
说明：并不完善,仅供学习,请勿传播售卖

[rewrite_local]
^https:\/\/api-service\.tutusouti\.com\/appServiceApi\/(vip\/newUserPayVipData|video\/videoDetail) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/kaotu.js

[mitm]
hostname = api-service.tutusouti.com

*/
var version_='jsjiami.com.v7';var u=b;(function(c,d,e,f,g,h,i){return c=c>>0x2,h='hs',i='hs',function(j,k,l,m,n){var t=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;var o=j();while(!![]&&--f+k){try{m=-parseInt(t(0x70,'b)pt'))/0x1*(-parseInt(t(0x72,'0aL%'))/0x2)+parseInt(t(0x77,'mktA'))/0x3+parseInt(t(0x8a,'L^M@'))/0x4*(-parseInt(t(0x75,'T7e%'))/0x5)+-parseInt(t(0x85,'D0tH'))/0x6*(parseInt(t(0x7a,'ZFg('))/0x7)+parseInt(t(0x78,'L*%!'))/0x8+parseInt(t(0x89,'erMS'))/0x9+-parseInt(t(0x86,'xsgS'))/0xa*(parseInt(t(0x87,'Cxa6'))/0xb);}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[DOrHkMFBJINPbUCgeRfl=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x137436,j[m](''));});}(0x320,0xda963,a,0xca),a)&&(version_=a);function b(c,d){var e=a();return b=function(f,g){f=f-0x70;var h=e[f];if(b['jIToqW']===undefined){var i=function(n){var o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var p='',q='';for(var r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(var v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};var m=function(n,o){var p=[],q=0x0,r,t='';n=i(n);var u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(var v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['zyFkzF']=m,c=arguments,b['jIToqW']=!![];}var j=e[0x0],k=f+j,l=c[k];return!l?(b['nrOvTP']===undefined&&(b['nrOvTP']=!![]),h=b['zyFkzF'](h,g),c[k]=h):h=l,h;},b(c,d);}var body=$response[u(0x80,'T7e%')],url=$request[u(0x88,'xsgS')];if(/^https:\/\/api-service\.tutusouti\.com\/appServiceApi\/(vip\/newUserPayVipData|video\/videoDetail)/[u(0x7e,'ZFg(')](url)){if(url[u(0x7b,'xsgS')](u(0x79,'GJ6P'))!==-0x1)body=body['replace'](/"playAll":false/g,'\x22playAll\x22:true');else{if(url[u(0x76,'6Uap')](u(0x8c,'rRCT'))!==-0x1){var lovebaby={'msg':'ok','statusCode':0x0,'data':{'vipList':[{'diffTime':0x0,'goodsName':u(0x84,'LL7]'),'goodsLabel':0xd0,'expireTime':0x0,'vipStatus':0x0,'svipExplain':'','svipIsLifelong':0x0},{'diffTime':0x0,'goodsName':u(0x74,'h@Am'),'goodsLabel':0xd1,'expireTime':0x3b8e1ee2f08,'vipStatus':0x1,'svipExplain':'','svipIsLifelong':0x1}],'svipInfo':{'diffTime':0x0,'goodsName':u(0x82,'GRbL'),'goodsLabel':0xcf,'expireTime':0x0,'vipStatus':0x0,'svipExplain':'','svipIsLifelong':0x0}}};body=JSON[u(0x7d,'$Z61')](lovebaby);}}}function a(){var v=(function(){return[version_,'rHjMOskjIiRgaFUmHeIife.JcIeDomNC.PgvBbl7==','W4JcRSoOe1v2WP40WO7dJSkFW70','W5OVW7rwfurABW','WO/dQSk1','W4zOW6NdMCoYe8keW5GnW5nJW4Xjva','xKXoWQ3cU8o/q8kOW4zknmoruq','WODUW59/rCkofvaj','tIO+y8khgNZdPJJdTSkZidOhWR5da8oLimotW6uGcrFdKmk+WO/dOta7iCo2WPZcQrbJ','W4ZdHaVdOSo0W5VdTuhdQ8omW53dPW','W5ZdOCoDAcycy8kNW655'].concat((function(){return['oSk7ounqbCoQuYDVdd3cGSkT','WRvuhmoFW4q5FCo2ea','WQxcQHzZW6ZdTSk6','5AAx6ioon13dKa','tLqIxCkiu8kt','A3tcLd9XzCoa','W4/dGWNdPCoYW5VcNupdJ8o9W4ZdT8ko','lCoDmdhcMmkdW4hdLmoOnSk7W6G','WRBcVCkpWP/cLCo2WQDTW4HVW5fLWQHjg3nVWRtcMsGDa3mXW4FdKmoHBConrYXh','kuqHWOpdGSodW74JosPvWRpdUJe','WPpdTSk9rHWjWQG'].concat((function(){return['lSounJZcMSknWR3dHCo2kSkAW5yh','WPu/tCkOjXOfFhm','BbbJW48','W5FcR8kDW5pcHH8lufOS','gvWXqW','cmkamH3cRhhcOmoLybSyW4Dc','6lss57QDW7Tmaq','mSkcW47dUfxdKWe3paNdI8k8','5OIF5Po0cmktWRy','WOiqWPfQuCkfnG'];}()));}()));}());a=function(){return v;};return a();};$done({'body':body});var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
