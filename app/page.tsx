'use client';

import { useState } from 'react';
import CitySearch from './components/CitySearch';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LifeAdvice from './components/LifeAdvice';
import RainEffect from './components/RainEffect';
import SunEffect from './components/SunEffect';
import { WeatherData, ForecastData, LifeAdvice as LifeAdviceType } from '@/types/weather';
import { generateAllAdvice } from '@/utils/lifeAdvice';
import { getBackgroundClass } from '@/utils/backgroundSelector';
import { convertCityName } from '@/utils/cityMapping';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [advices, setAdvices] = useState<LifeAdviceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedCity, setDetectedCity] = useState<string | null>(null);

  // 获取天气数据
  const fetchWeather = async (city?: string, lat?: number, lon?: number) => {
    setLoading(true);
    setError(null);

    try {
      // 转换中文城市名为英文
      const convertedCity = city ? convertCityName(city) : undefined;
      
      // 获取当前天气
      let weatherUrl = '/api/weather?';
      if (convertedCity) {
        weatherUrl += `city=${encodeURIComponent(convertedCity)}`;
      } else if (lat && lon) {
        weatherUrl += `lat=${lat}&lon=${lon}`;
      }

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        const errorData = await weatherRes.json();
        throw new Error(errorData.error || '获取天气数据失败');
      }

      const weatherData: WeatherData = await weatherRes.json();
      setWeather(weatherData);

      // 获取天气预报
      let forecastUrl = '/api/forecast?';
      if (convertedCity) {
        forecastUrl += `city=${encodeURIComponent(convertedCity)}`;
      } else if (lat && lon) {
        forecastUrl += `lat=${lat}&lon=${lon}`;
      }

      const forecastRes = await fetch(forecastUrl);
      if (forecastRes.ok) {
        const forecastData: ForecastData = await forecastRes.json();
        setForecast(forecastData);

        // 生成生活建议
        const lifeAdvices = generateAllAdvice(weatherData, forecastData.forecasts[0]);
        setAdvices(lifeAdvices);
      }
    } catch (err: any) {
      console.error('Error fetching weather:', err);
      setError(err.message || '获取天气数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理城市搜索
  const handleCitySearch = (city: string) => {
    fetchWeather(city);
  };

  // 处理地理定位搜索
  const handleLocationSearch = async (lat: number, lon: number) => {
    try {
      // 高德定位已经返回了城市名，但我们仍使用OpenWeatherMap的反向地理编码确保一致性
      const geoResponse = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        setDetectedCity(geoData.city || null);
      }
    } catch (error) {
      console.error('获取城市名称失败:', error);
    }
    
    fetchWeather(undefined, lat, lon);
  };

  // 动态背景类名
  const backgroundClass = weather
    ? getBackgroundClass(weather.icon, weather.description)
    : 'bg-default-day';

  // 判断是否显示雨效果
  const isRaining = weather && (
    weather.description.toLowerCase().includes('雨') ||
    weather.description.toLowerCase().includes('rain') ||
    weather.icon.includes('09') ||
    weather.icon.includes('10')
  );

  // 根据天气图标判断雨势强度
  const getRainIntensity = (): 'light' | 'moderate' | 'heavy' => {
    if (!weather) return 'moderate';
    const desc = weather.description.toLowerCase();
    
    // 小雨
    if (desc.includes('小雨') || desc.includes('light rain') || desc.includes('drizzle')) {
      return 'light';
    }
    // 大雨/暴雨
    if (desc.includes('大雨') || desc.includes('暴雨') || desc.includes('heavy') || 
        weather.icon.includes('09')) {
      return 'heavy';
    }
    // 中雨（默认）
    return 'moderate';
  };

  // 判断是否显示太阳特效（晴天）
  const isClearSky = weather && (
    weather.description.toLowerCase().includes('晴') ||
    weather.description.toLowerCase().includes('clear') ||
    weather.icon.includes('01')
  );

  // 根据时间判断太阳的显示模式
  const getTimeOfDay = (): 'sunrise' | 'day' | 'sunset' | 'night' => {
    if (!weather) return 'day';
    
    const now = Date.now() / 1000; // 当前时间戳（秒）
    const sunrise = weather.sunrise;
    const sunset = weather.sunset;
    
    // 日出前后 1 小时
    const sunriseWindow = 3600; // 1小时 = 3600秒
    const sunsetWindow = 3600;
    
    // 判断是否在日出时段
    if (now >= sunrise - sunriseWindow && now <= sunrise + sunriseWindow) {
      return 'sunrise';
    }
    
    // 判断是否在日落时段
    if (now >= sunset - sunsetWindow && now <= sunset + sunsetWindow) {
      return 'sunset';
    }
    
    // 判断是否为夜晚
    if (now < sunrise || now > sunset) {
      return 'night';
    }
    
    // 白天
    return 'day';
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${backgroundClass}`}>
      {/* 下雨特效 */}
      {isRaining && <RainEffect intensity={getRainIntensity()} />}
      
      {/* 太阳特效（晴天） */}
      {isClearSky && (
        <SunEffect 
          timeOfDay={getTimeOfDay()} 
          sunriseTime={weather?.sunrise}
          sunsetTime={weather?.sunset}
        />
      )}
      
      <div className="min-h-screen backdrop-blur-sm bg-black/10">
        <div className="container mx-auto px-4 py-8">
          {/* 页面标题 */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              🌤️ 智能天气信息
            </h1>
            <p className="text-white/80 text-lg">
              精准预报 · 贴心建议 · 一目了然
            </p>
          </div>

          {/* 城市搜索 */}
          <div className="mb-8 animate-slide-up">
            <CitySearch
              onSearch={handleCitySearch}
              onLocationSearch={handleLocationSearch}
              loading={loading}
            />
            {/* 显示检测到的城市 */}
            {detectedCity && (
              <div className="mt-3 text-center">
                <p className="text-white/80 text-sm">
                  📍 检测到您的位置：<span className="font-medium text-white">{detectedCity}</span>
                </p>
                <p className="text-white/60 text-xs mt-1">
                  ℹ️ 浏览器定位可能存在偏差，建议手动输入城市名称获取更准确的天气
                </p>
              </div>
            )}
          </div>

          {/* 天气信息展示区域 */}
          <div className="space-y-6">
            {/* 当前天气卡片 */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <WeatherCard weather={weather} loading={loading} error={error} />
            </div>

            {/* 天气预报卡片 */}
            {forecast && (
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <ForecastCard forecast={forecast} loading={loading} />
              </div>
            )}

            {/* 生活建议 */}
            {advices.length > 0 && (
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <LifeAdvice advices={advices} />
              </div>
            )}
          </div>

          {/* 页脚 */}
          <div className="text-center mt-12 text-white/60 text-sm">
            <p>
              数据来源: OpenWeatherMap API | 天气更新时间: 10分钟
            </p>
            <p className="mt-2">
              © 2025 智能天气信息网页 - 为您提供精准的天气服务
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
