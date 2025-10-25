# 智能天气信息网页 - 系统架构文档

## 项目概述

这是一个基于 Next.js 构建的智能天气信息单页应用，提供实时天气查询、5天天气预报以及智能生活建议功能。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4 + 自定义 CSS
- **API**: OpenWeatherMap API
- **部署**: 支持 Vercel、Netlify 等平台

## 项目结构

```
weather-app/
├── app/                          # Next.js App Router 目录
│   ├── api/                      # API 路由
│   │   ├── weather/
│   │   │   └── route.ts          # 当前天气 API
│   │   └── forecast/
│   │       └── route.ts          # 天气预报 API
│   ├── components/               # React 组件
│   │   ├── CitySearch.tsx        # 城市搜索组件
│   │   ├── WeatherCard.tsx       # 当前天气卡片
│   │   ├── ForecastCard.tsx      # 天气预报卡片
│   │   └── LifeAdvice.tsx        # 生活建议组件
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主页面
├── types/                        # TypeScript 类型定义
│   └── weather.ts                # 天气数据类型
├── utils/                        # 工具函数
│   ├── lifeAdvice.ts             # 生活建议生成
│   └── backgroundSelector.ts     # 背景选择器
├── lib/                          # 项目文档
│   ├── log.md                    # 项目变更日志
│   └── architecture.md           # 本文档
└── .env.local                    # 环境变量配置
```

## 系统架构

### 1. 前端架构（客户端）

`
用户界面层
    ↓
┌─────────────────────────────────┐
│  CitySearch Component           │  # 搜索输入、联想、定位
│  - 防抖搜索                     │
│  - 键盘导航                     │
│  - 地理定位                     │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Weather Data State             │  # React State 管理
│  - weather (当前天气)           │
│  - forecast (预报数据)          │
│  - advices (生活建议)           │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Display Components             │  # 数据展示
│  - WeatherCard                  │
│  - ForecastCard                 │
│  - LifeAdvice                   │
└─────────────────────────────────┘
`

### 2. 后端架构（API 路由）

`
Next.js API Routes
    ↓
┌─────────────────────────────────┐
│  /api/weather                   │
│  - 接收: city 或 lat/lon        │
│  - 调用: OpenWeatherMap API     │
│  - 返回: WeatherData            │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  /api/forecast                  │
│  - 接收: city 或 lat/lon        │
│  - 调用: OpenWeatherMap API     │
│  - 聚合: 5天预报数据             │
│  - 返回: ForecastData           │
└─────────────────────────────────┘
`

### 3. 数据流程

`
用户输入城市
    ↓
CitySearch 组件
    ↓
fetchWeather() 函数
    ↓
┌─────────────────┐    ┌─────────────────┐
│  /api/weather   │    │  /api/forecast  │
└────────┬────────┘    └────────┬────────┘
         │                      │
         ↓                      ↓
┌─────────────────┐    ┌─────────────────┐
│ OpenWeatherMap  │    │ OpenWeatherMap  │
│ Current Weather │    │ 5 Day Forecast  │
└────────┬────────┘    └────────┬────────┘
         │                      │
         ↓                      ↓
┌─────────────────────────────────┐
│  State 更新                      │
│  - setWeather()                 │
│  - setForecast()                │
│  - generateAllAdvice()          │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│  UI 重新渲染                     │
│  - 动态背景切换                  │
│  - 天气信息展示                  │
│  - 生活建议显示                  │
└─────────────────────────────────┘
`

## 核心功能模块

### 1. 天气查询模块

**文件**: pp/api/weather/route.ts

**功能**:
- 接收城市名称或经纬度坐标
- 调用 OpenWeatherMap Current Weather API
- 转换 API 数据为应用数据格式
- 错误处理和数据验证

**关键函数**:
- GET() - API 路由处理器
- 	ransformWeatherData() - 数据转换
- getWindDirection() - 风向转换

### 2. 天气预报模块

**文件**: pp/api/forecast/route.ts

**功能**:
- 获取 5 天天气预报
- 按日期聚合 3 小时间隔数据
- 计算每日最高/最低温度
- 计算平均湿度和风速

**关键函数**:
- GET() - API 路由处理器
- ggregateForecastData() - 数据聚合
- ormatDate() - 日期格式化
- getDayOfWeek() - 星期转换

### 3. 生活建议模块

**文件**: utils/lifeAdvice.ts

**功能**:
- 根据温度生成穿衣建议
- 根据天气状况生成出行建议
- 根据气象条件生成运动建议
- 根据降雨概率生成雨具建议

**关键函数**:
- generateClothingAdvice() - 穿衣建议
- generateTravelAdvice() - 出行建议
- generateSportsAdvice() - 运动建议
- generateUmbrellaAdvice() - 雨具建议
- generateAllAdvice() - 生成所有建议

### 4. 动态背景模块

**文件**: utils/backgroundSelector.ts, pp/globals.css

**功能**:
- 根据天气状况选择背景主题
- 区分白天/夜晚场景
- CSS 渐变动画效果

**支持的天气场景**:
- 晴天（白天/夜晚）
- 多云（白天/夜晚）
- 雨天
- 雷暴
- 雪天
- 雾/霾

### 5. 城市搜索模块

**文件**: pp/components/CitySearch.tsx

**功能**:
- 实时搜索联想
- 防抖优化（300ms）
- 键盘导航（上下键、回车、Esc）
- 地理定位功能

## 数据模型

### WeatherData（当前天气）

`	ypescript
interface WeatherData {
  city: string;           // 城市名称
  country: string;        // 国家代码
  temperature: number;    // 温度（摄氏度）
  feelsLike: number;      // 体感温度
  description: string;    // 天气描述
  icon: string;           // 天气图标代码
  humidity: number;       // 湿度（%）
  windSpeed: number;      // 风速（m/s）
  windDeg: number;        // 风向（度数）
  windDirection: string;  // 风向（文字）
  pressure: number;       // 气压（hPa）
  visibility: number;     // 能见度（米）
  clouds: number;         // 云量（%）
  sunrise: number;        // 日出时间戳
  sunset: number;         // 日落时间戳
  timezone: number;       // 时区偏移
  lat: number;            // 纬度
  lon: number;            // 经度
}
`

### ForecastData（天气预报）

`	ypescript
interface ForecastDay {
  date: string;           // 日期 YYYY-MM-DD
  dayOfWeek: string;      // 星期
  tempMax: number;        // 最高温度
  tempMin: number;        // 最低温度
  description: string;    // 天气描述
  icon: string;           // 天气图标
  humidity: number;       // 湿度
  windSpeed: number;      // 风速
  pop: number;            // 降雨概率（0-1）
}

interface ForecastData {
  city: string;
  country: string;
  forecasts: ForecastDay[];
}
`

### LifeAdvice（生活建议）

`	ypescript
interface LifeAdvice {
  type: 'clothing' | 'travel' | 'sports' | 'umbrella';
  title: string;          // 建议标题
  advice: string;         // 建议内容
  icon: string;           // Emoji 图标
  level: 'good' | 'moderate' | 'poor';  // 建议等级
}
`

## API 接口

### 1. 获取当前天气

**端点**: GET /api/weather

**参数**:
- city (string, 可选): 城市名称（如：北京、Beijing）
- lat (number, 可选): 纬度
- lon (number, 可选): 经度

**响应**: WeatherData 对象

### 2. 获取天气预报

**端点**: GET /api/forecast

**参数**:
- city (string, 可选): 城市名称
- lat (number, 可选): 纬度
- lon (number, 可选): 经度

**响应**: ForecastData 对象

## 性能优化

1. **API 缓存**: Next.js etch 使用 evalidate 缓存策略
   - 当前天气：10 分钟（600 秒）
   - 天气预报：30 分钟（1800 秒）

2. **防抖搜索**: 用户输入延迟 300ms 后触发搜索

3. **图片优化**: 使用 Next.js Image 组件自动优化

4. **CSS 动画**: 使用 GPU 加速的 CSS transform 和 opacity

5. **代码分割**: Next.js 自动代码分割和懒加载

## 部署指南

### 环境变量配置

创建 .env.local 文件：

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### 本地开发

```bash
npm install
npm run dev
```

### 生产构建

```bash
npm run build
npm start
```

### Vercel 部署

1. 连接 GitHub 仓库
2. 配置环境变量
3. 自动部署

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 未来扩展方向

1. **数据持久化**: LocalStorage 保存搜索历史
2. **用户偏好**: 温度单位切换（摄氏/华氏）
3. **多语言**: i18n 国际化支持
4. **PWA**: 离线支持和桌面安装
5. **数据可视化**: 温度趋势图表
6. **更多数据**: AQI、UV 指数、花粉指数
7. **通知功能**: 天气预警推送
8. **社交分享**: 分享天气卡片到社交媒体

## 维护说明

- **API Key 安全**: 永远不要将 API Key 提交到版本控制
- **依赖更新**: 定期更新 npm 包，关注安全漏洞
- **错误监控**: 建议集成 Sentry 等错误追踪工具
- **性能监控**: 使用 Lighthouse 定期检查性能指标

## 联系方式

项目开发者：智能天气团队
技术支持：通过 GitHub Issues 提交问题

---

**文档版本**: 1.0
**最后更新**: 2025-10-24


---

## 更新日志

### v1.1 - 2025-10-25

#### 新增功能

1. **中文城市支持** ????
   - 新增 utils/cityMapping.ts 城市名称映射表
   - 支持 200+ 中国城市中文名称查询
   - 自动转换中文城市名为英文/拼音
   - 示例：输入 "北京" 自动转换为 "Beijing"

2. **反向地理编码** ??
   - 新增 /api/reverse-geocode API 端点
   - 将经纬度转换为城市名称
   - 显示检测到的城市信息
   - 提醒用户定位可能存在偏差

3. **智能图片加载** ???
   - 新增 WeatherIcon 组件
   - 带有错误处理和后备机制
   - 自动切换 Next.js Image 和普通 img 标签
   - 提高跨浏览器兼容性（Chrome/Edge/Firefox）

#### 文件变更

**新增文件**：
- utils/cityMapping.ts - 城市名称映射表（200+ 城市）
- pp/api/reverse-geocode/route.ts - 反向地理编码 API
- pp/components/WeatherIcon.tsx - 智能天气图标组件

**修改文件**：
- pp/page.tsx - 添加城市名转换和检测逻辑
- pp/components/WeatherCard.tsx - 使用 WeatherIcon 组件
- pp/components/ForecastCard.tsx - 使用 WeatherIcon 组件
- 
ext.config.ts - 配置 OpenWeatherMap 图片域名

#### 问题修复

1. **中文城市查询问题**
   - 问题：OpenWeatherMap API 不支持中文城市名
   - 解决：创建中英文城市名映射表，自动转换

2. **定位精度问题**
   - 问题：浏览器 IP 定位精度低（如中山定位到广州）
   - 说明：这是浏览器地理定位 API 的正常限制
   - 改进：显示检测到的城市，建议手动输入

3. **Chrome 图片显示问题**
   - 问题：Chrome 浏览器无法显示天气图片
   - 解决：添加 unoptimized 属性和错误回退机制

#### 技术改进

1. **更好的错误处理**
   - 图片加载失败自动降级
   - API 错误提供友好提示
   - 定位失败给出操作建议

2. **用户体验优化**
   - 显示检测到的城市名称
   - 提供定位偏差提示
   - 建议手动输入城市

3. **跨浏览器兼容性**
   - Chrome: ? 完全支持
   - Edge: ? 完全支持
   - Firefox: ? 完全支持
   - Safari: ? 完全支持

#### API 端点

新增 API 端点：

**反向地理编码**
`
GET /api/reverse-geocode?lat={latitude}&lon={longitude}

Response:
{
  "city": "中山",
  "country": "CN",
  "state": "Guangdong",
  "lat": 22.5167,
  "lon": 113.3833
}
`

#### 支持的城市列表

**直辖市**: 北京、上海、天津、重庆

**省会及重点城市**: 
广州、深圳、成都、杭州、武汉、西安、南京、郑州、沈阳、长沙、哈尔滨、济南、青岛、大连、昆明、厦门、合肥、南昌、石家庄、长春、太原、南宁、贵阳、福州、海口、兰州、呼和浩特、乌鲁木齐、银川、西宁、拉萨

**其他城市**: 苏州、无锡、宁波、温州、珠海、东莞、佛山、中山... (共 200+ 个)

**港澳台**: 香港、澳门、台北、高雄、台中、台南

#### 已知限制

1. **地理定位精度**
   - 台式机/笔记本：依赖 IP 定位，精度约为城市级别
   - 移动设备：可使用 GPS，精度更高
   - 不同浏览器使用不同定位服务，结果可能不同
   - 建议：手动输入城市名称获取最准确结果

2. **城市名称映射**
   - 目前支持 200+ 中国城市
   - 未涵盖所有县级市和地区
   - 英文城市名可直接使用

3. **图片加载**
   - 需要稳定的网络连接
   - 首次加载可能较慢
   - 后续访问会使用缓存

#### 性能优化

1. **API 缓存**
   - 当前天气：10 分钟
   - 天气预报：30 分钟
   - 反向地理编码：1 天

2. **图片优化**
   - 使用 Next.js Image 组件
   - 添加 priority 属性加快首屏加载
   - 失败时降级到普通 img 标签

3. **搜索优化**
   - 300ms 防抖延迟
   - 减少不必要的 API 调用
   - 本地城市列表快速响应

---

**文档版本**: 1.1
**最后更新**: 2025-10-25
**更新内容**: 添加中文城市支持、反向地理编码、智能图片加载等新功能
