/*
加密来源 @PayNe
[rewrite_local]
^https?:\/\/api\.x-storm\.com\/app\/user-profile\/$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/sniffer.js

[mitm]
hostname = *.x-storm.com

*/

const l={DELTA:2654435769,base64EncodeChars:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),btoa(e){let t,n,o,r,F,i,c;for(n=o=0,r=e.length,F=r%3,r=r-F,i=r/3<<2,F>0&&(i+=4),t=new Array(i);n<r;)c=e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<8|e.charCodeAt(n++),t[o++]=l.base64EncodeChars[c>>18]+l.base64EncodeChars[c>>12&63]+l.base64EncodeChars[c>>6&63]+l.base64EncodeChars[c&63];return F===1?(c=e.charCodeAt(n++),t[o++]=`${l.base64EncodeChars[c>>2]+l.base64EncodeChars[(c&3)<<4]}==`):F===2&&(c=e.charCodeAt(n++)<<8|e.charCodeAt(n++),t[o++]=`${l.base64EncodeChars[c>>10]+l.base64EncodeChars[c>>4&63]+l.base64EncodeChars[(c&15)<<2]}=`),t.join("")},toBinaryString(e,t){const n=e.length;let o=n<<2;if(t){const F=e[n-1];if(o-=4,F<o-3||F>o)return null;o=F}for(let F=0;F<n;F++)e[F]=String.fromCharCode(e[F]&255,e[F]>>>8&255,e[F]>>>16&255,e[F]>>>24&255);const r=e.join("");return t?r.substring(0,o):r},toUint32Array(e,t){const n=e.length;let o=n>>2;n&3&&++o;let r;t?(r=new Array(o+1),r[o]=n):r=new Array(o);for(let F=0;F<n;++F)r[F>>2]|=e.charCodeAt(F)<<((F&3)<<3);return r},int32(e){return e&4294967295},mx(e,t,n,o,r,F){return(n>>>5^t<<2)+(t>>>3^n<<4)^(e^t)+(F[o&3^r]^n)},fixk(e){return e.length<4&&(e.length=4),e},encryptUint32Array(e,t){const n=e.length,o=n-1;let r,F,i,c,a,s;for(F=e[o],i=0,s=Math.floor(6+52/n)|0;s>0;--s){for(i=l.int32(i+l.DELTA),c=i>>>2&3,a=0;a<o;++a)r=e[a+1],F=e[a]=l.int32(e[a]+l.mx(i,r,F,a,c,t));r=e[0],F=e[o]=l.int32(e[o]+l.mx(i,r,F,o,c,t))}return e},utf8Encode(e){if(/^[\x00-\x7F]*$/.test(e))return e;const t=[],n=e.length;for(let o=0,r=0;o<n;++o,++r){const F=e.charCodeAt(o);if(F<128)t[r]=e.charAt(o);else if(F<2048)t[r]=String.fromCharCode(192|F>>6,128|F&63);else if(F<55296||F>57343)t[r]=String.fromCharCode(224|F>>12,128|F>>6&63,128|F&63);else{if(o+1<n){const i=e.charCodeAt(o+1);if(F<56320&&i>=56320&&i<=57343){const c=((F&1023)<<10|i&1023)+65536;t[r]=String.fromCharCode(240|c>>18&63,128|c>>12&63,128|c>>6&63,128|c&63),++o;continue}}throw new Error("Malformed string")}}return t.join("")},encrypt(e,t){return e==null||e.length===0?e:(e=l.utf8Encode(e),t=l.utf8Encode(t),l.toBinaryString(l.encryptUint32Array(l.toUint32Array(e,!0),l.fixk(l.toUint32Array(t,!1))),!1))}};

let url = $request.url;
let headers = $request.headers;
if (url == 'https://api.x-storm.com/app/user-profile/') {
  var uid = headers["uid"];
  var time = headers["t"];
  var str = `{"uid": "${uid}", "userID": 10086, "isVip": 1, "member_type": 2, "member_title": "\u0062\u0061\u0062\u0079\u0040\u0069\u006f\u0073\u0031\u0035\u0031", "expire_on": "\u0062\u0061\u0062\u0079", 
            "auth_quantity": 9999999, "auth_mail": "Baby@love.com", "is_primary": 0, "trail_status": 0, "function_list": [1, 2, 3, 4, 5], "can_deauthorize": true, 
            "timestamp": ${time}, "ts": 1}`;
  var key = '29hgfhdfv78344' + uid;
  var data = l.btoa(l.encrypt(str, key));
  var body = '{"code":200,"data":"' + data + '","msg":"success","status":"success"}';
}
$done({ body });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
