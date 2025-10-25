'use client';

import { useEffect, useState } from 'react';

interface RainEffectProps {
  intensity?: 'light' | 'moderate' | 'heavy'; // 雨势强度
}

export default function RainEffect({ intensity = 'moderate' }: RainEffectProps) {
  const [raindrops, setRaindrops] = useState<Array<{
    id: number;
    left: number;
    animationDuration: number;
    animationDelay: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    // 根据雨势强度设置雨滴数量
    const dropCount = intensity === 'light' ? 50 : intensity === 'moderate' ? 100 : 150;
    
    const drops = Array.from({ length: dropCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100% 随机位置
      animationDuration: 0.5 + Math.random() * 0.5, // 0.5-1s 随机下落速度
      animationDelay: Math.random() * 2, // 0-2s 随机延迟
      opacity: 0.3 + Math.random() * 0.4, // 0.3-0.7 随机透明度
    }));

    setRaindrops(drops);
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-0.5 h-5 bg-gradient-to-b from-white/80 via-blue-200/60 to-transparent"
          style={{
            left: `${drop.left}%`,
            opacity: drop.opacity,
            animation: `rainFall ${drop.animationDuration}s linear infinite`,
            animationDelay: `${drop.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}
