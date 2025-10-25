'use client';

import { useState, useEffect, useRef } from 'react';

interface CitySearchProps {
  onSearch: (city: string) => void;
  onLocationSearch: (lat: number, lon: number) => void;
  loading: boolean;
}

// 常用城市列表
const popularCities = [
  '北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '武汉', '西安', '南京',
  '天津', '苏州', '长沙', '郑州', '沈阳', '青岛', '大连', '昆明', '厦门', '宁波',
  'Beijing', 'Shanghai', 'Tokyo', 'London', 'Paris', 'New York', 'Seoul', 'Singapore'
];

export default function CitySearch({ onSearch, onLocationSearch, loading }: CitySearchProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [gettingLocation, setGettingLocation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 防抖搜索
  useEffect(() => {
    if (input.length === 0) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = popularCities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  const handleSearch = (city?: string) => {
    const searchCity = city || input;
    if (searchCity.trim()) {
      onSearch(searchCity.trim());
      setShowSuggestions(false);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSearch(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('您的浏览器不支持地理定位');
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationSearch(position.coords.latitude, position.coords.longitude);
        setGettingLocation(false);
      },
      (error) => {
        console.error('获取位置失败:', error);
        alert('获取位置失败，请检查浏览器权限设置');
        setGettingLocation(false);
      }
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="glass-card p-4 flex gap-2">
        {/* 搜索输入框 */}
        <div className="flex-1 relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => input.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="输入城市名称，如：北京、Beijing、London..."
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              disabled={loading}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl">
              🔍
            </span>
          </div>

          {/* 搜索建议下拉列表 */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto">
              {suggestions.map((city, index) => (
                <button
                  key={city}
                  onClick={() => handleSearch(city)}
                  className={`w-full text-left px-4 py-3 hover:bg-blue-500/20 transition-colors ${
                    index === selectedIndex ? 'bg-blue-500/30' : ''
                  }`}
                >
                  <span className="text-gray-800 font-medium">{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 查询按钮 */}
        <button
          onClick={() => handleSearch()}
          disabled={loading || !input.trim()}
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        >
          {loading ? '查询中...' : '查询'}
        </button>

        {/* 定位按钮 */}
        <button
          onClick={handleGetLocation}
          disabled={loading || gettingLocation}
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          title="使用当前位置"
        >
          {gettingLocation ? '📍' : '🎯'}
        </button>
      </div>
    </div>
  );
}
