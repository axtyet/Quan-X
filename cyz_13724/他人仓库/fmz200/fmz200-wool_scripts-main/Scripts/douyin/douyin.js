/**
 * @author fmz200
 * @function 抖音去广告，解除下载限制，解锁无水印下载
 * @date 2023-11-27 18:30:13
 * @source https://choler.github.io/Surge/Script/douyin.js
 */

const enabled_live = false; // 开启直播推荐，默认关闭

try {
    let body = $response.body.replace(/"room_id":(\d{2,})/g, '"room_id":"$1"');
    let obj = JSON.parse(body);
    if (obj.data) obj.data = filter_data(obj.data);
    if (obj.aweme_list) obj.aweme_list = filter_aweme_list(obj.aweme_list);
    if (obj.aweme_detail) obj.aweme_detail = filter_aweme_detail(obj.aweme_detail);
    $done({body: JSON.stringify(obj)});
} catch (error) {
    console.log("脚本运行错误，跳过处理。\n" + error);
    $done({});
}

function filter_data(data) {
    if (data && data.length > 0) {
        let i = data.length;
        while (i--) {
            let element = data[i].aweme;
            if (element.images) filter_images(element.images);
            if (element.video) filter_videos(element);
        }
    }
    return data;
}

function filter_aweme_list(aweme_list) {
    if (aweme_list && aweme_list.length > 0) {
        let i = aweme_list.length;
        while (i--) {
            let element = aweme_list[i];
            if (element.is_ads == true) {
                aweme_list.splice(i, 1);
            } else if (element.images) {
                filter_images(element.images);
            } else if (element.video) {
                filter_videos(element);
            } else {
                if (!enabled_live) aweme_list.splice(i, 1);
            }
        }
    }
    return aweme_list;
}

function filter_aweme_detail(aweme_detail) {
    if (aweme_detail.images) filter_images(aweme_detail.images);
    if (aweme_detail.video) filter_videos(aweme_detail);
    return aweme_detail;
}

function filter_images(images) {
    let j = images.length;
    while (j--) {
        images[j].download_url_list = images[j].url_list;
    }
    return images;
}

function filter_videos(videos) {
    videos.status.reviewed = 1;
    videos.video_control.allow_download = true;
    videos.video_control.prevent_download_type = 0;
    delete videos.video.misc_download_addrs;
    const play_url = videos.video.play_addr;
    videos.video.download_addr = play_url;
    videos.video.download_suffix_logo_addr = play_url;
    return videos;
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
