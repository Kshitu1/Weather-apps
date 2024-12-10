import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Favorite Cities</h1>
      
      {favorites.length === 0 ? (
        <p className="text-xl text-center text-gray-600">No favorites added yet. Start adding cities to your favorites from the main page.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Favorites List</h2>
          <ul className="list-none space-y-4">
            {favorites.map((city, index) => (
              <li key={index} className="flex justify-between items-center text-xl text-gray-800">
                <span>{city}</span>
                <button
                  onClick={() => router.push(`/weather/${city}`)} // Navigate to weather page of selected city
                  className="text-blue-500 hover:underline"
                >
                  View Weather
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/')} // Navigate back to the home page
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-400 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Favorites;
