[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=evilbutcher)](https://github.com/anuraghazra/github-readme-stats)

# 个人脚本整理

[English Version](https://github.com/evilbutcher/Code/blob/master/README_EN.md)

⚠️ 所有内容仅供交流学习，请于下载后 24h 内删除，勿挪作他用，否则后果自负 ⚠️  
⚠️ 一旦下载即视为您同意上述要求 ⚠️

## 【JSBox】

### [文献下载助手](https://github.com/evilbutcher/Code/tree/master/%E6%96%87%E7%8C%AE%E4%B8%8B%E8%BD%BD/%E6%96%87%E7%8C%AE%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B)

#### [安装链接](https://xteko.com/redir?name=ArticlesHelper&url=https%3A%2F%2Fgithub.com%2Fevilbutcher%2FCode%2Fraw%2Fmaster%2F%25E6%2596%2587%25E7%258C%25AE%25E4%25B8%258B%25E8%25BD%25BD%2FArticlesHelper.box)

#### 功能特点

1. 输入 doi 号(默认复制剪贴板文本)，点击“下载”按钮即可下载文献；可批量下载，doi 用英文逗号(,)隔开。
2. 长按地址栏可检测链接是否可用。
3. 若提示错误，长按对应的链接尝试手动下载。
4. 在文献界面，点击文献可以删除，长按可以分享。
5. 打开重命名开关将采用标题-期刊-卷-doi 方式命名，因为需要向同一网址请求数据，批量下载大于 5 篇时会关闭，否则有拉黑 ip 风险。
6. 关闭 iCloud Drive，文献存储在脚本目录 articles 下(可打包分享)；打开 iCloud Drive，文献存储在 JSBox/ArticlesHelper/articles 目录下。
7. iCloud 中的 ArticlesHelper/download 目录用来存储 wos 下载的 html 记录。具体方法：Safari 下载 html 格式的 wos 文献记录，下载完成后打开目录，转存至 ArticlesHelper/download 文件夹，打开脚本，通过载入文件解析 doi，若有多篇文献记录默认载入最后一个文件的 doi。所有文献记录以 txt 格式保存在 ArticlesHelper/articles 目录下，可通过文献界面下拉刷新对解析记录进行管理。
8. Windows 用户可在 Microsoft Store 下载 iCloud 进行同步。

### [热门监控](https://github.com/evilbutcher/Code/tree/master/%E7%83%AD%E9%97%A8%E7%9B%91%E6%8E%A7)

#### 功能特点

1. 可以选择性监控榜单。
2. 可以分别设定每个榜单的最热内容数量。
3. 可以选择是否附带话题链接。
4. 可以自定每个榜单是匹配关键词还是获取最新内容。
5. 可以自定每个榜单内容独立推送还是合并推送。
6. 一些榜单单独推送时支持封面。
7. 支持 BoxJs。
8. 监控微博热搜关键词。
9. 监控知乎热榜关键词。
10. 监控百度风云榜关键词。
11. 监控 B 站日榜关键词（对应关系：0 全站，1 动画，3 音乐，4 游戏，5 娱乐，36 科技，119 鬼畜，129 舞蹈）。
12. 监控豆瓣电影关键词。
13. 监控抖音视频关键词。
14. 监控 36 氪关键词。
15. 监控 Kindle 图书关键词。
16. 监控 RSSHub 订阅，感谢@api-evangelist-[rss2json](https://github.com/api-evangelist/rss2json)。
17. 监控人人影视最新上传，配合捷径[磁力离线](https://www.icloud.com/shortcuts/cfad8390798e459db458d6233d229209)可实现磁力下载，解锁追剧新姿势。
18. 可自定关键词推送间隔。

### [缩写翻译](https://github.com/evilbutcher/Code/blob/master/%E7%BC%A9%E5%86%99%E7%BF%BB%E8%AF%91/1.2%E7%BC%A9%E5%86%99%E7%BF%BB%E8%AF%91%E8%BE%93%E5%85%A5%E7%B2%98%E8%B4%B4%E5%B9%B6%E5%AD%98.js)

#### 功能特点

复制带有缩写的文字运行脚本即可。

### [下载 INS 图片](https://github.com/evilbutcher/Code/blob/master/%E4%B8%8B%E8%BD%BDINS%E5%9B%BE%E7%89%87.js)

#### 功能特点

需要自行填入 cookie。  
其他方式：[大佬的捷径](https://www.icloud.com/shortcuts/3b6e85cd3f114ac79baf056765127dae)。

### [去重小工具](https://github.com/evilbutcher/Code/blob/master/%E5%8E%BB%E9%87%8D%E5%B7%A5%E5%85%B7.js)

#### 功能特点

以英文,分隔，去除重复（可根据情况改）。

## 【网页】

### [神秘博士 2048](https://github.com/evilbutcher/Code/tree/master/MyWeb/custome%202048)

#### 功能特点

打开 index.html 即可玩，picture 内图片可自定义。

### 免责声明

1. 此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2. 由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3. 请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4. 此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5. 本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6. 如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7. 所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

### 访问量

![](http://profile-counter.glitch.me/evilbutcher/count.svg)
