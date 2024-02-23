# 本文件夹说明
## 项目名称：XbackVPN
## 项目作者：David&Levi
## 下载地址：https://apps.apple.com/app/id1659638467
## 使用说明：必须创建一个免费账号，不建议使用appleid注册。
## 使用声明：⚠️仅供参考，🈲️转载与售卖！

### Surge
Surge用户查看该链接内容进行添加。

#### 方法一（推荐）：
[Surge模块添加](https://raw.githubusercontent.com/czy13724/Quantumult-X/main/temporary/xbackvpn/surgexback.sgmodule)

Surge 模块可直接引用。

#### 方法二：
[Surge手动添加到script](https://raw.githubusercontent.com/czy13724/Quantumult-X/main/temporary/xbackvpn/surgexback.js)

[Surge原视频教程](https://raw.githubusercontent.com/czy13724/Quantumult-X/main/temporary/xbackvpn/Surge%E8%A7%A3%E9%94%81xbackvpn.mp4)

Surge需要拉取到本地使用，请自行查看下方操作。

操作添加说明：Surge用户请复制下方内容。在surge界面找到脚本栏(scripting)并点击脚本(script)，添加一个新的脚本。
填入脚本名称(XbackVPN)；脚本类型选择http response；URL输入网址(https://client-alphant.xback.io/alphant/api/member/getInfo)；打开Requires Body；划到底部点击编辑脚本，将下方内容粘贴进来进行保存。打开软件即可使用。


### Quantumult X

#### 方法一（推荐）：
[QX一键导入](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%0A%20%20%22rewrite_remote%22%20%3A%20%5B%0A%20%20%20%20%22https%3A%2F%2Fraw.githubusercontent.com%2Fczy13724%2FQuantumult-X%2Fmain%2Ftemporary%2Fxbackvpn%2FqxXback.js%2C%20update-interval%3D172800%2C%20opt-parser%3Dtrue%2C%20enabled%3Dfalse%22%0A%20%20%5D%0A%7D)

⚠️ 如未生效则需要搭配Boxjs使用。使用方法请看下方说明。
操作说明：抓包抓取类似于 https://client-alphant.xback.io/alphant/api/member/getInfo?deviceCode=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx ,找到该地址的响应体(response body),点击json查看(json viewer),将newToken双引号的内容复制出来备用。若你使用boxjs网页则点击我的-数据查看器-输入key为xbackvpn_token并点击view将得到的newToken粘贴进来保存。若使用boxjs管理快捷指令也可以操作。

#### 方法二：
[QX手动添加](https://raw.githubusercontent.com/czy13724/Quantumult-X/main/temporary/xbackvpn/qxXback.js)  

⚠️ 如未生效则需要搭配Boxjs使用。使用方法请看下方说明。
操作说明：抓包抓取类似于 https://client-alphant.xback.io/alphant/api/member/getInfo?deviceCode=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx ,找到该地址的响应体(response body),点击json查看(json viewer),将newToken双引号的内容复制出来备用。若你使用boxjs网页则点击我的-数据查看器-输入key为xbackvpn_token并点击view将得到的newToken粘贴进来保存。若使用boxjs管理快捷指令也可以操作。

### Loon

#### 方法一（推荐）：
[Loon一键导入](https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/czy13724/Quantumult-X/main/temporary/xbackvpn/loonxbackvpn.plugin)

#### 方法二：
[Loon手动添加](https://raw.githubusercontent.com/czy13724/Quantumult-X/main/temporary/xbackvpn/loonxbackvpn.plugin)

### Stash
未添加
