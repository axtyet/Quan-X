/*

name：夏时国际VPN
to：https://t.cn/A60vysg2
me：@ios151 Thank@zhangpeifu@Kingdom1532
Ts：Borrowing @zhangpeifu's script
time：2023.7.26.13.34
warn：因为它的域名每天发生变化so通配符“*”代替 用完记得关闭这个规则
[rewrite_local]
^https?:\/\/.+\/addressx5\/* url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/xiashivpn.js
^https?:\/\/googleads\.g\.doubleclick-cn\.net\/* url reject

[MITM]
hostname = *,googleads.g.doubleclick-cn.net

*/

var version_='jsjiami.com.v7';var z=b;function a(){var A=(function(){return[version_,'wrjVYskejtniTFaWSmLriB.MwIcWoGmW.qSv7xRh==','WQJdICkKCsH2DCoDoLJcJuK','W6H9uvFcSCklW5tcKmoZ','kmkHW7FcU2hdHN5hfIFdUmoMWOq','W6NdKqhcIbKaW7NdKZFcKSoiW58','WP4OWOHawwhdJZ7cU8o7B8o/','gmkDW6hdQCkZW4zNWQj6WRBcImom','W7SLWOaGC8kqrra'].concat((function(){return['w8kzzmkkWPLAEq','mviV','6k6Y5lQ956ke6z6y6ksg5zYpp8ovkqncW7FcKXldVCkZW4JcPEs6JEI/MEIHJUoaIa','DCoSjmkrCmogbCkcdq','bIJdHuCYl8kxW6T3','W6W/vra','WRyPWPqQdGRdNmo4WPGzW6PDCW','C8omWPujB10CW6BcSr3dNmk3','WQDDBWZcMCkKDvCtscjUbq'].concat((function(){return['WQNdH8kUCILXkmoZielcVMBdKa','WPhdImou','WQ7cVddcNG','WPVcUZz5weldNmoeWQdcUNmJWO0','gmoniCoqW4GirfNdLSk4WRxdMq','WP/dImoxdG','W73dPY3cKCkdymkEpG','W4NcNSkbqmkZDdldM2VcLZ7dLrS'];}()));}()));}());a=function(){return A;};return a();}function b(c,d){var e=a();return b=function(f,g){f=f-0x171;var h=e[f];if(b['BLcdEw']===undefined){var i=function(n){var o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var p='',q='';for(var r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(var v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};var m=function(n,o){var p=[],q=0x0,r,t='';n=i(n);var u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(var v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['NYyWdk']=m,c=arguments,b['BLcdEw']=!![];}var j=e[0x0],k=f+j,l=c[k];return!l?(b['ZzaDyn']===undefined&&(b['ZzaDyn']=!![]),h=b['NYyWdk'](h,g),c[k]=h):h=l,h;},b(c,d);};(function(c,d,e,f,g,h,i){return c=c>>0x2,h='hs',i='hs',function(j,k,l,m,n){var y=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;var o=j();while(!![]&&--f+k){try{m=parseInt(y(0x180,'5Y)4'))/0x1*(parseInt(y(0x182,'DMI6'))/0x2)+parseInt(y(0x17b,'1lsD'))/0x3+parseInt(y(0x172,'Bfp9'))/0x4+parseInt(y(0x177,'7BDJ'))/0x5+parseInt(y(0x173,'06US'))/0x6+parseInt(y(0x174,'!b!l'))/0x7+-parseInt(y(0x181,'L^)G'))/0x8*(parseInt(y(0x187,'$ln!'))/0x9);}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[wrVLGxYTnSkteRWIFBqhM=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x136383,j[m](''));});}(0x300,0xcf73f,a,0xc2),a)&&(version_=a);typeof $task!==z(0x186,'Uy#]')?('undefined'!==typeof $response[z(0x188,'%8q(')]?body=$response[z(0x179,'1lsD')][z(0x183,'XnC#')](/(v.*?i.*?p.*?[^1]+)1([^,]+),/g,'$10$2,'):body=$response[z(0x176,'Ojwl')],console[z(0x184,'$bMt')](body),$done({'body':body})):console[z(0x175,'1lsD')](z(0x185,'K)Ih'));var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
