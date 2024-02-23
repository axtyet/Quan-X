/******************************************
 * @name 黑料不打烊
 * @channel https://t.me/yqc_123
 * @feedback https://t.me/yqc_777
 * @version 1.0.2
******************************************
## 更新日志

## 20231127

    1.重构代码, 使用cheerio模块 ➟ 使用缓存存储cheerio代码, 建议使用本脚本在备份Boxjs时去除cheerio__code的value值
    2.适配Surge通知, 过长截断点击对应链接跳转帖子, 点击通知横幅跳转热门页

### 20231023

    1.适配多种环境
    2.修复日期显示问题

## 脚本声明

    1.此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
    2.由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
    3.请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
    4.此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
    5.本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
    6.如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
    7.所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明, 本人保留随时更改或补充此声明的权利, 一旦您使用或复制了此脚本，即视为您已接受此免责声明。

## 使用方法

### 配置 (QuanX)

```properties
[task_local]
0 9,15 * * * https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/hlbdy.js, tag=黑料不打烊, img-url=https://raw.githubusercontent.com/Toperlock/Quantumult/main/icon/heiliao.png, enabled=true
```

### 配置 (Loon)

```properties
[Script]
cron "0 9,15 * * *" script-path=https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/hlbdy.js, timeout=10, tag=黑料不打烊, img-url=https://raw.githubusercontent.com/Toperlock/Quantumult/main/icon/heiliao.png
```

### 配置 (Surge)

```properties
黑料不打烊 = type=cron,cronexp=0 0 9,15 * * *,wake-system=1,script-path=https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/hlbdy.js,timeout=60
```

## 访问地址

    https://155.fun/

******************************************/
const $ = Env('黑料不打烊')
const MAX_MESSAGE_COUNT = 165
const NAV_URL = $.getdata('hlbdy_nav_url') || 'https://155.fun/'
!(async () => {
    const hlbdy = await Heiliao()
    console.log(`🔔正在使用${hlbdy.navUrl}进行域名访问`)
    const latestUrl = await hlbdy.getNewUrl()
    const hotList = await hlbdy.getHotList(latestUrl)
    const msg = chunkBySize(hotList.map((item) => `【${item.title}(${item.date})】\n${item.link}\n`).join('yuheng1203'))
    await SendNotify('黑料不打烊', '最新黑料', msg, { 'media-url': latestUrl + '/static/pc/icons/icon_512x512.820c9b.png?v=1', 'open-url': latestUrl })
})()
    .catch((e) => $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, ''))
    .finally(() => $.done())
/** 黑料对象 */
async function Heiliao() {
    const cheerio = await loadCheerio()
    return new (class {
        constructor() {
            this.load = cheerio.load
            this.navUrl = NAV_URL
        }
        async getNewUrl() {
            console.log(`⏳ 正在获取最新地址...`)
            try {
                const html = await Request(this.navUrl)
                const Query = this.load(html)
                const linkList = Query('.box-wrap a')
                    .map((i, el) => {
                        const link = Query(el).attr('href')
                        const title = Query(el).find('p').eq(0).text()
                        return { link, title }
                    })
                    .get()
                    .filter((item) => item.title.includes('线路'))
                console.log(`获取到最新地址: ${linkList[0].link}`)
                return linkList[0].link
            } catch (e) {
                throw new Error(`获取最新地址失败: ${e}`)
            }
        }
        async getHotList(url) {
            console.log(`⏳ 正在获取热门列表...`)
            try {
                const html = await Request(url)
                const Query = this.load(html)
                const list = Query('.cursor-pointer')
                    .map((i, el) => {
                        const title = Query(el).find('.title').text()
                        const status = Query(el).find('.ishot').text()
                        const link = url + Query(el).attr('href')
                        return { title, link, status }
                    })
                    .get()
                    .filter((item) => item.title && item.status === '热')
                /**
                 * 获取时间差
                 * @param {*} date YYYY/MM/DD
                 */
                const getDiff = (date) => {
                    const now = new Date().getTime()
                    const target = new Date(date).getTime()
                    const diff = Math.floor((now - target) / 1000 / 60 / 60 / 24)
                    return diff
                }
                const result = await Promise.all(
                    list.map(async (item) => {
                        const date = await this.getPublishDate(item.link)
                        const diff = getDiff(date)
                        return { ...item, date, diff }
                    })
                )
                let minDiff = Infinity // 取最小值
                const hotList = []
                for (const item of result) {
                    if (item.diff < minDiff) {
                        minDiff = item.diff
                        hotList.length = 0
                    }
                    if (item.diff === minDiff) {
                        hotList.push(item)
                    }
                }
                console.log(`获取到热门列表: ${JSON.stringify(hotList, null, 2)}`)
                return hotList
            } catch (e) {
                throw new Error(`获取热门列表失败: ${e}`)
            }
        }
        async getPublishDate(url) {
            console.log(`⏳ 正在获取发布时间...`)
            try {
                const html = await Request(url)
                const Query = this.load(html)
                const date = Query('.detail-date .detail-txt').text().split('•')[1].replace(/年/, '/').replace(/月/, '/').replace(/日/, '').trim()
                console.log(`获取到发布时间: ${date}`)
                return date
            } catch (e) {
                throw new Error(`获取发布时间失败: ${e}`)
            }
        }
    })()
}
/** 加载cheerio模块 */
async function loadCheerio() {
    let code = $.getdata('cheerio__code')
    if (code && Object.keys(code).length) {
        console.log(`✅ 黑料不打烊: 缓存中存在cheerio代码, 跳过下载`)
        eval(code)
        return createCheerio()
    }
    console.log(`🚀 黑料不打烊: 开始下载cheerio代码`)
    return new Promise(async (resolve) => {
        $.getScript('https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/cheerio.js')
            .then((fn) => {
                $.setdata(fn, 'cheerio__code')
                eval(fn)
                const cheerio = createCheerio()
                console.log(`✅ 黑料不打烊: cheerio加载成功, 请继续`)
                resolve(cheerio)
            })
            .catch((e) => {
                console.log(`❌ 黑料不打烊: cheerio加载失败, 原因: ${e || '网络开小差了'}`)
                resolve('')
            })
    })
}
/**
 * 按照指定大小分割数组
 * @param {*} arr 数组
 * @param {*} size 分割总字数
 * @returns
 */
function chunkBySize(arr, size = MAX_MESSAGE_COUNT) {
    arr = typeof arr === 'string' ? arr.split('yuheng1203') : arr
    const resultText = `\n=======👉点击通知查看更多👈=======\n`
    let message = []
    if ($.isNode()) {
        message = arr.join('\n').replace(/\n$/, '')
    } else {
        for (const item of arr) {
            if (message.join('\n').length >= size) {
                break
            }
            message.push(item)
        }
        message = `${message.join('\n')}${resultText}`
    }
    return message
}
/**
 * 网络请求的二次封装
 */
function Request(t) {
    t = typeof t === 'string' ? { url: t } : t
    const e = t.hasOwnProperty('method') ? t.method.toLocaleLowerCase() : 'get'
    if ($.isNode() && ((t.hasOwnProperty('use_proxy') && t.use_proxy) || t.use_proxy === undefined)) {
        const e = require('tunnel'),
            o = { https: e.httpsOverHttp({ proxy: { host: '127.0.0.1', port: 7890 } }) }
        Object.assign(t, { agent: o })
    }
    return new Promise((o, r) => {
        $.http[e](t)
            .then((t) => {
                let body = t.body
                try {
                    body = JSON.parse(body)
                } catch (e) {}
                o(body)
            })
            .catch((t) => r(t))
    })
}
/**
 * 对通知的再封装(可适配青龙针对多端通知)
 */
async function SendNotify(n, o = '', i = '', t = {}) {
    const e = 'undefined' != typeof $app && 'undefined' != typeof $http,
        s = t['open-url'],
        f = t['media-url']
    if (($.isQuanX() && $notify(n, o, i, t), $.isSurge())) {
        const t = f ? `${i}\n多媒体:${f}` : i
        $notification.post(n, o, t, { url: s })
    }
    if ($.isLoon()) {
        const t = {}
        s && (t.openUrl = s), f && (t.mediaUrl = f), '{}' === JSON.stringify(t) ? $notification.post(n, o, i) : $notification.post(n, o, i, t)
    }
    const c = `${i}${s ? `\n点击跳转: ${s}` : ''}${f ? `\n多媒体: ${f}` : ''}`
    if (e) {
        const i = require('push')
        i.schedule({ title: n, body: `${o ? `${o}\n` : ''}${c}` })
    }
    if ($.isNode())
        try {
            const i = require('../sendNotify')
            await i.sendNotify(`${n}\n${o}`, c)
        } catch (n) {
            console.log('没有找到sendNotify.js文件')
        }
    console.log(`${n}\n${o}\n${c}\n\n`)
}
// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
