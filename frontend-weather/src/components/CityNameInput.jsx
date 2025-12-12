import React, { useState } from "react";

function CityNameInput() {
  const [cityName, setCityName] = useState("");

  const handleSUbmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const response = await fetch(
        // http://localhost:3000/getweatherdata?city=nagpur
        `http://localhost:3000/getweatherdata?city=${cityName}`,
        {
          method: "GET",
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data) {
        console.log(data);
        setCityName("");
        localStorage.setItem("weatherData", JSON.stringify(data));
      } else {
        alert("No data found for the given city name.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
      setCityName("");
    }
  };
  return (
    <div className="w-full bg-amber-100 h-56 flex items-center justify-center">
      <form className="space-x-4" onSubmit={handleSUbmit}>
        <input
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          type="text"
          name="location-input"
          id="location-input"
          placeholder="Enter location"
          className="w-95 h-10 px-2 border bg-amber-50 rounded-xl"
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded-xl ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CityNameInput;
