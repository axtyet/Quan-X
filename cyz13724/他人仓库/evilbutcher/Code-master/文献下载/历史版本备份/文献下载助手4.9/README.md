输入doi号(默认复制剪贴板文本)，点击“下载”按钮即可下载文献；可批量下载，doi用空格隔开。
长按地址栏可检测链接是否可用。
若提示错误，长按对应的链接尝试手动下载。
在文献界面，点击文献可以删除，长按可以分享。
有时启动报错，删掉assets中对应的重复文件_2即可。
打开重命名开关将采用标题-期刊-卷-doi方式命名，因为需要向同一网址请求数据，批量下载时建议关闭，否则有拉黑ip风险。
关闭iCloud Drive，文献存储在脚本目录articles下(可打包分享)；打开iCloud Drive，文献存储在JSBox/articles目录下。
iCloud中的download目录用来存储wos下载的html记录。具体方法：Safari下载html格式的wos文献记录，下载完成后打开目录，转存至JSBox内的download文件夹，打开脚本，通过载入文件解析doi，若有多篇文献记录默认载入最后一个文件的doi。所有文献记录以txt格式保存在articles目录下，可通过文献界面下拉刷新对解析记录进行管理。
Windows用户可在Microsoft Store下载iCloud进行同步。