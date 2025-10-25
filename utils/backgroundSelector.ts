// 根据天气状况和时间返回对应的背景类名

export function getBackgroundClass(icon: string, description: string): string {
  const desc = description.toLowerCase();
  
  // 判断是否为夜晚（图标代码以 'n' 结尾）
  const isNight = icon.includes('n');
  
  // 晴天
  if (icon.includes('01') || desc.includes('晴') || desc.includes('clear')) {
    return isNight ? 'bg-clear-night' : 'bg-clear-day';
  }
  
  // 多云
  if (icon.includes('02') || icon.includes('03') || icon.includes('04') || 
      desc.includes('云') || desc.includes('cloud')) {
    return isNight ? 'bg-cloudy-night' : 'bg-cloudy-day';
  }
  
  // 雨天
  if (icon.includes('09') || icon.includes('10') || 
      desc.includes('雨') || desc.includes('rain')) {
    return 'bg-rainy';
  }
  
  // 雷暴
  if (icon.includes('11') || desc.includes('雷') || desc.includes('thunder')) {
    return 'bg-thunderstorm';
  }
  
  // 雪天
  if (icon.includes('13') || desc.includes('雪') || desc.includes('snow')) {
    return 'bg-snowy';
  }
  
  // 雾/霾
  if (icon.includes('50') || desc.includes('雾') || desc.includes('霾') || 
      desc.includes('mist') || desc.includes('fog')) {
    return 'bg-misty';
  }
  
  // 默认
  return isNight ? 'bg-default-night' : 'bg-default-day';
}

// 获取天气图标 URL（OpenWeatherMap）
export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

// 根据天气状况获取 Emoji 表情
export function getWeatherEmoji(description: string): string {
  const desc = description.toLowerCase();
  
  if (desc.includes('晴') || desc.includes('clear')) {
    return '☀️';
  }
  if (desc.includes('云') || desc.includes('cloud')) {
    return '☁️';
  }
  if (desc.includes('雨') || desc.includes('rain')) {
    return '🌧️';
  }
  if (desc.includes('雷') || desc.includes('thunder')) {
    return '⛈️';
  }
  if (desc.includes('雪') || desc.includes('snow')) {
    return '❄️';
  }
  if (desc.includes('雾') || desc.includes('霾') || desc.includes('mist')) {
    return '🌫️';
  }
  
  return '🌤️';
}
