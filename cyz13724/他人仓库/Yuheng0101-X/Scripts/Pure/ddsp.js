/*

Name: 多多视频/原人人影视
Description: 全局净化
Author: 𝘠𝘶𝘩𝘦𝘯𝘨
Remark: 自用脚本

----------------------------
hostname = api.duoduo.pro,*.bayescom.com

^https?://api\.duoduo\.pro\/(v3plus\/index\/channel|app\/config\/h5NativeBar|ad\/getAll|subMenu/prompt/list) url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/Pure/ddsp.js
^https?://.*\.bayescom\.com\/(raddus|cruiser) url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/Pure/ddsp.js
----------------------------
*/
let _object = JSON.parse($response.body)
try {
    const handlers = {
        'index/channel.+position=CHANNEL_MY': () => (_object.data.sections = []),
        'config/h5NativeBar': () => {
            const white_list = ['首页', '我的']
            _object.data.homeBarPage = _object.data.homeBarPage
                .filter((item) => item && white_list.includes(item.name))
                .map((item, index) => {
                    item.index = index + 1
                    return item
                })
        },
        'ad/getAll': () => (_object.data.adList = []),
        'subMen/prompt/list': () => (_object.data.list = []),
        raddus: () => (_object.imp = []),
        cruiser: () => {
            _object.setting.parallel_group = []
            _object.suppliers = []
        }
    }
    for (let key in handlers) {
        if (new RegExp(key).test($request.url)) {
            handlers[key]()
        }
    }
} catch (err) {
    console.log(`❌ 出现错误：${err}`)
} finally {
    $done({ body: JSON.stringify(_object) })
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
