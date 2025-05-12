import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import WeatherDay from './components/WeatherDay';
import WeatherNight from './components/WeatherNight';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found or API error');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    } else {
      setError('Please enter a city name');
    }
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Day Section */}
      <div className="min-h-screen w-[800px] bg-gray-900 text-white flex flex-col items-center p-4 rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex items-center gap-2 mb-6"
        >
          <MapPinIcon className="w-8 h-8 text-gray-400" />
          <input
            type="text"
            placeholder="Enter a city name"
            value={city}
            onChange={handleSearchChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {isLoading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {weather && (
          <div className="w-full max-w-md">
            <p className="text-lg mb-2">{formatDate()}</p>
            <WeatherDay weather={weather} />
          </div>
        )}
      </div>

      {/* Night Section */}
      <div className="min-h-screen w-[800px] bg-white text-gray-900 flex flex-col items-center p-4 rounded-xl">
        {weather && (
          <div className="w-full max-w-md">
            <WeatherNight weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
}