const apiKey = "f69ca30b72664692a93210030240912"; // Replace with your actual API key

export const fetchWeather = async (city) => {
  const baseUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14&aqi=no&alerts=no`;
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
};
