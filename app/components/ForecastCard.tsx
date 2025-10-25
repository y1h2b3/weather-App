import { ForecastData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  forecast: ForecastData | null;
  loading: boolean;
}

export default function ForecastCard({ forecast, loading }: ForecastCardProps) {
  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="h-6 bg-white/20 rounded w-32 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-40 bg-white/20 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!forecast || forecast.forecasts.length === 0) {
    return null;
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-xl font-bold text-white mb-4">未来天气预报</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {forecast.forecasts.map((day, index) => (
          <div
            key={day.date}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
          >
            {/* 日期 */}
            <div className="text-center mb-3">
              <div className="text-white/80 text-sm font-medium">
                {index === 0 ? '今天' : day.dayOfWeek}
              </div>
              <div className="text-white/60 text-xs mt-1">
                {day.date.substring(5)}
              </div>
            </div>

            {/* 天气图标 */}
            <div className="flex justify-center mb-3">
              <WeatherIcon
                icon={day.icon}
                description={day.description}
                size="small"
              />
            </div>

            {/* 天气描述 */}
            <div className="text-white/70 text-xs text-center mb-3 capitalize">
              {day.description}
            </div>

            {/* 温度 */}
            <div className="flex justify-between items-center">
              <span className="text-white text-lg font-semibold">
                {day.tempMax}°
              </span>
              <span className="text-white/60 text-sm">
                {day.tempMin}°
              </span>
            </div>

            {/* 降雨概率 */}
            {day.pop > 0.2 && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <div className="text-blue-300 text-xs text-center">
                  ☂️ {Math.round(day.pop * 100)}%
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
