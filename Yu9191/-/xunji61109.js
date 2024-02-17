/*
项目名称：训记6.19.09 12.22更新
下载地址：商店 
脚本作者：@ios151
使用说明：微信登录
2024.1.3不再维护




[rewrite_local]
^https:\/\/api\.xunjiapp\.cn\/whole_user_info_v4 url script-request-header https://raw.githubusercontent.com/Yu9191/Script/main/xunji61109.js


[mitm]
hostname = api.xunjiapp.cn

*/
var version_='jsjiami.com.v7';var r=b;(function(c,d,e,f,g,h,i){return c=c>>0x1,h='hs',i='hs',function(j,k,l,m,n){var q=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;var o=j();while(!![]&&--f+k){try{m=parseInt(q(0xdb,'Q6Xx'))/0x1*(-parseInt(q(0xe1,'I^bN'))/0x2)+parseInt(q(0xe9,'PjwC'))/0x3+-parseInt(q(0xe5,'Iu#s'))/0x4+parseInt(q(0xe2,'0O!d'))/0x5*(parseInt(q(0xe8,'coCq'))/0x6)+-parseInt(q(0xda,'MhXa'))/0x7+parseInt(q(0xd8,'1&(#'))/0x8*(parseInt(q(0xe4,'1cuT'))/0x9)+-parseInt(q(0xdf,'Z82M'))/0xa;}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[IqCNTpyVGKAuDEUhtdQkR=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x1393ce,j[m](''));});}(0x182,0xa59f8,a,0xc3),a)&&(version_=a);function b(c,d){var e=a();return b=function(f,g){f=f-0xd8;var h=e[f];if(b['GPiuVV']===undefined){var i=function(n){var o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var p='',q='';for(var r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(var v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};var m=function(n,o){var p=[],q=0x0,r,t='';n=i(n);var u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(var v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['pMTJwy']=m,c=arguments,b['GPiuVV']=!![];}var j=e[0x0],k=f+j,l=c[k];return!l?(b['ZmqLfw']===undefined&&(b['ZmqLfw']=!![]),h=b['pMTJwy'](h,g),c[k]=h):h=l,h;},b(c,d);}var modifiedHeaders=$request[r(0xe3,'f8gZ')];modifiedHeaders[r(0xdd,'vKED')]=r(0xd9,'Iu#s'),modifiedHeaders[r(0xe7,'D0Sh')]='trainnote/1\x20CFNetwork/1325.0.1\x20Darwin/21.1.0',$done({'headers':modifiedHeaders});function a(){var s=(function(){return[version_,'NyVjsGKjtiIAamRiT.IQNcomC.dUqv7hUDEEkupq==','WR46EvRcTqZdLc3cUCoN','EmomESoZt1pcRNJdMuddOCkPWP0','cCosW5idW4/cS8kIWQC','kexdPIW6hmkWW6WtmConWQKgtW','yqrVu0xcN8k2uCkrcvbrbW','amoCWRucW77cK8k6WR97'].concat((function(){return['C8o4Emkpjmk+W4O','W5VcT8o2W67cGmkmhq','W5JdOZbbCuq8W6ZcVCoUW79k','W7NcLvTVW5KLivv2W6SSB8oW','WO4lW7hdK8oToXqqxG','W4JcG3dcJsGCESkxW6lcKa','vmoAWRNcOcNcTYVcHqFcT8osW7bz','v0pdI8kvW43dSmkwW4pcI3pdNSo2ga'].concat((function(){return['rcCwWRhcNmk7oq','oxT7nWldH8o7aa','WOJdGqiQWO5Um2PPW4SEx8oTW4jYwSoOWOdcGWmaBmk/WRK6W5BdOJO3g8kkWR7dICkbW6W3l8o1WOtdJCo3W6JdMCo8WRjhuCoECCk2mwhdN8kKkmk/uCo4nSoVW6hdIvTBr8oIWQO8ymodm1juyvpdOhhcMN/cJ8oGW7/dSSotWRnmWP8DWOdcRmk1gttdG8oWut/dUSosAwPNW74PlsKFDcqFWOpcRsqlEt99W4RcT8kBWRTyW6KBW4WlzgNdT0eNWRddI8kMWPJdKCothComW4zwqSogdNZcSKdcQYFcPMRcNgBdGcGBt8kutSkbf3RdJgbuiG','dSkCW6TNeZddM8kWWO1fD8oQWR0','m8k1sCoIDmowowpdLIa'];}()));}()));}());a=function(){return s;};return a();};var version_ = 'jsjiami.com.v7';
