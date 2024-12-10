import { useState, useEffect } from 'react';
import Weather from '../components/Weather';
import Search from '../components/Search';
import { fetchWeather } from '../utils/api';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

export default function Home() {
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState('C'); // Celsius by default
  const [favorites, setFavorites] = useState([]); // Favorites state
  const router = useRouter(); // Router for navigation

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites); // Set favorites from localStorage
  }, []);

  // Fetch weather data for a city
  const getWeather = async (city) => {
    const weatherData = await fetchWeather(city);
    setData(weatherData); // Set weather data to state
  };

  // Add city to favorites
  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city]; // Add city to favorites
      setFavorites(newFavorites); // Update favorites state
      localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Save to localStorage
    }
  };

  return (
    <div className="container mx-auto p-6">
      <NavBar />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Weather App</h1>
        <button
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition duration-300"
        >
          Change Unit ({unit})
        </button>
      </div>

      <Search onSearch={getWeather} />

      {data ? (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <Weather data={data} unit={unit} />
          <button
            onClick={() => addFavorite(data.location.name)} // Pass city name as argument
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition duration-300"
          >
            Add to Favorites
          </button>
        </div>
      ) : (
        <p className="text-xl text-center text-gray-600 mt-6">Search for a city to get the weather.</p>
      )}

      {/* Navigation to the favorites page */}
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/favorites')} // Navigate to the favorites page
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-400 transition duration-300"
        >
          View Favorites
        </button>
      </div>
    </div>
  );
}
