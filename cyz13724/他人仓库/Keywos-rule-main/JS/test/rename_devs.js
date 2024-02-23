/* key 节点批量重命名 全部为本地操作 去除 简繁转换
 * 修改自 https://github.com/qwerzl/rename.js
 * 在SubStore内对节点重命名为：地区 01 ...
 * 过滤掉不规范命名的节点 例如 剩余,过期...
 * SubStore内选择"脚本操作"，填写脚本地址
 * 可配合argument一同使用。现支持参数：
 * cn 中文地区名称 例如 香港
 * us 英文地区名称 例如 HK
 * quan 英文全地名 例如 Hong Kong
 * ----------------------------
 * in：
 * 机场原节点名, 默认cn (可选us,cn,quan)
 * 例如 香港 01 香港 02 ...
 * out：
 * 修改后节点名, 默认us（可选us,cn,quan)
 * 例如 HK 01 HK 02 ...
 * name：
 * 每个节点前面添加自义定机场名
 * clear: 
 * 过滤掉关键词里正则匹配的「无用」节点
 * 如果一个地区只有一个节点，则去除它的"01"
 * nx:
 * 过滤掉高倍率 或者0.n倍 
 * 可选: 加nx为过滤 不加为不过滤
 * ----------------------------
 * 示例: 
 * https://github.com/Keywos/rule/raw/main/rename.js#in=cn&out=us&clear&nx
 *
 * https://keywos.cf/rename.js#in=cn&out=us&clear
 *
 * https://keywos.cf/rename.js#&clear
 */


// 正则过滤高倍率 (高倍|((?!.*(1|0\.\d))\d+倍|x|ˣ²|ˣ³|ˣ⁴|ˣ⁵|ˣ¹⁰))
const nameclear = /(套餐|到期|有效|剩余|版本|已用|过期|失联|测试|官方|网址|备用|群|TEST|客服|网站|获取|订阅|流量|机场|下次|官址|联系|邮箱|工单|USE|USED|TOTAL|EXPIRE|EMAIL)/i;

const us = ['HK', 'MO', 'TW', 'JP', 'KR', 'SG', 'SG', 'US', 'UK', 'FR', 'DE', 'AU', 'AU', 'AE', 'AF', 'AL', 'DZ', 'AO', 'AR', 'AM', 'AT', 'AZ', 'BH', 'BD', 'BY', 'BE', 'BZ', 'BJ', 'BT', 'BO', 'BA', 'BA', 'BW', 'BR', 'VG', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CO', 'KM', 'CG', 'CD', 'CR', 'HR', 'CY', 'CZ', 'DK', 'DJ', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FJ', 'FI', 'GA', 'GM', 'GE', 'GH', 'GR', 'GL', 'GT', 'GN', 'GY', 'HT', 'HN', 'HU', 'IS', 'IN', 'ID', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'CI', 'JM', 'JO', 'KZ', 'KE', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LT', 'LU', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MR', 'MU', 'MX', 'MD', 'MC', 'MN', 'ME', 'MA', 'MZ', 'MM', 'NA', 'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'KP', 'NO', 'OM', 'PK', 'PA', 'PY', 'PE', 'PH', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'SM', 'SA', 'SN', 'RS', 'SL', 'SK', 'SI', 'SO', 'ZA', 'ES', 'LK', 'SD', 'SR', 'SZ', 'SE', 'CH', 'SY', 'TJ', 'TZ', 'TH', 'TG', 'TO', 'TT', 'TN', 'TR', 'TM', 'VI', 'UG', 'UA', 'AE', 'AE', 'UY', 'UZ', 'VA', 'VE', 'VN', 'YE', 'YU', 'ZR', 'ZM', 'ZW', 'BD', 'CZ', 'AD','Chuncheon','Seoul','Osaka','Tokyo','London','Taipei','Taipei','Los Angeles','San Jose','Silicon Valley','Michigan','Mumbai','Frankfurt','Zurich','Moscow','Reunion','PL', 'CN'];
const cn = ['香港', '澳门', '台湾', '日本', '韩国', '新加坡', '狮城', '美国', '英国', '法国', '德国', '澳大利亚', '澳洲', '迪拜', '阿富汗', '阿尔巴尼亚', '阿尔及利亚', '安哥拉', '阿根廷', '亚美尼亚', '奥地利', '阿塞拜疆', '巴林', '孟加拉国', '白俄罗斯', '比利时', '伯利兹', '贝宁', '不丹', '玻利维亚', '波斯尼亚和黑塞哥维那', '波黑共和国', '博茨瓦纳', '巴西', '英属维京群岛', '文莱', '保加利亚', '布基纳法索', '布隆迪', '柬埔寨', '喀麦隆', '加拿大', '佛得角', '开曼群岛', '中非共和国', '乍得', '智利', '哥伦比亚', '科摩罗', '刚果(布)', '刚果(金)', '哥斯达黎加', '克罗地亚', '塞浦路斯', '捷克共和国', '丹麦', '吉布提', '多米尼加共和国', '厄瓜多尔', '埃及', '萨尔瓦多', '赤道几内亚', '厄立特里亚', '爱沙尼亚', '埃塞俄比亚', '斐济', '芬兰', '加蓬', '冈比亚', '格鲁吉亚', '加纳', '希腊', '格陵兰', '危地马拉', '几内亚', '圭亚那', '海地', '洪都拉斯', '匈牙利', '冰岛', '印度', '印度尼西亚', '印尼', '伊朗', '伊拉克', '爱尔兰', '马恩岛', '以色列', '意大利', '科特迪瓦', '牙买加', '约旦', '哈萨克斯坦', '肯尼亚', '科威特', '吉尔吉斯斯坦', '老挝', '拉脱维亚', '黎巴嫩', '莱索托', '利比里亚', '利比亚', '立陶宛', '卢森堡', '马其顿', '马达加斯加', '马拉维', '马来', '马尔代夫', '马里', '马耳他', '毛利塔尼亚', '毛里求斯', '墨西哥', '摩尔多瓦', '摩纳哥', '蒙古', '黑山共和国', '摩洛哥', '莫桑比克', '缅甸', '纳米比亚', '尼泊尔', '荷兰', '新西兰', '尼加拉瓜', '尼日尔', '尼日利亚', '朝鲜', '挪威', '阿曼', '巴基斯坦', '巴拿马', '巴拉圭', '秘鲁', '菲律宾', '葡萄牙', '波多黎各', '卡塔尔', '留尼旺', '罗马尼亚', '俄罗斯', '卢旺达', '圣马力诺', '沙特阿拉伯', '塞内加尔', '塞尔维亚', '塞拉利昂', '斯洛伐克', '斯洛文尼亚', '索马里', '南非', '西班牙', '斯里兰卡', '苏丹', '苏里南', '斯威士兰', '瑞典', '瑞士', '叙利亚', '塔吉克斯坦', '坦桑尼亚', '泰国', '多哥', '汤加', '特立尼达和多巴哥', '突尼斯', '土耳其', '土库曼斯坦', '美属维尔京群岛', '乌干达', '乌克兰', '阿拉伯联合酋长国', '阿联酋', '乌拉圭', '乌兹别克斯坦', '梵蒂冈城', '委内瑞拉', '越南', '也门', '南斯拉夫', '扎伊尔', '赞比亚', '津巴布韦', '孟加拉', '捷克','安道尔','春川','首尔','大坂','东京','伦敦','台北','新北','洛杉矶','圣何塞','硅谷','密歇根','孟买','法兰克福','苏黎世','莫斯科','留尼汪','波兰', '中国'];
const quan = ['Hong Kong', 'Macao', 'Taiwan', 'Japan', 'Korea', 'Singapore', 'Singapore', 'United States', 'United Kingdom', 'France', 'Germany', 'Australia', 'Australia', 'Dubai', 'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Argentina', 'Armenia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina-faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'Colombia', 'Comoros', 'Congo - Brazzaville', 'Congo - Kinshasa', 'Costa Rica', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominican Republic', 'Ecuador', 'Egypt', 'EI Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'Gabon', 'Gambia', 'Georgia', 'Ghana', 'Greece', 'Greenland', 'Guatemala', 'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Jordan', 'Kazakstan', 'Kenya', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar(Burma)', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Sierra Leone', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Tajikstan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'U.S. Virgin Islands', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Arab Emirates', 'Uruguay', 'Uzbekistan', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe', 'Bangladesh', 'Czech Republic','Andorra','Chuncheon','Seoul','Osaka','Tokyo','London','Taipei','Taipei','Los Angeles','San Jose','Silicon Valley','Michigan','Mumbai','Frankfurt','Zurich','Moscow','Reunion','Poland', 'China'];

switch ($arguments['in']) {
  case 'us':
    var inputList = us;
    break;
  case 'quan':
    var inputList = quan;
    break;
  default:
    var inputList = cn;
};

switch ($arguments['out']) {
  case 'us':
    var outputList = us;
    break;
  case 'quan':
    var outputList = quan;
    break;
  default:
    var outputList = cn;
};

var countries = {};
for (let i in inputList) {
  countries[inputList[i]] = [outputList[i], 0];
  // console.log(countries)
}

// 其它
var others = {
  '[Premium]': '[Premium]',
  专线: 'Spec',
  核心: 'Kern',
  边缘: 'Edge',
  高级: 'Pro',
  标准: 'Std',
  实验: 'Exp',
  商宽: 'Biz',
  家宽: 'Fam',
  LB: 'LB',
  //IPLC: 'Spec',
  //'IEPL': 'Spec',
  //沪日: 'SH-Japan',
  //沪韩: 'SH-Korea',
  //沪美: 'SH-United States',
  //广港: 'GZ-Hong Kong',
  //广新: 'GZ-Singapore',
  //深港: 'SZ-Hong Kong',
  //莞港: 'DG-Hong Kong',  
};

// var additionalOthers = $arguments.others || '{}';
// additionalOthers = JSON.parse(additionalOthers);
// others = Object.assign({}, additionalOthers, others);


// 获取机场名
const airport = ($arguments.name == undefined) ? '' : decodeURI($arguments.name);


// 删除简繁转换

// 主函数
function operator(proxies) {
  console.log(proxies)
   proxies = proxies.filter((res) => {
    if (res.name.match(/(高倍|((?!.*(1|0\.\d))\d+倍|x|ˣ²|ˣ³|ˣ⁴|ˣ⁵|ˣ¹⁰))/i)) {
      if ($arguments.nx) {
      return false; // regex: false del   true nodel
      } else {
        return true;
      }
    }
    return true;
  });
  const toBeDeleted = [];
  proxies.forEach((res) => {
    const resultArray = [airport];
    var matched = false;
    for (const elem of Object.keys(countries)) {
      if (res.name.indexOf(elem) !== -1) {
        countries[elem][1] += 1;
        
          resultArray.push(
            countries[elem][0],
            countries[elem][1].toString().padStart(2, "0")
          );
     
        matched = true;
        break;
      }
    }
    if (!matched) {
      resultArray.push(res.name);
      toBeDeleted.push(res);
    }
    // others
    Object.keys(others).forEach((elem, index) => {
      if (res.name.indexOf(elem) !== -1) {
        resultArray.splice(2, 0, others[elem]);
      }
    });

    res.name = resultArray.join(" ");
  });
  // 移除未匹配到的节点名
  toBeDeleted.forEach((proxy) => {
    const index = proxies.indexOf(proxy);
    if (index !== -1) {
      proxies.splice(index, 1);
    }
  });
  if ($arguments.clear) {
    proxies = stripOnes(proxies);
    proxies = proxies.filter(item => !nameclear.test(item.name));
  }
  
  return proxies;
}






//删除非必要的1
function stripOnes(proxies) {
  Object.keys(countries).forEach((item,index,array)=>{
    if (countries[item][1] === 1) {
      proxies.map((res) => {
        if (res.name.indexOf(countries[item][0]) !== -1) {
          res.name = res.name.replace("1", '').replace('0', '');
        };
      });
    };
  });
  return proxies
};

function getFlagEmoji(us) {
  const codePoints = us
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints).replace(/🇹🇼/g, "🇨🇳");
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
