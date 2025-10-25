import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/geo/1.0/reverse';

interface ReverseGeoItem {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json({ error: '请提供经纬度坐标 lat 和 lon' }, { status: 400 });
    }

    const url = `${BASE_URL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&limit=1&appid=${API_KEY}`;

    const response = await fetch(url, { next: { revalidate: 86400 } }); // 1 天缓存

    if (!response.ok) {
      return NextResponse.json({ error: '反向地理编码失败' }, { status: response.status });
    }

    const data: ReverseGeoItem[] = await response.json();
    if (!data || data.length === 0) {
      return NextResponse.json({ error: '未找到对应城市' }, { status: 404 });
    }

    const item = data[0];
    const cityZh = item.local_names?.zh || item.local_names?.zh_cn;

    return NextResponse.json({
      city: cityZh || item.name,
      country: item.country,
      state: item.state || null,
      lat: item.lat,
      lon: item.lon,
    });
  } catch (error) {
    console.error('Reverse Geocode Error:', error);
    return NextResponse.json({ error: '反向地理编码异常' }, { status: 500 });
  }
}
