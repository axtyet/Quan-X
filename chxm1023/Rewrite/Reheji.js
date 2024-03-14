/*************************************

项目名称：Revenuecat 系列解锁合集
下载地址：https://too.st/CollectionsAPP
更新日期：2024-03-15
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/Reheji.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/Reheji.js
^https?:\/\/app-measurement\.com\/config\/app url reject
^https?:\/\/firestore\.googleapis\.com url reject

[mitm]
hostname = api.revenuecat.com, app-measurement.com, firestore.googleapis.com

*************************************/


const chxm1024 = {};
const { requestBody } = $request;
const headers = $request.headers;
const chxm1023 = JSON.parse(typeof $response != "undefined" && $response.body || null);
const ua = headers['User-Agent'] || headers['user-agent'];
const bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];


//排除已禁止MITM的APP
const forbid = ['Fileball', 'APTV'];

if (forbid.some(appName => (ua && ua.includes(appName)) || (requestBody && requestBody.includes(appName)))) {
  console.log('发现禁止MITM的APP，已停止运行脚本！\n叮当猫の分享频道: https://t.me/chxm1023');
  $done({});
}

//识别bundle_id
const bundle = {
	'io.innerpeace.yiye': { name: 'Premium', id: 'io.innerpeace.yiye.lifetime.forYearly', cm: 'sja' },  //言外笔记
	'com.skysoft.removalfree': { name: 'Pro', id: 'com.skysoft.removalfree.subscription.newyearly', cm: 'sja' }  //图片消除
}

//识别UA
const list = {
	'%E8%AF%AD%E9%9F%B3%E8%AE%A1%E7%AE%97%E5%99%A8': { name: 'Pro access', id: 'com.tech.counter.All', cm: 'sjb' },  //语音计算器
	'%E7%BE%8E%E5%A6%86%E6%97%A5%E5%8E%86': { name: 'Pro access', id: 'com.tech.Aula.VIPALL', cm: 'sjb' },  //美妆日历
	'LiveWallpaper': { name: 'Pro access', id: 'com.tech.LiveWallpaper.ALL', cm: 'sjb' },  //动态壁纸
	'Chat%E7%BB%83%E5%8F%A3%E8%AF%AD': { name: 'Pro access', id: 'com.tech.AiSpeak.All', cm: 'sjb' },  //Chat练口语
	'dtdvibe': { name: 'pro', id: 'com.dtd.aroundu.life', cm: 'sjb' },  //DtdSounds-睡眠白噪音
	'Clipboard': { name: 'Premium', id: 'Premium_0_99_1M_1MFree', cm: 'sja' },  //Clipboard-剪贴板
	'Hi%E8%AE%BA%E5%9D%9B/69': { name: 'plus', id: 'plus_yearly', cm: 'sja' },  //Hi论坛
	'AnimeArt': { name: 'AnimeArt.Gold', id: 'WaifuArt.Lifetime', cm: 'sjb' },  //Anime Waifu-AI
	'LiveCaption': { name: 'Plus', id: 'rc_0400_1m', cm: 'sja' },  //iTranscreen-屏幕/游戏翻译
	'EraseIt': { name: 'ProVersionLifeTime', id: 'com.uzero.cn.eraseit.premium1.fromyear', cm: 'sjb' },  //Smoothrase-AI擦除照片中任何物体
	'MusicPutty': { name: 'Premium', id: 'mp_2999_1y', cm: 'sja' },  //MusicPutty
	'SleepDown': { name: 'Pro', id: 'pro_student_0926', cm: 'sjb' },  //StaySleep-熬夜助手
	'PhotoRoom': { name: 'pro', id: 'com.background.pro.yearly', cm: 'sja' },  //PhotoRoom
	'Bg%20Remover': { name: 'Premium', id: 'net.kaleidoscope.cutout.premium1', cm: 'sja' },  //Bg Remover+
	'Sex%20Actions': { name: 'Premium Plus', id: 'ru.sexactions.subscriptionPromo1', cm: 'sja' },  //情侣性爱游戏-Sex Actions
	'reader': { name: 'vip2', id: 'com.valo.reader.vip2.year', cm: 'sja' },  //读不舍手
	'StarFocus': { name: 'pro', id: 'com.gsdyx.StarFocus.nonConsumable.forever', cm: 'sjb' },  //星垂专注
	'StarDiary': { name: 'pro', id: 'com.gsdyx.StarDiary.nonConsumable.forever', cm: 'sjb' },  //星垂日记
	'CountDuck': { name: 'premium', id: 'Lifetime', cm: 'sjb' },  //倒数鸭
	'wordswag': { name: 'pro', id: 'Pro_Launch_Monthly', cm: 'sja' },  //WordSwag
	'LockFlow': { name: 'unlimited_access', id: 'lf_00.00_lifetime', cm: 'sjb' },  //LockFlow-锁屏启动
	'TextMask': { name: 'pro', id: 'tm_lifetime', cm: 'sjb' },  //TextMask
	'%E5%96%B5%E7%BB%84%E4%BB%B6': { name: 'pro', id: 'MiaoLifeTime', cm: 'sja' },  //喵组件
	'Chatty': { name: 'pro', id: 'chatty.yearly.1', cm: 'sja' },  //Chatty.AI
	'ImagineAI': { name: 'pro', id: 'artistai.yearly.1', cm: 'sja' },  //ImagineAI
	'Langster': { name: 'Premium', id: 'com.langster.universal.lifetime', cm: 'sjb' },  //Langster-学习外语
	'VoiceAI': { name: 'Special Offer', id: 'voiceannualspecial', cm: 'sjb' },  //VoiceAI-配音
	'Rootd': { name: 'pro', id: 'subscription_lifetime', cm: 'sjb' },  //Rootd-情绪引导
	'MusicMate': { name: 'premium', id: 'mm_lifetime_68_premium', cm: 'sjb' },  //MusicMate-音乐
	'AIKeyboard': { name: 'plus_keyboard', id: 'aiplus_keyboard_yearly', cm: 'sja' },  //AIKeyboard键盘
	'SmartAIChat': { name: 'Premium', id: 'sc_3999_1y', cm: 'sja' },  //SmartAI
	'AIChat': { name: 'AI Plus', id: 'ai_plus_yearly', cm: 'sja' },  //AIChat
	'LazyReply': { name: 'lazyReplyYearlySubscription', id: 'com.bokhary.lazyreply.yearlyprosubscription', cm: 'sja' },  //ReplyAssistant键盘
	'LazyBoard': { name: 'lazyboardPro', id: 'com.bokhary.magicboard.magicboardpro', cm: 'sjb' },  //LazyBoard键盘
	'PDF%20Viewer': { name: 'sub.pro', id: 'com.pspdfkit.viewer.sub.pro.yearly', cm: 'sja' },  //PDF Viewerr
	'Joy': { name: 'pro', id: 'com.indiegoodies.Agile.lifetime2', cm: 'sjb' },  //Joy AI
	'AnkiPro': { name: 'Premium', id: 'com.ankipro.app.lifetime', cm: 'sjb' },  //AnkiPro
	'SharkSMS': { name: 'VIP', id: 'com.gaapp.sms.permanently', cm: 'sjb' },  //鲨鱼短信
	'EncryptNote': { name: 'Pro', id: 'com.gaapp.2019note.noAds', cm: 'sjb' },  //iNotes私密备忘录
	'One4WallSwiftUI': { name: 'lifetime', id: 'lifetime_key', cm: 'sjb' },  //One4Wall
	'Pigment': { name: 'pro', id: 'com.pixite.pigment.1yearS', cm: 'sja' },  //色调-Pigment
	'GradientMusic': { name: 'Pro', id: 'com.gradient.vision.new.music.one.time.79', cm: 'sjb' },  //GradientMusic音乐
	'iBody': { name: 'Pro', id: 'com.tickettothemoon.bodyfilter.one.time.purchase', cm: 'sjb' },  //BodyFilter
	'Persona': { name: 'unlimited', id: 'com.tickettothemoon.video.persona.one.time.purchase', cm: 'sjb' },  //Persona-修饰脸部与相机
	'easy_chart': { name: 'unlock all', id: 'qgnjs_2', cm: 'sja' },  //快速图表
	'Snipd': { name: 'premium', id: 'snipd_premium_1y_7199_trial_2w_v2', cm: 'sja' },  //Snipd播客
	'Tide%20Guide': { name: 'Tides+', id: 'TideGuidePro_Lifetime_Family_149.99', cm: 'sjb' },  //Tide Guide潮汐
	'Gear': { name: 'subscription', id: 'com.gear.app.yearly', cm: 'sja' },  //Gear浏览器
	'Aisten': { name: 'pro', id: 'aisten_pro', cm: 'sjb' },  //Aisten-播客学英语
	'ASKAI': { name: 'pro', id: 'askai_pro', nameb: 'pro_plan', idb: 'token_pro_plan', cm: 'sjb' },  //ASKAI
	'Subtrack': { name: 'pro', id: 'com.mohitnandwani.subtrack.subtrackpro.family', cm: 'sjb' },  //Subtrack
	'shipian-ios': { name: 'vipOffering', id: 'shipian_25_forever', cm: 'sjb' },  //诗片
	'My%20Time': { name: 'Pro', id: 'ninja.fxc.mytime.pro.lifetime', cm: 'sjb' },  //我的时间
	'LUTCamera': { name: 'ProVersionLifeTime', id: 'com.uzero.funforcam.lifetimepurchase', cm: 'sjb' },  //方弗相机
	'Heal%20Clock': { name: 'pro', id: 'com.mad.HealClock.pro', cm: 'sjb' },  //自愈时钟
	'tiimo': { name: 'full_access', id: 'lifetime.iap', cm: 'sjb' },  //Tiimo-可视化日程
	'IPTVUltra': { name: 'premium', id: 'com.chxm1023.lifetime', cm: 'sjb' },  //IPTVUltra
	'Wozi': { name: 'wozi_pro_2023', id: 'wozi_pro_2023', cm: 'sjb' },  //喔知Wozi背单词
	'Color%20Widgets': { name: 'pro', id: 'cw_1999_1y_3d0', cm: 'sja' },  //Color Widgets小组件
	'server_bee': { name: 'Pro', id: 'pro_45_lifetime', cm: 'sjb' },  //serverbee终端监控管理
	'MyPianist': { name: 'pro', id: 'com.collaparte.mypianist.pro.yearly', cm: 'sja' },  //MyPianist乐谱
	'ProCam': { name: 'pro', id: 'pro_lifetime', cm: 'sjb' },  //ProCam相机
	'Drops': { name: 'premium', id: 'forever_unlimited_time_discounted_80_int', cm: 'sjb' },  //Drops外语
	'transmission_ui': { name: 'Premium', id: '200002', cm: 'sjb' },  //Transmission服务器
	'fastdiet': { name: 'premium', id: 'com.happy.fastdiet.forever', cm: 'sjb' },  //小熊轻断食
	'money_manager': { name: 'premium', id: 'com.happy.money.forever', cm: 'sjb' },  //小熊记账
	'Overdue': { name: 'Pro', id: '1', cm: 'sjb' },  //我的物品
	'Ledger': { name: 'Pro', id: 'com.lifetimeFamily.pro', cm: 'sjb' },  //Pure账本
	'Reader': { name: 'pro', id: 'reader.lifetime.pro', cm: 'sjb' },  //PureLibro
	'WeNote': { name: 'pro', id: 'Yearly', cm: 'sja' },  //Emote
	'Scelta': { name: 'pro', id: 'SceltaProLifetime', cm: 'sjb' },  //Scelta
	'%E5%87%B9%E5%87%B8%E5%95%A6%E6%9F%A5%E5%A6%86': { name: 'Pro access', id: 'com.smartitfarmer.MakeUpAssistant.UNLIMITED', cm: 'sjb' },  //upahead
	'PM4': { name: 'pro', id: 'pm4_pro_1y_2w0', cm: 'sja' },  //Obscura
	'Project%20Delta': { name: 'rc_entitlement_obscura_ultra', id: 'com.benricemccarthy.obscura4.obscura_ultra_sub_annual', cm: 'sja' },  //Obscura
	'Zettelbox': { name: 'Power Pack', id: 'powerpack_permanent_1', cm: 'sjb' },  //Zettelbox
	'Packr': { name: 'Pro', id: 'com.jeremieleroy.packr.premiumyearly', cm: 'sja' },  //派克
	'%E7%BF%BB%E9%A1%B5%E6%97%B6%E9%92%9F': { name: 'Pro access', id: 'com.douwan.aiclock.ALL', cm: 'sjb' },  //翻页时钟
	'%E7%A7%A9%E5%BA%8F%E6%97%B6%E9%92%9F': { name: 'lifetime', id: 'com.metaorder.orderclocko.lifetime', cm: 'sjb' },  //秩序时钟
	'%E7%A7%A9%E5%BA%8F%E7%9B%AE%E6%A0%87': { name: 'pro', id: 'com.metaorder.OKRTomato.vip.supremacy', cm: 'sjb' },  //秩序目标
	'%E4%BA%BA%E7%94%9F%E6%B8%85%E5%8D%95': { name: 'premium', id: 'com.metaorder.lifelist.premium', cm: 'sjb' },  //人生清单
	'Vision': { name: 'promo_3.0', id: 'vis_lifetime_3.0_promo', cm: 'sja' },  //Vision
	'TruthOrDare': { name: 'premium', id: 'truth_or_dare_premium_monthly', cm: 'sja' },  //真心话大冒险
	'HurtYou': { name: 'premium', id: 'hurtyou_199_1y', cm: 'sja' },  //一起欺词
	'%E4%BF%A1%E6%81%AF%E8%AE%A1%E7%AE%97': { name: 'pro', id: 'informaticcalculations.pro.lifetime', cm: 'sjb' },  //信息计算
	'Context_iOS': { name: 'Context Pro', id: 'ctx_sub_1y_sspai_preorder_angel', cm: 'sja' },  //Context
	'Structured': { name: 'pro', id: 'today.structured.pro', cm: 'sjb' },  //Structured
	'%E7%9B%B8%E6%9C%BA%E5%8D%B0': { name: 'Unlimited', id: 'com.dujinke.CameraMark.Unlimited', cm: 'sjb' },  //相机印
	'HTTPBot': { name: 'pro', id: 'com.behindtechlines.HTTPBot.prounlock', cm: 'sjb' },  //Httpbot抓包工具
	'Counter': { name: 'Unlimited', id: 'com.dujinke.Counter.Unlimited', cm: 'sjb' },  //计数器
	'%E7%8C%9C%E6%96%87%E5%AD%97': { name: 'Unlimited', id: 'com.dujinke.Chinese.Unlimited', cm: 'sjb' },  //猜文字
	'%E4%BC%8A%E6%91%A9%E5%9F%BA': { name: 'Unlimited', id: 'com.dujinke.Emoji.Unlimited', cm: 'sjb' },  //伊摩基
	'%E5%8D%85%E5%85%AD%E9%97%AE': { name: 'Unlimited', id: 'com.dujinke.36Questions.Unlimited', cm: 'sjb' },  //卅六问
	'MinimalDiary': { name: 'pro', id: 'com.mad.MinimalDiary.lifetime', cm: 'sjb' },  //极简日记
	'Zen%20Flip%20Clock': { name: 'pro', id: 'com.mad.zenflipclock.iap.buymeacoffee', cm: 'sjb' },  //极简时钟
	'Transfer': { name: 'pro', id: 'transfer_ios_premium_year_2022_1', cm: 'sja' },  //WeTransfer
	'Collect': { name: 'pro', id: 'com.revenuecat.product.yearly.ios', cm: 'sja' },  //Collect收集
	'Paper': { name: 'pro', id: 'com.fiftythree.paper.credit', cm: 'sjb' },  //Paper
	'Ape': { name: 'pro-iOS', id: 'ape.lifetime', cm: 'sjb' },  //Sharp AI
	'Boar': { name: 'pro-iOS', id: 'boar.yearly', cm: 'sja' },  //Erase Objects
	'Loopsie': { name: 'pro-iOS', id: 'com.reader.autoRenewableSeason', cm: 'sja' },  //Loopsie
	'MySticker': { name: 'mysticker premium', id: 'com.miiiao.MySticker.lifetime', cm: 'sjb' },  //Tico-贴抠
	'Rec': { name: 'rec.paid', id: 'rec.paid.onetime', cm: 'sjb' },  //Rec相机
	'Photon': { name: 'photon.paid', id: 'photon.paid.onetime', cm: 'sjb' },  //Photon相机
	'OneTodo': { name: 'pro', id: 'onetodo_lifetime', cm: 'sjb' },  //OneTodo
	'OneFlag': { name: 'pro', id: 'oneflag_lifetime', cm: 'sjb' },  //OneList
	'OneClear': { name: 'pro', id: 'oneclear_lifetime', cm: 'sjb' },  //OneClear透明小组件
	'OneScreen': { name: 'pro', id: 'onescreen_lifetime', cm: 'sjb' },  //OneScreen截图带壳
	'Photomator': { name: 'pixelmator_photo_pro_access', id: 'pixelmator_photo_lifetime_v1', cm: 'sjb' },  //Photomator
	'Endel': { name: 'pro', id: 'Lifetime', cm: 'sjb' },  //Endel
	'Drowsy': { name: 'Pro', id: 'Drowsy_Life', cm: 'sjb' },  //解压动画
	'Thiro': { name: 'pro', id: 'atelerix_pro_lifetime', cm: 'sjb' },  //Thiro
	'Stress': { name: 'StressWatch Pro', id: 'stress_membership_lifetime', cm: 'sjb' },  //StressWatch压力自测提醒
	'Worrydolls': { name: 'magicmode', id: 'magicmode', cm: 'sjb' },  //解忧娃娃
	'Echo': { name: 'PLUS', id: 'com.LEMO.LemoFm.plus.lifetime.l3', cm: 'sjb' },  //LEMO FM睡眠
	'Falendar': { name: 'Falendar+', id: 'falendar_68_life', cm: 'sjb' },  //Falendar日历
	'%E8%BD%A6%E7%A5%A8%E7%A5%A8': { name: 'vip+watch_vip', id: 'eticket_with_watch_life_a', cm: 'sjb' },  //车票票
	'iRead': { name: 'vip', id: 'com.vip.forever_1', cm: 'sjb' },  //已阅
	'MOZE': { name: 'MOZE_PREMIUM_SUBSCRIPTION', id: 'MOZE_PRO_SUBSCRIPTION_YEARLY_BASIC', cm: 'sja' },  //MOZE记账
	'app/112': { name: 'Pro', id: 'com.wengqianshan.friends.pro', cm: 'sjb' },  //贴心记
	'app/38': { name: 'Pro', id: 'com.wengqianshan.diet.pro', cm: 'sjb' },  //饭卡
	'MatrixClock': { name: 'Premium', id: 'com.lishaohui.matrixclock.lifetimesharing', cm: 'sjb' },  //MatrixClocca-矩阵时钟
	'SalesCat': { name: 'Premium', id: 'com.lishaohui.salescat.lifetime', cm: 'sjb' },  //SalesCat-RevenueCat客户端
	'MoneyThings': { name: 'Premium', id: 'com.lishaohui.cashflow.lifetime', cm: 'sjb' },  //Money Things记账
	'ChatGPTApp': { name: 'Advanced', id: 'com.palligroup.gpt3.yearlyyy', cm: 'sja' },  //ChatAI-中文智能聊天机器人
	'Journal_iOS': { name: 'PRO', id: 'com.pureformstudio.diary.yearly_2022_promo', cm: 'sja' },  //Diarly日历
	'LemonKeepAccounts': { name: 'VIP', id: 'lm_1_1month', cm: 'sja' },  //旺财记账
	'mizframa': { name: 'premium', id: 'mf_20_lifetime2', cm: 'sjb' },  //Mizframa
	'EasyClicker': { name: 'pro', id: 'easyclicker.premium.discount2', cm: 'sjb' },  //自动点击器
	'ImageX': { name: 'imagex.pro.ios', id: 'imagex.pro.ios.lifetime', cm: 'sjb' },  //Imagex
	'image_upscaler': { name: 'pro', id: 'yearly_sub_pro', cm: 'sja' },  //Lens智图
	'DayPoem': { name: 'Pro Access', id: 'com.uzero.poem.month1', cm: 'sja' },  //西江诗词
	'Personal%20Best': { name: 'pro', id: 'PersonalBestPro_Yearly', cm: 'sja' },  //Personal Best-运动报告
	'Darkroom': { name: 'co.bergen.Darkroom.entitlement.allToolsAndFilters', id: 'co.bergen.Darkroom.product.forever.everything', cm: 'sja' },  //Darkroom-照片/视频编辑
	'CardPhoto': { name: 'allaccess', id: 'CardPhoto_Pro', cm: 'sjb' },  //卡片馆-相框与复古胶片
	'OneWidget': { name: 'allaccess', id: 'com.onewidget.vip', cm: 'sjb' },  //奇妙组件-轻巧桌面小组件
	'PinPaper': { name: 'allaccess', id: 'Paper_Lifetime', cm: 'sjb' },  //InPaper-创作壁纸
	'Cookie': { name: 'allaccess', id: 'app.ft.Bookkeeping.lifetime', cm: 'sjb' },  //Cookie-记账
	'MyThings': { name: 'pro', id: 'xyz.jiaolong.MyThings.pro.infinity', cm: 'sjb' },  //物品指南
	'%E4%BA%8B%E7%BA%BF': { name: 'pro', id: 'xyz.jiaolong.eventline.pro.lifetime', cm: 'sjb' },  //事线-串事成线
	'PipDoc': { name: 'pro', id: 'pipdoc_pro_lifetime', cm: 'sjb' },  //PipDoc-画中画
	'Facebook': { name: 'pro', id: 'fb_pro_lifetime', cm: 'sjb' },  //MetaSurf-社交网站浏览器
	'Free': { name: 'pro', id: 'appspree_pro_lifetime', cm: 'sjb' },  //Appspree
	'Startodo': { name: 'pro', id: 'pro_lifetime', cm: 'sjb' },  //Startodo
	'Browser': { name: 'pro', id: 'pro_zoomable', cm: 'sjb' },  //Zoomable-桌面浏览器
	'YubePiP': { name: 'pro', id: 'piptube_pro_lifetime', cm: 'sjb' },  //YubePiP-油管播放器
	'PrivateBrowser': { name: 'pro', id: 'private_pro_lifetime', cm: 'sjb' },  //Brovacy-隐私浏览器
	'Photo%20Cleaner': { name: 'premium', id: 'com.monocraft.photocleaner.lifetime.3', cm: 'sjb' },  //照片清理Photo Cleaner
	'bluredit': { name: 'Premium', id: 'net.kaleidoscope.bluredit.premium1', cm: 'sja' },  //bluredit-模糊视频&照片
	'TouchRetouchBasic': { name: 'premium', id: 'tr5_yearlysubsc_15dlrs_2', cm: 'sja' },  //TouchRetouch-水印清理
	'TimeFinder': { name: 'pro', id: 'com.lukememet.TimeFinder.Premium', cm: 'sjb' },  //TimeFinder-提醒App
	'Alpenglow': { name: 'newPro', id: 'ProLifetime', cm: 'sja' },  //Alpenglow-日出日落
	'Decision': { name: 'com.nixwang.decision.entitlements.pro', id: 'com.nixwang.decision.pro.annual', cm: 'sja' },  //小决定-选择困难症克星
	'ElementNote': { name: 'pro', id: 'com.soysaucelab.element.note.lifetime', cm: 'sjb' },  //ElementNote-笔记&PDF
	'Noto%20%E7%AC%94%E8%AE%B0': { name: 'pro', id: 'com.lkzhao.editor.full', cm: 'sja' },  //Noto-笔记
	'Tangerine': { name: 'Premium', id: 'PremiumMonthly', cm: 'sja' },  //Tangerine-习惯与情绪追踪
	'Email%20Me': { name: 'premium', id: 'ventura.media.EmailMe.premium.lifetime', cm: 'sjb' },  //Email Me-给自己发邮箱
	'Brass': { name: 'pro', id: 'brass.pro.annual', cm: 'sja' },  //Brass-定制图标&小组件
	'Happy%3ADays': { name: 'pro', id: 'happy_999_lifetime', cm: 'sjb' },  //Happy:Days-小组件App
	'Aphrodite': { name: 'all', id: 'com.ziheng.aphrodite.onetime', cm: 'sjb' },  //Aphrodite-啪啪啪日历
	'apollo': { name: 'all', id: 'com.ziheng.apollo.onetime', cm: 'sjb' },  //Apollo-记录影视
	'widget_art': { name: 'all', id: 'com.ziheng.widgetart.onetime', cm: 'sjb' },  //WidgetArt-自定义小组件
	'audiomack-iphone': { name: 'Premium1', id: 'com.audiomack.premium.2022', cm: 'sja' },  //AudioMack-音乐App
	'MallocVPN': { name: 'IOS_PRO', id: 'malloc_yearly_vpn', cm: 'sja' },  //Malloc VPN
	'WhiteCloud': { name: 'allaccess', id: 'wc_pro_1y', cm: 'sja' },  //白云天气
	'Spark': { name: 'premium', id: 'spark_5999_1y_1w0', cm: 'sja' },  //Spark_Mail-邮箱管理
	'Grow': { name: 'grow.pro', id: 'grow_lifetime', cm: 'sjb' },  //Grow-健康运动
	'NotePlan': { name: 'premium', id: 'co.noteplan.subscription.personal.annual', cm: 'sja' },  //NotePlan
	'vibes': { name: 'patron', id: 'com.andyworks.vibes.yearlyPatron', cm: 'sja' },  //NotBoring-Vibes个性化音乐
	'simple-weather': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-天气
	'streaks': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-习惯
	'andyworks-calculator': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-计算器
	'simple-timer': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-时间
	'Harukong': { name: 'premium', id: 'com.bluesignum.harukong.lifetime.premium', cm: 'sjb' },  //天天豆-日记应用
	'UTC': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.subscription.month', cm: 'sja' },  //花样文字
	'OffScreen': { name: 'Entitlement.Pro', id: 'tech.miidii.offscreen.pro', cm: 'sjb' },  //OffScreen-自律番茄钟
	'%E8%B0%9C%E5%BA%95%E9%BB%91%E8%83%B6': { name: 'Entitlement.Pro', id: 'tech.miidii.MDVinyl.lifetime', cm: 'sja' },  //谜底黑胶
	'%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //目标地图
	'%E7%9B%AE%E6%A0%87%E5%9C%B0%E5%9B%BE': { name: 'pro', id: 'com.happydogteam.relax.lifetimePro', cm: 'sjb' },  //
	'APTV': { name: 'Pro', id: 'com.kimen.aptvpro.lifetime', cm: 'sjb' },  //APTV
	'Seamless': { name: 'Seamless.Pro', id: 'net.shinystone.Seamless.Pro', cm: 'sjb' },  //Seamless同步
	'Anybox': { name: 'pro', id: 'cc.anybox.Anybox.annual', cm: 'sja' },  //Anybox-跨平台书签管理
	'ScannerPro': { name: 'plus', id: 'com.chxm1024.premium.yearly', cm: 'sja' },  //Scanner Pro-文档扫描
	'Pillow': { name: 'premium', id: 'com.neybox.pillow.premium.year', cm: 'sja' },  //Pillow-睡眠周期跟踪
	'Taio': { name: 'full-version', id: 'taio_1651_1y_2w0_std_v2', cm: 'sja' },  //Tiao
	'CPUMonitor': { name: 'Pro', id: 'com.mars.cpumonitor_removeAd', cm: 'sjb' },  //手机硬件管家
	'totowallet': { name: 'all', id: 'com.ziheng.totowallet.onetimepurchase', cm: 'sjb' },  //图图记账
	'1Blocker': { name: 'premium', id: 'blocker.ios.iap.lifetime', cm: 'sjb' },  //1Blocker-广告拦截
	'VSCO': { name: 'pro', id: 'vscopro_global_5999_annual_7D_free', cm: 'sja' }  //VSCO-照片与视频编辑
};

try {
  if (typeof $response == "undefined") {
    delete headers["x-revenuecat-etag"];
    delete headers["X-RevenueCat-ETag"];
    chxm1024.headers = headers;
  } else if (chxm1023 && chxm1023.subscriber) {
    chxm1023.subscriber.subscriptions = chxm1023.subscriber.subscriptions || {};
    chxm1023.subscriber.entitlements = chxm1023.subscriber.entitlements || {};
    let name,nameb,ids,idb,data;
    for (const src of [list, bundle]) {
     for (const i in src) {
      const test = src === list ? ua : bundle_id;
      if (new RegExp(`^${i}`, `i`).test(test)) {
        if (src[i].cm.indexOf('sja') != -1) {
          data = { "purchase_date": "2023-09-09T09:09:09Z", "expires_date": "2099-09-09T09:09:09Z" };
        } else if (src[i].cm.indexOf('sjb') != -1) {    
          data = { "purchase_date": "2023-09-09T09:09:09Z" };
        }
      ids = src[i].id;
      name = src[i].name;
      idb = src[i].idb;
      nameb = src[i].nameb;
      break;
      }
     }
    }
    if (!name || !ids) {
      data = { "purchase_date": "2023-09-09T09:09:09Z", "expires_date": "2099-09-09T09:09:09Z" };
      name = 'pro';
      ids = 'com.chxm1023.pro';
    } 
    chxm1023.subscriber.entitlements[name] = Object.assign({}, data, { product_identifier: ids });
    if (typeof nameb !== 'undefined' && nameb !== null) {
      chxm1023.subscriber.entitlements[nameb] = Object.assign({}, data, { product_identifier: idb });
    }
    const subData = Object.assign({},data,{		"Author": "chxm1023",		"Telegram": "https://t.me/chxm1023",		"warning": "仅供学习，禁止转载或售卖",		"original_purchase_date": "2023-09-09T09:09:09Z",		"store_transaction_id" : "4900066666666666",		"period_type" : "trial",		"store": "app_store",		"ownership_type": "PURCHASED"	});
    chxm1023.subscriber.subscriptions[ids] = subData;
    if (typeof idb !== 'undefined' && idb !== null) {
      chxm1023.subscriber.subscriptions[idb] = subData;
    }
    chxm1024.body = JSON.stringify(chxm1023);
    console.log('已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/chxm1023');
  } 
} catch(e) {
  //执行失败
  console.log('执行失败: '+ e.message); 
}

$done(chxm1024);
