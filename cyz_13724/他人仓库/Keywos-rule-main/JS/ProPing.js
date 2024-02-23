/*
#!name=Ping CN CF 二合一面板
#!desc=根据网络延迟生成柱状图
#!system=ios

[Script]
# 如果一行放不下了可以把参数 num=7 改成6或者更小
ProPing = type=generic,timeout=6,script-path=https://raw.githubusercontent.com/Keywos/rule/main/JS/ProPing.js,argument=color=#80A0BF&icon=barometer&num=7

[Panel]
ProPing = script-name=ProPing,update-interval=120
*/
const cnurl = "http://connectivitycheck.platform.hicloud.com/generate_204";
const cfurl = "http://cp.cloudflare.com/generate_204";
let num = "7",
  icons = "barometer",
  icolor = "#80A0BF",
  repin = 0;
if (typeof $argument !== "undefined" && $argument !== "") {
  const ins = getin("$argument");
  num = ins.num || num;
  icons = ins.icon || icons;
  icolor = ins.color || icolor;
}
(async () => {
  try {
    let cn = [], cf = [], d, e;
    while (repin < 2) {
      const u = await http(cnurl);
      const k = parseFloat(u);
      cn.push(k);

      const eValue = await http(cfurl);
      const n = parseFloat(eValue);
      cf.push(n);
      repin++;
    }
	if ( repin === 2 ){
		d = Math.floor((cn[0] + cn[1]) / 2);
		e = Math.floor((cf[0] + cf[1]) / 2);
	} else {
		d = cn[0];
		e = cf[0];
	}
    const n = saK(d, e);
    const od = ptoG(n["CN"]);
    const op = ptoG(n["CF"]);
    $done({
      title: `CF: ${e}  ➟     CN: ${d}`,
      content: op + " " + od,
      icon: icons,
      "icon-color": icolor,
    });
  } catch (i) {
    const err = "Feedback @𝙺𝚎𝚢 !! ";
    console.log(err + i.message);
    $done({ title: err, content: i.message });
  }
})().finally(() => $done());

function saK(d, t) {
  let k;
  try {
    k = JSON.parse($persistentStore.read("KEY_ProPing")) || {};
  } catch (error) {
    k = {};
  }
  k["CN"] = (k["CN"] || getArr(1, 5)).concat(d).slice(-num);
  k["CF"] = (k["CF"] || getArr(30, 5)).concat(t).slice(-num);
  $persistentStore.write(JSON.stringify(k), "KEY_ProPing");
  return k;
}
function getin() {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((i) => i.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
function getArr(x, l) {
  return Array(l).fill(x);
}
async function http(url) {
  return new Promise((resolve, reject) => {
    let e = Date.now();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        repin++;
        reject("");
        resolve("2e3");
      }, 1900);
    });
    const reqPromise = new Promise((resolve) => {
      $httpClient.get(url, resolve);
    });
    Promise.race([reqPromise, timeoutPromise])
      .then((i) => {
        resolve(Date.now() - e);
      })
      .catch((error) => {
        reject(error);
        resolve("1e4");
      });
  });
}
function ptoG(t) {
  const e = 10;
  let n;
  n = Math.max(...t);
  let o = n;
  if (n < 70) {
    o += 200;
  } else if (n < 150) {
    o += 150;
  } else if (n < 250) {
    o += 100;
  } else if (n < 400) {
    o += 2;
  } else {
    o = 410;
  }
  const r = t
    .map((t) => {
      let n = (t - e) / (o - e);
      if (n > 1) {
        n = 1;
      }
      const r = Math.floor(n * 6) + 9601;
      if (r > 9607) {
        return "▇";
      } else if (r < 9601) {
        return "▁";
      } else {
        return String.fromCharCode(r);
      }
    })
    .join("");
  return r;
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
