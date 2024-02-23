// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz13724/scripts/aliyun.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/aliyun.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/aliyun.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/aliyun.stoverride

/*
脚本名称：阿里云盘任务 感谢zqzess、lowking、leiyiyan、mounuo提供的巨大帮助
脚本作者：@Sliverkiss
更新日期：2024-01-24 13:13:56

2024.01.24
- 优化时空间任务逻辑，运行一次可完成任务，需要间隔一小时以上再运行一次领取所有奖励，建议每天定时2到3次
- 时空间可通过抹除数据、卸载重装等在不退出的登录的情况下再次登录的方式，刷满5台设备，设备建议打开备份，并将备份时间调至一百年后
- 修复多账号运行脚本会覆盖数据，只剩一个账号的问题
- 优化ck格式，不再兼容zqzess，而是采用自己的格式
- 优化多账号逻辑，现在可以通过重写获取ck，不再要求手动填写ck
- 使用脚本之前，需要更新脚本，删除之前的重写并重新拉取，更新boxjs订阅
- 备份奖励需每天打开一次云盘刷新才能领取奖励，待考虑新的解决方案

------------------------------------------
脚本兼容：Surge、QuantumultX、Loon、Shadowrocket、Node.js
只测试过QuantumultX，其它环境请自行尝试

*************************
【 签到脚本使用教程 】:
*************************
单账号&&多账号：
1.将获取ck脚本拉取到本地
2.打开阿里云盘，若提示获取ck成功，则可以使用该脚本
3.获取成功后，关闭获取ck脚本，避免产生不必要的mitm

QuantumultX配置如下：

[task_local]
0 7,11,17 * * * https://gist.githubusercontent.com/Sliverkiss/33800a98dcd029ba09f8b6fc6f0f5162/raw/aliyun.js, tag=阿里云签到, img-url=https://raw.githubusercontent.com/fmz200/wool_scripts/main/icons/apps/AliYunDrive.png, enabled=true

[rewrite_local]
^https:\/\/(auth|aliyundrive)\.alipan\.com\/v2\/account\/token url script-request-body https://gist.githubusercontent.com/Sliverkiss/33800a98dcd029ba09f8b6fc6f0f5162/raw/aliyun.js

[MITM]
hostname = auth.alipan.com,auth.aliyundrive.com
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。
*/
// env.js 全局
const $ = new Env("☁️阿里云盘签到");
const ckName = "aliyun_data";
//-------------------- 一般不动变量区域 -------------------------------------
const Notify = 1;//0为关闭通知,1为打开通知,默认为1
const notify = $.isNode() ? require('./sendNotify') : '';
let envSplitor = ["@"]; //多账号分隔符
let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || [];
let userList = [];
let userIdx = 0;
let userCount = 0;
//调试
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata('is_debug')) || 'false';
//是否自动领取奖励
$.is_reward = ($.isNode() ? process.env.IS_DEDUG : $.getdata('aliyun_reward')) || 'true';
//垃圾回收期限
$.date = ($.isNode() ? process.env.IS_DEDUG : $.getdata('aliyun_date')) || '';
//垃圾回收区
$.cache = ($.isNode() ? process.env.IS_DEDUG : $.getjson('aliyun_cache')) || {};
// 为通知准备的空数组
$.notifyMsg = [];
// 上传空文件列表
$.uploadFileList = [];
//bark推送
$.barkKey = ($.isNode() ? process.env["bark_key"] : $.getdata("bark_key")) || '';
//---------------------- 自定义变量区域 -----------------------------------

//脚本入口函数main()
async function main() {
    await getNotice()
    console.log('\n================== 任务 ==================\n');
    for (let user of userList) {
        console.log(`🔷账号${user.ADrivreInfo.name} >> Start work`)
        console.log(`随机延迟${user.getRandomTime()}ms`);
        //刷新token
        await user.getAuthorizationKey();
        if (user.ckStatus) {
            //签到
            let { signInCount } = await user.signCheckin();
            //垃圾回收
            await user.FullGC();
            //补签卡任务
            await user.finishCardTask();
            //刷新数据
            await user.getHomeWidgets();
            //随机休眠
            await $.wait(user.getRandomTime());
            //完成时光间备份任务
            await user.finishDeviceRoomTask();
            //领取好运瓶
            await user.bottleTask();
            //随机休眠
            await $.wait(user.getRandomTime());
            //领取签到/备份奖励
            await user.getAllReward(signInCount);
            //刷新垃圾回收区
            await user.flashCacheGC();
        } else {
            //将ck过期消息存入消息数组
            $.notifyMsg.push(`❌账号${user.ADrivreInfo.name} >> Check ck error!`)
        }
    }
}

class UserInfo {
    constructor(str) {
        this.index = ++userIdx;
        this.ADrivreInfo = str;
        this.ckStatus = true;
        this.bottleStatus = true;
    }
    getRandomTime() {
        return randomInt(1000, 3000)
    }
    //请求二次封装
    Request(options, method) {
        typeof (method) === 'undefined' ? ('body' in options ? method = 'post' : method = 'get') : method = method;
        return new Promise((resolve, reject) => {
            $.http[method.toLowerCase()](options)
                .then((response) => {
                    let res = response.body;
                    res = $.toObj(res) || res;
                    resolve(res);
                })
                .catch((err) => reject(err));
        });
    };
    //垃圾回收机制
    async FullGC() {
        try {
            //获取当前天数
            let isGone = $.date ? diffDate($.date, new Date().getTime()) : 0;
            if ((Array.isArray($.cache[$.device_id])
                && $.cache[$.device_id].length > 0)
                && isGone > 0) {
                $.log(`⏰ 开始执行垃圾回收任务\n`)
                //批量删除上传空文件
                await this.removeFiles($.cache[$.device_id]);
                $.cache[$.device_id] = [];
                //清空垃圾回收区
                $.setjson($.cache[$.device_id], 'aliyun_cache');
            } else {
                isGone > 0
                    ? $.log(`♻️垃圾回收区中暂无需要清理的文件 => 跳过垃圾回收任务`)
                    : $.log(`♻️未到达垃圾回收期限=> 跳过垃圾回收任务`)
            }
        } catch (e) {
            $.log(`❌垃圾回收失败！原因为:${e}`)
        }
    }
    //刷新垃圾回收区
    async flashCacheGC() {
        try {
            if (Array.isArray($.uploadFileList) && $.uploadFileList.length > 0) {
                if (Array.isArray($.cache[$.device_id]) && $.cache[$.device_id].length > 0) {
                    //压入垃圾回收区
                    $.cache[$.device_id] = [...$.cache[$.device_id], ...$.uploadFileList];
                } else {
                    //创建垃圾回收区
                    $.cache[$.device_id] = $.uploadFileList;
                }
                //缓存垃圾回收区
                $.setjson($.cache, 'aliyun_cache');
                //刷新垃圾回收期限
                $.setjson(new Date().getTime(), 'aliyun_date');
                //打印通知
                $.log(`♻️将上传文件缓存到垃圾回收区成功！`);
            } else {
                return $.log(`♻️暂无可回收垃圾`);
            }
        } catch (e) {
            $.log(`❌刷新垃圾回收区失败！原因为:${e}`)
        }
    }
    //一键领取签到/备份奖励
    async getAllReward(signInCount) {
        try {
            //是否开启自动领取奖励
            if ($.is_reward == 'false') {
                //判断是否到达月底
                let isLastDay = getGoneDay() == getLastDay();
                console.log(isLastDay);
                $.log(`❌未开启自动领取任务，奖励将会积攒到月底一键清空`);
                $.log(`当前日期: ${getGoneDay()} => ` + (isLastDay ?
                    `已到达 ${getLastDay()} 开始领取奖励！`
                    : `未到达 ${getLastDay()} 跳过领取奖励！`))
                //到达月底,一键清空奖励
                if (isLastDay) {
                    for (let i = 1; i <= getCountDays(); i++) {
                        //签到奖励
                        await this.getSignReword(signInCount);
                        //备份奖励
                        await this.getTaskReword(signInCount);
                    }
                }
            } else {
                $.log(`✅已开启自动领取 => 开始领取签到/备份奖励...\n`);
                //签到奖励
                let signMsg = await this.getSignReword(signInCount);
                $.log(`签到: ${signMsg}`);
                //备份奖励
                let backMsg = await this.getTaskReword(signInCount);
                $.log(`备份: ${backMsg}`);
            }
        } catch (e) {
            $.log(`❌一键领取签到/备份奖励失败！原因为:${e}`)
        }
    }
    //获取accessToken
    async getAuthorizationKey() {
        try {
            const options = {
                url: `https://auth.aliyundrive.com/v2/account/token`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh_token: this.ADrivreInfo.refresh_token,
                    grant_type: 'refresh_token'
                })
            };
            //post方法
            let res = await this.Request(options);
            debug(res);
            let { avatar, nick_name, device_id, refresh_token, access_token } = res;
            //缓存用户信息(avatar=>头像，nick_name=>用户名)
            $.avatar = avatar;
            $.nick_name = nick_name;
            $.device_id = device_id;
            //获取accessKey鉴权
            let accessKey = 'Bearer ' + access_token;
            debug(accessKey, "鉴权")
            this.authorization = accessKey;
            let index = userCookie.findIndex(e => (e.name == nick_name && e.device_id == device_id));
            userCookie[index].refresh_token = refresh_token;
            //刷新token
            if ($.setjson(userCookie, ckName)) {
                $.log(`${nick_name}刷新阿里网盘refresh_token成功 🎉`)
            } else {
                DoubleLog(`${nick_name}刷新阿里网盘refresh_token失败‼️`, '', '')
                this.ckStatus = false;
            }
            //accessKey
            return accessKey;
        } catch (e) {
            $.log(`❌获取accessToken失败！原因为:${e}`)
        }
    }
    //查询签到日历
    async signCheckin() {
        console.log(`⏰ 开始执行签到任务\n`)
        try {
            const options = {
                url: "https://member.aliyundrive.com/v2/activity/sign_in_list",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.authorization,
                },
                body: JSON.stringify({})
            }
            //post方法
            let { message, result } = await this.Request(options);
            //
            if (message) {
                DoubleLog(`❌签到失败!${message}`);
                return;
            }
            let { isSignIn, isReward, signInCount, signInInfos } = result;
            //获取今天签到信息
            let signInRes = signInInfos.find(e => Number(e.day) == Number(signInCount));
            let { subtitle, rewards } = signInRes;
            debug(rewards, "签到信息");
            //打印
            if (rewards.length > 0) {
                $.log(`签到天数:${signInCount}=> ${subtitle}`)
                DoubleLog(`用户名: ${$.nick_name} => 第${signInCount}天`)
                DoubleLog(`自动领取: ${$.is_reward == 'false' ? '未开启 => 月底一键清空' : '已开启 => 每日自动领取'}`)
                //今日奖励详情
                $.signReward = rewards[0].name;
                $.backUpReward = rewards[1].name;
                $.log(`\n查询签到日历 => 第${signInCount}天可领取奖励如下:\n签到奖励: ${$.signReward}\n备份奖励: ${$.backUpReward}\n`)
                $.log(`执行签到任务 => 已完成✅\n`);
            }
            //今日是否已签到
            $.signMsg = (isSignIn ? `🎉${$.nick_name}签到成功!` : `️⚠️今天已经签到过了`) || '';
            //打印通知
            DoubleLog(`签到: ${$.signReward}`);
            return { signInCount };
        } catch (e) {
            $.log(`❌查询签到日历失败！原因为:${e}`)
        }
    }
    //获取签到信息
    async getSignInfo() {
        try {
            const options = {
                url: `https://member.aliyundrive.com/v2/activity/sign_in_info`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.authorization,
                    'x-device-id': this.ADrivreInfo.device_id,
                },
                body: JSON.stringify({}),
            };
            //post方法
            let res = await this.Request(options);
            debug(res, "获取签到信息");
        } catch (e) {
            $.log(`❌获取签到信息失败！原因为:${e}`)
        }
    }
    //刷新阿里云主界面数据
    async getHomeWidgets() {
        try {
            const options = {
                url: `https://api.alipan.com/apps/v2/users/home/widgets`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.authorization,
                    'x-device-id': this.ADrivreInfo.device_id,
                },
                body: JSON.stringify({}),
            };
            //post方法
            let res = await this.Request(options);
            $.log(`刷新阿里云界面信息`)
            debug(res, "获取home信息");
        } catch (e) {
            $.log(`❌获取home信息失败！原因为:${e}`)
        }
    }
    // 领取签到奖励
    async getSignReword(signInCount) {
        try {
            const options = {
                url: `https://member.aliyundrive.com/v1/activity/sign_in_reward`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.authorization,
                },
                body: JSON.stringify({ signInDay: signInCount }),
            };
            //post方法
            let { result, message } = await this.Request(options);
            //打印领取详情
            $.log(`领取第${signInCount}天签到奖励 => 🎉${result.description || result.name}领取成功!`);
            return result.description ? result.description : result.name;
        } catch (e) {
            $.log(`❌领取签到奖励失败！原因为:${e}`)
        }
    }
    //领取备份奖励
    async getTaskReword(signInCount) {
        try {
            const options = {
                url: `https://member.aliyundrive.com/v2/activity/sign_in_task_reward?_rx-s=mobile`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({ "signInDay": signInCount })
            };
            //post方法
            let { result, message } = await this.Request(options);
            //打印领取详情
            $.log((result && !message) ? `领取备份奖励 => 🎉${result.description}领取成功!` : `领取备份奖励 => ❌${message}`);
            return (result && !message) ? result.description : message;
        } catch (e) {
            $.log(`❌领取备份奖励失败！原因为:${e}`)
        }
    }
    //备份设备列表
    async getDeviceList() {
        try {
            const options = {
                url: `https://api.alipan.com/adrive/v2/backup/device_applet_list_summary`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                    'x-device-id': this.ADrivreInfo.device_id,
                },
                body: JSON.stringify({})
            };
            //post方法
            let { deviceItems } = await this.Request(options) ?? [];
            $.log(
                Array.isArray(deviceItems) && deviceItems.length > 0
                    ? `✅ 成功获取到 ${deviceItems.length} 台设备\n`
                    : `❌ 获取设备列表失败: 你账号下没有设备\n`);
            debug(deviceItems, "备份设备列表");
            return deviceItems;
        } catch (e) {
            $.log(`❌查询备份设备列表失败！原因为:${e}`)
        }
    }

    // 上传文件到相册/完成照片备份任务
    async uploadFileToAlbums(albumsId, deviceId = this.ADrivreInfo.device_id, deviceModel = 'iPhone 13') {
        try {
            //获取相册信息
            //    this.albumsId = await this.getAlbumsInfo();
            //创建上传文件
            let res = await this.createFile(albumsId, deviceId, deviceModel);
            if (res?.file_id && res?.upload_id && res?.upload_url) {
                let { file_id, upload_id, upload_url } = res;
                //开始上传文件
                await this.toUploadFile(upload_url, deviceId);
                //完成上传文件
                await this.completeUpload(this.albumsId, deviceId, file_id, upload_id);
                //返回创建文件id
                return file_id;
            }
            return false;
        } catch (e) {
            $.log(`❌上传文件到相册/完成照片备份任务失败！原因为:${e}`)
        }
    }
    //完成快传任务
    async finishQuickShare() {
        try {
            this.albumsId = await this.getAlbumsInfo();
            let file_id = await this.getAlbumsList();
            //若文件id不存在，跳过快传任务
            if (!file_id) {
                $.log(`容量不足,跳过快传任务`);
                return false;
            }
            const options = {
                url: `https://api.aliyundrive.com/adrive/v1/share/create`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({
                    drive_file_list: [{
                        drive_id: this.albumsId,
                        file_id
                    }]
                })
            };
            let res = await this.Request(options);
            debug(res, "完成快传任务");
            return true;
        } catch (e) {
            $.log(`❌完成快传任务失败！原因为:${e}`)
        }
    }
    //获取相册文件列表
    async getAlbumsList() {
        try {
            this.albumsId = await this.getAlbumsInfo();
            const options = {
                url: `https://api.alipan.com/adrive/v2/backup/device/file_list`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({
                    "deviceType": "iOS",
                    "deviceId": this.ADrivreInfo.device_id,
                    "driveId": this.albumsId,
                    "backupView": "album",
                    "parentFileId": "root",
                    "limit": 1
                })
            };
            let res = await this.Request(options);
            //判断相册列表是否存在文件 
            if (res?.items?.[0]?.file_id) {
                return res?.items?.[0]?.file_id;
            } else {
                return await this.uploadFileToAlbums(this.albumsId);
            }
        } catch (e) {
            $.log(`❌获取相册文件列表失败！原因为:${e}`)
        }
    }
    //获取相册信息
    async getAlbumsInfo() {
        try {
            const options = {
                url: `https://api.aliyundrive.com/adrive/v1/user/albums_info`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({})
            };
            let { data } = await this.Request(options);
            return data?.driveId;
        } catch (e) {
            $.log(`❌获取相册信息失败！原因为:${e}`)
        }
    }
    //创建上传文件
    async createFile(albumsId, deviceId, deviceModel) {
        try {
            const options = {
                url: `https://api.aliyundrive.com/adrive/v1/biz/albums/file/create`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                    'x-device-id': deviceId
                },
                body: JSON.stringify({
                    drive_id: albumsId,
                    part_info_list: [
                        {
                            part_number: 1
                        }
                    ],
                    parent_file_id: 'root',
                    name: Math.floor(Math.random() * 100000000) + '.jpg',
                    type: 'file',
                    check_name_mode: 'auto_rename',
                    size: Math.floor(Math.random() * 30000),
                    create_scene: 'auto_autobackup',
                    device_name: deviceModel,
                    hidden: false,
                    content_type: 'image/jpeg'
                })
            };
            let { file_id, upload_id, part_info_list } = await this.Request(options);
            //判断相册空间是否充足
            if (part_info_list?.length > 0) {
                let upload_url = part_info_list[0]?.upload_url;
                return { file_id, upload_id, upload_url }
            }
            //空间不足，创建文件失败
            return $.log(`相册空间容量不足,跳过上传备份文件`);
        } catch (e) {
            $.log(`❌创建上传文件失败！原因为:${e}`)
        }
    }
    //开始上传文件
    async toUploadFile(upload_url, deviceId) {
        try {
            const options = {
                url: upload_url,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                    'Origin': 'https://www.aliyundrive.com',
                    'Referer': 'https://www.aliyundrive.com',
                    "deviceId": deviceId
                },
                body: JSON.stringify({})
            };
            let res = await this.Request(options);
            debug(res);
        } catch (e) {
            $.log(`❌开始上传文件失败！原因为:${e}`)
        }
    }
    //完成上传文件
    async completeUpload(albumsId, deviceId, file_id, upload_id) {
        try {
            const options = {
                url: `https://api.aliyundrive.com/v2/file/complete`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                    "deviceId": deviceId
                },
                body: JSON.stringify({
                    drive_id: albumsId,
                    upload_id: upload_id,
                    file_id: file_id
                })
            };
            let res = await this.Request(options);
            debug(res);
            $.uploadFileList.push(file_id);
        } catch (e) {
            $.log(`❌完成上传文件失败！原因为:${e}`)
        }
    }
    //批量清空上传空文件
    async removeFiles(uploadFileList) {
        $.log(`开始批量清除上传空文件...`)
        let albumId = await this.getAlbumsInfo();
        for (let item of uploadFileList) {
            await this.removeFile(albumId, item);
        }
    }
    //删除上传文件
    async removeFile(albumsId, file_id) {
        try {
            const options = {
                url: `https://api.alipan.com/adrive/v4/batch`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({
                    "requests": [
                        {
                            "body": {
                                "drive_id": albumsId,
                                "file_id": file_id
                            },
                            "id": file_id,
                            "method": "POST",
                            "url": "\/file\/delete"
                        }
                    ],
                    "resource": "file"
                })
            };
            let res = await this.Request(options);
            debug(res);
        } catch (e) {
            $.log(`❌删除上传文件失败！原因为:${e}`)
        }
    }
    //完成时光间备份任务
    async finishDeviceRoomTask() {
        try {
            //获取相册信息
            this.albumsId = await this.getAlbumsInfo();
            //获取设备列表
            let deviceList = await this.getDeviceList();
            //获取时空间可领取奖励列表
            let items = await this.getListDevice();
            //debug(deviceList);
            $.log(`⏰ 开始执行时光设备间备份任务\n`);
            let { rewardCountToday, rewardTotalSize } = await this.getDeviceRoomInfo();
            if (rewardCountToday >= 5) {
                DoubleLog(`时光间: 总共领取${rewardTotalSize}MB,今日领取次数：${rewardCountToday}`);
                return $.log(`今日时光间领取奖励已达到上限，跳过任务\n`)
            }
            for (let e of deviceList) {
                if (items) {
                    let deviceItem = items.find(u => u.id == e.deviceId) ?? [];
                    //若设备无可领取奖励，执行上传任务
                    if (!deviceItem.canCollectEnergy) {
                        //每个设备上传两次空文件
                        for (let i = 1; i <= 2; i++) {
                            await this.uploadFileToAlbums(this.albumsId, e.deviceId, e.deviceModel);
                            $.log(`${e.deviceModel} 完成第${i}次上传任务`);
                        }
                    }
                    //随机休眠
                    await $.wait(this.getRandomTime());
                    //领取时光间奖励
                    await this.getEnergyReword(e);
                } else {
                    $.log(`❌获取时空间设备列表失败！`);
                }
            }
            let res = await this.getDeviceRoomInfo();
            DoubleLog(`时光间: 总共领取${res.rewardTotalSize}MB,今日领取次数：${res.rewardCountToday}`);
        } catch (e) {
            $.log(`❌完成时光间备份任务失败！原因为:${e}`)
        }
    }
    //获取时光间信息
    async getDeviceRoomInfo() {
        try {
            const options = {
                url: `https://member.aliyundrive.com/v1/deviceRoom/rewardInfoToday`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({})
            };
            //post方法
            let { result, message } = await this.Request(options);
            return { rewardTotalSize: result?.rewardTotalSize, rewardCountToday: result?.rewardCountToday };
        } catch (e) {
            $.log(`❌获取时光间信息失败！原因为:${e}`)
        }
    }
    //获取时空间可领取奖励设备列表
    async getListDevice() {
        try {
            const options = {
                url: `https://user.aliyundrive.com/v1/deviceRoom/listDevice`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({})
            };
            //post方法
            let { items } = await this.Request(options) ?? [];
            if (Array.isArray(items) && items.length > 0) {
                return items;
            }
            return false;
        } catch (e) {
            $.log(`❌查询是空间奖励列表失败！原因为:${e}`)
        }
    }
    //领取时光间奖励
    async getEnergyReword(e) {
        try {
            const options = {
                url: `https://member.aliyundrive.com/v1/deviceRoom/rewardEnergy`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({
                    "deviceId": e.deviceId
                })
            };
            //post方法
            let { result, message } = await this.Request(options);
            $.log(`${e.deviceModel}:` + ((result && !message) ? `领取${result?.size}MB成功!` : `今日已领取或暂无备份奖励`) + "\n");

        } catch (e) {
            $.log(`❌领取时光间奖励失败！原因为:${e}`)
        }
    }
    //执行好运瓶任务
    async bottleTask() {
        $.log(`⏰ 开始执行好运瓶任务\n`);
        do {
            await this.bottleFish();
        } while (this.bottleStatus);
    }
    //领取好运瓶
    async bottleFish() {
        try {
            const options = {
                url: `https://api.aliyundrive.com/adrive/v1/bottle/fish`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({})
            };
            //{"bottleId":1726268665825546200,"bottleName":"你的名字","shareId":"EG9LdVtcxdw"}
            //{"code":"TooManyRequests","message":"TooManyRequests","requestId":"0a0070d417055857275284776ea12f","display_message":"今天接瓶子次数已用完，明天再来~"}
            let { bottleName, display_message } = await this.Request(options);
            if (display_message) {
                DoubleLog(`好运瓶: ${display_message}`);
                this.bottleStatus = false;
            } else {
                $.log(`好运瓶[${bottleName}]领取成功！\n`)
            }
        } catch (e) {
            $.log(`❌领取好运瓶失败！原因为:${e}`)
        }
    }
    //完成补签卡任务
    async finishCardTask() {
        try {
            console.log(`⏰ 开始执行补签卡任务\n`)
            //翻牌子
            for (let i = 1; i <= 3; i++) {
                await this.flipCard(i)
            }
            //获取任务详情
            const cardDetail = await this.getCardTaskDetail();
            let { period, tasks } = cardDetail;
            //过滤已完成任务
            tasks = tasks.filter(e => e.status == 'unfinished');
            debug(tasks, '未完成任务列表');
            if (!tasks) {
                $.log(`✅补签卡所有任务已完成`);
            } else {
                for (let task of tasks) {
                    switch (task.taskName) {
                        case '当周使用好运瓶翻3次':
                            console.log(`⏰ 开始执行任务: ${task.taskName}`)
                            if (task.status != 'finished') {
                                await this.bottleTask();
                            }
                            console.log(`✅ 成功完成任务: ${task.taskName}`)
                            break
                        case '当周使用快传发送文件给好友':
                            console.log(`⏰ 开始执行任务: ${task.taskName}`)
                            if (task.status != 'finished') {
                                $.quickShareStatus = await this.finishQuickShare();
                            }
                            console.log($.quickShareStatus ? `✅ 成功完成任务: ${task.taskName}` : `❌容量不足，完成快传任务失败`)
                            break;
                        case '当周备份照片满20张':
                            console.log(`⏰ 开始执行任务: ${task.taskName}`)
                            if (task.status != 'finished') {
                                this.albumsId = await this.getAlbumsInfo();
                                for (let i = 0; i < 20; i++) {
                                    $.uploadStatus = await this.uploadFileToAlbums(this.albumsId);
                                    //相册空间容量不足，跳过任务
                                    if (!$.uploadStatus) break;
                                }
                            }
                            //存在文件id
                            console.log($.uploadStatus ? `✅ 成功完成任务: ${task.taskName}` : `❌容量不足，完成备份照片任务失败`)
                            break;
                        default:
                            console.log(`❌ 不支持当前任务: ${task.taskName}`)
                            break;
                    }
                }
            }
            //领取补签卡奖励
            await this.receiveCard();
        } catch (e) {
            $.log(`❌完成补签卡任务失败！原因为:${e}`)
        }
    }
    //翻转补签卡任务牌
    async flipCard(position) {
        try {
            const options = {
                url: `https://member.aliyundrive.com/v2/activity/complement_task?_rx-s=mobile`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({ position })
            };
            let res = await this.Request(options);
            debug(res, "翻转补签卡任务牌");
        } catch (e) {
            $.log(`❌翻转补签卡任务牌失败！原因为:${e}`)
        }
    }
    //获取补签卡任务详情
    async getCardTaskDetail() {
        try {
            const options = {
                url: `https://member.aliyundrive.com/v2/activity/complement_task_detail?_rx-s=mobile`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({})
            };
            let res = await this.Request(options);
            debug(res, "获取补签卡任务详情");
            return res?.result;
        } catch (e) {
            $.log(`❌获取补签卡任务详情失败！原因为:${e}`)
        }
    }
    //领取补签卡
    async receiveCard() {
        try {
            const { period, tasks } = await this.getCardTaskDetail()
            //查询完成任务编号
            let task = tasks.find(e => e.status == 'finished');
            //不存在完成任务，跳过领取
            if (!task) return $.log(`未完成补签卡任务，领取奖励失败`);
            const options = {
                url: `https://member.aliyundrive.com/v2/activity/complement_task_reward?_rx-s=mobile`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authorization,
                },
                body: JSON.stringify({
                    period,
                    taskId: task?.taskId
                })
            };
            let res = await this.Request(options);
            debug(res, "领取补签卡任务奖励");
            DoubleLog(`补签卡: ` + (res.message || "任务已完成，成功领取1张补签卡"))
            // return res?.result;
        } catch (e) {
            $.log(`❌领取补签卡失败！原因为:${e}`)
        }
    }

}


//获取Cookie
async function getCookie() {
    if ($request && $request.method != 'OPTIONS') {
        try {
            const body = JSON.parse($request.body);
            let refresh_token = body.refresh_token;
            //不存在token时
            if (!refresh_token) {
                return $.msg($.name, "", "❌获取token失败！请稍后再试～")
            }
            //获取响应体
            let { nick_name, avatar, device_id } = await getRespBody(refresh_token) ?? {};
            //是否存在多账号数据
            if ((Array.isArray(userCookie)) && userCookie.length == 0) {
                userCookie.push({ "name": nick_name, "refresh_token": refresh_token, "device_id": device_id });
                $.setjson(userCookie, ckName);
                $.msg($.name, `🎉${nick_name}获取token成功!`, "", { 'media-url': avatar });
            } else {
                userCookie = eval('(' + userCookie + ')');
                let index = userCookie.findIndex(e => (e.name == nick_name && e.device_id == device_id));
                if (userCookie[index]) {
                    userCookie[index].refresh_token = refresh_token;
                    $.setjson(userCookie, ckName);
                    $.msg($.name, `🎉${nick_name}更新token成功!`,"", { 'media-url': avatar });
                } else {
                    userCookie.push({ "name": nick_name, "refresh_token": refresh_token, "device_id": device_id });
                    $.setjson(userCookie, ckName);
                    $.msg($.name, `🎉${nick_name}获取token成功!`,``, { 'media-url': avatar });
                }
            }
        } catch (e) {
            $.msg($.name, "❌获取阿里云盘refresh_token失败！请检查boxjs格式是否正确", e)
        }
    }
}

async function getRespBody(refresh_token) {
    //获取用户名作为标识键
    const options = {
        url: `https://auth.aliyundrive.com/v2/account/token`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh_token: refresh_token,
            grant_type: 'refresh_token'
        })
    };
    return new Promise(resolve => {
        $.post(options, async (error, response, data) => {
            try {
                let result = JSON.parse(data);
                resolve(result);
            } catch (error) {
                $.log(error);
                resolve();
            }
        });
    });
}

async function getNotice() {
    try {
        const urls = ["https://cdn.jsdelivr.net/gh/Sliverkiss/GoodNight@main/notice.json", "https://cdn.jsdelivr.net/gh/Sliverkiss/GoodNight@main/tip.json"];
        for (const url of urls) {
            const options = {
                url,
                headers: {
                    "User-Agent": ""
                },
            }
            const result = await httpRequest(options);
            if (result) console.log(result.notice);
        }
    } catch (e) {
        console.log(e);
    }
}

//主程序执行入口
!(async () => {
    //没有设置变量,执行Cookie获取
    if (typeof $request != "undefined") {
        await getCookie();
        return;
    }
    //未检测到ck，退出
    if (!(await checkEnv())) { throw new Error(`❌未检测到ck，请添加环境变量`) };
    if (userList.length > 0) {
        await main();
    }
})()
    .catch((e) => $.notifyMsg.push(e.message || e))//捕获登录函数等抛出的异常, 并把原因添加到全局变量(通知)
    .finally(async () => {
        if ($.barkKey) { //如果已填写Bark Key
            await BarkNotify($, $.barkKey, $.name, $.notifyMsg.join('\n')); //推送Bark通知
        };
        await SendMsg($.notifyMsg.join('\n'))//带上总结推送通知
        $.done(); //调用Surge、QX内部特有的函数, 用于退出脚本执行
    });

/** --------------------------------辅助函数区域------------------------------------------- */

// 当天
function getGoneDay(n = 0, yearFlag = true) {
    let myDate = new Date();
    myDate.setDate(myDate.getDate() - n);
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let result =
        "" +
        (yearFlag ? myDate.getFullYear() : "") +
        "/" +
        month +
        "/" +
        (day < 10 ? "0" + day : day);
    return result;
}

//计算天数差
function diffDate(date1, date2) {
    let day = Math.floor(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24 + 0.5);
    return day;
}

// 月底最后一天
function getLastDay() {
    let nowDate = new Date();
    nowDate.setMonth(nowDate.getMonth() + 1);
    nowDate.setDate(0);
    let lastMonthDay = nowDate.toLocaleDateString();
    return lastMonthDay;
}

// 当月有几天
function getCountDays() {
    var curDate = new Date();
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
}


// 双平台log输出
function DoubleLog(data) {
    if ($.isNode()) {
        if (data) {
            console.log(`${data}`);
            $.notifyMsg.push(`${data}`);
        }
    } else {
        console.log(`${data}`);
        $.notifyMsg.push(`${data}`);
    }
}

// DEBUG
function debug(text, title = 'debug') {
    if ($.is_debug === 'true') {
        if (typeof text == "string") {
            console.log(`\n-----------${title}------------\n`);
            console.log(text);
            console.log(`\n-----------${title}------------\n`);
        } else if (typeof text == "object") {
            console.log(`\n-----------${title}------------\n`);
            console.log($.toStr(text));
            console.log(`\n-----------${title}------------\n`);
        }
    }
}


//检查变量
async function checkEnv() {
    if ((Array.isArray(userCookie)) && userCookie.length == 0) {
        console.log("未找到CK");
        return;
    } else {
        userCookie = eval('(' + userCookie + ')');
        for (let n of userCookie) n && userList.push(new UserInfo(n));
        userCount = userList.length;
    }
    return console.log(`共找到${userCount}个账号`), true;//true == !0
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// 发送消息
async function SendMsg(message) {
    if (!message) return;
    if (Notify > 0) {
        if ($.isNode()) {
            await notify.sendNotify($.name, message)
        } else {
            $.msg($.name, $.signMsg, message, { 'media-url': $.avatar })
        }
    } else {
        console.log(message)
    }
}

/** ---------------------------------固定不动区域----------------------------------------- */
// prettier-ignore

//请求函数函数二次封装
function httpRequest(options, method) { typeof (method) === 'undefined' ? ('body' in options ? method = 'post' : method = 'get') : method = method; return new Promise((resolve) => { $[method](options, (err, resp, data) => { try { if (err) { console.log(`${method}请求失败`); $.logErr(err) } else { if (data) { typeof JSON.parse(data) == 'object' ? data = JSON.parse(data) : data = data; resolve(data) } else { console.log(`请求api返回数据为空，请检查自身原因`) } } } catch (e) { $.logErr(e, resp) } finally { resolve() } }) }) }
//Bark APP notify
async function BarkNotify(c, k, t, b) { for (let i = 0; i < 3; i++) { console.log(`🔷Bark notify >> Start push (${i + 1})`); const s = await new Promise((n) => { c.post({ url: 'https://api.day.app/push', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t, body: b, device_key: k, ext_params: { group: t } }) }, (e, r, d) => r && r.status == 200 ? n(1) : n(d || e)) }); if (s === 1) { console.log('✅Push success!'); break } else { console.log(`❌Push failed! >> ${s.message || s}`) } } };
//From chavyleung's Env.js
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
