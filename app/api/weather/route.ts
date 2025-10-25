import { NextRequest, NextResponse } from 'next/server';
import { OpenWeatherResponse, WeatherData } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// 将风向度数转换为方位
function getWindDirection(deg: number): string {
  const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

// 转换 API 响应为应用数据格式
function transformWeatherData(data: OpenWeatherResponse): WeatherData {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    windDirection: getWindDirection(data.wind.deg),
    pressure: data.main.pressure,
    visibility: data.visibility,
    clouds: data.clouds.all,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
    lat: data.coord.lat,
    lon: data.coord.lon,
  };
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
      next: { revalidate: 600 }, // 缓存 10 分钟
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

    const data: OpenWeatherResponse = await response.json();
    const weatherData = transformWeatherData(data);

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: '获取天气数据失败，请稍后再试' },
      { status: 500 }
    );
  }
}
