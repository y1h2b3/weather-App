// 天气数据类型定义

// 当前天气数据
export interface WeatherData {
  city: string;
  country: string;
  temperature: number; // 摄氏度
  feelsLike: number; // 体感温度
  description: string; // 天气描述
  icon: string; // 天气图标代码
  humidity: number; // 湿度百分比
  windSpeed: number; // 风速 m/s
  windDeg: number; // 风向度数
  windDirection: string; // 风向文字描述
  pressure: number; // 气压 hPa
  visibility: number; // 能见度 米
  clouds: number; // 云量百分比
  sunrise: number; // 日出时间戳
  sunset: number; // 日落时间戳
  timezone: number; // 时区偏移秒数
  lat: number; // 纬度
  lon: number; // 经度
}

// 天气预报数据（单天）
export interface ForecastDay {
  date: string; // 日期 YYYY-MM-DD
  dayOfWeek: string; // 星期
  tempMax: number; // 最高温度
  tempMin: number; // 最低温度
  description: string; // 天气描述
  icon: string; // 天气图标代码
  humidity: number; // 湿度
  windSpeed: number; // 风速
  pop: number; // 降雨概率 0-1
}

// 天气预报数据（多天）
export interface ForecastData {
  city: string;
  country: string;
  forecasts: ForecastDay[];
}

// 城市信息
export interface City {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

// 生活建议类型
export interface LifeAdvice {
  type: 'clothing' | 'travel' | 'sports' | 'umbrella';
  title: string;
  advice: string;
  icon: string;
  level: 'good' | 'moderate' | 'poor'; // 建议等级
}

// OpenWeatherMap API 响应类型
export interface OpenWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// OpenWeatherMap 预报 API 响应类型
export interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
