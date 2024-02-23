
/*
项目名称：训记
下载地址：商店 支持6.13.01 9.24最新版
脚本作者：@ios151
使用说明：仅供学习 禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖
特别说明：不显示会员 直接用功能 自己账号登陆 
[rewrite_local]

^https:\/\/api\.xunjiapp\.cn\/whole_user_info_v4 url script-echo-response https://raw.githubusercontent.com/Yu9191/Rewrite/main/xunji.js
#屏蔽更新
#^https:\/\/xunji\.gxzckj\.com\/after310\/ios url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/xunji_no_update.js
[mitm]
hostname = api.xunjiapp.cn
*/
var version_='jsjiami.com.v7';function b(c,d){var e=a();return b=function(f,g){f=f-0x88;var h=e[f];if(b['UdYwZM']===undefined){var i=function(n){var o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var p='',q='';for(var r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(var v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};var m=function(n,o){var p=[],q=0x0,r,t='';n=i(n);var u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(var v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['wvhxft']=m,c=arguments,b['UdYwZM']=!![];}var j=e[0x0],k=f+j,l=c[k];return!l?(b['HfKcwK']===undefined&&(b['HfKcwK']=!![]),h=b['wvhxft'](h,g),c[k]=h):h=l,h;},b(c,d);}var r=b;(function(c,d,e,f,g,h,i){return c=c>>0x6,h='hs',i='hs',function(j,k,l,m,n){var q=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;var o=j();while(!![]&&--f+k){try{m=parseInt(q(0x90,'^LqB'))/0x1+parseInt(q(0x91,')86]'))/0x2*(-parseInt(q(0x93,'!wBU'))/0x3)+-parseInt(q(0x88,'fb%N'))/0x4+-parseInt(q(0x92,'JGgx'))/0x5+parseInt(q(0x8a,'bGyz'))/0x6+parseInt(q(0x8c,'(M#E'))/0x7+-parseInt(q(0x8b,'fb%N'))/0x8;}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[nDfHyMuTpbVRLWUABrxJwN=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x13bf67,j[m](''));});}(0x32c0,0xd021a,a,0xcd),a)&&(version_=a);var body=$response['body'];body=body['replace'](/.+/g,r(0x8d,'K^OJ')),$done(body);function a(){var s=(function(){return[version_,'TAjJsNjwirbaympi.cUBoDmx.Wvw7UnufRHVLMNb==','WOz1t1LZW5BcNYj/WQzejJG','W4/cJmosWQ4xWOtdRCoJWQzC','rJbZC8oSW6XODCoupG','tIRdKt8YW4PremoFWR7dQ8kDdG'].concat((function(){return['W7bxxLFdNSo0eXWKW6dcLrZdQG','W4GIW4RcVmodk8k6jJTwnuuR','W7ZcJxdcPCkOtMRcRWFcGSkHW6RdLq','W7bwxvNdLCo1feWeW7VcUI7dO8kR','W5BcUtSnreRcN8o2tCkTBghdNq','W5pdU8kQW60AdxykzXZdPCogdmogjSoSoavektGcWOtcSudcIg7cI2PqW4LvxKL+asqmBftdQmoWzuWUhMKVWPpdMu1HW4iHW6ddVGdcThJcTeX5fN3cSmkdj0RcRuNcHHVdVuNcPHlcJ8o0iSk7x8oBWQWMbCo/CSoNW4ObWRBcRSoSW494W7Lko8oFkXzAv3uzWPVdGga+vSk9t8k9W4e8WRXAW51NWP0Dc14UW6xdSw1DpmkjbSk2WQhdUGqxW55AWRyKDCkBB8oFw8okW4OUCq8zW4RdVCo+W6ldTCoGWQuJWQZcOK0RWQ/cUSkGWOfgWQnKW7VcUKFdOfb1sxbtwLurqKpdVSoOWQ3dM8kxAfZdHZdcLcNdOmoPpSoBwLidkmkYWQRdOdedhmkaWOhdTtFcRbpcS8oNW7CgjMyofCkbWO4'].concat((function(){return['W6OrkCkiWPbhWO1avCorcaNdOW','W70RoZnqWRPpFmoICq','W7JdJSkSWO9KnSkSeI/dVeBcGmka','rI/dNZbmWRi/h8odWPS'];}()));}()));}());a=function(){return s;};return a();};var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
