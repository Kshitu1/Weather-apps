import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

export default function Settings() {
  const [unit, setUnit] = useState('C');
  const [theme, setTheme] = useState('light');
  const [favoritesCleared, setFavoritesCleared] = useState(false);

  // Load saved theme from localStorage if it exists
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme; // Apply theme to body element
  }, []);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme; // Apply theme to body element
  };

  // Clear favorites from localStorage
  const clearFavorites = () => {
    localStorage.removeItem('favorites');
    setFavoritesCleared(true);
    setTimeout(() => setFavoritesCleared(false), 3000); // Show success message for 3 seconds
  };

  return (
    <div className="container mx-auto p-4">
      <NavBar />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Temperature Unit</h2>
        <p className="text-gray-600 mb-2">
          Choose between Celsius and Fahrenheit to view the weather in your preferred unit.
        </p>
        <button
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Set Unit to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
        <p className="text-gray-600 mb-2">
          Toggle between light and dark mode for a better viewing experience based on your preference.
        </p>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Clear Favorites</h2>
        <p className="text-gray-600 mb-2">
          Clear your favorite cities list. This will remove all saved favorite cities from your local storage.
        </p>
        <button
          onClick={clearFavorites}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          {favoritesCleared ? 'Favorites Cleared!' : 'Clear Favorites'}
        </button>
      </div>

      <div className="text-gray-600">
        <h2 className="text-xl font-semibold mb-4">About the App</h2>
        <p className="mb-2">
          This weather app allows you to search for weather conditions in various cities. You can add cities to your favorites and view them anytime, even when offline.
        </p>
        <p>
          You can customize the app's settings to match your preferences, including switching between Celsius and Fahrenheit for temperature and toggling between light and dark themes.
        </p>
      </div>
    </div>
  );
}
