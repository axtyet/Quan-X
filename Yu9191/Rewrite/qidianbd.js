var objc = JSON.parse($response.body);

    objc = {
  "Message" : "",
  "Result" : 0,
  "Data" : {
    "PursueBookCard" : {
      "ShowTab" : 0,
      "Url" : "https://h5.if.qidian.com/h5/chaseBookCard?_viewmode=0"
    },
    "BenefitButtonList" : [
    ],//福利中心
    "FreshManGuideSwitch" : 1,
    "DianNiangWorldSwitch" : 1,
    "FunctionButtonList" : [
    ],//我发布的
    "SchoolText" : "校园福利专区",
    "DianNiangUrl" : "QDReader://h5.if.qidian.com/h5/dian/home?_viewmode=0",
    "SchoolUrl" : "https://h5v6.if.qidian.com/h5/campusArea?_viewmode=0",
    "UserBasicInfo" : {
      "UserId" : 428156494,
      "LevelName" : "普通用户",
      "Head" : "https://raw.githubusercontent.com/Yu9191/-/main/dingdangmao.jpg",
      "LevelNumber" : 0,
      "FrameId" : 0,
      "LevelActionUrl" : "QDReader://h5.if.qidian.com/statics/profile/scorelevel.html;QDReader://h5.if.qidian.com/statics/profile/vip.html?_viewmode=1",
      "Level" : "Lv.8",//等级
      "FrameUrl" : "",
      "NickName" : "lovebabyforever"
    },
    "AccountBalance" : {
      "QdWorthBalance" : 0,
      "ChapterCardUrl" : "QDReader://h5.if.qidian.com/h5/account/chpCard",
      "ChapterCard" : 88,
      "YdBalance" : 88,
      "YdFreeBalance" : 0,
      "RechargeAd" : {
        "PositionMark" : "mypagenew_CHONGZHI",
        "Id" : 0
      },
      "Coupon" : 88,
      "Hints" : [
      ],
      "CouponUrl" : "QDReader://h5.if.qidian.com/h5/account/coupon",
      "RecTicketUrl" : "QDReader://h5.if.qidian.com/statics/profile/rcm.html",
      "MonthTicket" : 888,
      "MonthTicketUrl" : "QDReader://h5.if.qidian.com/h5/mine/monthTicket",
      "YdWorthBalance" : 0,
      "QdBalance" : 0,
      "BalanceUrl" : "QDReader://h5.if.qidian.com/h5/account/profile?_viewmode=0",
      "QdFreeBalance" : 0
    },
    "DianNiangWorldImage" : "https://imgservices-1252317822.image.myqcloud.com/coco/s08172023/7d97970a.0ahv62.png",
    "SchoolImage" : "https://imgservices-1252317822.image.myqcloud.com/coco/s04032023/61cfb167.v4twxh.png",
    "BottomButtonList" : [
      {
        "PositionMark" : "mypagenew_BANGZHUYUKEFU",
        "Url" : "https://t.me/chxm1023",
        "Name" : "点击进入作者TG频道",
        "Desc" : "",
        "DescType" : 0,
        "Image" : "https://readx-her-1252317822.file.myqcloud.com/yuewen-amis/backend/e9c208cff366b7be49ca1bf402851b42.png"
      }
    ],
    "Member" : {
      "ExpireTips" : "2099-09-29",
      "SubTitle" : "2099-09-09到期|权益升级！新增2万+免费有声书等福利",
      "ExpireTime" : 4092599349000,
      "ActionUrl" : "https://h5.if.qidian.com/h5/vip-card/entry?_viewmode=0",
      "ButtonTitle" : "立即续费",
      "CardId" : "member",
      "IsMember" : 1,
      "MemberType" : 1,
      "Title" : "超级起点会员",
      "IconUrl" : "https://qidian.qpic.cn/qidian_common/349573/b607187c713dc16bb9b2f09d1119843c/0",
      "IsAuto" : 0,
      "NextFeeTime" : 0
    }
  }
}

$done({body : JSON.stringify(objc)});
