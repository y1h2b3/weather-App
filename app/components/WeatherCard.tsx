import { WeatherData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export default function WeatherCard({ weather, loading, error }: WeatherCardProps) {
  if (loading) {
    return (
      <div className="glass-card p-8 animate-pulse">
        <div className="h-8 bg-white/20 rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-white/20 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-white/20 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-red-400 text-lg mb-2">⚠️ 获取失败</div>
        <div className="text-white/80">{error}</div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-white/80 text-lg">
          👆 请输入城市名称查询天气信息
        </div>
      </div>
    );
  }

  // 格式化当前时间
  const now = new Date();
  const timeStr = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateStr = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in">
      {/* 城市和时间 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
            {weather.city}
          </h2>
          <p className="text-white/70 text-sm">{weather.country}</p>
        </div>
        <div className="text-right">
          <div className="text-white text-lg font-medium">{timeStr}</div>
          <div className="text-white/70 text-xs">{dateStr}</div>
        </div>
      </div>

      {/* 主要天气信息 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <WeatherIcon
            icon={weather.icon}
            description={weather.description}
            size="medium"
            priority
          />
          <div>
            <div className="text-6xl md:text-7xl font-bold text-white">
              {weather.temperature}°
            </div>
            <div className="text-white/80 text-lg mt-1 capitalize">
              {weather.description}
            </div>
            <div className="text-white/60 text-sm mt-1">
              体感 {weather.feelsLike}°
            </div>
          </div>
        </div>
      </div>

      {/* 详细信息网格 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 湿度 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors">
          <div className="text-white/60 text-xs mb-1">湿度</div>
          <div className="text-white text-2xl font-semibold">
            {weather.humidity}%
          </div>
        </div>

        {/* 风速风向 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors">
          <div className="text-white/60 text-xs mb-1">风速</div>
          <div className="text-white text-2xl font-semibold">
            {weather.windSpeed} m/s
          </div>
          <div className="text-white/60 text-xs mt-1">{weather.windDirection}</div>
        </div>

        {/* 气压 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors">
          <div className="text-white/60 text-xs mb-1">气压</div>
          <div className="text-white text-2xl font-semibold">
            {weather.pressure}
          </div>
          <div className="text-white/60 text-xs mt-1">hPa</div>
        </div>

        {/* 能见度 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors">
          <div className="text-white/60 text-xs mb-1">能见度</div>
          <div className="text-white text-2xl font-semibold">
            {(weather.visibility / 1000).toFixed(1)}
          </div>
          <div className="text-white/60 text-xs mt-1">km</div>
        </div>
      </div>

      {/* 日出日落 */}
      <div className="mt-6 flex justify-around bg-white/5 rounded-xl p-4">
        <div className="text-center">
          <div className="text-white/60 text-xs mb-1">🌅 日出</div>
          <div className="text-white font-medium">
            {new Date(weather.sunrise * 1000).toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <div className="text-center">
          <div className="text-white/60 text-xs mb-1">🌇 日落</div>
          <div className="text-white font-medium">
            {new Date(weather.sunset * 1000).toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
