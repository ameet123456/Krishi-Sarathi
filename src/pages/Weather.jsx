import React, { useState, useEffect } from 'react';
import { Search, Cloud, Sun, CloudRain, Zap } from 'lucide-react';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('Binka');
  const [searchLocation, setSearchLocation] = useState('');

const API_KEY = process.env.REACT_APP_WEATHER_API;

  // Fetch current weather
  const fetchWeatherData = async (loc) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${loc}&aqi=no`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' }); // "Mon", "Tue", ...
};

  // Fetch 7-day forecast
  const fetchForecastData = async (loc) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${loc}&days=7&aqi=no&alerts=no`
      );
      const data = await res.json();
      setForecastData(data.forecast.forecastday);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  useEffect(() => {
    if (location !== 'Your Location') {
      fetchWeatherData(location);
      fetchForecastData(location);
    }
  }, [location]);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="text-yellow-500" size={20} />;
      case 'partly cloudy':
        return <Cloud className="text-blue-400" size={20} />;
      case 'cloudy':
        return <Cloud className="text-gray-500" size={20} />;
      case 'light rain':
      case 'rainy':
        return <CloudRain className="text-blue-600" size={20} />;
      case 'thunderstorms':
        return <Zap className="text-purple-600" size={20} />;
      default:
        return <Cloud className="text-gray-400" size={20} />;
    }
  };

  const getRainColor = (percentage) => {
    if (percentage >= 60) return 'text-red-500';
    if (percentage >= 40) return 'text-yellow-500';
    if (percentage >= 20) return 'text-green-500';
    return 'text-gray-500';
  };

  const handleSearch = () => {
    if (searchLocation.trim()) {
      setLocation(searchLocation);
      setSearchLocation('');
    }
  };

  if (!weatherData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-gray-500">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Weather Forecast</h1>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for a location"
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Current Weather Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row">
            {/* Current Weather Info */}
            <div className="flex-1 p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  Today in <span className="text-green-500">{weatherData.location.name}</span>
                </h2>
              </div>

              <div className="mb-4">
                <div className="text-5xl md:text-6xl font-light text-gray-800 mb-2">
                  {weatherData.current.temp_c}°<span className="text-3xl text-gray-500">C</span>
                </div>
                <div className="text-lg text-gray-700 font-medium mb-1">
                  {weatherData.current.condition.text}
                </div>
                <div className="text-sm text-gray-500">
                  Humidity {weatherData.current.humidity}% | Wind {weatherData.current.wind_kph} km/h
                </div>
              </div>
            </div>

            {/* Weather Illustration */}
            <div className="lg:w-80 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-6 min-h-[200px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="text-white" size={32} />
                </div>
                <div className="w-20 h-2 bg-white bg-opacity-30 rounded-full mb-2"></div>
                <div className="w-16 h-2 bg-white bg-opacity-20 rounded-full mb-2"></div>
                <div className="w-24 h-2 bg-white bg-opacity-25 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Weekly Forecast</h3>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Day</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Forecast</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">High/Low</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Rainfall</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData.map((day, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2 font-medium text-gray-800">{getDayName(day.date)}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          {getWeatherIcon(day.day.condition.text)}
                          <span className="text-gray-700">{day.day.condition.text}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-gray-700">{day.day.maxtemp_c}° / {day.day.mintemp_c}°</td>
                      <td className="py-4 px-2">
                        <span className={`font-medium ${getRainColor(day.day.daily_chance_of_rain)}`}>
                          {day.day.daily_chance_of_rain}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {forecastData.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-800">{getDayName(day.date)}</div>
                    <div className="text-gray-700">{day.day.maxtemp_c}° / {day.day.mintemp_c}°</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getWeatherIcon(day.day.condition.text)}
                      <span className="text-sm text-gray-700">{day.day.condition.text}</span>
                    </div>
                    <div className={`text-sm font-medium ${getRainColor(day.day.daily_chance_of_rain)}`}>
                      {day.day.daily_chance_of_rain}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
