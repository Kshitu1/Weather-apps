// components/Search.js
import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border-2 border-gray-300 rounded-l-lg px-4 py-2 w-80"
        placeholder="Enter city name"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded-r-lg px-6 py-2"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
