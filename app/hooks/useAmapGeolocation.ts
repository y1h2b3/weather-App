'use client';

import { useEffect, useState } from 'react';

// 高德地图定位结果类型
export interface AmapLocationResult {
  lat: number;
  lon: number;
  city: string;
  province: string;
  district?: string;
  formattedAddress?: string;
}

// 加载高德地图JS API
const loadAmapScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 检查是否已加载
    if (window.AMap) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${apiKey}&plugin=AMap.Geolocation`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Amap script'));
    document.head.appendChild(script);
  });
};

export const useAmapGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取当前位置
  const getCurrentPosition = async (): Promise<AmapLocationResult | null> => {
    const apiKey = process.env.NEXT_PUBLIC_AMAP_API_KEY;
    
    if (!apiKey) {
      setError('高德地图API Key未配置');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // 加载高德地图SDK
      await loadAmapScript(apiKey);

      // 创建定位实例
      return new Promise((resolve, reject) => {
        window.AMap.plugin('AMap.Geolocation', () => {
          const geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: false, // 降低精度要求，提高成功率
            timeout: 30000, // 30秒超时
            maximumAge: 300000, // 5分钟缓存
            convert: true, // 自动转换为高德坐标
            showButton: false,
            showMarker: false,
            showCircle: false,
            GeoLocationFirst: true, // 优先使用浏览器定位
            noIpLocate: 0, // 允许IP定位（0=允许，1=禁止）
          });

          geolocation.getCurrentPosition((status: string, result: any) => {
            setLoading(false);

            if (status === 'complete' && result.position) {
              // 定位成功
              const locationData: AmapLocationResult = {
                lat: result.position.lat,
                lon: result.position.lng,
                city: result.addressComponent?.city || '',
                province: result.addressComponent?.province || '',
                district: result.addressComponent?.district || '',
                formattedAddress: result.formattedAddress || '',
              };
              console.log('高德定位成功，定位方式:', result.location_type);
              resolve(locationData);
            } else {
              // 定位失败
              const errorMsg = result?.message || '定位失败';
              console.warn('高德定位失败:', {
                status,
                message: errorMsg,
                info: result?.info,
              });
              setError(errorMsg);
              reject(new Error(errorMsg));
            }
          });
        });
      });
    } catch (err: any) {
      setLoading(false);
      const errorMsg = err.message || '高德定位异常';
      setError(errorMsg);
      return null;
    }
  };

  return {
    getCurrentPosition,
    loading,
    error,
  };
};

// 扩展Window类型以支持AMap
declare global {
  interface Window {
    AMap: any;
  }
}
