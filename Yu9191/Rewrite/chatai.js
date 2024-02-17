/******************************

脚本功能：ChatAl 4.0中文版——解锁VIP
脚本作者：Eric
下载地址：https://is.gd/4BXHtS
测试版本：3.1.0


*******************************/

[rewrite_local]

(?<=vip=)false url 302 true

https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/chatai.js

[mitm] 

hostname = www.longstargpt.com
