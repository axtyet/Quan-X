const utils = require("./utils");
const spinner = require("./spinner");
const database = require("./database");

module.exports = {
  apps: [
    utils.application("nPlayer", "nplayer-"),
    utils.application("APlayer", "alookplayer://"),
    utils.application("PlayerXtreme", "playerxtreme://"),
    utils.application("VLC Player", "vlc://")
  ],
  video: {
    id: "video",
    container: {},
    opening: 0,
    ending: 0,
    ended: false,
    paused: true,
    canplay: false,
    playing: false,
    skipTitle: true,
    rotating: false,
    displayingFullscreen: false,
    networkTips: true,
    histCache: database.history.query(),
    switchs: [
      "switch.network.tips",
      "switch.autoPlay.next"
    ],
    timeDisplay(current, duration) {
      current = parseInt(current);
      duration = duration ? parseInt(duration) : parseInt(current);
      const h = parseInt(current / 3600);
      const m = parseInt((current / 60) % 60) < 10 ? "0" + parseInt((current / 60) % 60) : parseInt((current / 60) % 60);
      const s = parseInt(current % 60) < 10 ? "0" + parseInt(current % 60) : parseInt(current % 60);
      return !h && duration < 3600 ? `${m}:${s}` : `${h}:${m}:${s}`;
    },
    history(hist) {
      const list = [
        $($app.env === $env.today ? "widget.list" : "playHistory.list"),
        $("playHistory.editing.fill.list"),
        $("playHistory.editing.action.list")
      ];
      this.histCache = hist;
      if (list[0]) list[0].data = hist.map((item, index) => {
        const watched = item.schedule.watched, duration = item.schedule.duration, ending = item.ending, ended = duration - watched <= (ending ? ending : 5);
        return {
          id: item.id,
          pic: {
            src: item.pic
          },
          mask: {
            alpha: item.remarks ? 1 : 0
          },
          remarks: {
            text: item.remarks
          },
          name: {
            text: item.name
          },
          duration: {
            text: item.label + " ｜ " + this.timeDisplay(duration)
          },
          episode: {
            text: duration > 300 && watched < 60 ? "\u89c2\u770b\u4e0d\u8db3\u4e00\u5206\u949f" : ended ? "\u5df2\u770b\u5b8c" : "\u5269\u4f59 " + this.timeDisplay(duration - watched)
          },
          ended, button: {
            title: ended ? "\u91cd\u65b0\u64ad\u653e" : "\u7ee7\u7eed\u64ad\u653e",
            info: index
          }
        }
      });
      if (list[1]) list[1].data = hist.map((item, index) => {
        return {
          checked: false,
          rowFill: {
            info: index,
            bgcolor: $color("clear")
          },
          checkbox: {hidden: false},
          checkmark: {hidden: true}
        };
      });
      if (list[2]) list[2].data = hist.map((item, index) => {
        return {
          checkAction: {info: index}
        };
      });
    },
    setMatrix(data, mark) {
      const id = [
        "video.playPause.mark.view.image",
        "playPage.matrix"
      ];
      if ($(id[0])) $(id[0]).symbol = mark + ".circle.fill";
      if (id[1]) $(id[1]).data = data.play.map((item, index) => {
        const playing = item.url === data.url;
        return {
          label: {
            text: item.name,
            textColor: playing ? utils.systemColor("green") : $color("systemLabel")
          },
          mask: {hidden: playing ? false : true},
          mark: {symbol: mark + ".circle"},
          name: data.name,
          url: item.url, playing
        };
      });
    },
    autoPlay(history, data) {
      const episodes = data.play.length;
      const timeLeft = data.schedule.duration - data.schedule.watched;
      const i = data.play.findIndex(play => play.url === data.url) + 1;
      const thisEpisodeEnd = episodes > 1 && i < episodes && data.schedule.duration > 1 && timeLeft <= (data.ending ? data.ending : 1);
      const allEnded = i === episodes && timeLeft <= 1;
      this.histCache = history;
      if (!this.rotating) database.history.insert(data);
      this.ended = thisEpisodeEnd || allEnded;
      if (this.ended) this.exitFullScreen();
      if (episodes > 1 && i < episodes && timeLeft === (data.ending ? data.ending : 0) + 10 && $cache.get(this.switchs[1])) $ui.toast("\u5373\u5c06\u64ad\u653e\u4e0b\u4e00\u96c6", 5);
      if (data.opening && data.opening > data.schedule.watched && this.skipTitle) {
        this.progress(data.opening);
        this.skipTitle = false;
      }
      if ($device.networkType === 1) this.networkTips = true;
      if ($device.networkType === 2 && $cache.get(this.switchs[0]) && this.networkTips) {
        this.networkTips = false;
        $ui.warning("Wi-Fi\u94fe\u63a5\u5df2\u65ad\u5f00，\u8bf7\u6ce8\u610f\u6d41\u91cf\u6d88\u8017");
      }
      if (thisEpisodeEnd && $cache.get(this.switchs[1])) {
        data = Object.assign({}, data, {
          label: data.play[i].name,
          url: data.play[i].url,
          schedule: {
            watched: data.opening ? data.opening : 0,
            duration: 0
          }
        });
        history.splice(0, 1, data);
        this.pause();
        this.load(data);
        this.setMatrix(data, "play");
        $("playPage.matrix").scrollTo({
          indexPath: $indexPath(0, i),
          animated: true
        });
      }
    },
    showProgressView(schedule) {
      const view = [
        $("video.buffered.progress.view"),
        $("video.playback.progress.view")
      ];
      if (this.rotating || !view[0] || !view[1]) return;
      const progress = [
        schedule && schedule.duration && schedule.buffered ? view[0].super.frame.width / schedule.duration * schedule.buffered : 0,
        schedule && schedule.duration && schedule.watched ? view[1].super.frame.width / schedule.duration * schedule.watched : 0
      ];
      if (view[0].frame.width === progress[0] && view[1].frame.width === progress[1]) return;
      view[0].relayout();
      view[1].relayout();
      view[0].updateLayout(make => make.width.equalTo(progress[0]));
      view[1].updateLayout(make => make.width.equalTo(progress[1]));
      $ui.animate({
        duration: 0.9,
        animation: () => {
          view[0].relayout();
          view[1].relayout();
        }
      });
    },
    showLoading() {
      const id = "video.loading.animate";
      if ($(id) || !$(this.id)) return;
      $(this.id).add({
        type: "blur",
        props: {
          id, style: 16,
          circular: true,
          userInteractionEnabled: false,
          alpha: 0
        },
        layout: (make, view) => {
          make.size.equalTo($size(40, 40));
          make.center.equalTo(view.super);
        },
        events: {
          ready: sender => $ui.animate({
            duration: 0.25,
            animation: () => sender.alpha = 1
          })
        },
        views: [spinner.init({
          diameter: 40,
          weight: 1.6,
          color: $color("silver")
        })]
      });
    },
    stopLoading() {
      const id = "video.loading.animate";
      if ($(id)) $ui.animate({
        duration: 0.25,
        animation: () => $(id).alpha = 0,
        completion: () => {
          if ($(id)) $(id).remove();
        }
      });
    },
    showBackButton() {
      if ($(this.id)) $(this.id).add({
        type: "button",
        props: {
          bgcolor: $color("clear")
        },
        layout: (make, view) => {
          make.size.equalTo($size(16, 40));
          make.left.inset(10);
          make.centerY.equalTo(view.super);
        },
        events: {
          tapped: sender => $ui.pop()
        },
        views: [{
          type: "image",
          props: {
            contentMode: 1,
            symbol: "chevron.compact.left",
            tintColor: $rgba(120, 120, 128, 0.36)
          },
          layout: $layout.fill
        }]
      })
    },
    error() {
      const id = "video.error.view";
      if (!this.container) return;
      if ($(id)) $(id).remove();
      this.container.add({
        type: "view",
        props: {
          id: id,
          cornerRadius: 4,
          smoothCorners: true,
          bgcolor: $color("black")
        },
        layout: $layout.fill,
        views: [{
          type: "view",
          layout: (make, view) => {
            make.size.equalTo($size(80, 50));
            make.center.equalTo(view.super);
          },
          views: [{
            type: "label",
            props: {
              text: "\u52a0\u8f7d\u5931\u8d25",
              font: $font(14),
              textColor: $color("white")
            },
            layout: (make, view) => {
              make.centerX.equalTo(view.super);
              make.top.inset(0);
            }
          },
          {
            type: "button",
            props: {
              title: "\u91cd\u8bd5",
              font: $font(14),
              cornerRadius: 4,
              smoothCorners: true,
              titleColor: $color("white"),
              bgcolor: utils.systemColor("blue")
            },
            layout: (make, view) => {
              make.size.equalTo($size(70, 26));
              make.centerX.equalTo(view.super);
              make.bottom.inset(0);
            },
            events: {
              tapped: sender => this.reload()
            }
          }]
        }]
      });
    },
    initialization(data) {
      if ($(this.id)) {
        this.pause();
        $(this.id).remove();
      }
      if ($("video.error.view")) $ui.animate({
        duration: 0.25,
        animation: () => $("video.error.view").alpha = 0,
        completion: () => $("video.error.view").remove()
      });
      this.opening = data.opening ? data.opening : 0;
      this.ending = data.ending ? data.ending : 0;
      this.ended = false;
      this.paused = true;
      this.canplay = false;
      this.playing = false;
      this.skipTitle = true;
      this.displayingFullscreen = false;
      this.networkTips = true;
      this.showProgressView();
    },
    load(data, {
      playsinline = true,
      controls = utils.statusBarOrientation() === 1 || utils.statusBarOrientation() === 2,
      autoplay = data.url,
      preload = data.url ? "auto" : "none",
      poster = ""
    } = {}) {
      this.initialization(data);
      const timestamp = new Date().valueOf();
      const history = this.histCache;
      const closeOrReload = () => !$(this.id) || $(this.id).info !== timestamp;
      const css = "#video{position:fixed;width:100vw;height:100vh;top:0;left:0;margin:0;padding:0}";
      const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"><title>${data.name}（${data.label}）</title></head><body><video id="video" ${playsinline ? "playsinline" : ""} ${controls ? "controls" : ""} ${autoplay ? "autoplay" : ""} preload="${preload}" src="${data.url}" poster="${poster}"></video></body></html>`;
      const script = () => {
        const video = document.getElementById("video");
        const play = () => video.play();
        const pause = () => video.pause();
        const reload = () => $notify("reload", video.load());
        const enterFullScreen = () => video.webkitEnterFullscreen();
        const exitFullScreen = () => video.webkitExitFullScreen();
        const controls = object => video.controls = object.display;
        const progress = object => video.currentTime = object.time;
        const playbackRates = object => video.playbackRate = object.rate;
        const buffered = () => $notify("buffered", {
          buffered: video.buffered.end(0),
          watched: video.currentTime,
          duration: video.duration
        });
        let i = 0, s = true;
        video.addEventListener("webkitbeginfullscreen", () => $notify("isEnterFullScreen", video.webkitDisplayingFullscreen));
        video.addEventListener("webkitendfullscreen", () => $notify("isExitFullScreen", video.webkitDisplayingFullscreen));
        video.onplay = () => $notify("play");
        video.onpause = () => $notify("pause");
        video.onloadstart = () => $notify("loadstart");
        video.oncanplay = () => $notify("canplay");
        video.oncanplaythrough = () => $notify("canplaythrough");
        video.onplaying = () => $notify("playing");
        video.onwaiting = () => $notify("waiting");
        video.onerror = () => $notify("error");
        video.ondurationchange = () => $notify("durationchange", parseInt(video.duration));
        video.onloadedmetadata = () => $notify("loadedmetadata");
        video.onloadeddata = () => $notify("loadeddata");
        video.ontimeupdate = () => {
          i++;
          if (i >= 4) {
            $notify("timeupdate", parseInt(video.currentTime));
            i = 0;
          }
        };
        video.onseeked = () => {
          if (s) $notify("seeked", {
            current: parseInt(video.currentTime),
            duration: parseInt(video.duration)
          });
          s = false;
        };
      };
      this.container.add({
        type: "web",
        props: {
          id: this.id,
          info: timestamp,
          inlineMedia: true,
          transparent: true,
          smoothCorners: true,
          scrollEnabled: false,
          showsProgress: false,
          pictureInPicture: true,
          style: css, html, script
        },
        layout: $layout.fill,
        events: {
          ready: sender => {
            sender.moveToBack();
            const timer = $timer.schedule({
              interval: 1,
              handler: () => {
                if (closeOrReload()) {
                  timer.invalidate();
                } else $(this.id).notify({
                  event: "buffered"
                });
              }
            });
            if ($app.env !== $env.app) this.showBackButton();
            if ($device.networkType === 2 && $cache.get(this.switchs[0])) $ui.warning("\u5f53\u524d\u975eWi-Fi\u73af\u5883，\u8bf7\u6ce8\u610f\u6d41\u91cf\u6d88\u8017");
          },
          play: () => {
            if (closeOrReload()) return;
            this.setMatrix(data, "pause");
            this.paused = false;
          },
          pause: () => {
            if (closeOrReload()) return;
            this.setMatrix(data, "play");
            this.paused = true;
            this.playing = false;
          },
          reload: () => {
            const id = "video.error.view";
            this.setMatrix(data, "play");
            this.paused = true;
            this.playing = false;
            this.showProgressView({
              buffered: 0,
              watched: data.schedule.watched,
              duration: data.schedule.duration
            });
            if ($(id)) $ui.animate({
              duration: 0.25,
              animation: () => $(id).alpha = 0,
              completion: () => $(id).remove()
            });
          },
          isEnterFullScreen: state => {
            this.displayingFullscreen = state;
            $(this.id).hidden = true;
            if (!this.ended && this.paused && this.canplay) this.play();
          },
          isExitFullScreen: state => {
            this.paused = true;
            this.playing = false;
            this.displayingFullscreen = state;
            $delay(0.2, () => $(this.id).hidden = false);
          },
          loadstart: () => this.showLoading(),
          buffered: schedule => this.showProgressView(schedule),
          canplay: () => {
            this.stopLoading();
            this.canplay = true;
          },
          canplaythrough: () => {
            this.stopLoading();
            this.canplay = true;
          },
          playing: () => {
            this.stopLoading();
            this.setMatrix(data, "pause");
            this.canplay = true;
            this.paused = false;
            this.playing = true;
          },
          waiting: () => {
            this.showLoading();
            this.canplay = false;
            this.playing = false;
          },
          error: () => {
            this.stopLoading();
            this.error();
            $ui.error("\u89c6\u9891\u52a0\u8f7d\u5931\u8d25");
          },
          durationchange: duration => {
            if (closeOrReload()) return;
            data.schedule.duration = duration;
          },
          loadedmetadata: () => {
            if (closeOrReload()) return;
            if (autoplay) this.play();
            this.setMatrix(data, "pause");
          },
          loadeddata: () => {
            if (closeOrReload()) return;
            const time = data.schedule.watched;
            const rate = $cache.get("playbackRate");
            this.progress(time);
            this.playbackRates(rate || 1.0);
          },
          timeupdate: watched => {
            if (closeOrReload()) return;
            if (data.opening !== this.opening) data.opening = this.opening;
            if (data.ending !== this.ending) data.ending = this.ending;
            const i = history.findIndex(item => item.id === data.id);
            data.schedule.watched = watched;
            i === -1 ? history.unshift(data) : history.unshift(history.splice(i, 1)[0] = data);
            this.autoPlay(history, data);
          },
          seeked: schedule => {
            const isOpening = data.opening && data.schedule.watched === data.opening;
            isOpening ? $ui.success(`\u5df2\u8df3\u8fc7\u7247\u5934${this.timeDisplay(data.opening)}`, 3) : data.schedule.watched ? $ui.success(`\u5df2\u4ece\u4e0a\u6b21\u64ad\u653e\u4f4d\u7f6e${this.timeDisplay(schedule.current, schedule.duration)}\u81ea\u52a8\u7eed\u64ad`, 3) : 0;
          }
        }
      });
    },
    play() {
      if ($(this.id)) $(this.id).notify({
        event: "play"
      });
      return $(this.id) ? true : false;
    },
    pause() {
      if ($(this.id)) $(this.id).notify({
        event: "pause"
      });
      return $(this.id) ? true : false;
    },
    reload() {
      if ($(this.id)) $(this.id).notify({
        event: "reload"
      });
      return $(this.id) ? true : false;
    },
    enterFullScreen() {
      if ($(this.id)) $(this.id).notify({
        event: "enterFullScreen"
      });
      return $(this.id) ? true : false;
    },
    exitFullScreen() {
      if ($(this.id)) $(this.id).notify({
        event: "exitFullScreen"
      });
      return $(this.id) ? true : false;
    },
    controls(display) {
      if ($(this.id)) $(this.id).notify({
        event: "controls",
        message: {display}
      });
      return $(this.id) ? true : false;
    },
    progress(time) {
      if ($(this.id)) $(this.id).notify({
        event: "progress",
        message: {time}
      });
      return $(this.id) ? true : false;
    },
    playbackRates(rate) {
      if ($(this.id)) $(this.id).notify({
        event: "playbackRates",
        message: {rate}
      });
      return $(this.id) ? true : false;
    }
  }
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
