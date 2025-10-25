// 中文城市名称映射到英文/拼音
export const cityNameMapping: Record<string, string> = {
  // 直辖市
  '北京': 'Beijing',
  '上海': 'Shanghai',
  '天津': 'Tianjin',
  '重庆': 'Chongqing',
  
  // 省会城市
  '广州': 'Guangzhou',
  '深圳': 'Shenzhen',
  '成都': 'Chengdu',
  '杭州': 'Hangzhou',
  '武汉': 'Wuhan',
  '西安': 'Xi\'an',
  '南京': 'Nanjing',
  '郑州': 'Zhengzhou',
  '沈阳': 'Shenyang',
  '长沙': 'Changsha',
  '哈尔滨': 'Harbin',
  '济南': 'Jinan',
  '青岛': 'Qingdao',
  '大连': 'Dalian',
  '昆明': 'Kunming',
  '厦门': 'Xiamen',
  '合肥': 'Hefei',
  '南昌': 'Nanchang',
  '石家庄': 'Shijiazhuang',
  '长春': 'Changchun',
  '太原': 'Taiyuan',
  '南宁': 'Nanning',
  '贵阳': 'Guiyang',
  '福州': 'Fuzhou',
  '海口': 'Haikou',
  '兰州': 'Lanzhou',
  '呼和浩特': 'Hohhot',
  '乌鲁木齐': 'Urumqi',
  '银川': 'Yinchuan',
  '西宁': 'Xining',
  '拉萨': 'Lhasa',
  
  // 其他重要城市
  '苏州': 'Suzhou',
  '无锡': 'Wuxi',
  '宁波': 'Ningbo',
  '温州': 'Wenzhou',
  '珠海': 'Zhuhai',
  '东莞': 'Dongguan',
  '佛山': 'Foshan',
  '中山': 'Zhongshan',
  '惠州': 'Huizhou',
  '江门': 'Jiangmen',
  '湛江': 'Zhanjiang',
  '汕头': 'Shantou',
  '潮州': 'Chaozhou',
  '揭阳': 'Jieyang',
  '梅州': 'Meizhou',
  '茂名': 'Maoming',
  '肇庆': 'Zhaoqing',
  '韶关': 'Shaoguan',
  '清远': 'Qingyuan',
  '阳江': 'Yangjiang',
  '河源': 'Heyuan',
  '汕尾': 'Shanwei',
  '云浮': 'Yunfu',
  
  // 江苏
  '南通': 'Nantong',
  '常州': 'Changzhou',
  '徐州': 'Xuzhou',
  '扬州': 'Yangzhou',
  '镇江': 'Zhenjiang',
  '泰州': 'Taizhou',
  '盐城': 'Yancheng',
  '淮安': 'Huai\'an',
  '连云港': 'Lianyungang',
  '宿迁': 'Suqian',
  
  // 浙江
  '嘉兴': 'Jiaxing',
  '湖州': 'Huzhou',
  '绍兴': 'Shaoxing',
  '金华': 'Jinhua',
  '衢州': 'Quzhou',
  '台州': 'Taizhou',
  '丽水': 'Lishui',
  '舟山': 'Zhoushan',
  
  // 山东
  '烟台': 'Yantai',
  '潍坊': 'Weifang',
  '淄博': 'Zibo',
  '威海': 'Weihai',
  '临沂': 'Linyi',
  '济宁': 'Jining',
  '泰安': 'Tai\'an',
  '聊城': 'Liaocheng',
  '德州': 'Dezhou',
  '滨州': 'Binzhou',
  '菏泽': 'Heze',
  '枣庄': 'Zaozhuang',
  '东营': 'Dongying',
  '日照': 'Rizhao',
  '莱芜': 'Laiwu',
  
  // 河南
  '洛阳': 'Luoyang',
  '开封': 'Kaifeng',
  '新乡': 'Xinxiang',
  '焦作': 'Jiaozuo',
  '安阳': 'Anyang',
  '南阳': 'Nanyang',
  '商丘': 'Shangqiu',
  '信阳': 'Xinyang',
  '周口': 'Zhoukou',
  '驻马店': 'Zhumadian',
  '漯河': 'Luohe',
  '平顶山': 'Pingdingshan',
  '鹤壁': 'Hebi',
  '濮阳': 'Puyang',
  '许昌': 'Xuchang',
  '三门峡': 'Sanmenxia',
  
  // 四川
  '绵阳': 'Mianyang',
  '德阳': 'Deyang',
  '南充': 'Nanchong',
  '宜宾': 'Yibin',
  '自贡': 'Zigong',
  '乐山': 'Leshan',
  '泸州': 'Luzhou',
  '达州': 'Dazhou',
  '内江': 'Neijiang',
  '遂宁': 'Suining',
  '攀枝花': 'Panzhihua',
  '眉山': 'Meishan',
  '广安': 'Guang\'an',
  '资阳': 'Ziyang',
  '凉山': 'Liangshan',
  '广元': 'Guangyuan',
  '雅安': 'Ya\'an',
  '巴中': 'Bazhong',
  
  // 湖北
  '襄阳': 'Xiangyang',
  '宜昌': 'Yichang',
  '荆州': 'Jingzhou',
  '黄冈': 'Huanggang',
  '孝感': 'Xiaogan',
  '黄石': 'Huangshi',
  '咸宁': 'Xianning',
  '荆门': 'Jingmen',
  '鄂州': 'Ezhou',
  '随州': 'Suizhou',
  '十堰': 'Shiyan',
  
  // 湖南
  '株洲': 'Zhuzhou',
  '湘潭': 'Xiangtan',
  '衡阳': 'Hengyang',
  '岳阳': 'Yueyang',
  '常德': 'Changde',
  '郴州': 'Chenzhou',
  '永州': 'Yongzhou',
  '邵阳': 'Shaoyang',
  '怀化': 'Huaihua',
  '益阳': 'Yiyang',
  '张家界': 'Zhangjiajie',
  '娄底': 'Loudi',
  
  // 其他省份重要城市
  '保定': 'Baoding',
  '唐山': 'Tangshan',
  '秦皇岛': 'Qinhuangdao',
  '邯郸': 'Handan',
  '邢台': 'Xingtai',
  '包头': 'Baotou',
  '大同': 'Datong',
  '吉林': 'Jilin',
  '鞍山': 'Anshan',
  '抚顺': 'Fushun',
  '本溪': 'Benxi',
  '丹东': 'Dandong',
  '锦州': 'Jinzhou',
  '营口': 'Yingkou',
  '阜新': 'Fuxin',
  '辽阳': 'Liaoyang',
  '盘锦': 'Panjin',
  '铁岭': 'Tieling',
  '朝阳': 'Chaoyang',
  '葫芦岛': 'Huludao',
  
  // 港澳台
  '香港': 'Hong Kong',
  '澳门': 'Macau',
  '台北': 'Taipei',
  '高雄': 'Kaohsiung',
  '台中': 'Taichung',
  '台南': 'Tainan',
};

/**
 * 将城市名称转换为 API 可识别的格式
 * @param cityName 用户输入的城市名称（可能是中文或英文）
 * @returns API 可识别的英文城市名称
 */
export function convertCityName(cityName: string): string {
  const trimmedName = cityName.trim();
  
  // 如果是中文城市名，尝试转换
  if (cityNameMapping[trimmedName]) {
    return cityNameMapping[trimmedName];
  }
  
  // 如果不在映射表中，直接返回原名称（可能是英文或其他语言）
  return trimmedName;
}

/**
 * 检查是否为中文城市名
 * @param cityName 城市名称
 * @returns 是否为中文
 */
export function isChineseCityName(cityName: string): boolean {
  return /[\u4e00-\u9fa5]/.test(cityName);
}
