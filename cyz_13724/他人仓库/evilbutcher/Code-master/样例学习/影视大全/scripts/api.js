const database = require("./database");

module.exports = {
  api: "https://api.okzy.tv/api.php/provide/vod/at/json/",
  list: "?ac=list",
  detail: "?ac=detail",
  distribution: [{
    name: "\u6700\u65b0",
    id: "&h=24",
    subtabs: []
  },
  {
    name: "\u7535\u5f71",
    id: "&t=6",
    subtabs: [{
      name: "\u52a8\u4f5c\u7247",
      id: "&t=6"
    },
    {
      name: "\u559c\u5267\u7247",
      id: "&t=7"
    },
    {
      name: "\u7231\u60c5\u7247",
      id: "&t=8"
    },
    {
      name: "\u79d1\u5e7b\u7247",
      id: "&t=9"
    },
    {
      name: "\u6050\u6016\u7247",
      id: "&t=10"
    },
    {
      name: "\u5267\u60c5\u7247",
      id: "&t=11"
    },
    {
      name: "\u6218\u4e89\u7247",
      id: "&t=12"
    },
    {
      name: "\u8bb0\u5f55\u7247",
      id: "&t=20"
    },
    {
      name: "\u4f26\u7406\u7247",
      id: "&t=37"
    },
    {
      name: "\u5fae\u7535\u5f71",
      id: "&t=21"
    },
    {
      name: "\u8bf4\u7535\u5f71",
      id: "&t=36"
    }]
  },
  {
    name: "\u7535\u89c6\u5267",
    id: "&t=13",
    subtabs: [{
      name: "\u56fd\u4ea7\u5267",
      id: "&t=13"
    },
    {
      name: "\u9999\u6e2f\u5267",
      id: "&t=14"
    },
    {
      name: "\u97e9\u56fd\u5267",
      id: "&t=15"
    },
    {
      name: "\u53f0\u6e7e\u5267",
      id: "&t=16"
    },
    {
      name: "\u65e5\u672c\u5267",
      id: "&t=22"
    },
    {
      name: "\u6b27\u7f8e\u5267",
      id: "&t=23"
    },
    {
      name: "\u6d77\u5916\u5267",
      id: "&t=24"
    }]
  },
  {
    name: "\u7efc\u827a",
    id: "&t=25",
    subtabs: [{
      name: "\u5185\u5730\u7efc\u827a",
      id: "&t=25"
    },
    {
      name: "\u6e2f\u53f0\u7efc\u827a",
      id: "&t=26"
    },
    {
      name: "\u65e5\u97e9\u7efc\u827a",
      id: "&t=27"
    },
    {
      name: "\u6b27\u7f8e\u7efc\u827a",
      id: "&t=28"
    }]
  },
  {
    name: "\u52a8\u6f2b",
    id: "&t=29",
    subtabs: [{
      name: "\u56fd\u4ea7\u52a8\u6f2b",
      id: "&t=29"
    },
    {
      name: "\u65e5\u97e9\u52a8\u6f2b",
      id: "&t=30"
    },
    {
      name: "\u6b27\u7f8e\u52a8\u6f2b",
      id: "&t=31"
    },
    {
      name: "\u6e2f\u53f0\u52a8\u6f2b",
      id: "&t=32"
    },
    {
      name: "\u6d77\u5916\u52a8\u6f2b",
      id: "&t=33"
    }]
  }],
  request: async parameter => {
    const resp = await $http.request({
      method: "GET",
      url: module.exports.api + parameter,
      timeout: 10
    });
    const error = resp.error ? true : false;
    const list = error ? null : resp.data.list.filter(item => item.vod_play_url.includes("m3u8"));
    const _Null = !error && !list.length;
    const favorites = database.favorites.query();

    const data = error ? null : list.map(item => {
      const play = item.vod_play_url.split("$$$").find(item => item.includes("m3u8"));
      const down = item.vod_down_url ? item.vod_down_url.split("#") : [];
      const favorite = favorites.some(favorite => favorite.id === item.vod_id) ? 1 : 0;
      return {
        id: item.vod_id,
        favorite: favorite,
        pic: {
          src: item.vod_pic
        },
        mask: {
          alpha: item.vod_remarks ? 1 : 0
        },
        heart: {
          hidden: favorite ? false : true
        },
        remarks: {
          text: item.vod_remarks ? item.vod_remarks.trim() : ""
        },
        name: {
          text: item.vod_name.trim()
        },
        director: {
          text: item.vod_director ? "\u5bfc\u6f14：" + item.vod_director.trim() : ""
        },
        actor: {
          text: item.vod_actor ? "\u4e3b\u6f14：" + item.vod_actor.trim() : ""
        },
        year: {
          text: item.vod_year ? "\u4e0a\u6620\u65f6\u95f4：" + item.vod_year.trim() : ""
        },
        type: {
          text: (item.vod_lang ? "\u8bed\u8a00：" + item.vod_lang.trim() + (item.vod_area || item.type_name ? " ｜ " : "") : "") + (item.vod_area ? "\u5730\u533a：" + item.vod_area.trim() + (item.type_name ? " ｜ " : "") : "") + (item.type_name ? "\u7c7b\u578b：" + item.type_name.trim() : "")
        },
        info: item.vod_content.replace(/\s{2}|<(\/)?br(\s+)?(\/)?>/ig, "\n").replace(/<[\s\S]*?>|&[\s\S]*?;/g, "").replace(/\n+/g, "\n").trim(),
        play: play.split("#").map(item => {
          return {
            name: item.split("$")[0].trim(),
            url: item.split("$")[1]
          }
        }),
        down: down.map(item => {
          return {
            name: item.split("$")[0].trim(),
            url: encodeURI(item.split("$")[1])
          }
        })
      };
    });

    return {
      data: _Null || error ? [] : data,
      error: resp.error,
      total: _Null || error ? 0 : resp.data.total,
      pagecount: _Null || error ? 0 : resp.data.pagecount,
      message: _Null && parameter.includes("&wd") ? "\u672a\u641c\u7d22\u5230\u76f8\u5173\u8d44\u6e90" : _Null ? "\u83b7\u53d6\u76f8\u5173\u8d44\u6e90\u5931\u8d25" : error ? "\u65e0\u6cd5\u8fde\u63a5\u670d\u52a1\u5668" : "\u6210\u529f"
    };
  }
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
