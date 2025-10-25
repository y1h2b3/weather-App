'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getWeatherIconUrl } from '@/utils/backgroundSelector';

interface WeatherIconProps {
  icon: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
  priority?: boolean;
}

export default function WeatherIcon({
  icon,
  description,
  size = 'medium',
  priority = false,
}: WeatherIconProps) {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    small: { width: 64, height: 64 },
    medium: { width: 120, height: 120 },
    large: { width: 200, height: 200 },
  };

  const { width, height } = sizeMap[size];
  const iconUrl = getWeatherIconUrl(icon);

  // 如果 Next.js Image 加载失败，使用普通 img 标签
  if (imageError) {
    return (
      <img
        src={iconUrl}
        alt={description}
        width={width}
        height={height}
        className="drop-shadow-lg"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    );
  }

  return (
    <Image
      src={iconUrl}
      alt={description}
      width={width}
      height={height}
      className="drop-shadow-lg"
      unoptimized
      priority={priority}
      onError={() => setImageError(true)}
    />
  );
}
