'use client';

import { useEffect, useState } from 'react';

interface SunEffectProps {
  timeOfDay: 'sunrise' | 'day' | 'sunset' | 'night';
  sunriseTime?: number; // Unix timestamp
  sunsetTime?: number; // Unix timestamp
}

export default function SunEffect({ timeOfDay, sunriseTime, sunsetTime }: SunEffectProps) {
  const [rays, setRays] = useState<Array<{ id: number; rotation: number; delay: number }>>([]);

  useEffect(() => {
    // 生成 12 条光芒
    const sunRays = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      rotation: (360 / 12) * i,
      delay: i * 0.1,
    }));
    setRays(sunRays);
  }, []);

  // 根据时间段选择颜色和位置
  const getSunConfig = () => {
    switch (timeOfDay) {
      case 'sunrise':
        return {
          position: 'bottom-left',
          colors: {
            sun: 'from-orange-400 via-yellow-400 to-orange-300',
            glow: 'bg-orange-400/30',
            rays: 'bg-gradient-to-t from-orange-500/60 to-transparent',
          },
          size: 'w-32 h-32',
          label: '🌅 日出',
        };
      case 'sunset':
        return {
          position: 'bottom-right',
          colors: {
            sun: 'from-red-400 via-orange-400 to-pink-400',
            glow: 'bg-red-400/30',
            rays: 'bg-gradient-to-t from-pink-500/60 to-transparent',
          },
          size: 'w-32 h-32',
          label: '🌇 日落',
        };
      case 'day':
        return {
          position: 'top-center',
          colors: {
            sun: 'from-yellow-300 via-yellow-200 to-yellow-100',
            glow: 'bg-yellow-300/30',
            rays: 'bg-gradient-to-t from-yellow-400/50 to-transparent',
          },
          size: 'w-24 h-24',
          label: '☀️ 白天',
        };
      default:
        return null;
    }
  };

  const config = getSunConfig();
  if (!config || timeOfDay === 'night') return null;

  // 位置类名
  const positionClass = {
    'bottom-left': 'bottom-0 left-0 translate-x-[-30%] translate-y-[30%]',
    'bottom-right': 'bottom-0 right-0 translate-x-[30%] translate-y-[30%]',
    'top-center': 'top-20 left-1/2 -translate-x-1/2',
  }[config.position];

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* 太阳主体 */}
      <div className={`absolute ${positionClass} ${config.size} transition-all duration-1000`}>
        {/* 太阳光晕（外圈发光） */}
        <div
          className={`absolute inset-0 ${config.colors.glow} rounded-full blur-3xl animate-pulse`}
          style={{ transform: 'scale(2)' }}
        />

        {/* 太阳光芒 */}
        {rays.map((ray) => (
          <div
            key={ray.id}
            className="absolute top-1/2 left-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -50%) rotate(${ray.rotation}deg)`,
              animation: `sunRayPulse 3s ease-in-out infinite`,
              animationDelay: `${ray.delay}s`,
            }}
          >
            <div
              className={`w-1 h-24 ${config.colors.rays} rounded-full`}
              style={{ transformOrigin: 'bottom center' }}
            />
          </div>
        ))}

        {/* 太阳圆盘 */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-radial ${config.colors.sun} shadow-2xl animate-sun-glow`}
        />

        {/* 太阳内部闪光 */}
        <div className="absolute inset-0 rounded-full bg-white/40 animate-pulse" />
      </div>

      {/* 天空色彩渐变（日出/日落时） */}
      {(timeOfDay === 'sunrise' || timeOfDay === 'sunset') && (
        <div
          className={`absolute inset-0 ${
            timeOfDay === 'sunrise'
              ? 'bg-gradient-to-t from-orange-300/20 via-pink-200/10 to-transparent'
              : 'bg-gradient-to-t from-red-400/20 via-orange-300/15 to-purple-300/10'
          } animate-fade-in`}
        />
      )}

      {/* 漂浮的光点装饰 */}
      {(timeOfDay === 'sunrise' || timeOfDay === 'sunset') && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
