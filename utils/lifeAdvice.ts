import { WeatherData, LifeAdvice, ForecastDay } from '@/types/weather';

// 根据温度生成穿衣建议
export function generateClothingAdvice(temp: number): LifeAdvice {
  let advice = '';
  let level: 'good' | 'moderate' | 'poor' = 'good';
  
  if (temp < 0) {
    advice = '严寒天气，建议穿羽绒服、厚棉衣、皮夹克等保暖性好的衣物，戴好帽子、围巾和手套。';
    level = 'poor';
  } else if (temp < 10) {
    advice = '天气较冷，建议穿风衣、大衣、夹克、毛衣等保暖衣物。';
    level = 'moderate';
  } else if (temp < 15) {
    advice = '天气微凉，建议穿套装、夹克、薄毛衣等稍厚的衣服。';
    level = 'good';
  } else if (temp < 20) {
    advice = '温度适宜，建议穿长袖T恤、衬衫、薄外套等轻便衣物。';
    level = 'good';
  } else if (temp < 26) {
    advice = '天气温暖，建议穿短袖T恤、衬衫、薄长裙等轻薄衣物。';
    level = 'good';
  } else if (temp < 32) {
    advice = '天气炎热，建议穿短袖、短裙、短裤等清凉透气的衣服，注意防晒。';
    level = 'moderate';
  } else {
    advice = '高温天气，建议穿轻薄透气的衣服，尽量减少户外活动，注意防暑降温。';
    level = 'poor';
  }

  return {
    type: 'clothing',
    title: '穿衣建议',
    advice,
    icon: '👔',
    level,
  };
}

// 根据天气状况生成出行建议
export function generateTravelAdvice(
  description: string,
  visibility: number,
  windSpeed: number
): LifeAdvice {
  let advice = '';
  let level: 'good' | 'moderate' | 'poor' = 'good';
  const desc = description.toLowerCase();

  if (desc.includes('雨') || desc.includes('雷') || desc.includes('storm')) {
    advice = '有降雨天气，出行请携带雨具，注意交通安全，减速慢行。';
    level = 'poor';
  } else if (desc.includes('雪')) {
    advice = '下雪天气，路面湿滑，出行需谨慎，建议穿防滑鞋，注意保暖。';
    level = 'poor';
  } else if (desc.includes('雾') || desc.includes('霾') || visibility < 1000) {
    advice = '能见度较低，驾驶时请开启雾灯，保持安全距离，谨慎驾驶。';
    level = 'poor';
  } else if (windSpeed > 10) {
    advice = '风力较大，户外活动注意安全，避免高空作业，固定好易被吹动的物品。';
    level = 'moderate';
  } else if (desc.includes('晴') || desc.includes('clear')) {
    advice = '天气晴朗，适合出行游玩，是外出的好天气。';
    level = 'good';
  } else {
    advice = '天气状况一般，出行注意安全，关注天气变化。';
    level = 'moderate';
  }

  return {
    type: 'travel',
    title: '出行建议',
    advice,
    icon: '🚗',
    level,
  };
}

// 根据天气和空气质量生成运动建议
export function generateSportsAdvice(
  temp: number,
  description: string,
  humidity: number
): LifeAdvice {
  let advice = '';
  let level: 'good' | 'moderate' | 'poor' = 'good';
  const desc = description.toLowerCase();

  if (desc.includes('雨') || desc.includes('雷') || desc.includes('storm')) {
    advice = '有降雨天气，不建议户外运动，可选择室内运动项目。';
    level = 'poor';
  } else if (temp < 5) {
    advice = '温度较低，户外运动需做好保暖，建议进行室内运动。';
    level = 'poor';
  } else if (temp > 32) {
    advice = '温度过高，不建议剧烈运动，若需运动请选择清晨或傍晚，及时补充水分。';
    level = 'poor';
  } else if (humidity > 80) {
    advice = '湿度较大，运动时注意补充水分，避免剧烈运动导致不适。';
    level = 'moderate';
  } else if (desc.includes('晴') && temp >= 15 && temp <= 25) {
    advice = '天气非常适合运动，可以进行各种户外运动，如跑步、骑行、球类等。';
    level = 'good';
  } else {
    advice = '天气适宜运动，建议进行适度的户外活动，注意运动强度。';
    level = 'good';
  }

  return {
    type: 'sports',
    title: '运动建议',
    advice,
    icon: '🏃',
    level,
  };
}

// 根据降雨概率生成雨具建议
export function generateUmbrellaAdvice(
  description: string,
  pop?: number
): LifeAdvice {
  let advice = '';
  let level: 'good' | 'moderate' | 'poor' = 'good';
  const desc = description.toLowerCase();
  const rainProb = pop || 0;

  if (desc.includes('雨') || desc.includes('雷') || desc.includes('storm')) {
    advice = '有降雨天气，出门请务必携带雨具。';
    level = 'poor';
  } else if (rainProb > 0.6) {
    advice = `降雨概率${Math.round(rainProb * 100)}%，建议携带雨具以备不时之需。`;
    level = 'moderate';
  } else if (rainProb > 0.3) {
    advice = `降雨概率${Math.round(rainProb * 100)}%，可随身携带折叠伞。`;
    level = 'moderate';
  } else if (desc.includes('云') || desc.includes('阴')) {
    advice = '天气多云，降雨可能性较小，可不带雨具。';
    level = 'good';
  } else {
    advice = '天气晴好，无需携带雨具。';
    level = 'good';
  }

  return {
    type: 'umbrella',
    title: '雨具建议',
    advice,
    icon: '☂️',
    level,
  };
}

// 生成所有生活建议
export function generateAllAdvice(
  weather: WeatherData,
  forecast?: ForecastDay
): LifeAdvice[] {
  const advices: LifeAdvice[] = [];

  advices.push(generateClothingAdvice(weather.temperature));
  advices.push(generateTravelAdvice(weather.description, weather.visibility, weather.windSpeed));
  advices.push(generateSportsAdvice(weather.temperature, weather.description, weather.humidity));
  advices.push(generateUmbrellaAdvice(weather.description, forecast?.pop));

  return advices;
}
