/*************************************

项目名称：iTunes-系列解锁合集
更新日期：2024-01-10
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：如果脚本无效，请先排除是否脚本冲突
特别说明：此脚本可能会导致App Store无法登录ID
解决方法：关[MITM][脚本][代理工具]方法选一即可
已解锁App传送门：https://too.st/iTunes

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/iTunes.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const bundle_id = chxm1023.receipt["bundle_id"] || chxm1023.receipt["Bundle_Id"];

const list = {
  'HRV': { cm: 'sjbla', hx: 'hxpdc', version: "1", id: "com.stress.test.record.yearly", latest: "chxm1023" },  //解压小橘子(需试用)
  'UniversTranslate': { cm: 'sjbla', hx: 'hxpda', id: "com.univers.translator.tool.year", latest: "chxm1023" },  //翻译官(需试用)
  'com.gostraight.smallAccountBook': { cm: 'sjblb', hx: 'hxpda', id: "ForeverVIPPayment", latest: "chxm1023" },  //iCost记账(需要购买)
  'ZJTBiaoGe': { cm: 'sjbla', hx: 'hxpda', id: "zhangjt.biaoge.monthvip", latest: "chxm1023" },  //表格手机版
  'MiniMouse': { cm: 'sjbla', hx: 'hxpda', id: "minimouse_vip_1year", latest: "chxm1023" },  //MiniMouse
  'Paste%20Keyboard': { cm: 'sjbla', hx: 'hxpda', id: "com.keyboard.1yetr", latest: "chxm1023" },  //复制和粘贴键盘
  'EWA': { cm: 'sjbla', hx: 'hxpda', id: "com.ewa.renewable.subscription.year8", latest: "chxm1023" },  //EWA-学习外语
  'BuBuSZ': { cm: 'sjbla', hx: 'hxpda', id: "quaVersion", latest: "chxm1023" },  //BuBu手帐
  'CapyMood': { cm: 'sjbla', hx: 'hxpda', version: "1.1.0.3", id: "com.paha.CapyMood.year", latest: "chxm1023" },  //CapyMood
  'xyz.iofree.lifenotes': { cm: 'sjbla', hx: 'hxpda', version: "4", id: "xyz.iofree.lifelog.pro.yearly", latest: "chxm1023" },  //人生笔记(需试用)
  'com.icandiapps.nightsky': { cm: 'sjbla', hx: 'hxpda', version: "12.0.2.1", id: "com.icandiapps.ns4.annual", latest: "chxm1023" },  //星空
  'Wallpapers': { cm: 'sjbla', hx: 'hxpda', version: "7.01", id: "wallpaperworld.subscription.yearly.12.notrial", latest: "chxm1023" },  //Wallpaper Tree壁纸
  'com.yumiteam.Kuki.ID': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.yumiteam.Kuki.ID.2", latest: "chxm1023" },  //PicsLeap-美飞
  'com.quangtm193.picpro': { cm: 'sjbla', hx: 'hxpda', version: "7.2.6.1", id: "com.quangtm193.picpro1year", latest: "chxm1023" },  //PicPro-人工智能照片编辑器
  'Storybeat': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "yearly_1", latest: "chxm1023" },  //Storybeat
  'com.smartgymapp.smartgym': { cm: 'sjbla', hx: 'hxpda', version: "7.2.6.1", id: "com.smartgymapp.smartgym.premiumpersonaltraineryearly", latest: "chxm1023" },  //SmartGym
  'Ptime': { cm: 'sjbla', hx: 'hxpda', version: "3", id: "com.subscribe.pro.year", latest: "chxm1023" },  //Ptime-拼图(需试用)
  'Prookie': { cm: 'sjbla', hx: 'hxpda', version: "64", id: "prookie.month.withtrial.0615", latest: "chxm1023" },  //AI灵绘
  'BodyTune': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "Bodypro1", latest: "chxm1023" },  //BodyTune-瘦身相机
  'com.eleven.chatgpt': { cm: 'sjbla', hx: 'hxpda', version: "4", id: "com.eleven.chatgpt.yearly", latest: "chxm1023" },  //ChatAI
  'Caculator': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "calc_Unlock_1", latest: "chxm1023" },  //计算器+
  'killer.sudoku.free.brain.puzzle': { cm: 'sjbla', hx: 'hxpda', version: "23111664", id: "ks.i.iap.premium", latest: "chxm1023" },  //杀手数独
  'sudoku.puzzle.free.game.brain': { cm: 'sjbla', hx: 'hxpda', version: "23113059", id: "sudoku.i.sub.vvip.p1y", latest: "chxm1023" },  //数独
  'com.atistudios': { cm: 'sjbla', hx: 'hxpda', version: "7.1.13", id: "us_1_month", latest: "chxm1023" },  //Mondly
  'One%20Markdown': { cm: 'sjblb', hx: 'hxpda', version: "678", id: "10012", latest: "chxm1023" },  //One Markdown
  'MWeb%20iOS': { cm: 'sjblb', hx: 'hxpda', version: "968", id: "10001", latest: "chxm1023" },  //MWeb-编辑器/笔记/发布
  'NYMF': { cm: 'sjbla', hx: 'hxpda', version: "102", id: "com.nymf.app.premium_year", latest: "chxm1023" },  //Nymf艺术照片
  'com.lockwidt.cn': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.lockwidt.cn.member", latest: "chxm1023" },  //壁纸16
  'Utsuki': { cm: 'sjbla', hx: 'hxpda', version: "67", id: "KameePro", latest: "chxm1023" },  //梦见账本
  'Processing': { cm: 'sjbla', hx: 'hxpda', version: "40", id: "com.polarapps.processing.annually", latest: "chxm1023" },  //Processing
  'one%20sec': { cm: 'sjbla', hx: 'hxpda', version: "275", id: "wtf.riedel.one_sec.pro.annual.individual", latest: "chxm1023" },  //one sec
  'com.skysoft.pencilsketch': { cm: 'sjbla', hx: 'hxpda', version: "183", id: "com.skysoft.pencilsketch.subscription.yearly", latest: "chxm1023" },  //铅笔画(需试用)
  'com.instagridpost.rsigp': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.GridPost.oneyearplus", latest: "chxm1023" },  //九宫格切图
  'com.skysoft.picsqueen': { cm: 'sjbla', hx: 'hxpda', version: "40", id: "com.skysoft.picsqueen.subscription.yearly", latest: "chxm1023" },  //PicsQueen
  'com.skysoft.removalfree': { cm: 'sjbla', hx: 'hxpda', version: "706", id: "com.skysoft.removalfree.subscription.yearly", latest: "chxm1023" },  //图片消除
  'com.skysoft.facecartoon': { cm: 'sjbla', hx: 'hxpda', version: "87", id: "com.skysoft.facecartoon.subscription.yearly", latest: "chxm1023" },  //卡通头像
  'Jennie%20AI': { cm: 'sjbla', hx: 'hxpda', version: "50", id: "com.skysoft.text2img.vip.yearly", latest: "chxm1023" },  //Jennie AI制作图片
  'Face%20Replace': { cm: 'sjblb', hx: 'hxpda', version: "284", id: "com.skysoft.faceswap.subscription.unlimitedaccess", latest: "chxm1023" },  //FaceReplace(未完成)
  'MGhostLens': { cm: 'sjbla', hx: 'hxpda', version: "3.3991", id: "com.ghostlens.premium1month", latest: "chxm1023" },  //魔鬼相机
  'Luminous': { cm: 'sjbla', hx: 'hxpda', version: "2.5.1", id: "com.spacemushrooms.weekly", latest: "chxm1023" },  //光影修图
  'RitmoVideo': { cm: 'sjbla', hx: 'hxpda', version: "46", id: "com.zhk.hidebox.yearly", latest: "chxm1023" },  //RitmoVideo
  'PerfectImage': { cm: 'sjbla', hx: 'hxpda', version: "5.1.7", id: "Perfect_Image_VIP_Yearly", latest: "chxm1023" },  //完美影像(需试用)
  'moment': { cm: 'sjbla', hx: 'hxpda', version: "1.5.7", id: "PYJMoment2", latest: "chxm1023" },  //片羽集(需试用)
  'Planner%20Plus': { cm: 'sjbla', hx: 'hxpda', version: "116", id: "com.btgs.plannerfree.yearly", latest: "chxm1023" },  //PlannerPro
  'HiddenBox': { cm: 'sjblc', hx: 'hxpdb', version: "1" },//我的书橱
  'Synthesizer': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.qingxiu.synthesizer.mon", latest: "chxm1023" },  //语音合成
  'ContractMaster': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.qingxiu.contracts.monthly", latest: "chxm1023" },  //印象全能王
  'MyDiary': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "diary.yearly.vip.1029", latest: "chxm1023" },  //我的日记
  'Translator': { cm: 'sjbla', hx: 'hxpda', version: "180", id: "trans_sub_week", latest: "chxm1023" },  //翻译家
  'ToDoList': { cm: 'sjbla', hx: 'hxpda', version: "3", id: "todolist.subscription.yearly", latest: "chxm1023" },  //ToDoList(需试用)
  'Idea': { cm: 'sjbla', hx: 'hxpda', version: "3", id: "top.ideaapp.ideaiOS.membership.oneyear", latest: "chxm1023" },  //灵感(需试用)
  'ZeroTuImg': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "ZeroTuImgPlus", latest: "chxm1023" },  //Zero壁纸
  'com.traveltao.ExchangeAssistant': { cm: 'sjbla', hx: 'hxpda', version: "1532", id: "lxbyplus", latest: "chxm1023" },  //极简汇率(需试用)
  'EnhanceFox': { cm: 'sjbla', hx: 'hxpda', version: "6.9.3", id: "com.risingcabbage.enhancefox.yearlysubscribewithtreetrial", latest: "chxm1023" },  //狸清照
  'ServerKit': { cm: 'sjbla', hx: 'hxpda', version: "5", id: "com.serverkit.subscription.year.a", latest: "chxm1023" },  //服务器助手
  'RawPlus': { cm: 'sjbla', hx: 'hxpda', version: "27", id: "com.dynamicappdesign.rawplus.yearlysubscription", latest: "chxm1023" },  //Raw相机
  'OrderGenerator': { cm: 'sjblb', hx: 'hxpda', version: "1", id: "oder_pay_forever", latest: "chxm1023" },  //订单生成
  'GenerateAllOrdersTool': { cm: 'sjbla', hx: 'hxpda', version: "2030", id: "Order_Vip_010", latest: "chxm1023" },  //订单生成器(需试用)
  'MoMoShouZhang': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "shunchangshouzhangQuarterlyPlus", latest: "chxm1023" },  //卡卡手账(需试用)
  'Mindkit': { cm: 'sjblb', hx: 'hxpda', version: "207", id: "mindkit_permanently", latest: "chxm1023" },  //Mindkit
  'DailySpending': { cm: 'sjbla', hx: 'hxpda', version: "2011", id: "com.xxtstudio.dailyspending.year", latest: "chxm1023" },  //Daily记账
  'Miary': { cm: 'sjblb', hx: 'hxpda', version: "48", id: "lifetime_sub", latest: "chxm1023" },  //Miary
  'ChatImage': { cm: 'sjbla', hx: 'hxpda', version: "38", id: "com.hk.zhongwenhuatu.year", latest: "chxm1023" },  //MJ中文版
  'Noted': { cm: 'sjblb', hx: 'hxpda', version: "742", id: "com.digitalworkroom.noted.plus.lifetime", latest: "chxm1023" },  //Noted-录音笔记软件
  'BingQiTools': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "bingqi_e2", latest: "chxm1023" },  //猫狗翻译
  'AnyDown': { cm: 'sjblb', hx: 'hxpda', version: "1", id: "com.xiaoqi.down.forever", latest: "chxm1023" },  //AnyDown-下载神器
  'Reader': { cm: 'sjblb', hx: 'hxpda', version: "2", id: "com.xiaoqi.reader.forever", latest: "chxm1023" },  //爱阅读-TXT阅读器
  'com.bestmusicvideo.formmaster': { cm: 'sjbla', hx: 'hxpda', version: "10", id: "com.form.1yearvip", latest: "chxm1023" },  //表格大师
  'ExcelSpreadSheetsWPS': { cm: 'sjbla', hx: 'hxpda', version: "32", id: "com.turbocms.SimpleSpreadSheet.viponeyear", latest: "chxm1023" },  //简易表格(需试用)
  'XinQingRiJi': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "zhiwenshouzhangQuarterlyPlus", latest: "chxm1023" },  //猫咪手帐(需试用)
  'Nutrilio': { cm: 'sjbla', hx: 'hxpda', version: "51", id: "net.nutrilio.one_year_plus", latest: "chxm1023" },  //Nutrilio
  'Pixiu%E8%AE%B0%E8%B4%A6': { cm: 'sjbla', hx: 'hxpda', version: "20230919", id: "com.RuoG.Pixiu.VIPYear", latest: "chxm1023" },  //貔貅记账
  'AIHeader': { cm: 'sjbla', hx: 'hxpda', version: "1.0.0.33", id: "com.ai.avatar.maker.month.3dayfree", latest: "chxm1023" },  //AI头像馆
  'MoodTracker': { cm: 'sjblb', hx: 'hxpda', version: "21", id: "co.vulcanlabs.moodtracker.lifetime2", latest: "chxm1023" },  //ChatSmith(美区)
  'com.dandelion.Routine': { cm: 'sjblb', hx: 'hxpda', version: "364", id: "membership", latest: "chxm1023" },  //小日常
  'YSBrowser': { cm: 'sjblb', hx: 'hxpda', version: "5", id: "com.ys.pro", latest: "chxm1023" },  //亚瑟浏览器
  'org.zrey.metion': { cm: 'sjbld', hx: 'hxpda', version: "1", id: "org.zrey.metion.pro", ids: "org.zrey.metion.main", latest: "chxm1023" },  //Metion-基础+Pro
  'ZenJournal': { cm: 'sjbla', hx: 'hxpda', version: "218", id: "zen_pro", latest: "chxm1023" },  //禅记
  '%E5%80%92%E6%94%BE%E6%8C%91%E6%88%98': { cm: 'sjbla', hx: 'hxpda', version: "29", id: "com.abighead.ReverseChallenge.iap.pro.year", latest: "chxm1023" },  //倒放挑战
  'com.visualmidi.app.perfectpiano.Perfect-Piano': { cm: 'sjbla', hx: 'hxpda', version: "63", id: "auto_renew_monthly_subscription", latest: "chxm1023" },  //完美钢琴
  'Straw': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.1year.eyedropper", latest: "chxm1023" },  //吸管Pro-取色
  'vibee': { cm: 'sjbla', hx: 'hxpda', version: "3", id: "com.vibee.year.bigchampagne", latest: "chxm1023" },  //vibee-氛围歌单小组件
  'Lister': { cm: 'sjbla', hx: 'hxpda', version: "1.0.1.1", id: "com.productlab.lister.yearly", latest: "chxm1023" },  //Lister-计划清单
  'DrumPads': { cm: 'sjblb', hx: 'hxpda', version: "6392", id: "com.gismart.drumpads.pro_lifetime_30", latest: "chxm1023" },  //BeatMakerGo-打碟机/打击垫/DJ鼓机
  'com.photoslab.ai.writerassistant': { cm: 'sjbla', hx: 'hxpda', version: "657", id: "com.photoslab.ai.writerassistant.year", latest: "chxm1023" },  //Smart AI
  'WaterMaskCamera': { cm: 'sjbla', hx: 'hxpda', version: "1.2.0.102", id: "com.camera.watermark.yearly.3dayfree", latest: "chxm1023" },  //徕卡水印相机
  'ColorPaint': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "coloring.app.singingfish.year", latest: "chxm1023" },  //涂色
  'SymbolKeyboard': { cm: 'sjblb', hx: 'hxpda', version: "9", id: "fronts.keyboard.singingfish.one", latest: "chxm1023" },  //Fonts花样字体
  'com.SingingFish.SudokuGame': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.singingfish.sudokugame.year", latest: "chxm1023" },  //数独
  'com.kuaijiezhilingdashi.appname': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "com.othermaster.yearlyvip", latest: "chxm1023" },  //快捷指令库
  'Clarity': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "claritymagazine", latest: "chxm1023" },  //克拉壁纸(未完成)
  'LogInput': { cm: 'sjbla', hx: 'hxpda', version: "4253", id: "com.logcg.loginput", latest: "chxm1023" },  //落格输入法
  'SoundLab': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "8800", latest: "chxm1023" },  //合声
  'Kilonotes': { cm: 'sjbla', hx: 'hxpda', version: "15", id: "kipa_kilonotes_quarter_subscription", latest: "chxm1023" },  //千本笔记
  'YiJianKouTu': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "XiChaoYiJianKouTuPlus", latest: "chxm1023" },  //一键抠图
  'FileArtifact': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.shengzhou.fileartifact.year", latest: "chxm1023" },  //文晓生
  'Wext': { cm: 'sjblb', hx: 'hxpda', version: "1", id: "com.lmf.wext.life", latest: "chxm1023" },  //万源阅读
  'ColorCapture': { cm: 'sjbla', hx: 'hxpda', version: "198", id: "colorcapture.pro2", latest: "chxm1023" },  //色采
  'xTerminal': { cm: 'sjbla', hx: 'hxpda', version: "186", id: "xterminal.pro2", latest: "chxm1023" },  //xTerminal
  'Fotoz': { cm: 'sjblb', hx: 'hxpda', version: "245", id: "com.kiddy.fotoz.ipa.pro", latest: "chxm1023" },  //Fotoz
  'TheLastFilm': { cm: 'sjbla', hx: 'hxpda', version: "150", id: "Filmroll_Pro_1Year", latest: "chxm1023" },  //最后一卷胶片
  'Motivation': { cm: 'sjbla', hx: 'hxpda', version: "127", id: "com.monkeytaps.motivation.premium.year3", latest: "chxm1023" },  //Motivation
  'io.sumi.GridDiary2': { cm: 'sjbla', hx: 'hxpda', version: "315", id: "io.sumi.GridDiary.pro.annually", latest: "chxm1023" },  //格志
  'Subscriptions': { cm: 'sjbla', hx: 'hxpda', version: "434", id: "com.touchbits.subscriptions.iap.pro.yearly", latest: "chxm1023" },  //订阅通
  'com.leapfitness.fasting': { cm: 'sjbla', hx: 'hxpda', version: "164", id: "com.leapfitness.fasting.oneyear1", latest: "chxm1023" },  //168轻断食
  'WidgetBox': { cm: 'sjblb', hx: 'hxpda', version: "27", id: "widgetlab001", latest: "chxm1023" },  //小组件盒子
  'LifeTracker': { cm: 'sjbla', hx: 'hxpda', version: "202208011119", id: "com.dk.lifetracker.yearplan", latest: "chxm1023" },  //Becord生活记录
  'Water%20Reminder': { cm: 'sjbla', hx: 'hxpda', version: "1.9.19", id: "com.vgfit.premiumtracker.month", latest: "chxm1023" },  //WaterReminder喝水APP
  'imgplay': { cm: 'sjbla', hx: 'hxpda', version: "482", id: "me.imgbase.imgplay.subscriptionYearly", latest: "chxm1023" },  //imgPlay
  'WaterMinder': { cm: 'sjbla', hx: 'hxpda', version: "842", id: "waterminder.premiumYearly", latest: "chxm1023" },  //WaterMinder喝水APP
  'HashPhotos': { cm: 'sjblb', hx: 'hxpda', version: "23177", id: "com.kobaltlab.HashPhotos.iap.allinone.free", latest: "chxm1023" },  //HashPhotos
  'FileBrowser': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.qingcheng.filex.pro.yearly", latest: "chxm1023" },  //松鼠下载
  'SilProject': { cm: 'sjbla', hx: 'hxpda', version: "84", id: "com.sm.Alina.Pro", latest: "chxm1023" },  //Alina米克锁屏—
  'com.chenxi.shanniankapian': { cm: 'sjbla', hx: 'hxpda', version: "6", id: "com.chenxi.shannian.superNian", latest: "chxm1023" },  //闪念
  'com.risingcabbage.pro.camera': { cm: 'sjbla', hx: 'hxpda', version: "98", id: "com.risingcabbage.pro.camera.yearlysubscription", latest: "chxm1023" },  //ReLens相机
  'com.vitalii.water': { cm: 'sjblb', hx: 'hxpda', version: "683", id: "com.vitalii.water.sub.premium8", latest: "chxm1023" },  //喝水羊驼
  'co.bazaart.patternator': { cm: 'sjbla', hx: 'hxpda', version: "65", id: "Patternator_Lock_Screen_Monthly", latest: "chxm1023" },  //拍特内头
  '%E5%BD%95%E9%9F%B3%E4%B8%93%E4%B8%9A%E7%89%88': { cm: 'sjbla', hx: 'hxpda', version: "11800", id: "com.winat.recording.pro.yearly", latest: "chxm1023" },  //录音专业版
  'cn.linfei.SimpleRecorder': { cm: 'sjbla', hx: 'hxpda', version: "5241", id: "cn.linfei.SimpleRecorder.Plus", latest: "chxm1023" },  //录音机
  'com.maliquankai.appdesign': { cm: 'sjblc', hx: 'hxpdb', version: "1.5.8" },  //PutApp
  'com.moji.MojiWeather': { cm: 'sjbla', hx: 'hxpda', version: "202107301614", id: "moji.renewalmember.one", latest: "chxm1023" },  //墨迹天气
  'PictureScanner': { cm: 'sjbla', hx: 'hxpda', version: "2023.05.16", id: "om.picturescanner.tool.year", latest: "chxm1023" },  //扫描王
  'BestColor': { cm: 'sjbla', hx: 'hxpda', version: "1.3.0.1", id: "com.bestColor.tool.month", latest: "chxm1023" },  //小红图
  'com.decibel.tool': { cm: 'sjbla', hx: 'hxpda', version: "4", id: "decibel98free3", latest: "chxm1023" },  //分贝测试仪
  'MeasurementTools': { cm: 'sjbla', hx: 'hxpda', version: "1.0.0.1", id: "mesurementyearvip", latest: "chxm1023" },  //测量工具
  'TinyPNGTool': { cm: 'sjbla', hx: 'hxpda', version: "1.0.0.1", id: "com.tinypngtool.tool.weekvip", latest: "chxm1023" },  //TinyPNG
  'IconChange': { cm: 'sjbla', hx: 'hxpda', version: "2.2.0.0", id: "iconeryearvip", latest: "chxm1023" },  //iconser图标更换
  'life.journal.diary': { cm: 'sjbla', hx: 'hxpda', version: "35", id: "life.journal.diary.annually", latest: "chxm1023" },  //Today日记
  'com.floatcamellia.motionninja': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.floatcamellia.motionninja.yearlyvip", latest: "chxm1023" },  //MotionNinja
  'com.iuuapp.audiomaker': { cm: 'sjbla', hx: 'hxpda', version: "1.1.34", id: "com.iuuapp.audiomaker.removeads.year", latest: "chxm1023" },  //音频剪辑
  'com.biggerlens.photoretouch': { cm: 'sjbla', hx: 'hxpda', version: "16", id: "com.photoretouch.1week", latest: "chxm1023" },  //PhotoRetouch消除笔P图
  'com.macpaw.iosgemini': { cm: 'sjbla', hx: 'hxpda', version: "11353", id: "com.macpaw.iosgemini.month.trial", latest: "chxm1023" },  //GeminiPhotos
  'com.mematom.ios': { cm: 'sjbla', hx: 'hxpda', version: "373", id: "MMYear", latest: "chxm1023" },  //年轮3
  'com.LuoWei.aDiary': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "com.LuoWei.aDiary.yearly0", latest: "chxm1023" },  //aDiary-待办日记本
  'com.zerone.hidesktop': { cm: 'sjblb', hx: 'hxpda', version: "4", id: "com.zerone.hidesktop.forever", latest: "chxm1023" },  //iScreen-桌面小组件主题美化
  'MagicWidget': { cm: 'sjbla', hx: 'hxpda', version: "224", id: "com.sm.widget.Pro", latest: "chxm1023" },  //ColorfulWidget—小组件
  'com.tasmanic.capture': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "CTPCAPTUREYEARLY", latest: "chxm1023" },  //3DScanner-绘制/测量平面图
  'com.readdle.CalendarsLite': { cm: 'sjbla', hx: 'hxpda', version: "5.24.8.1194", id: "com.readdle.CalendarsLite.subscription.year20trial7", latest: "chxm1023" },  //Calendars-日历/计划
  'com.readdle.ReaddleDocsIPad': { cm: 'sjbla', hx: 'hxpda', version: "8.3.1.902", id: "com.readdle.ReaddleDocsIPad.subscription.month10_allusers", latest: "chxm1023" },  //Documents
  'com.1ps.lovetalk': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.1ps.lovetalk.normal.weekly", latest: "chxm1023" },  //高级恋爱话术
  'tech.miidii.MDClock': { cm: 'sjblb', hx: 'hxpda', version: "359", id: "tech.miidii.MDClock.pro", latest: "chxm1023" },  //谜底时钟
  'com.floatcamellia.prettyup': { cm: 'sjbla', hx: 'hxpda', version: "5.7.5", id: "com.floatcamellia.prettyup.freetrialyearlysubscription", latest: "chxm1023" },  //PrettyUp视频P图
  'com.zijayrate.analogcam': { cm: 'sjbla', hx: 'hxpda', version: "68", id: "com.zijayrate.analogcam.vipforever10", latest: "chxm1023" },  //oldroll复古相机
  'WeeklyNote': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "org.zrey.weeklynote.yearly", latest: "chxm1023" },  //WeeklyNote(周周记)
  'DoMemo': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "org.zrey.fastnote.yearly", latest: "chxm1023" },  //DoMemo
  'CostMemo': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "org.zrey.money.yearly", latest: "chxm1023" },  //CostMemo
  'iTimely': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "org.zrey.iTimely.yearly", latest: "chxm1023" },  //iTimely
  'net.daylio.Daylio': { cm: 'sjbla', hx: 'hxpda', version: "125", id: "net.daylio.one_year_pro.offer_initial", latest: "chxm1023" },  //Daylio-日记
  'com.yengshine.webrecorder': { cm: 'sjbla', hx: 'hxpda', version: "1.8.1.1", id: "com.yengshine.webrecorder.yearly", latest: "chxm1023" },  //VlogStar-视频编辑器
  'org.skydomain.foodcamera': { cm: 'sjbla', hx: 'hxpda', version: "4.3.7", id: "org.skydomain.foodcamera.yearly", latest: "chxm1023" },  //Koloro-滤镜君
  'com.yengshine.proccd': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.yengshine.proccd.yearly", latest: "chxm1023" },  //ProCCD相机
  'com.palmmob.pdfios': { cm: 'sjbla', hx: 'hxpda', version: "124", id: "com.palmmob.pdfios.168", latest: "chxm1023" },  //图片PDF转换器
  'com.palmmob.scanner2ios': { cm: 'sjbla', hx: 'hxpda', version: "106", id: "com.palmmob.scanner2ios.396", latest: "chxm1023" },  //文字扫描
  'com.palmmob.officeios': { cm: 'sjbla', hx: 'hxpda', version: "168", id: "com.palmmob.officeios.188", latest: "chxm1023" },  //文档表格编辑
  'com.palmmob.recorder': { cm: 'sjbla', hx: 'hxpda', version: "145", id: "com.palmmob.recorder.198", latest: "chxm1023" },  //录音转文字
  'com.7color.newclean': { cm: 'sjbla', hx: 'hxpda', version: "2.2", id: "com.cleaner.salesyear", latest: "chxm1023" },  //手机清理
  'Habbit': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "HabitUpYearly", latest: "chxm1023" },  //习惯清单
  'com.dbmeterpro.dB-Meter-Free': { cm: 'sjbla', hx: 'hxpda', version: "301", id: "com.dbmeterpro.premiumModeSubscriptionWithTrial", latest: "chxm1023" },  //dBMeter-分贝仪(专业版)
  'com.vstudio.newpuzzle': { cm: 'sjbla', hx: 'hxpda', version: "2926", id: "com.vstudio.newpuzzle.yearlyVipFreetrail.15_99", latest: "chxm1023" },  //拼图酱
  'com.jianili.Booka': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "com.jianili.Booka.pro.yearly", latest: "chxm1023" },  //Booka-极简书房
  'com.ziheng.OneBox': { cm: 'sjblb', hx: 'hxpda', version: "8", id: "com.ziheng.OneBox", latest: "chxm1023" },  //Pandora管理订阅
  'ChickAlarmClock': { cm: 'sjbla', hx: 'hxpda', version: "1473", id: "com.ChickFocus.ChickFocus.yearly_2023_promo", latest: "chxm1023" },  //小鸡专注
  'MyWorks': { cm: 'sjbla', hx: 'hxpda', version: "3", id: "com.MyWorks.Handwritten.Year", latest: "chxm1023" },  //仿手写
  'Instant%20Saver': { cm: 'sjbla', hx: 'hxpda', version: "1.0", id: "com.pocket.compress.yearly", latest: "chxm1023" },  //InstantSocialSaver(ins下载)
  'SaveTik': { cm: 'sjbla', hx: 'hxpda', version: "1.0", id: "com.pocket.compress.yearly", latest: "chxm1023" },  //SaveTik
  '%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86%E5%99%A8': { cm: 'sjbla', hx: 'hxpda', version: "1.0", id: "com.mobislet.files.yearly", latest: "chxm1023" },  //文件管理器
  'ZIP%E5%8E%8B%E7%BC%A9%E8%A7%A3%E5%8E%8B%E7%BC%A9%E5%B7%A5%E5%85%B7': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "com.mobislet.zipfile.yearly", latest: "chxm1023" },  //ZIP压缩解压
  'TPTeleprompter': { cm: 'sjbla', hx: 'hxpda', version: "1.0", id: "com.pocket.compress.yearly", latest: "chxm1023" },  //爱提词
  'com.pocket.photo': { cm: 'sjbla', hx: 'hxpda', version: "2", id: "com.pocket.photo.yearly", latest: "chxm1023" },  //一寸证件照
  'com.pocket.watermark': { cm: 'sjbla', hx: 'hxpda', version: "8", id: "com.pocket.watermark.yearly", latest: "chxm1023" },  //一键水印
  'com.pocket.compress': { cm: 'sjbla', hx: 'hxpda', version: "1.0", id: "com.pocket.compress.yearly", latest: "chxm1023" },  //压缩软件
  'com.pocket.format': { cm: 'sjbla', hx: 'hxpda', version: "2.0.5", id: "com.pocket.format.yearly", latest: "chxm1023" },  //格式转换
  '%E8%AE%A1%E7%AE%97%E5%99%A8%20Air': { cm: 'sjbla', hx: 'hxpda', version: "3.22.0.1001", id: "co.airapps.calculator.year", latest: "chxm1023" },  //计算器Air
  'com.CalculatorForiPad.InternetRocks': { cm: 'sjbla', hx: 'hxpda', version: "3.22.0.1001", id: "co.airapps.calculator.year", latest: "chxm1023" },
  'co.airapps.translatorkeyboard': { cm: 'sjbla', hx: 'hxpda', version: "1.28.1.1001", id: "co.airapps.translatorkeyboard.yearly", latest: "chxm1023" },  //立即翻译-键盘
  'solutions.wzp.translator': { cm: 'sjbla', hx: 'hxpda', version: "6.5.0.1005", id: "solutions.wzp.translator.yearlysubscription", latest: "chxm1023" },  //立即翻译
  'solutions.wzp.translator': { cm: 'sjbla', hx: 'hxpda', version: "3.1.6.1", id: "solutions.wzp.translator.yearlysubscription", latest: "chxm1023" },  //QrScan扫描
  'com.internet-rocks.codescanner': { cm: 'sjbla', hx: 'hxpda', version: "5.14.0.1004", id: "co.airapps.qrscan.year", latest: "chxm1023" },  //二维码Air
  'solutions.wzp.translatephoto': { cm: 'sjbla', hx: 'hxpda', version: "3.12.0.1004", id: "co.airapps.traducam.yearly", latest: "chxm1023" },  //翻译照片
  'co.airapps.finderbot': { cm: 'sjbla', hx: 'hxpda', version: "2.15.0.1003", id: "co.airapps.finderbot.year", latest: "chxm1023" },  //FindAir
  'com.internet-rocks.colorando': { cm: 'sjbla', hx: 'hxpda', version: "3.10.0.1004", id: "com.colorando.yearly", latest: "chxm1023" },  //填色本Air
  'co.airapps.scannerapp': { cm: 'sjbla', hx: 'hxpda', version: "2.16.0.1003", id: "co.airapps.scannerapp.year", latest: "chxm1023" },  //ScannerAir
  'co.airapps.notes': { cm: 'sjbla', hx: 'hxpda', version: "1.6.0.1005", id: "co.airapps.notes.year", latest: "chxm1023" },  //笔记Air
  'co.airapps.steps': { cm: 'sjbla', hx: 'hxpda', version: "1.3.0.1002", id: "co.airapps.steps.year", latest: "chxm1023" },  //脚步Air
  'co.airapps.collage': { cm: 'sjbla', hx: 'hxpda', version: "1.6.0.1003", id: "co.airapps.collage.year", latest: "chxm1023" },  //拼贴画(照片拼图Air)
  'co.airapps.fasting': { cm: 'sjbla', hx: 'hxpda', version: "1.3.0.1002", id: "co.airapps.fasting.year", latest: "chxm1023" },  //饥饿(断食Air)
  'co.airapps.belingual': { cm: 'sjbla', hx: 'hxpda', version: "2.11.0.1002", id: "co.airapps.belingual.year", latest: "chxm1023" },  //BeLingual
  'co.airapps.widgetbot': { cm: 'sjbla', hx: 'hxpda', version: "2.7.0.1010", id: "co.airapps.widgetbot.yearly", latest: "chxm1023" },  //Widgetbot
  'co.airapps.weather': { cm: 'sjbla', hx: 'hxpda', version: "1.5.0.1002", id: "co.airapps.weather.year", latest: "chxm1023" },  //天气Air
  'co.airapps.debtsmanager': { cm: 'sjbla', hx: 'hxpda', version: "2.8.0.1002", id: "co.airapps.oweme.year", latest: "chxm1023" },  //OweMe
  'co.airapps.coloringbynumbers': { cm: 'sjbla', hx: 'hxpda', version: "2.3.0.1008", id: "co.airapps.pixit.year", latest: "chxm1023" },  //Pixit
  'co.airapps.waterreminder': { cm: 'sjbla', hx: 'hxpda', version: "2.12.0.1005", id: "co.airapps.waterreminder.yearly", latest: "chxm1023" },  //H2O喝水
  'co.airapps.fontbot': { cm: 'sjbla', hx: 'hxpda', version: "2.15.0.1001", id: "co.airapps.fontbot.year", latest: "chxm1023" },  //字体Air
  'co.airapps.speech': { cm: 'sjbla', hx: 'hxpda', version: "2.14.0.1001", id: "co.airapps.speechbot.yearly", latest: "chxm1023" },  //SpeechAir
  'co.airapps.habits': { cm: 'sjbla', hx: 'hxpda', version: "1.0.0.1069", id: "co.airapps.habits.year", latest: "chxm1023" },  //习惯Air
  'co.airapps.quotes': { cm: 'sjbla', hx: 'hxpda', version: "1.2.0.1005", id: "co.airapps.quotes.year", latest: "chxm1023" },  //QuotesAir
  'co.airapps.period': { cm: 'sjbla', hx: 'hxpda', version: "1.1.0.1002", id: "co.airapps.period.year", latest: "chxm1023" },  //循環(循环Air)
  'co.airapps.tasks': { cm: 'sjbla', hx: 'hxpda', version: "1.2.0.1005", id: "co.airapps.tasks.year", latest: "chxm1023" },  //任务Air
  'co.airapps.pdf': { cm: 'sjbla', hx: 'hxpda', version: "1.3.0.1007", id: "co.airapps.pdf.yearly", latest: "chxm1023" },  //PDFAir
  'co.airapps.stories': { cm: 'sjbla', hx: 'hxpda', version: "1.6.0.1003", id: "co.airapps.story.year_1", latest: "chxm1023" },  //StoryAir
  'co.airapps.journal': { cm: 'sjbla', hx: 'hxpda', version: "1.0.0.1007", id: "co.airapps.journal.year", latest: "chxm1023" },  //期刊Air
  'co.airapps.expenses': { cm: 'sjbla', hx: 'hxpda', version: "1.0.0.1022", id: "co.airapps.expenses.year", latest: "chxm1023" },  //用度Air
  'co.airapps.plants': { cm: 'sjbla', hx: 'hxpda', version: "1.4.0.1008", id: "co.airapps.plants.year", latest: "chxm1023" },  //植物Air
  'co.airapps.passwords': { cm: 'sjbla', hx: 'hxpda', version: "1.3.0.1004", id: "co.airapps.passwords.year", latest: "chxm1023" },  //密码Air
  'solutions.wzp.translator': { cm: 'sjbla', hx: 'hxpda', version: "3.1.6.1", id: "solutions.wzp.translator.yearlysubscription", latest: "chxm1023" },  //字典空气Air
  'co.airapps.fax': { cm: 'sjbla', hx: 'hxpda', version: "1.1.1.1003", id: "co.airapps.fax.yearly", latest: "chxm1023" },  //传真Air
  'co.airapps.graphics': { cm: 'sjbla', hx: 'hxpda', version: "1.1.0.3004", id: "co.airapps.graphics.yearly", latest: "chxm1023" },  //设计Air
  'co.airapps.calories': { cm: 'sjbla', hx: 'hxpda', version: "1.1.0.1003", id: "co.airapps.calories.yearly", latest: "chxm1023" },  //卡路里Air
  'SuperWidget': { cm: 'sjbla', hx: 'hxpda', version: "48", id: "com.focoslive", latest: "chxm1023" },  //PandaWidget小组件
  'Picsew': { cm: 'sjblb', hx: 'hxpdb', version: "3206", id: "com.sugarmo.ScrollClip.pro"},  //Picsew截长图3.9.4版本
  'vpn': { cm: 'sjbla', hx: 'hxpda', version: "443", id: "yearautorenew", latest: "chxm1023" },  //VPN-unlimited
  'TT': { cm: 'sjbla', hx: 'hxpda', version: "3.3.1", id: "com.55panda.hicalculator.year_sub", latest: "chxm1023" },  //TT_私密相册管家
  'Focos': { cm: 'sjbla', hx: 'hxpda', version: "6054", id: "com.focos.1w_t4_1w", latest: "chxm1023" },  //Focos
  'ProKnockOut': { cm: 'sjblb', hx: 'hxpda', version: "7", id: "com.knockout.SVIP.50off", latest: "chxm1023" },  //ProKnockOut
  'com.teadoku.flashnote': { cm: 'sjbla', hx: 'hxpda', version: "1", id: "pro_ios_ipad_mac", latest: "chxm1023" },  //AnkiNote
  'com.tapuniverse.texteditor': { cm: 'sjbla', hx: 'hxpda', version: "4", id: "com.tapuniverse.texteditor.w", latest: "chxm1023" }  //TextEditor
};

//核心内容处理
for (const i in list) {
  if (new RegExp(`^${i}`, `i`).test(ua) || new RegExp(`^${i}`, `i`).test(bundle_id)) {
  //内购数据
  var receiptdata = {  "quantity":"1", "purchase_date_ms":"1694250549000", "transaction_id":"490001314520000", "is_trial_period":"false", "original_transaction_id":"490001314520000", "purchase_date":"2023-09-09 09:09:09 Etc/GMT", "product_id":(list[i].id), "original_purchase_date_pst":"2023-09-09 02:09:10 America/Los_Angeles", "in_app_ownership_type":"PURCHASED", "original_purchase_date_ms":"1694250550000", "purchase_date_pst":"2023-09-09 02:09:09 America/Los_Angeles", "original_purchase_date":"2023-09-09 09:09:10 Etc/GMT"  };
  //识别数据，处理到期时间或永久，多重购买
  if (list[i].cm.indexOf('sjbla') != -1) {  sjbl = [Object.assign({}, receiptdata, {  "expires_date":"2099-09-09 09:09:09 Etc/GMT", "expires_date_pst":"2099-09-09 06:06:06 America/Los_Angeles", "is_in_intro_offer_period":"false", "web_order_line_item_id":"490000123456789", "expires_date_ms":"4092599349000",  })];} else if (list[i].cm.indexOf('sjblb') != -1) {  sjbl = [(receiptdata)];} else if (list[i].cm.indexOf('sjblc') != -1) {  sjbl = [];  } else if (list[i].cm.indexOf('sjbld') != -1) {  sjbl = [Object.assign({}, receiptdata, {  "product_id":(list[i].ids)}), Object.assign({}, receiptdata, {  "expires_date":"2099-09-09 09:09:09 Etc/GMT", "expires_date_pst":"2099-09-09 06:06:06 America/Los_Angeles", "is_in_intro_offer_period":"false", "web_order_line_item_id":"490000123456789", "expires_date_ms":"4092599349000", "product_id":(list[i].id)  })];}
  //常用数据核心(有到期时间)
  if (list[i].hx.indexOf('hxpda') != -1) {  chxm1023["receipt"]["in_app"] = (sjbl); chxm1023["latest_receipt_info"] = (sjbl); chxm1023["pending_renewal_info"] = [{  "product_id" : (list[i].id), "original_transaction_id" : "490001314520000", "auto_renew_product_id" : (list[i].id), "auto_renew_status" : "1"  }]; chxm1023["latest_receipt"] = (list[i].latest);  }
  //永久数据核心(无到期时间)
  if (list[i].hx.indexOf('hxpdb') != -1) {  chxm1023["receipt"]["in_app"] = (sjbl);  }
  //通用数据(可有可无)
  var commondata = {  "request_date": "2023-09-09 16:06:27 Etc/GMT", "request_date_pst": "2023-09-09 06:06:27 America/Los_Angeles", "request_date_ms": "1694273635000", "original_purchase_date": "2023-09-09 16:00:00 Etc/GMT", "original_purchase_date_pst": "2023-09-09 06:00:00 America/Los_Angeles", "original_purchase_date_ms": "1694273430000", "receipt_creation_date": "2023-09-09 16:06:26 Etc/GMT", "receipt_creation_date_pst": "2023-09-09 06:06:26 America/Los_Angeles", "receipt_creation_date_ms": "1694273634000", "original_application_version": list[i].version}; chxm1023["receipt"] = Object.assign({}, chxm1023["receipt"], commondata );
//判断是否需要加入版本号(可有可无)
  if(list[i] && list[i].version && list[i].version.trim() !== '') {  chxm1023["receipt"]["original_application_version"] = list[i].version;  }
  chxm1023["Telegram"] = "https://t.me/chxm1023";
  chxm1023["warning"] = "仅供学习，禁止转载或售卖";
  break;
  }
}

console.log('已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/chxm1023');

$done({body: JSON.stringify(chxm1023)});
