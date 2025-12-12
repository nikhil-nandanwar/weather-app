import React, { useState } from "react";
import DisplayOneDayWeather from "./DisplayOneDayWeather";

function CityNameInput() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  React.useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch("http://localhost:3000/getsearchhistory");
      if (response.ok) {
        const result = await response.json();
        setSearchHistory(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  };

  const saveSearchToHistory = async (city, country, coordinates) => {
    try {
      await fetch("http://localhost:3000/savesearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cityName: city,
          country: country || "",
          coordinates: coordinates || {},
        }),
      });
      fetchSearchHistory();
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  const handleSUbmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const weatherResponse = await fetch(
        `http://localhost:3000/getweatherdata?city=${cityName}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(`HTTP error! status: ${weatherResponse.status}`);
      }
      
      const weather = await weatherResponse.json();
      
      if (weather.cod === "404") {
        throw new Error("City not found. Please check the spelling and try again.");
      }
      
      const forecastResponse = await fetch(
        `http://localhost:3000/getforecastdata?city=${cityName}`
      );
      
      const forecast = await forecastResponse.json();
      
      if (weather && weather.cod === 200) {
        setWeatherData(weather);
        setForecastData(forecast);
        
        await saveSearchToHistory(
          weather.name,
          weather.sys?.country,
          weather.coord
        );
        
        setCityName("");
      } else {
        setError("No data found for the given city name.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message || "Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (city) => {
    setCityName(city);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-amber-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Weather Forecast & Advisory Tool for Farmers
          </h1>
          
          <form className="flex flex-col md:flex-row gap-4 justify-center items-center" onSubmit={handleSUbmit}>
            <input
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              type="text"
              name="location-input"
              id="location-input"
              placeholder="Enter location"
              className="w-full md:w-96 h-12 px-4 border bg-amber-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Weather"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Searches:</h3>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(search.cityName)}
                    className="px-3 py-1 bg-white rounded-full text-sm hover:bg-gray-100 transition-colors border border-gray-300"
                  >
                    {search.cityName} {search.country && `(${search.country})`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display Weather Data */}
      {weatherData && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <DisplayOneDayWeather
            weatherDescription={weatherData.weather?.[0]?.description}
            weaherIcon={weatherData.weather?.[0]?.icon}
            temperature={weatherData.main?.temp}
            minTemperature={weatherData.main?.temp_min}
            maxTemperature={weatherData.main?.temp_max}
            humidity={weatherData.main?.humidity}
            windSpeed={weatherData.wind?.speed}
            cityName={weatherData.name}
            rainAmount={weatherData.rain?.["1h"] || weatherData.rain?.["3h"]}
            snowAmount={weatherData.snow?.["1h"] || weatherData.snow?.["3h"]}
            cloudiness={weatherData.clouds?.all}
            forecastData={forecastData}
          />
        </div>
      )}
    </div>
  );
}

export default CityNameInput;
