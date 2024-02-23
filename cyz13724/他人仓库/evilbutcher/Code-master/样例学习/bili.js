function bili() {
  const version = 1.08; //版本号
  //检测扩展更新
  scriptVersionUpdate();

  const ridArr = [0, 1, 3, 4, 5, 36, 119, 129]; //["全站", "动画",'音乐','游戏','娱乐','科技','鬼畜','舞蹈'],
  let listData = []; //首页数据
  let firstLoad = true; //首次加载
  let aid = 0; //当前av号
  let activeTab = 0; //默认tab index
  let hotList = []; //排行榜数据
  let searchLists = []; //搜索数据
  let searchPageNumber = 1; //搜索页码
  let searchText = ""; //关键词
  let firstSearch = true;
  let vedioListArr = [];
  let searchRanking = 1;
  let rid = 36; //排行id
  let rankActiveIndex = 0; //排行榜选中项

  let mainColor = $color("#fa7298");

  // https://app.bilibili.com/x/v2/search?build=6199&keyword=%E7%88%B1&pn=1&ps=20  搜索
  const vedioListUrl =
    "https://app.bilibili.com/x/feed/index?build=6190&network=wifi&platform=ios"; //列表  mobile&
  const repliesListUrl =
    "https://api.bilibili.com/x/v2/reply?plat=3&pn=1&ps=20&sort=0&type=1"; //评论
  // https://app.bilibili.com/x/v2/rank/region?pn=0&ps=100&rid=4
  //https://api.bilibili.com/x/article/categories     //分类?
  // https://bangumi.bilibili.com/appindex/cinema/fall?platform=ios&region=index  //落 首页 电影
  // https://bangumi.bilibili.com/appindex/cinema?platform=ios   //电影院
  // https://bangumi.bilibili.com/appindex/follow_index_fall?mobi_app=iphone&pagesize=30   //指数
  //https://api.live.bilibili.com/room/v1/AppIndex/getAllList?device=phone&platform=ios&scale=3   //房间  规模
  // https://app.bilibili.com/x/v2/view/page?access_key=611aaad5fb61b6494ce39b6d6ff9d4f3&actionKey=appkey&aid=23977784&appkey=27eb53fc9058f8c3&build=6190&device=phone&mobi_app=iphone&platform=ios&sign=f1de6b939e8c99cca1085f354436690f&ts=1527855897

  // 配置参数 调试模式
  const options = {
    debug: false
  };

  start();
  // 入口函数
  function start() {
    getlistData(vedioListUrl);
  }

  //获取首页数据
  async function getlistData(url) {
    let startTime = new Date().valueOf();
    var resp = await $http.get(url);
    let res = resp.data;
    if (res.code == 0) {
      var data = res.data;
      if (options.debug) {
        console.log("首页数据");
        console.log(data);
      }
      // var bannerData = data[0].banner_item; //轮播数据
      for (let i = 1; i < data.length; i++) {
        //去广告标示
        let param = data[i].param;
        let is_ad = data[i].is_ad;
        let duration = data[i].duration;
        //去广告
        if (is_ad != "" && duration != undefined) {
          // 去重复
          if (vedioListArr.indexOf(param) == -1) {
            let cover_duration_title = data[i].title; //标题
            let cover_duration_play =
              data[i].play > 10000
                ? Math.ceil(data[i].play / 1000) / 10 + "w"
                : " " + data[i].play + "次"; //播放量
            let cover_duration_duration = s_to_m_s(data[i].duration); //时长
            let cover_item_image = data[i].cover; //封面
            let cover_item_name = `Up: ${data[i].name}`; //up主
            let cover_item_tag_name = data[i].tname; //标签
            let cover_item_ctime = ms_To_md(data[i].ctime); //发布时间
            let cover_item_param = data[i].param; //av 号
            let cover_item_danmu = data[i].danmaku; //弹幕数量
            var obj = {
              cover_duration_title: {
                text: cover_duration_title //标题
              },
              cover_duration_play: {
                text: cover_duration_play //播放量
              },
              cover_duration_duration: {
                text: cover_duration_duration //时长
              },
              cover_item_image: {
                src: cover_item_image //封面
              },
              cover_item_name: {
                text: cover_item_name //up主
              },
              cover_item_tag_name: {
                text: cover_item_tag_name //标签
              },
              cover_item_ctime: {
                text: cover_item_ctime //发布时间
              },
              cover_item_param: {
                text: cover_item_param //av 号
              },
              cover_item_danmu: {
                text: cover_item_danmu //弹幕数量
              }
            };
            vedioListArr.push(cover_item_param); //加入对比列表
            listData.push(obj);
          } else {
            if (options.debug) console.log(`删除一项重复-av${param}`);
          }
        } else {
          if (options.debug) console.log("删除一项广告");
        }
      }
      if (!firstLoad) {
        $("vedioList").data = listData;
        return;
      } else {
        renderIndex(listData);
      }
      //首次加载需要渲染视图
      getlistData(vedioListUrl);
      firstLoad = false;
      if (options.debug)
        console.log(
          `加载时间:  ${(new Date().valueOf() - startTime) % 1000} s`
        );
    } else {
      return $ui.error("数据获取失败");
    }
  }

  //渲染首页
  function renderIndex(listData) {
    $ui.push({
      type: "view",
      props: {
        navBarHidden: true
      },
      views: [
        {
          type: "view",
          props: {
            id: "toolBar",
            bgcolor: mainColor
          },
          views: [
            {
              type: "button", //关闭按钮
              props: {
                font: $font("GillSans-Light", 20),
                bgcolor: $color("clear")
              },
              layout: function(make, view) {
                make.left.inset(10);
                make.top.equalTo(20);
                make.height.equalTo(40);
              },
              events: {
                tapped: function(sender) {
                  $app.close(0);
                }
              }
            },
            {
              type: "label",
              props: {
                id: "pageTitle", //标题
                text: "首页",
                font: $font("bold", 20),
                textColor: $color("#f5f5f5"),
                align: $align.center
              },
              layout: function(make, view) {
                make.left.right.equalTo(0);
                make.top.equalTo(20);
                make.height.equalTo(40);
              }
            },
            {
              type: "button", //关闭按钮
              props: {
                font: $font("GillSans-Light", 20),
                bgcolor: $color("clear")
              },
              layout: function(make, view) {
                make.right.inset(10);
                make.top.equalTo(20);
                make.height.equalTo(40);
              },
              events: {
                tapped: function(sender) {
                  $app.close(0);
                }
              }
            }
          ],
          layout: function(make, view) {
            make.top.left.right.equalTo(0);
            make.height.equalTo(60);
          },
          events: {
            tapped: function(sender) {}
          }
        },
        {
          type: "matrix", //九宫格
          props: {
            id: "vedioList",
            data: listData,
            bgcolor: $color("#f3f4f4"),
            columns: 2,
            itemHeight: 200, //高
            spacing: 10, //间隔
            square: false,
            radius: 10, //圆角,
            template: {
              views: [
                {
                  type: "view", //单个盒子
                  props: {
                    bgcolor: $color("#ffffff"),
                    textColor: $color("#555555"),
                    radius: 10,
                    borderWidth: 1,
                    borderColor: $color("#e8e8e8")
                  },
                  views: [
                    {
                      type: "image",
                      props: {
                        id: "cover_item_image" //封面图片
                      },
                      layout: function(make, view) {
                        make.top.left.right.equalTo(0);
                        make.height.equalTo(100);
                      }
                    }
                  ],
                  layout: function(make, view) {
                    make.top.bottom.left.right.equalTo(0);
                    make.height.equalTo(view.super);
                    make.width.equalTo(view.super);
                  }
                },
                {
                  type: "view",
                  props: {
                    font: $font(10)
                  },
                  views: [
                    {
                      type: "label", //半透明注释内容 (视频时间)
                      props: {
                        font: $font(12),
                        lines: 0,
                        textColor: $color("#f5f5f5")
                      },
                      views: [
                        {
                          type: "label", // 视频时长
                          props: {
                            id: "cover_duration_duration",
                            font: $font(12),
                            radius: 5,
                            bgcolor: $rgba(0, 0, 0, 0.5),
                            textColor: $color("#f5f5f5"),
                            align: $align.center
                          },
                          layout: function(make, view) {
                            make.top.equalTo(0);
                            make.right.equalTo(-1);
                            make.height.equalTo(20);
                            make.width.equalTo(40);
                          }
                        },
                        {
                          type: "label", //视频发布时间
                          props: {
                            id: "cover_item_ctime",
                            font: $font(12),
                            align: $align.center,
                            textColor: $color("#f5f5f5"),
                            bgcolor: mainColor
                          },
                          layout: function(make, view) {
                            make.top.equalTo(0);
                            make.left.equalTo(1);
                            make.width.equalTo(40);
                            make.height.equalTo(20);
                          }
                        }
                      ],
                      layout: function(make, view) {
                        make.top.equalTo(-20);
                        make.height.equalTo(20);
                        make.width.equalTo(view.super);
                      }
                    },
                    {
                      type: "label", //视频标题
                      props: {
                        id: "cover_duration_title",
                        font: $font("bold", 14),
                        lines: 0,
                        align: $align.center
                      },
                      layout: function(make, view) {
                        make.left.right.inset(5);
                        make.top.equalTo(10);
                        make.height.equalTo(30);
                      }
                    },
                    {
                      type: "label", //视频up主
                      props: {
                        id: "cover_item_name",
                        font: $font("Avenir-Light", 12),
                        align: $align.left
                      },
                      layout: function(make, view) {
                        make.left.right.inset(5);
                        make.top.equalTo(40);
                        make.height.equalTo(30);
                      }
                    },
                    {
                      type: "label", //视频标签
                      props: {
                        id: "cover_item_tag_name",
                        font: $font(12),
                        bgcolor: $color("#eee"),
                        align: $align.center,
                        radius: 10
                      },
                      layout: function(make, view) {
                        make.top.equalTo(70);
                        make.left.inset(5);
                        make.height.equalTo(20);
                        make.width.greaterThanOrEqualTo(60);
                      }
                    },
                    {
                      type: "label", // 播放量
                      props: {
                        id: "cover_duration_play",
                        font: $font(12),
                        bgcolor: $color("#eee"),
                        align: $align.center,
                        radius: 10
                      },
                      layout: function(make, view) {
                        make.top.equalTo(70);
                        make.right.inset(5);
                        make.height.equalTo(20);
                        make.width.greaterThanOrEqualTo(40);
                      }
                    }
                  ],
                  layout: function(make, view) {
                    make.top.equalTo(100);
                    make.left.right.bottom.equalTo(0);
                  }
                }
              ]
            }
          },
          layout: function(make, view) {
            make.top.equalTo(60);
            make.left.right.equalTo(0);
            make.bottom.equalTo(-60);
          },
          events: {
            didReachBottom: function(sender) {
              $ui.toast("加载中...", 0.5);
              getlistData(vedioListUrl);
              sender.endFetchingMore();
            },
            didSelect: function(sender, indexPath, data) {
              //打开网页
              aid = data.cover_item_param.text;
              let pageTitle = data.cover_duration_title.text; //设置标题
              openUrlInfo(pageTitle);
            }
          }
        },
        {
          type: "menu",
          props: {
            items: ["首页", "搜索", "排行榜"],
            borderColor: $color("#eee"),
            index: activeTab
          },
          layout: function(make) {
            make.left.right.equalTo(0);
            make.bottom.equalTo(-5);
            make.height.equalTo(60);
          },
          events: {
            changed: function(sender) {
              var items = sender.items;
              var index = sender.index;
              activeTab = index;
              switch (index) {
                case 0:
                  renderIndex(listData); //首页
                  break;

                  break;
                case 1:
                  $input.text({
                    type: $kbType.search,
                    placeholder: "输入搜索内容",
                    handler: function(text) {
                      searchText = text;
                      getSearchList(searchText, searchPageNumber); //搜索
                    }
                  });
                  break;
                case 2:
                  getRankList(rid); //排行榜
                  break;
                default:
                  break;
              }
            }
          }
        },
        {
          type: "view", //回到顶部
          props: {
            bgcolor: $color("#999"),
            alpha: 0.7,
            radius: 30 //圆角,
          },
          views: [
            {
              type: "label",
              props: {
                text: "↑",
                align: $align.center,
                textColor: $color("#fff")
              },
              layout: function(make, view) {
                make.center.equalTo(view.super);
              }
            }
          ],
          layout: function(make, view) {
            make.right.equalTo(-20);
            make.bottom.equalTo(-90);
            make.size.equalTo($size(60, 60));
          },
          events: {
            tapped: function(sender) {
              $("vedioList").scrollTo({
                indexPath: $indexPath(0, 0),
                animated: true // 默认为 true
              });
            }
          }
        }
      ]
    });
  }

  // 获取排行榜数据
  async function getRankList(rid) {
    let hotListUrl = `https://app.bilibili.com/x/v2/rank/region?rid=${rid}`; //排行榜
    if (hotList.length != 0) {
      return pushRankView(hotList, "排行榜");
    }
    var resp = await $http.get(hotListUrl);
    let res = resp.data;
    if (res.code == 0) {
      let data = res.data;
      if (options.debug) {
        console.log("排行榜数据");
        console.log(data);
      }
      for (let i = 0; i < data.length; i++) {
        let cover_item_image = data[i].cover; //封面
        let cover_duration_title = "" + data[i].title; //标题
        let cover_item_name = "" + data[i].name; //up主
        let cover_item_param = "" + data[i].param; //av 号
        let cover_item_ranking = i + 1 + ""; //排名
        let cover_duration_duration = s_to_m_s(data[i].duration); //时长
        let cover_duration_play =
          data[i].play > 10000
            ? Math.ceil(data[i].play / 1000) / 10 + "w"
            : " " + data[i].play + "次"; //播放量
        let cover_item_danmu = "弹幕:" + data[i].danmaku; //弹幕数量
        let cover_item_tag_name = data[i].rname; //标签
        let cover_item_ctime = ms_To_md(data[i].pubdate); //发布时间
        let obj = {
          cover_item_image: {
            src: cover_item_image
          },
          cover_duration_title: {
            text: cover_duration_title
          },
          cover_item_name: {
            text: "" + data[i].name //up主
          },
          cover_item_param: {
            text: "" + data[i].param //av 号
          },
          cover_item_ranking: {
            text: i + 1 + "" //排名
          },
          cover_duration_duration: {
            text: cover_duration_duration
          },
          cover_duration_play: {
            text: cover_duration_play
          },
          cover_item_danmu: {
            text: cover_item_danmu
          },
          cover_item_tag_name: {
            text: cover_item_tag_name
          },
          cover_item_ctime: {
            text: cover_item_ctime
          }
        };
        hotList.push(obj);
      }
      pushRankView(hotList, "排行榜");
    } else {
      return $ui.error("数据获取失败");
    }
  }

  // 排行榜渲染
  function pushRankView(hotList, pageName) {
    $ui.push({
      props: {
        navBarHidden: true
      },
      views: [
        {
          type: "view",
          props: {},
          views: [
            {
              type: "view",
              props: {
                id: "toolBar",
                bgcolor: mainColor
              },
              views: [
                {
                  type: "button", //关闭按钮
                  props: {
                    bgcolor: $color("clear")
                  },
                  layout: function(make, view) {
                    make.left.inset(10);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  },
                  events: {
                    tapped: function(sender) {
                      $app.close(0);
                    }
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "pageTitle", //标题
                    text: pageName,
                    font: $font("bold", 20),
                    textColor: $color("#f5f5f5"),
                    align: $align.center
                  },
                  layout: function(make, view) {
                    make.left.right.equalTo(0);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  }
                },
                {
                  type: "button", //关闭按钮
                  props: {
                    bgcolor: $color("clear")
                  },
                  layout: function(make, view) {
                    make.right.inset(10);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  },
                  events: {
                    tapped: function(sender) {
                      $app.close(0);
                    }
                  }
                }
              ],
              layout: function(make, view) {
                make.top.left.right.equalTo(0);
                make.height.equalTo(60);
              },
              events: {
                tapped: function(sender) {}
              }
            },
            {
              type: "menu",
              props: {
                items: [
                  "全站",
                  "动画",
                  "音乐",
                  "游戏",
                  "娱乐",
                  "科技",
                  "鬼畜",
                  "舞蹈"
                ],
                index: rankActiveIndex
              },
              layout: function(make) {
                make.top.equalTo(60);
                make.left.right.equalTo(0);
                make.height.equalTo(60);
              },
              events: {
                changed: function(sender) {
                  let items = sender.items;
                  let index = sender.index;
                  rid = ridArr[index];
                  rankActiveIndex = index;
                  hotList.length = 0;
                  getRankList(rid);
                }
              }
            },
            {
              type: "matrix",
              props: {
                id: "hotList",
                columns: 1,
                data: hotList,
                bgcolor: $color("#f3f4f4"),
                itemHeight: 100, //高
                spacing: 10, //间隔
                square: false,
                radius: 10, //圆角,
                template: {
                  props: {
                    bgcolor: $color("#fff"),
                    radius: 10 //圆角,
                  },
                  views: [
                    {
                      type: "image", //左封面
                      props: {
                        id: "cover_item_image"
                      },
                      layout: function(make, view) {
                        make.height.equalTo(view.super);
                        make.width.equalTo(180);
                        make.left.top.bottom.equalTo(0);
                      }
                    },
                    {
                      type: "label", //播放时间
                      props: {
                        id: "cover_duration_duration",
                        bgcolor: $rgba(0, 0, 0, 0.5),
                        align: $align.center,
                        textColor: $color("#fff"),
                        font: $font(14)
                      },
                      layout: function(make, view) {
                        make.left.equalTo(0);
                        make.height.equalTo(30);
                        make.top.equalTo(70);
                        make.width.equalTo(50);
                      }
                    },
                    {
                      type: "label", //排名
                      props: {
                        id: "cover_item_ranking",
                        bgcolor: mainColor,
                        align: $align.center,
                        textColor: $color("#fff"),
                        font: $font(14)
                      },
                      layout: function(make, view) {
                        make.left.equalTo(150);
                        make.height.equalTo(30);
                        make.top.equalTo(70);
                        make.width.equalTo(30);
                      }
                    },
                    {
                      type: "view", //右侧盒子
                      props: {
                        bgcolor: $color("#fff")
                      },
                      views: [
                        {
                          type: "label",
                          props: {
                            id: "cover_duration_title", //标题
                            align: $align.center,
                            font: $font("bold", 14)
                          },
                          layout: function(make, view) {
                            make.top.equalTo(0);
                            make.left.right.inset(5);
                            make.height.equalTo(30);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_item_name", //up主
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.center
                          },
                          layout: function(make, view) {
                            make.left.right.equalTo(0);
                            make.top.equalTo(30);
                            make.height.equalTo(30);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_item_tag_name", //标签
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.left
                          },
                          layout: function(make, view) {
                            make.left.right.equalTo(10);
                            make.top.equalTo(80);
                            make.height.equalTo(20);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_duration_play", //播放量
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.right
                          },
                          layout: function(make, view) {
                            make.left.right.equalTo(0);
                            make.top.equalTo(60);
                            make.height.equalTo(20);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_item_ctime", //发布时间
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.left
                          },
                          layout: function(make, view) {
                            make.left.equalTo(10);
                            make.width.equalTo(130);
                            make.top.equalTo(60);
                            make.height.equalTo(20);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_item_danmu", //弹幕数
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.right
                          },
                          layout: function(make, view) {
                            make.left.right.equalTo(0);
                            make.top.equalTo(80);
                            make.height.equalTo(20);
                          }
                        }
                      ],
                      layout: function(make, view) {
                        make.left.equalTo(180);
                        make.top.bottom.right.equalTo(0);
                      }
                    }
                  ]
                }
              },
              events: {
                didReachBottom: function(sender) {
                  $ui.toast("加载中...", 0.5);
                  if (pageName != "排行榜") {
                    searchPageNumber++;
                    getSearchList(searchText, searchPageNumber); //搜索
                  }
                  sender.endFetchingMore();
                },
                didSelect: function(sender, indexPath, data) {
                  //打开网页
                  aid = data.cover_item_param.text;
                  let pageTitle = data.cover_duration_title.text; //设置标题
                  openUrlInfo(pageTitle);
                }
              },
              layout: function(make, view) {
                make.top.equalTo(120);
                make.left.right.equalTo(0);
                make.bottom.equalTo(-60);
              }
            },
            {
              type: "menu",
              props: {
                items: ["首页", "搜索", "排行榜"],
                borderColor: $color("#eee"),
                index: activeTab
              },
              layout: function(make) {
                make.left.right.equalTo(0);
                make.bottom.equalTo(-5);
                make.height.equalTo(60);
              },
              events: {
                changed: function(sender) {
                  var items = sender.items;
                  var index = sender.index;
                  activeTab = index;
                  switch (index) {
                    case 0:
                      renderIndex(listData); //首页
                      break;

                    case 1:
                      $input.text({
                        type: $kbType.search,
                        placeholder: "输入搜索内容",
                        handler: function(text) {
                          searchText = text;
                          getSearchList(searchText, searchPageNumber); //搜索
                        }
                      });
                      break;
                    case 2:
                      getRankList(rid); //排行榜
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            {
              type: "view", //回到顶部
              props: {
                bgcolor: $color("#999"),
                alpha: 0.7,
                radius: 30 //圆角,
              },
              views: [
                {
                  type: "label",
                  props: {
                    text: "↑",
                    align: $align.center,
                    textColor: $color("#fff")
                  },
                  layout: function(make, view) {
                    make.center.equalTo(view.super);
                  }
                }
              ],
              layout: function(make, view) {
                make.right.equalTo(-20);
                make.bottom.equalTo(-90);
                make.size.equalTo($size(60, 60));
              },
              events: {
                tapped: function(sender) {
                  $("hotList").scrollTo({
                    indexPath: $indexPath(0, 0),
                    animated: true // 默认为 true
                  });
                }
              }
            }
          ],
          layout: function(make, view) {
            make.top.bottom.left.right.equalTo(0);
          }
        }
      ]
    });
  }

  //分类渲染
  function pushClassifyView() {
    $ui.push({
      props: {
        navBarHidden: true
      },
      views: [
        {
          type: "view",
          props: {},
          views: [
            {
              type: "view",
              props: {
                id: "toolBar",
                bgcolor: mainColor
              },
              views: [
                {
                  type: "button", //关闭按钮
                  props: {
                    bgcolor: $color("clear")
                  },
                  layout: function(make, view) {
                    make.left.inset(10);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  },
                  events: {
                    tapped: function(sender) {
                      $app.close(0);
                    }
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "pageTitle", //标题
                    text: "分类",
                    font: $font("bold", 20),
                    textColor: $color("#f5f5f5"),
                    align: $align.center
                  },
                  layout: function(make, view) {
                    make.left.right.equalTo(0);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  }
                },
                {
                  type: "button", //关闭按钮
                  props: {
                    bgcolor: $color("clear")
                  },
                  layout: function(make, view) {
                    make.right.inset(10);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  },
                  events: {
                    tapped: function(sender) {
                      $app.close(0);
                    }
                  }
                }
              ],
              layout: function(make, view) {
                make.top.left.right.equalTo(0);
                make.height.equalTo(60);
              },
              events: {
                tapped: function(sender) {}
              }
            },
            {
              type: "label",
              props: {
                text: "功能待添加 :)",
                align: $align.center
              },
              layout: function(make, view) {
                make.center.equalTo(view.super);
              }
            },
            {
              type: "menu",
              props: {
                items: ["首页", "分类", "搜索", "排行榜"],
                borderColor: $color("#eee"),
                index: activeTab
              },
              layout: function(make) {
                make.left.right.equalTo(0);
                make.bottom.equalTo(-5);
                make.height.equalTo(60);
              },
              events: {
                changed: function(sender) {
                  var items = sender.items;
                  var index = sender.index;
                  activeTab = index;
                  switch (index) {
                    case 0:
                      renderIndex(listData); //首页
                      break;
                    case 1:
                      pushClassifyView();
                      break;
                    case 2:
                      $input.text({
                        type: $kbType.search,
                        placeholder: "输入搜索内容",
                        handler: function(text) {
                          searchText = text;
                          getSearchList(searchText, searchPageNumber); //搜索
                        }
                      });
                      break;
                    case 3:
                      getRankList(rid); //排行榜
                      break;
                    default:
                      break;
                  }
                }
              }
            }
          ],
          layout: function(make, view) {
            make.top.bottom.left.right.equalTo(0);
          }
        }
      ]
    });
  }

  //搜索列表渲染
  function pushSearchView(hotList, pageName) {
    $ui.push({
      props: {
        navBarHidden: true
      },
      views: [
        {
          type: "view",
          props: {},
          views: [
            {
              type: "view",
              props: {
                id: "toolBar",
                bgcolor: mainColor
              },
              views: [
                {
                  type: "button", //关闭按钮
                  props: {
                    bgcolor: $color("clear")
                  },
                  layout: function(make, view) {
                    make.left.inset(10);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  },
                  events: {
                    tapped: function(sender) {
                      $app.close(0);
                    }
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "pageTitle", //标题
                    text: pageName,
                    font: $font("bold", 20),
                    textColor: $color("#f5f5f5"),
                    align: $align.center
                  },
                  layout: function(make, view) {
                    make.left.right.equalTo(0);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  }
                },
                {
                  type: "button", //关闭按钮
                  props: {
                    bgcolor: $color("clear")
                  },
                  layout: function(make, view) {
                    make.right.inset(10);
                    make.top.equalTo(20);
                    make.height.equalTo(40);
                  },
                  events: {
                    tapped: function(sender) {
                      $app.close(0);
                    }
                  }
                }
              ],
              layout: function(make, view) {
                make.top.left.right.equalTo(0);
                make.height.equalTo(60);
              },
              events: {
                tapped: function(sender) {}
              }
            },
            {
              type: "matrix",
              props: {
                id: "hotList",
                columns: 1,
                data: hotList,
                bgcolor: $color("#f3f4f4"),
                itemHeight: 100, //高
                spacing: 10, //间隔
                square: false,
                radius: 10, //圆角,
                template: {
                  props: {
                    bgcolor: $color("#fff"),
                    radius: 10 //圆角,
                  },
                  views: [
                    {
                      type: "image", //左封面
                      props: {
                        id: "cover_item_image"
                      },
                      layout: function(make, view) {
                        make.height.equalTo(view.super);
                        make.width.equalTo(180);
                        make.left.top.bottom.equalTo(0);
                      }
                    },
                    {
                      type: "label", //播放时间
                      props: {
                        id: "cover_duration_duration",
                        bgcolor: $rgba(0, 0, 0, 0.5),
                        align: $align.center,
                        textColor: $color("#fff"),
                        font: $font(14)
                      },
                      layout: function(make, view) {
                        make.left.equalTo(0);
                        make.height.equalTo(30);
                        make.top.equalTo(70);
                        make.width.equalTo(50);
                      }
                    },
                    {
                      type: "label", //排名
                      props: {
                        id: "cover_item_ranking",
                        bgcolor: mainColor,
                        align: $align.center,
                        textColor: $color("#fff"),
                        font: $font(14)
                      },
                      layout: function(make, view) {
                        make.left.equalTo(150);
                        make.height.equalTo(30);
                        make.top.equalTo(70);
                        make.width.equalTo(30);
                      }
                    },
                    {
                      type: "view", //右侧盒子
                      props: {
                        bgcolor: $color("#fff")
                      },
                      views: [
                        {
                          type: "label",
                          props: {
                            id: "cover_duration_title", //标题
                            align: $align.center,
                            font: $font("bold", 14)
                          },
                          layout: function(make, view) {
                            make.top.left.right.equalTo(0);
                            make.height.equalTo(30);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_item_name", //up主
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.center
                          },
                          layout: function(make, view) {
                            make.left.right.equalTo(0);
                            make.top.equalTo(30);
                            make.height.equalTo(30);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_item_tag_name", //标签
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.left
                          },
                          layout: function(make, view) {
                            make.left.right.equalTo(10);
                            make.top.equalTo(80);
                            make.height.equalTo(20);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_duration_play", //播放量
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.right
                          },
                          layout: function(make, view) {
                            make.left.right.equalTo(0);
                            make.top.equalTo(60);
                            make.height.equalTo(20);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_item_ctime", //发布时间
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.left
                          },
                          layout: function(make, view) {
                            make.left.equalTo(10);
                            make.width.equalTo(130);
                            make.top.equalTo(60);
                            make.height.equalTo(20);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "cover_item_danmu", //弹幕数
                            font: $font(14),
                            textColor: $color("#adadad"),
                            align: $align.right
                          },
                          layout: function(make, view) {
                            make.left.right.equalTo(0);
                            make.top.equalTo(80);
                            make.height.equalTo(20);
                          }
                        }
                      ],
                      layout: function(make, view) {
                        make.left.equalTo(180);
                        make.top.bottom.right.equalTo(0);
                      }
                    }
                  ]
                }
              },
              events: {
                didReachBottom: function(sender) {
                  $ui.toast("加载中...", 0.5);
                  if (pageName != "排行榜") {
                    searchPageNumber++;
                    getSearchList(searchText, searchPageNumber); //搜索
                  }
                  sender.endFetchingMore();
                },
                didSelect: function(sender, indexPath, data) {
                  //打开网页
                  aid = data.cover_item_param.text;
                  let pageTitle = data.cover_duration_title.text; //设置标题
                  openUrlInfo(pageTitle);
                }
              },
              layout: function(make, view) {
                make.top.equalTo(60);
                make.left.right.equalTo(0);
                make.bottom.equalTo(-60);
              }
            },
            {
              type: "menu",
              props: {
                items: ["首页", "搜索", "排行榜"],
                borderColor: $color("#eee"),
                index: activeTab
              },
              layout: function(make) {
                make.left.right.equalTo(0);
                make.bottom.equalTo(-5);
                make.height.equalTo(60);
              },
              events: {
                changed: function(sender) {
                  var items = sender.items;
                  var index = sender.index;
                  activeTab = index;
                  switch (index) {
                    case 0:
                      renderIndex(listData); //首页
                      break;

                    case 1:
                      $input.text({
                        type: $kbType.search,
                        placeholder: "输入搜索内容",
                        handler: function(text) {
                          searchText = text;
                          getSearchList(searchText, searchPageNumber); //搜索
                        }
                      });
                      break;
                    case 2:
                      getRankList(rid); //排行榜
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            {
              type: "view", //回到顶部
              props: {
                bgcolor: $color("#999"),
                alpha: 0.7,
                radius: 30 //圆角,
              },
              views: [
                {
                  type: "label",
                  props: {
                    text: "↑",
                    align: $align.center,
                    textColor: $color("#fff")
                  },
                  layout: function(make, view) {
                    make.center.equalTo(view.super);
                  }
                }
              ],
              layout: function(make, view) {
                make.right.equalTo(-20);
                make.bottom.equalTo(-90);
                make.size.equalTo($size(60, 60));
              },
              events: {
                tapped: function(sender) {
                  $("hotList").scrollTo({
                    indexPath: $indexPath(0, 0),
                    animated: true // 默认为 true
                  });
                }
              }
            }
          ],
          layout: function(make, view) {
            make.top.bottom.left.right.equalTo(0);
          }
        }
      ]
    });
  }

  // 获取搜索数据
  async function getSearchList(keyword, pageNumber) {
    let pageName = "搜索:" + keyword;
    keyword = $text.URLEncode(keyword);
    var searchUrl = `http://app.bilibili.com/x/v2/search?build=6199&keyword=${keyword}&pn=${pageNumber}&ps=20`;
    var resp = await $http.get(searchUrl);
    let res = resp.data;
    if (res.code == 0) {
      let data = res.data;
      if (options.debug) {
        console.log("搜索数据");
        console.log(data);
      }
      let archives = data.items.archive;
      if (!archives) {
        return $ui.error("数据获取失败!");
      }
      for (let i = 0; i < archives.length; i++) {
        if (!archives[i].danmaku) {
          archives[i].danmaku = 0;
        }
        let cover_item_image = "https://" + archives[i].cover.substring(2); //封面
        let cover_duration_duration = archives[i].duration; //时长
        let cover_duration_title = "" + archives[i].title; //标题
        let cover_item_ranking = searchRanking + ""; //排名
        let cover_item_name = "" + archives[i].author; //up主
        let cover_item_param = "" + archives[i].param; //av 号
        let cover_item_danmu = "弹幕:" + archives[i].danmaku; //弹幕数量
        let cover_duration_play =
          "" + archives[i].play > 10000
            ? Math.ceil(archives[i].play / 1000) / 10 + "w"
            : " " + archives[i].play + "次"; //播放量
        let cover_item_ctime = archives[i].desc; //发布时间
        var obj = {
          cover_item_image: {
            src: cover_item_image
          },
          cover_duration_duration: {
            text: cover_duration_duration
          },
          cover_duration_title: {
            text: cover_duration_title
          },
          cover_item_ranking: {
            text: cover_item_ranking
          },
          cover_item_name: {
            text: cover_item_name
          },
          cover_item_param: {
            text: cover_item_param
          },
          cover_item_danmu: {
            text: cover_item_danmu
          },
          cover_duration_play: {
            text: cover_duration_play
          },
          cover_item_ctime: {
            cover_item_ctime
          }
        };
        searchRanking++; //搜索数量
        searchLists.push(obj);
      }

      if (firstSearch) {
        pushSearchView(searchLists, pageName);
      } else {
        $("hotList").data = searchLists;
      }
      firstSearch = false;
    } else {
      return $ui.error("数据获取失败");
    }
  }
  //获取详情数据
  function openUrlInfo(pageTitle) {
    let repliesList = [];
    $ui.push({
      props: {
        navBarHidden: true
      },
      views: [
        {
          type: "view",
          props: {
            id: "toolBar",
            bgcolor: mainColor
          },
          views: [
            {
              type: "button", //关闭按钮
              props: {
                bgcolor: $color("clear")
              },
              layout: function(make, view) {
                make.left.inset(10);
                make.top.equalTo(20);
                make.height.equalTo(40);
              },
              events: {
                tapped: function(sender) {
                  $ui.pop();
                }
              }
            },
            {
              type: "label",
              props: {
                id: "pageTitle", //标题
                text: pageTitle,
                font: $font("bold", 20),
                textColor: $color("#f5f5f5"),
                align: $align.center
              },
              layout: function(make, view) {
                make.left.right.inset(70);
                make.top.equalTo(20);
                make.height.equalTo(40);
              }
            },
            {
              type: "button", //关闭按钮
              props: {
                bgcolor: $color("clear")
              },
              layout: function(make, view) {
                make.right.inset(10);
                make.top.equalTo(20);
                make.height.equalTo(40);
              },
              events: {
                tapped: function(sender) {
                  $ui.pop();
                }
              }
            }
          ],
          layout: function(make, view) {
            make.top.left.right.equalTo(0);
            make.height.equalTo(60);
          },
          events: {
            tapped: function(sender) {}
          }
        },
        {
          type: "web",
          props: {
            id: "vedioWeb",
            showsProgress: true,
            inlineMedia: false,
            scrollEnabled: false,
            canGoForward: false,
            canGoBack: false,
            ua:
              "Mozilla/5.0 (Linux; Android 6.0; PRO 6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile BiliApp/6.2 TBS/043221 Safari/537.36 V1_AND_SQ_7.0.0_676_YYB_D QQ/7.0.0.3135 NetType/WIFI WebP/0.3.0 Pixel/1080",
            url: `https://m.bilibili.com/video/av${aid}.html`,
            style:
              ".index__videoPage__src-videoPage-{padding-top:0px;}.player-container .player-box .display .load-layer>img{filter: none;-webkit-filter: none;}.index__player__src-videoPage-player- .index__videoTime__src-videoPage-player-{background-color: rgba(0,0,0,.3)}" //去除头部app推广
          },
          layout: function(make, view) {
            make.top.equalTo(60);
            make.height.equalTo(240);
            make.width.equalTo(view.super);
          }
        },
        {
          type: "label",
          props: {
            text: pageTitle,
            font: $font(14),
            lines: 4,
            align: $align.center
          },
          layout: function(make, view) {
            make.top.equalTo(300);
            make.width.equalTo(view.super);
            make.height.equalTo(60);
          }
        },
        {
          type: "button",
          props: {
            title: "保存封面",
            bgcolor: $color("#409eff")
          },
          layout: function(make, view) {
            make.top.equalTo(360);
            make.width.equalTo(160);
            make.height.equalTo(40);
            make.left.equalTo(20);
          },
          events: {
            tapped: function(sender) {
              $ui.toast("正在获取..");
              $http
                .get({
                  url: `http://www.galmoe.com/t.php?aid=${aid}`
                })
                .then(function(resp) {
                  var data = resp.data;
                  console.log(data);
                  $ui.loading(false);
                  if (data.result == 1) {
                    let url = data.url;
                    saveImage(url);
                  } else {
                    $ui.alert("封面获取失败！:(");
                  }
                });
            }
          }
        },
        {
          type: "button",
          props: {
            title: "跳转客户端",
            bgcolor: $color("#e9799b")
          },
          layout: function(make, view) {
            make.top.equalTo(360);
            make.width.equalTo(160);
            make.height.equalTo(40);
            make.right.equalTo(-20);
          },
          events: {
            tapped: function(sender) {
              let urlScheme = "bilibili://?av=" + aid;
              $app.openURL(urlScheme);
            }
          }
        },
        {
          type: "button",
          props: {
            title: "刷新",
            bgcolor: $color("#909399")
          },
          layout: function(make, view) {
            make.top.equalTo(410);
            make.width.equalTo(160);
            make.height.equalTo(40);
            make.left.equalTo(20);
          },
          events: {
            tapped: function(sender) {
              $("vedioWeb").reload();
            }
          }
        },
        {
          type: "button",
          props: {
            title: "分享给朋友",
            bgcolor: $color("#f48081")
          },
          layout: function(make, view) {
            make.top.equalTo(410);
            make.width.equalTo(160);
            make.height.equalTo(40);
            make.right.equalTo(-20);
          },
          events: {
            tapped: function(sender) {
              let shareUrl = `https://m.bilibili.com/video/av${aid}.html`;
              $share.sheet(shareUrl);
            }
          }
        },
        {
          type: "matrix", //评论
          props: {
            columns: 1,
            id: "repliesList", //评论区域
            bgcolor: $color("#f3f4f4"),
            itemHeight: 100, //高
            spacing: 10, //间隔
            square: false,
            radius: 10, //圆角,
            template: {
              props: {
                bgcolor: $color("#fff"),
                radius: 10
              },
              views: [
                {
                  type: "label",
                  props: {
                    id: "replies_content_message", //内容
                    font: $font(14),
                    lines: 4,
                    align: $align.center
                  },
                  layout: function(make, view) {
                    make.left.equalTo(5);
                    make.right.equalTo(-5);
                    make.height.equalTo(60);
                    make.top.equalTo(5);
                  }
                },
                {
                  type: "image",
                  props: {
                    id: "replies_uimg", //头像
                    radius: 15,
                    borderWidth: 1,
                    borderColor: $color("#eee")
                  },
                  layout: function(make, view) {
                    make.right.equalTo(-10);
                    make.size.equalTo($size(30, 30));
                    make.top.equalTo(65);
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "replies_uname", //用户名
                    font: $font("bold", 12),
                    align: $align.right
                  },
                  layout: function(make, view) {
                    make.left.equalTo(10);
                    make.right.equalTo(-50);
                    make.height.equalTo(40);
                    make.top.equalTo(60);
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "replies_ctime", //时间
                    font: $font("bold", 10),
                    align: $align.right,
                    textColor: $color("#838fa7")
                  },
                  layout: function(make, view) {
                    make.left.equalTo(10);
                    make.right.equalTo(-50);
                    make.height.equalTo(14);
                    make.top.equalTo(86);
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "replies_like", //赞
                    font: $font("bold", 14),
                    textColor: $color("#f56c6c"),
                    align: $align.left
                  },
                  layout: function(make, view) {
                    make.left.equalTo(10);
                    make.right.equalTo(-50);
                    make.height.equalTo(40);
                    make.top.equalTo(60);
                  }
                }
              ]
            }
          },
          events: {
            didSelect(sender, indexPath, data) {
              $ui.push({
                props: {
                  navBarHidden: true
                },
                views: [
                  {
                    type: "view",
                    props: {
                      id: "toolBar",
                      bgcolor: mainColor
                    },
                    views: [
                      {
                        type: "button", //关闭按钮
                        props: {
                          font: $font("GillSans-Light", 20),
                          bgcolor: $color("clear")
                        },
                        layout: function(make, view) {
                          make.left.inset(10);
                          make.top.equalTo(20);
                          make.height.equalTo(40);
                        },
                        events: {
                          tapped: function(sender) {
                            $ui.pop();
                          }
                        }
                      },
                      {
                        type: "label",
                        props: {
                          id: "pageTitle", //标题
                          text: data.replies_uname.text,
                          textColor: $color("#f5f5f5"),
                          align: $align.center
                        },
                        layout: function(make, view) {
                          make.left.right.inset(70);
                          make.top.equalTo(20);
                          make.height.equalTo(40);
                        }
                      },
                      {
                        type: "button", //关闭按钮
                        props: {
                          font: $font("GillSans-Light", 20),
                          bgcolor: $color("clear")
                        },
                        layout: function(make, view) {
                          make.right.inset(10);
                          make.top.equalTo(20);
                          make.height.equalTo(40);
                        },
                        events: {
                          tapped: function(sender) {
                            $ui.pop();
                          }
                        }
                      }
                    ],
                    layout: function(make, view) {
                      make.top.left.right.equalTo(0);
                      make.height.equalTo(60);
                    },
                    events: {
                      tapped: function(sender) {}
                    }
                  },
                  {
                    type: "text",
                    props: {
                      text: data.replies_content_message.text,
                      align: $align.center,
                      lines: 0,
                      insets: 20,
                      editable: false
                    },
                    layout: function(make, view) {
                      make.top.equalTo(80);
                      make.left.right.bottom.inset(20);
                    }
                  }
                ]
              });
            }
          },
          layout: function(make, view) {
            make.top.equalTo(460);
            make.left.right.equalTo(0);
            make.bottom.equalTo(0);
          }
        }
      ],
      layout: function(make, view) {
        make.top.left.bottom.right.equalTo(0);
      }
    });
    getCommont(repliesList);
  }

  //获取评论数据
  function getCommont(repliesList) {
    $http.get(`${repliesListUrl}&oid=${aid}`).then(function(resp) {
      var res = resp.data;
      if (res.code == 0) {
        var data = res.data;
        var hots = data.hots; //热门
        var replies = data.replies; //回复

        //热评
        for (let i = 0; i < 3; i++) {
          changeReplies(repliesList, hots, i);
        }
        // 普通评论
        for (let i = 0; i < replies.length; i++) {
          changeReplies(repliesList, replies, i);
        }
        $("repliesList").data = repliesList;
      }
    });
  }

  // --------------------------------工具函数-----------------------------------
  //评论转换
  function changeReplies(repliesList, replies, i) {
    let replies_content_message = replies[i].content.message; //内容
    let replies_uname = replies[i].member.uname; //用户名
    let usex = replies[i].member.sex; //性别
    let replies_uimg = replies[i].member.avatar; //头像
    let replies_like = replies[i].like; //赞
    let level = replies[i].member.level_info.current_level; //等级
    let replies_ctime = ms_To_mdhms(replies[i].ctime); //时间
    let obj = {
      replies_content_message: {
        text: ` ${replies_content_message}`,
        textColor: $color("#555")
      },
      replies_uname: {
        text: `Lv${level}  ${replies_uname}` //用户名
      },
      replies_like: {
        text: `赞:  ${replies_like}` //赞
      },
      replies_uimg: {
        src: replies_uimg
      },
      replies_ctime: {
        text: replies_ctime
      }
    };
    if (usex == "男") {
      obj.replies_uname.text += " ♂";
      obj.replies_uname.textColor = $color("#409eff");
    } else if (usex == "女") {
      obj.replies_uname.text += " ♀";
      obj.replies_uname.textColor = $color("#f25d8e");
    } else {
      obj.replies_uname.textColor = $color("#555");
    }
    repliesList.push(obj);
  }

  //秒数转为 00:00
  function s_to_m_s(s) {
    if (!s) {
      return "--:--";
    }
    let min = Math.floor(s / 60);
    min = min < 10 ? "0" + min : min;
    let sec = s % 60;
    sec = sec < 10 ? "0" + sec : sec;
    return min + ":" + sec;
  }
  //时间戳转换为 12-01
  function ms_To_md(timestamp) {
    let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + " ";
    return M + D;
  }
  //时间戳转换为 12-01 12:00
  function ms_To_mdhms(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + "-";
    M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    D = date.getDate() < 10 ? "0" + date.getDate() : date.getMonth() + 1;
    h = " " + date.getHours() + ":";
    m =
      date.getMinutes() < 10
        ? `0${date.getMinutes()}:`
        : `${date.getMinutes()}:`;
    s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    return Y + M + D + h + m + s;
  }

  //检测扩展更新
  function scriptVersionUpdate() {}

  // 保存图片
  function saveImage(imgUrl) {
    $http.download({
      url: imgUrl,
      progress: function(bytesWritten, totalBytes) {
        var percentage = (bytesWritten * 1.0) / totalBytes;
      },
      handler: function(resp) {
        $photo.save({
          data: resp.data,
          handler: function(success) {
            $ui.loading(false);
            if (success == 1) {
              $ui.alert("封面保存成功");
            } else {
              $ui.alert("保存失败!");
            }
          }
        });
      }
    });
  }
}

module.exports = {
  bili: bili
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
