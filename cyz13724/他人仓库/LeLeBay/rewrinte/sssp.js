/*************************************

项目名称：涩涩视频——去除所有广告
下载地址：https://12966.net
网页在线：https://files.yuchenglw.com
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(files\.(yuchenglw|honghufly)\.com|(os\.privacypolicie|ss\.osupdate|cdn\.privacypolicie)\.net) url script-response-body https://raw.githubusercontent.com/LeLeBay/rewrinte/main/sssp.js

[mitm]
hostname = files.*.com, os.privacypolicie.net, ss.osupdate.net

*************************************/


var body = $response.body;

// 定义替换规则
var chxm1023 = [
    { search: /(<div id="launch">)[\s\S[\d\D]{0,1000}(<\/script>)/g, replace: '$2' },  //开屏广告
    { search: /(<div id="popup">)[\s\S[\d\D]{0,5000}(<div class="header">)/g, replace: '$2' },  //首页弹窗
    { search: /(<div class="container mt-3">)[\s\S[\d\D]{28,30000}(<div class="banner mt-3">)/g, replace: '$2' },  //屏蔽首页广告
    { search: /(<div class="float-app">)[\s\S[\d\D]{0,500}(<\/div>)/g, replace: '<!--  -->' },  //屏蔽最下方横幅广告
    { search: /(<div class="childs">)[\s\S[\d\D]{0,20000}(<div class="row lists">)/g, replace: '<div class="row lists">' },  //过滤子分类的广告
    { search: /(<div class="iconad">)[\s\S[\d\D]{0,20000}(<div class="play mt-3">)/g, replace: '$2' },  //过滤播放广告
    { search: /(<div class="iconad">)[\s\S[\d\D]{0,20000}(<h2>原创传媒<\/h2>)/g, replace: '$2' },  //屏蔽是全部分类小图标广告
    { search: /(<div class="banner mt-3">)[\s\S[\d\D]{0,20000}(<div class="mt-5 text-center">)/g, replace: '$2' }  //屏蔽播放页面下方猜你
];

// 执行替换
chxm1023.forEach(replacement => {
    body = body.replace(replacement.search, replacement.replace);
});

// 定义敏感词
var keywords = ["同城约会，上门做爱",  "约会空姐 爆操人妻",  "少女援交 处女上门",  "高端外围在线约爱",  "全国最高端约炮平台",  "真人约炮 视频认证 高端外围",  "免费上门做爱",  "同城美女 点击做爱",  "同城约炮，极品美女在线做爱",  "24小时极速上门做爱",  "外围上门 学生兼职",  "极品美女  尽在小黄书",  "成人精品视频 免费看",  "成人精品高清大片 立即观看",  "精品AV 在线观看",  "全网最全 日更万部",  "永久免费 无需VIP 色播APP",  "精品爽片 尽在黄瓜免费视频",  "扣穴自慰 高潮喷水 大秀直播",  "美女主播 空降到家",  "全网最强色播app",  "学生破处在线观看",  "极品美女 尽在小黄书",  "看片神器 成人原创视频", "黄瓜免费视频 人人都爱看",  "家庭真实乱伦",  "看片无广告 超多免费最新AV"];

// 对每个敏感词进行处理
keywords.forEach(keyword => {
    var reg = new RegExp('(<div class="col-6 item">)[\\s\\S]{0,350}(' + keyword + ')<\/p>[\\s\\S]{0,20}<\/div>', 'g');
    body = body.replace(reg, '');
});

$done({body});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
