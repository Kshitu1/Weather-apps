import { useState, useEffect } from 'react';

const Weather = ({ data, unit }) => {
  const convertTemperature = (tempCelsius) => {
    return unit === 'C' ? tempCelsius : (tempCelsius * 9/5) + 32;
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">{data?.location?.name}</h2>
      <p className="text-xl text-center text-gray-600 mb-4">{data?.current?.condition?.text}</p>
      <p className="text-3xl text-center text-blue-600 mb-4">
        Temperature: {convertTemperature(data?.current?.temp_c)}°{unit}
      </p>

      <div className="my-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
        <div className="grid grid-cols-4 gap-4">
          {data?.forecast?.forecastday[0]?.hour.map((hour, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all"
            >
              <p className="text-sm text-gray-700">{formatTime(hour.time)}</p>
              <p className="text-lg font-semibold text-gray-800">
                {convertTemperature(hour.temp_c)}°{unit}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">14-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data?.forecast?.forecastday.map((day, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all"
            >
              <p className="text-lg font-semibold text-gray-700">{day.date}</p>
              <p className="text-sm text-gray-600">
                Max Temp: {convertTemperature(day.day.maxtemp_c)}°{unit}
              </p>
              <p className="text-sm text-gray-600">
                Min Temp: {convertTemperature(day.day.mintemp_c)}°{unit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
