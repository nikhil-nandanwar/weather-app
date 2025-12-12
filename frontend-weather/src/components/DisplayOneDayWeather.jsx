import FarmerAdvisory from "./FarmerAdvisory";

function DisplayOneDayWeather({
  weatherDescription,
  weaherIcon,
  temperature,
  minTemperature,
  maxTemperature,
  humidity,
  windSpeed,
  cityName,
  rainAmount,
  snowAmount,
  cloudiness,
 
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
      <div className="flex items-center justify-between ">
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{cityName}</h3>
          <p className="text-gray-500 capitalize text-lg">
            {weatherDescription}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weaherIcon}@4x.png`}
          alt="Weather Icon"
          className="w-34 h-34"
        />
      </div>

      <div className="mb-6">
        <div className="text-5xl font-bold text-gray-800 mb-2">
          {(temperature - 273.15).toFixed(1)}°C
        </div>
        <div className="text-gray-600">
          {(maxTemperature - 273.15).toFixed(1)}°C -{" "}
          {(minTemperature - 273.15).toFixed(1) }°C
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-200 rounded-lg p-4">
          <div className="text-gray-500 text-sm mb-1">Humidity</div>
          <div className="text-gray-800 font-semibold text-lg">{humidity}%</div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <div className="text-gray-500 text-sm mb-1">Wind Speed</div>
          <div className="text-gray-800 font-semibold text-lg">
            {windSpeed} m/s
          </div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <div className="text-gray-500 text-sm mb-1">Cloudiness</div>
          <div className="text-gray-800 font-semibold text-lg">
            {cloudiness}%
          </div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <div className="text-gray-500 text-sm mb-1">
            {rainAmount ? "Rain" : snowAmount ? "Snow" : "Precipitation"}
          </div>
          <div className="text-gray-800 font-semibold text-lg">
            {rainAmount
              ? `${rainAmount} mm`
              : snowAmount
              ? `${snowAmount} mm`
              : "None"}
          </div>
        </div>
      </div>

      {/* Agricultural Advisories */}
      <FarmerAdvisory 
        weatherData={{
          temperature,
          humidity,
          windSpeed,
          rainAmount,
          snowAmount,
          cloudiness,
          weaherIcon
        }} 
      />
    </div>
  );
}

export default DisplayOneDayWeather;
