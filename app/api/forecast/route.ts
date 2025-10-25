import { NextRequest, NextResponse } from 'next/server';
import { OpenWeatherForecastResponse, ForecastData, ForecastDay } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// 将时间戳转换为日期字符串
function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split('T')[0];
}

// 获取星期几
function getDayOfWeek(timestamp: number): string {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const date = new Date(timestamp * 1000);
  return days[date.getDay()];
}

// 聚合每天的天气数据
function aggregateForecastData(data: OpenWeatherForecastResponse): ForecastDay[] {
  const dailyData: { [key: string]: any[] } = {};

  // 按日期分组
  data.list.forEach((item) => {
    const date = formatDate(item.dt);
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  // 处理每一天的数据
  const forecasts: ForecastDay[] = [];
  Object.entries(dailyData).forEach(([date, items]) => {
    if (forecasts.length >= 5) return; // 只取5天

    // 计算当天的最高和最低温度
    const temps = items.map((item) => item.main.temp);
    const tempMax = Math.round(Math.max(...temps));
    const tempMin = Math.round(Math.min(...temps));

    // 选择中午时段的天气描述（更有代表性）
    const midDayItem = items.find((item) => {
      const hour = new Date(item.dt * 1000).getHours();
      return hour >= 12 && hour <= 15;
    }) || items[Math.floor(items.length / 2)];

    // 计算平均湿度和风速
    const avgHumidity = Math.round(
      items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length
    );
    const avgWindSpeed = Number(
      (items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length).toFixed(1)
    );

    // 计算最高降雨概率
    const maxPop = Math.max(...items.map((item) => item.pop));

    forecasts.push({
      date,
      dayOfWeek: getDayOfWeek(items[0].dt),
      tempMax,
      tempMin,
      description: midDayItem.weather[0].description,
      icon: midDayItem.weather[0].icon,
      humidity: avgHumidity,
      windSpeed: avgWindSpeed,
      pop: maxPop,
    });
  });

  return forecasts;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    // 验证参数
    if (!city && (!lat || !lon)) {
      return NextResponse.json(
        { error: '请提供城市名称或经纬度坐标' },
        { status: 400 }
      );
    }

    // 构建 API URL
    let url = `${BASE_URL}?appid=${API_KEY}&units=metric&lang=zh_cn`;
    
    if (city) {
      url += `&q=${encodeURIComponent(city)}`;
    } else {
      url += `&lat=${lat}&lon=${lon}`;
    }

    // 调用 OpenWeatherMap API
    const response = await fetch(url, {
      next: { revalidate: 1800 }, // 缓存 30 分钟
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: '找不到该城市，请检查城市名称' },
          { status: 404 }
        );
      }
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'API 密钥无效' },
          { status: 401 }
        );
      }
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'API 调用次数已达上限，请稍后再试' },
          { status: 429 }
        );
      }
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data: OpenWeatherForecastResponse = await response.json();
    const forecasts = aggregateForecastData(data);

    const forecastData: ForecastData = {
      city: data.city.name,
      country: data.city.country,
      forecasts,
    };

    return NextResponse.json(forecastData);
  } catch (error) {
    console.error('Forecast API Error:', error);
    return NextResponse.json(
      { error: '获取天气预报失败，请稍后再试' },
      { status: 500 }
    );
  }
}
