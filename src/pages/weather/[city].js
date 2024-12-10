import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchWeather } from '../../utils/api'; 

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const router = useRouter();
  const { city } = router.query; 

  // Fetch weather data when the city changes
  useEffect(() => {
    if (city) {
      const fetchWeatherData = async () => {
        const data = await fetchWeather(city); 
        setWeatherData(data); 
      };
      fetchWeatherData();
    }
  }, [city]); // Re-run whenever the city changes

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Weather for {city}</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">{city}</h2>
        <p className="text-xl text-center text-gray-600">{weatherData.current.condition.text}</p>
        <p className="text-2xl text-center mb-4">{weatherData.current.temp_c}°C</p>
      </div>

      {/* Back to Favorites button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/favorites')} // Navigate to the favorites page
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-400 transition duration-300"
        >
          Back to Favorites
        </button>
      </div>
    </div>
  );
};

export default WeatherPage;
