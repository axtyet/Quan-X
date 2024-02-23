/*************************************

项目名称：千本笔记
软件版本：1.30.0
下载地址：https://is.gd/HB0vCg
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/qbbj.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var version_='jsjiami.com.v7';var r=b;function a(){var s=(function(){return[version_,'DjIsPLjLiaCOmWFiS.ScDomb.vp7QSyWffxPRDJl==','W6dcK8ozWP45bmkRoWCyW4hcRG','rMxdO8oidq9iWPldR8kIW6ezW4ayESoXl8kLWPL8d1hcV8oaoCkdp3ZdICk1kCkzwNlcUZSjzIC','WQVcLSo+ACkUB8kWBdlcMshdRCoVga','W4uqW6C','W57cO8ocW7HfWPzChYHao8kHfq','WOKIhmkkWPxcM8ogs8o7W4BcVgXEca','WOiRf8kaWOhcKSohx8oZW43cPwvEc8oKWR7dI3m8W6vbw8o6dmoDC34','WOeQf8kcWP3cKCkloCkNWQ3dJXC','twtdOCk3zvGEW4FcPa','WR3cNvZcJSouqCozFbK7W7ZcHmoVWPq','WRxcKLZcHSovsmosCbq7W7xcJCoM','W7XsW6ldTMhcPmkPjSoRzCkWWPeFWQdcKG4gWQ3dQhuagmoUhtqGWOyuW6RcS1irDmkeW6pcKwBcLCkE','W6/dJrxdLSkYe8kjku9SWQRdICkZW54QrsCpW54rW4BcJeVcJ8kQyK8dBCk8WPf6WQNcLK8','g8olvutdTMfgqCo5WPn1fCoxWOG/zIKUoCkIW6FdVCkHW6COyuFdPmkWW4NcOarGW7NcJ8oUWO3dOmkq'].concat((function(){return['WP1Ux8oaFJNcPItdVa','W7VdILLGW7KVfxykW7ZcUxfl','tJlcJSkwda','hSomv0hdRaehhCkkW7C/','WPGqWRmBftVcJazBWQPvWRVdL8kFsrxdUgZcNSouzWL6B8kvdCk4','wCoLASoGWPe6WQZcICoyWOBdUaCaaaNdVwRcMSkoW68iW6jTW4b9l8okx0VdIfbjpJXHAfJcNSkA','W57cPmonW7TmWP9xgf8xxCo1zSkV','W64XW4LBW6xdOwhcMSoCWRNcOSkjW6BcV8o1oJddSqiJW78QWR3cNmksFCkQ','W484AtizamoKgSkjBqldM3O','W43dSmkfW4qVimkRDKjCl8kJWRyW','W79uW6NdThtcPmkJpSoUBSkGWPew','WQulWQdcPbpdV8o4z8k1oCo/W5vdW6NdVuzjW7ZcOYeKb8ouhcGHWPryW5tcTve6xmkfW6O','W4NcKwOGWObUW5ldNKdcVJ5Jwa','eSkXW6hcQmoCWQddSIxcJ8khW41oW4WB','W6z/m2tcHSkkWRKQbdq','WO5wWRxdIvldPNnRW5jwmZ0'].concat((function(){return['omoqWPdcJSkSkSo5suNcNG','W4LQixzbqSkK','W6NcNCoAWPW7bCo1kr4wW7RcGmkd','WO5wWRhdILldRd4sW7rQlXVdImka','W4BdUCkoW447kCkQyKPxnSkQWRyZmSoeW4hdV17dMXaJgMK9WOBcVmkbALpcKmowWQf3ae/dOJpdMG','aMVdRCkNp0lcSh/cUq','WQ5uymkTqHFcHrldJmolWP8sW63cMCogBfPcoZNdM8oWxfxdOmoja8kCEa','etxdHHhdG8kleGdcJNbLas7dQen5WRy2E0JcR3tdRMzXbmoQnIJdUSkYvmk7amkwu8okgNG','fbTol8kKWQTskvZcVvrEAq','W4K5ydKhb8oKaSkozrldM3mohmoBCLBdPY7cGfNcRxNcJmk0bW','W5tdLatcKmoyvaFdG8kAD1FcPCo0','WPddMYRdP8ov','wLvhW6mvW4ZdTf8'];}()));}()));}());a=function(){return s;};return a();};function b(c,d){var e=a();return b=function(f,g){f=f-0xe7;var h=e[f];if(b['keXacA']===undefined){var i=function(n){var o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var p='',q='';for(var r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(var v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};var m=function(n,o){var p=[],q=0x0,r,t='';n=i(n);var u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(var v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['QNMFPI']=m,c=arguments,b['keXacA']=!![];}var j=e[0x0],k=f+j,l=c[k];return!l?(b['LJTFjg']===undefined&&(b['LJTFjg']=!![]),h=b['QNMFPI'](h,g),c[k]=h):h=l,h;},b(c,d);}(function(c,d,e,f,g,h,i){return c=c>>0x6,h='hs',i='hs',function(j,k,l,m,n){var q=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;var o=j();while(!![]&&--f+k){try{m=parseInt(q(0xfb,'FLTe'))/0x1*(parseInt(q(0xef,'CGg@'))/0x2)+parseInt(q(0xed,'xw*D'))/0x3+-parseInt(q(0x10a,'1wA['))/0x4+parseInt(q(0xf6,'wNtz'))/0x5+parseInt(q(0xfa,'Yc)$'))/0x6*(-parseInt(q(0xea,'YP@w'))/0x7)+parseInt(q(0x10f,'$DYk'))/0x8+parseInt(q(0x10c,'XVs*'))/0x9*(-parseInt(q(0x103,'nj(g'))/0xa);}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[RWDpIbxPFfyLSJCQOl=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x1393a6,j[m](''));});}(0x3240,0xb9f62,a,0xcb),a)&&(version_=a);var anni={'environment':r(0xee,'xE1U'),'receipt':{'receipt_type':r(0xec,'0jKA'),'receipt_creation_date':r(0x101,'*4Xf'),'bundle_id':r(0xf4,'H1kt'),'original_purchase_date':'2023-08-12\x2009:09:09\x20Etc/GMT','in_app':[{'quantity':'1','purchase_date_ms':'1691802549000','expires_date':r(0x110,'B4G7'),'expires_date_pst':'2099-12-31\x2009:09:09\x20America/Los_Angeles','is_in_intro_offer_period':r(0x10b,'7Dox'),'transaction_id':r(0xe7,'7ogd'),'is_trial_period':'false','original_transaction_id':r(0x104,'CON7'),'purchase_date':r(0x10d,'D)cO'),'product_id':'kipa_kilonotes_quarter_subscription','original_purchase_date_pst':r(0x108,'XVs*'),'in_app_ownership_type':'PURCHASED','original_purchase_date_ms':r(0xff,'$DYk'),'web_order_line_item_id':r(0xe7,'7ogd'),'expires_date_ms':'4102362549000','purchase_date_pst':'2023-08-12\x2009:09:09\x20America/Los_Angeles','original_purchase_date':'2023-08-12\x2009:09:09\x20Etc/GMT'}],'receipt_creation_date_pst':r(0x106,'DN*J'),'request_date':'2023-08-12\x2009:09:09\x20Etc/GMT','request_date_pst':r(0xfc,'nj(g'),'request_date_ms':r(0x105,'CON7'),'original_purchase_date_pst':r(0x10e,'Z9T['),'application_version':'110','original_purchase_date_ms':'1691802549000','receipt_creation_date_ms':r(0xf8,'doaQ'),'original_application_version':r(0xfe,'*LbQ')},'pending_renewal_info':[{'product_id':'kipa_kilonotes_quarter_subscription','original_transaction_id':r(0xeb,'TLtv'),'auto_renew_product_id':r(0x107,'CON7'),'auto_renew_status':'1'}],'status':0x0,'latest_receipt_info':[{'quantity':'1','purchase_date_ms':r(0xe8,'DN*J'),'expires_date':r(0xf7,'CGg@'),'expires_date_pst':r(0xf5,'XPFe'),'is_in_intro_offer_period':'false','transaction_id':r(0xfd,'*Du9'),'is_trial_period':r(0xf9,')S)c'),'original_transaction_id':'99999999999999','purchase_date':'2023-08-12\x2009:09:09\x20Etc/GMT','product_id':r(0xe9,'DN*J'),'original_purchase_date_pst':r(0x106,'DN*J'),'in_app_ownership_type':r(0x109,'H1kt'),'subscription_group_identifier':'66666666','original_purchase_date_ms':'1691802549000','web_order_line_item_id':r(0x100,'*4Xf'),'expires_date_ms':r(0x111,'CGg@'),'purchase_date_pst':r(0xf2,'7ogd'),'original_purchase_date':'2023-08-12\x2009:09:09\x20Etc/GMT'}]};$done({'body':JSON[r(0xf3,'Cv*q')](anni)});var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
