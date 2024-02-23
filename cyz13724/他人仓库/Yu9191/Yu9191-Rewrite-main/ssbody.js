/*
脚本功能：解锁螃蟹
Thanks@PayNe@onz3v

[rewrite_local]
^http[s]?:\/\/api\.x-storm\.com(:\d{2,5})?\/app/.+$ url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/ssHeader.js
^http[s]?:\/\/api\.x-storm\.com(:\d{2,5})?\/app/user-profile\/$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/ssbody.js

[mitm]
hostname = *.x-storm.com

*/
let Buffer
    , xxtea = new XXTEA()
    , prefix = `29hgfhdfv78344`
    , $ = new Env("stormSniffer")
    , key = $.getdata('storm_sniffer_uid'),
    { body } = $response,
    obj = JSON.parse(body);
!$.isNode & (Buffer = createBufferClass());
if (obj?.data) {
    let decryptData = JSON.parse(stormDecrypt(obj.data, key));
    obj.data = stormEncrypt(JSON.stringify({
        ...decryptData,
        isVip: 1,
        member_type: 1,
        member_title: "超级加倍专属版",
        expire_on: "牛逼克拉斯",
        is_primary: 1,
        auth_quantity: 99,
        auth_mail: 'ChaoJi2@jiabei.com',
        function_list: [1, 2, 3, 4, 5]
    }), key)
    $.done({ body: JSON.stringify(obj) })
} else {
    $.done({ body })
}
/*********************************** 螃蟹加解密@Payne *************************************/
function stormEncrypt(data, uid) { return new Buffer(xxtea.encrypt(xxtea.toBytes(data), xxtea.toBytes(prefix + uid))).toBase64() }
function stormDecrypt(data, uid) { return xxtea.toString(xxtea.decrypt(data, xxtea.toBytes(prefix + uid))) }
/*********************************** Quantumult X Buffer(Part) *************************************/
function createBufferClass() { class Buffer { constructor(arg) { if ("number" == typeof arg) this.length = arg; else if ("string" == typeof arg) { const array = new Uint8Array(atob(arg).split("").map(c => c.charCodeAt(0))); this.length = array.length; for (let i = 0; i < this.length; i++)this[i] = array[i] } else if (Array.isArray(arg)) { this.length = arg.length; for (let i = 0; i < this.length; i++)this[i] = arg[i] } else if (ArrayBuffer.isView(arg)) { this.length = arg.byteLength; const sourceArray = new Uint8Array(arg.buffer, arg.byteOffset, this.length); for (let i = 0; i < this.length; i++)this[i] = sourceArray[i] } else { if (!(arg instanceof ArrayBuffer)) throw new TypeError("Unsupported data type"); { this.length = arg.byteLength; const sourceArray = new Uint8Array(arg); for (let i = 0; i < this.length; i++)this[i] = sourceArray[i] } } } static from(arg) { return new Buffer(arg) } static fromBase64(base64String) { const array = new Uint8Array(atob(base64String).split("").map(c => c.charCodeAt(0))); return new Buffer(array) } toBase64() { let binary = ""; for (let i = 0; i < this.length; i++)binary += String.fromCharCode(this[i]); return btoa(binary) } } return Buffer }
/*********************************** XXTEA@MaBingyao *************************************/
function XXTEA() { this.delta = 2654435769, this.toUint8Array = (v, includeLength) => { var length = v.length, n = length << 2; if (includeLength) { var m = v[length - 1]; if (m < (n -= 4) - 3 || m > n) return null; n = m } for (var bytes = new Uint8Array(n), i = 0; i < n; ++i)bytes[i] = v[i >> 2] >> ((3 & i) << 3); return bytes }, this.toUint32Array = (bytes, includeLength) => { var length = bytes.length, n = length >> 2, v; 0 != (3 & length) && ++n, includeLength ? (v = new Uint32Array(n + 1))[n] = length : v = new Uint32Array(n); for (var i = 0; i < length; ++i)v[i >> 2] |= bytes[i] << ((3 & i) << 3); return v }, this.mx = (sum, y, z, p, e, k) => (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[3 & p ^ e] ^ z), this.fixk = k => { if (k.length < 16) { var key = new Uint8Array(16); key.set(k), k = key } return k }, this.encryptUint32Array = (v, k) => { var length = v.length, n = length - 1, y, z, sum, e, p, q; for (z = v[n], sum = 0, q = 0 | Math.floor(6 + 52 / length); q > 0; --q) { for (e = (sum += this.delta) >>> 2 & 3, p = 0; p < n; ++p)y = v[p + 1], z = v[p] += this.mx(sum, y, z, p, e, k); y = v[0], z = v[n] += this.mx(sum, y, z, p, e, k) } return v }, this.decryptUint32Array = (v, k) => { var length = v.length, n = length - 1, y, z, sum, e, p, q; for (y = v[0], sum = (q = Math.floor(6 + 52 / length)) * this.delta; 0 !== sum; sum -= this.delta) { for (e = sum >>> 2 & 3, p = n; p > 0; --p)z = v[p - 1], y = v[p] -= this.mx(sum, y, z, p, e, k); z = v[n], y = v[0] -= this.mx(sum, y, z, p, e, k) } return v }, this.toBytes = str => { for (var n = str.length, bytes = new Uint8Array(3 * n), length = 0, i = 0; i < n; i++) { var codeUnit = str.charCodeAt(i); if (codeUnit < 128) bytes[length++] = codeUnit; else if (codeUnit < 2048) bytes[length++] = 192 | codeUnit >> 6, bytes[length++] = 128 | 63 & codeUnit; else { if (!(codeUnit < 55296 || codeUnit > 57343)) { if (i + 1 < n) { var nextCodeUnit = str.charCodeAt(i + 1); if (codeUnit < 56320 && 56320 <= nextCodeUnit && nextCodeUnit <= 57343) { var rune = 65536 + ((1023 & codeUnit) << 10 | 1023 & nextCodeUnit); bytes[length++] = 240 | rune >> 18, bytes[length++] = 128 | rune >> 12 & 63, bytes[length++] = 128 | rune >> 6 & 63, bytes[length++] = 128 | 63 & rune, i++; continue } } throw new Error("Malformed string") } bytes[length++] = 224 | codeUnit >> 12, bytes[length++] = 128 | codeUnit >> 6 & 63, bytes[length++] = 128 | 63 & codeUnit } } return bytes.subarray(0, length) }, this.toShortString = (bytes, n) => { for (var charCodes = new Uint16Array(n), i = 0, off = 0, len = bytes.length; i < n && off < len; i++) { var unit = bytes[off++]; switch (unit >> 4) { case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: charCodes[i] = unit; break; case 12: case 13: if (!(off < len)) throw new Error("Unfinished UTF-8 octet sequence"); charCodes[i] = (31 & unit) << 6 | 63 & bytes[off++]; break; case 14: if (!(off + 1 < len)) throw new Error("Unfinished UTF-8 octet sequence"); charCodes[i] = (15 & unit) << 12 | (63 & bytes[off++]) << 6 | 63 & bytes[off++]; break; case 15: if (!(off + 2 < len)) throw new Error("Unfinished UTF-8 octet sequence"); var rune = ((7 & unit) << 18 | (63 & bytes[off++]) << 12 | (63 & bytes[off++]) << 6 | 63 & bytes[off++]) - 65536; if (!(0 <= rune && rune <= 1048575)) throw new Error("Character outside valid Unicode range: 0x" + rune.toString(16)); charCodes[i++] = rune >> 10 & 1023 | 55296, charCodes[i] = 1023 & rune | 56320; break; default: throw new Error("Bad UTF-8 encoding 0x" + unit.toString(16)) } } return i < n && (charCodes = charCodes.subarray(0, i)), String.fromCharCode.apply(String, charCodes) }, this.toLongString = (bytes, n) => { for (var buf = [], charCodes = new Uint16Array(32768), i = 0, off = 0, len = bytes.length; i < n && off < len; i++) { var unit = bytes[off++]; switch (unit >> 4) { case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: charCodes[i] = unit; break; case 12: case 13: if (!(off < len)) throw new Error("Unfinished UTF-8 octet sequence"); charCodes[i] = (31 & unit) << 6 | 63 & bytes[off++]; break; case 14: if (!(off + 1 < len)) throw new Error("Unfinished UTF-8 octet sequence"); charCodes[i] = (15 & unit) << 12 | (63 & bytes[off++]) << 6 | 63 & bytes[off++]; break; case 15: if (!(off + 2 < len)) throw new Error("Unfinished UTF-8 octet sequence"); var rune = ((7 & unit) << 18 | (63 & bytes[off++]) << 12 | (63 & bytes[off++]) << 6 | 63 & bytes[off++]) - 65536; if (!(0 <= rune && rune <= 1048575)) throw new Error("Character outside valid Unicode range: 0x" + rune.toString(16)); charCodes[i++] = rune >> 10 & 1023 | 55296, charCodes[i] = 1023 & rune | 56320; break; default: throw new Error("Bad UTF-8 encoding 0x" + unit.toString(16)) }if (i >= 32766) { var size = i + 1; buf.push(String.fromCharCode.apply(String, charCodes.subarray(0, size))), n -= size, i = -1 } } return i > 0 && buf.push(String.fromCharCode.apply(String, charCodes.subarray(0, i))), buf.join("") }, this.toString = bytes => { var n = bytes.length; return 0 === n ? "" : n < 32767 ? this.toShortString(bytes, n) : this.toLongString(bytes, n) }, this.encrypt = (data, key) => ("string" == typeof data && (data = this.toBytes(data)), "string" == typeof key && (key = this.toBytes(key)), null == data || 0 === data.length ? data : this.toUint8Array(this.encryptUint32Array(this.toUint32Array(data, !0), this.toUint32Array(this.fixk(key), !1)), !1)), this.encryptToString = (data, key) => new Buffer(this.encrypt(data, key)).toBase64(), this.decrypt = (data, key) => ("string" == typeof data && (data = new Buffer(data, "base64")), "string" == typeof key && (key = this.toBytes(key)), null == data || 0 === data.length ? data : this.toUint8Array(this.decryptUint32Array(this.toUint32Array(data, !1), this.toUint32Array(this.fixk(key), !1)), !0)), this.decryptToString = (data, key) => (console.log(this.decrypt(data, key)), this.toString(this.decrypt(data, key))) }
/*********************************** Env@chavyleung *************************************/
function Env(name, opts) { class Http { constructor(env) { this.env = env } send(opts, method = "GET") { opts = "string" == typeof opts ? { url: opts } : opts; let sender = this.get; return "POST" === method && (sender = this.post), new Promise((resolve, reject) => { sender.call(this, opts, (err, resp, body) => { err ? reject(err) : resolve(resp) }) }) } get(opts) { return this.send.call(this.env, opts) } post(opts) { return this.send.call(this.env, opts, "POST") } } return new class { constructor(name, opts) { this.name = name, this.http = new Http(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, opts), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(str, defaultValue = null) { try { return JSON.parse(str) } catch { return defaultValue } } toStr(obj, defaultValue = null) { try { return JSON.stringify(obj) } catch { return defaultValue } } getjson(key, defaultValue) { let json = defaultValue; const val = this.getdata(key); if (val) try { json = JSON.parse(this.getdata(key)) } catch { } return json } setjson(val, key) { try { return this.setdata(JSON.stringify(val), key) } catch { return !1 } } getScript(url) { return new Promise(resolve => { this.get({ url: url }, (err, resp, body) => resolve(body)) }) } runScript(script, runOpts) { return new Promise(resolve => { let httpapi = this.getdata("@chavy_boxjs_userCfgs.httpapi"); httpapi = httpapi ? httpapi.replace(/\n/g, "").trim() : httpapi; let httpapi_timeout = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); httpapi_timeout = httpapi_timeout ? 1 * httpapi_timeout : 20, httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout; const [key, addr] = httpapi.split("@"), opts = { url: `http://${addr}/v1/scripting/evaluate`, body: { script_text: script, mock_type: "cron", timeout: httpapi_timeout }, headers: { "X-Key": key, Accept: "*/*" }, timeout: httpapi_timeout }; this.post(opts, (err, resp, body) => resolve(body)) }).catch(e => this.logErr(e)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const curDirDataFilePath = this.path.resolve(this.dataFile), rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile), isCurDirDataFile = this.fs.existsSync(curDirDataFilePath), isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath); if (!isCurDirDataFile && !isRootDirDataFile) return {}; { const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath; try { return JSON.parse(this.fs.readFileSync(datPath)) } catch (e) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const curDirDataFilePath = this.path.resolve(this.dataFile), rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile), isCurDirDataFile = this.fs.existsSync(curDirDataFilePath), isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath), jsondata = JSON.stringify(this.data); isCurDirDataFile ? this.fs.writeFileSync(curDirDataFilePath, jsondata) : isRootDirDataFile ? this.fs.writeFileSync(rootDirDataFilePath, jsondata) : this.fs.writeFileSync(curDirDataFilePath, jsondata) } } lodash_get(source, path, defaultValue) { const paths = path.replace(/\[(\d+)\]/g, ".$1").split("."); let result = source; for (const p of paths) if (result = Object(result)[p], void 0 === result) return defaultValue; return result } lodash_set(obj, path, value) { return Object(obj) !== obj ? obj : (Array.isArray(path) || (path = path.toString().match(/[^.[\]]+/g) || []), path.slice(0, -1).reduce((a, c, i) => Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 == +path[i + 1] ? [] : {}, obj)[path[path.length - 1]] = value, obj) } getdata(key) { let val = this.getval(key); if (/^@/.test(key)) { const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key), objval = objkey ? this.getval(objkey) : ""; if (objval) try { const objedval = JSON.parse(objval); val = objedval ? this.lodash_get(objedval, paths, "") : val } catch (e) { val = "" } } return val } setdata(val, key) { let issuc = !1; if (/^@/.test(key)) { const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key), objdat = this.getval(objkey), objval = objkey ? "null" === objdat ? null : objdat || "{}" : "{}"; try { const objedval = JSON.parse(objval); this.lodash_set(objedval, paths, val), issuc = this.setval(JSON.stringify(objedval), objkey) } catch (e) { const objedval = {}; this.lodash_set(objedval, paths, val), issuc = this.setval(JSON.stringify(objedval), objkey) } } else issuc = this.setval(val, key); return issuc } getval(key) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(key); case "Quantumult X": return $prefs.valueForKey(key); case "Node.js": return this.data = this.loaddata(), this.data[key]; default: return this.data && this.data[key] || null } } setval(val, key) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(val, key); case "Quantumult X": return $prefs.setValueForKey(val, key); case "Node.js": return this.data = this.loaddata(), this.data[key] = val, this.writedata(), !0; default: return this.data && this.data[key] || null } } initGotEnv(opts) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, opts && (opts.headers = opts.headers ? opts.headers : {}, void 0 === opts.headers.Cookie && void 0 === opts.cookieJar && (opts.cookieJar = this.ckjar)) } get(request, callback = (() => { })) { switch (request.headers && (delete request.headers["Content-Type"], delete request.headers["Content-Length"], delete request.headers["content-type"], delete request.headers["content-length"]), request.params && (request.url += "?" + this.queryStr(request.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (request.headers = request.headers || {}, Object.assign(request.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(request, (err, resp, body) => { !err && resp && (resp.body = body, resp.statusCode = resp.status ? resp.status : resp.statusCode, resp.status = resp.statusCode), callback(err, resp, body) }); break; case "Quantumult X": this.isNeedRewrite && (request.opts = request.opts || {}, Object.assign(request.opts, { hints: !1 })), $task.fetch(request).then(resp => { const { statusCode: status, statusCode: statusCode, headers: headers, body: body, bodyBytes: bodyBytes } = resp; callback(null, { status: status, statusCode: statusCode, headers: headers, body: body, bodyBytes: bodyBytes }, body, bodyBytes) }, err => callback(err && err.error || "UndefinedError")); break; case "Node.js": let iconv = require("iconv-lite"); this.initGotEnv(request), this.got(request).on("redirect", (resp, nextOpts) => { try { if (resp.headers["set-cookie"]) { const ck = resp.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); ck && this.ckjar.setCookieSync(ck, null), nextOpts.cookieJar = this.ckjar } } catch (e) { this.logErr(e) } }).then(resp => { const { statusCode: status, statusCode: statusCode, headers: headers, rawBody: rawBody } = resp, body = iconv.decode(rawBody, this.encoding); callback(null, { status: status, statusCode: statusCode, headers: headers, rawBody: rawBody, body: body }, body) }, err => { const { message: error, response: resp } = err; callback(error, resp, resp && iconv.decode(resp.rawBody, this.encoding)) }) } } post(request, callback = (() => { })) { const method = request.method ? request.method.toLocaleLowerCase() : "post"; switch (request.body && request.headers && !request.headers["Content-Type"] && !request.headers["content-type"] && (request.headers["content-type"] = "application/x-www-form-urlencoded"), request.headers && (delete request.headers["Content-Length"], delete request.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (request.headers = request.headers || {}, Object.assign(request.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[method](request, (err, resp, body) => { !err && resp && (resp.body = body, resp.statusCode = resp.status ? resp.status : resp.statusCode, resp.status = resp.statusCode), callback(err, resp, body) }); break; case "Quantumult X": request.method = method, this.isNeedRewrite && (request.opts = request.opts || {}, Object.assign(request.opts, { hints: !1 })), $task.fetch(request).then(resp => { const { statusCode: status, statusCode: statusCode, headers: headers, body: body, bodyBytes: bodyBytes } = resp; callback(null, { status: status, statusCode: statusCode, headers: headers, body: body, bodyBytes: bodyBytes }, body, bodyBytes) }, err => callback(err && err.error || "UndefinedError")); break; case "Node.js": let iconv = require("iconv-lite"); this.initGotEnv(request); const { url: url, ..._request } = request; this.got[method](url, _request).then(resp => { const { statusCode: status, statusCode: statusCode, headers: headers, rawBody: rawBody } = resp, body = iconv.decode(rawBody, this.encoding); callback(null, { status: status, statusCode: statusCode, headers: headers, rawBody: rawBody, body: body }, body) }, err => { const { message: error, response: resp } = err; callback(error, resp, resp && iconv.decode(resp.rawBody, this.encoding)) }) } } time(fmt, ts = null) { const date = ts ? new Date(ts) : new Date; let o = { "M+": date.getMonth() + 1, "d+": date.getDate(), "H+": date.getHours(), "m+": date.getMinutes(), "s+": date.getSeconds(), "q+": Math.floor((date.getMonth() + 3) / 3), S: date.getMilliseconds() }; /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let k in o) new RegExp("(" + k + ")").test(fmt) && (fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))); return fmt } queryStr(options) { let queryString = ""; for (const key in options) { let value = options[key]; null != value && "" !== value && ("object" == typeof value && (value = JSON.stringify(value)), queryString += `${key}=${value}&`) } return queryString = queryString.substring(0, queryString.length - 1), queryString } msg(title = name, subt = "", desc = "", opts) { const toEnvOpts = rawopts => { switch (typeof rawopts) { case void 0: return rawopts; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: rawopts }; case "Loon": case "Shadowrocket": return rawopts; case "Quantumult X": return { "open-url": rawopts }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let openUrl; return { url: rawopts.url || rawopts.openUrl || rawopts["open-url"] } } case "Loon": { let openUrl, mediaUrl; return { openUrl: rawopts.openUrl || rawopts.url || rawopts["open-url"], mediaUrl: rawopts.mediaUrl || rawopts["media-url"] } } case "Quantumult X": { let openUrl, mediaUrl, updatePasteboard; return { "open-url": rawopts["open-url"] || rawopts.url || rawopts.openUrl, "media-url": rawopts["media-url"] || rawopts.mediaUrl, "update-pasteboard": rawopts["update-pasteboard"] || rawopts.updatePasteboard } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(title, subt, desc, toEnvOpts(opts)); break; case "Quantumult X": $notify(title, subt, desc, toEnvOpts(opts)); break; case "Node.js": }if (!this.isMuteLog) { let logs = ["", "==============📣系统通知📣=============="]; logs.push(title), subt && logs.push(subt), desc && logs.push(desc), console.log(logs.join("\n")), this.logs = this.logs.concat(logs) } } notify(title = name, subtitle = "", content = "", options = {}) { const openURL = options["open-url"], mediaURL = options["media-url"]; if (this.isQuanX() && $notify(title, subtitle, content, options), this.isSurge() && $notification.post(title, subtitle, content + `${mediaURL ? "\n多媒体:" + mediaURL : ""}`, { url: openURL }), this.isLoon()) { let opts = {}; openURL && (opts.openUrl = openURL), mediaURL && (opts.mediaUrl = mediaURL), "{}" === JSON.stringify(opts) ? $notification.post(title, subtitle, content) : $notification.post(title, subtitle, content, opts) } if (this.isJSBox()) { const content_ = content + (openURL ? `\n点击跳转: ${openURL}` : "") + (mediaURL ? `\n多媒体: ${mediaURL}` : ""), push = require("push"); push.schedule({ title: title, body: (subtitle ? subtitle + "\n" : "") + content_ }) } if (!this.isMuteLog) { let logs = ["", "==============📣系统通知📣=============="]; logs.push(title), subtitle && logs.push(subtitle), content && logs.push(content + (openURL ? `\n点击跳转: ${openURL}` : "") + (mediaURL ? `\n多媒体: ${mediaURL}` : "")), console.log(logs.join("\n")), this.logs = this.logs.concat(logs) } } log(...logs) { logs.length > 0 && (this.logs = [...this.logs, ...logs]), console.log(logs.join(this.logSeparator)) } logErr(err, msg) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, err); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, err.stack) } } wait(time) { return new Promise(resolve => setTimeout(resolve, time)) } done(val = {}) { const endTime = (new Date).getTime(), costTime = (endTime - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${costTime} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(val); break; case "Node.js": process.exit(1) } } }(name, opts) }











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
