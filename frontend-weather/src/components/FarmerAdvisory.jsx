import React from "react";

function FarmerAdvisory({ weatherData, forecastData }) {
  const generateAdvisories = () => {
    const advisories = [];

    const tempCelsius = weatherData.temperature - 273.15;
    const humidity = weatherData.humidity;
    const windSpeed = weatherData.windSpeed;
    const rainAmount = weatherData.rainAmount || 0;
    const cloudiness = weatherData.cloudiness;

    const rainProbability = rainAmount > 0 ? 100 : cloudiness;

    let rainExpectedIn6Hours = false;
    if (forecastData && forecastData.list) {
      const next6Hours = forecastData.list.slice(0, 2);
      rainExpectedIn6Hours = next6Hours.some(
        (item) => item.rain?.["3h"] > 0 || item.clouds?.all > 70
      );
    }

    if (rainProbability > 60 || rainAmount > 0) {
      advisories.push({
        type: "warning",
        title: "High Rain Probability",
        message:
          "Avoid irrigation and pesticide spraying today. Rain expected or detected.",
        priority: 1,
      });
    }

    if (tempCelsius > 35) {
      advisories.push({
        type: "alert",
        title: "High Temperature Alert",
        message:
          "Increase irrigation frequency for heat-sensitive crops. Temperature exceeds 35°C.",
        priority: 2,
      });
    } else if (tempCelsius > 30) {
      advisories.push({
        type: "caution",
        title: "Warm Weather",
        message:
          "Monitor crop water requirements. Consider evening irrigation to reduce evaporation.",
        priority: 3,
      });
    }

    if (windSpeed > 15) {
      advisories.push({
        type: "warning",
        title: "Strong Wind Alert",
        message:
          "Do not spray pesticides due to drift risk. Wind speed exceeds 15 km/h.",
        priority: 1,
      });
    } else if (windSpeed > 10) {
      advisories.push({
        type: "caution",
        title: "Moderate Wind",
        message:
          "Exercise caution when spraying. Consider postponing to calmer conditions.",
        priority: 3,
      });
    }

    if (humidity > 80) {
      advisories.push({
        type: "warning",
        title: "High Humidity Warning",
        message:
          "Possible fungal infection risk. Monitor your crops closely for disease symptoms.",
        priority: 2,
      });
    } else if (humidity > 70) {
      advisories.push({
        type: "info",
        title: "Elevated Humidity",
        message:
          "Good conditions for foliar nutrient application. Watch for fungal disease signs.",
        priority: 4,
      });
    }

    if (
      windSpeed < 10 &&
      rainProbability < 30 &&
      tempCelsius < 30 &&
      !rainExpectedIn6Hours
    ) {
      advisories.push({
        type: "success",
        title: "Ideal Spraying Conditions",
        message:
          "Good window for pesticide application. Low wind and no rain expected in the next 6 hours.",
        priority: 1,
      });
    } else if (windSpeed < 10 && rainProbability < 30 && rainExpectedIn6Hours) {
      advisories.push({
        type: "caution",
        title: "Rain Expected Soon",
        message:
          "Rain expected within 6 hours. Delay pesticide spraying to avoid waste.",
        priority: 2,
      });
    }

    if (tempCelsius < 5) {
      advisories.push({
        type: "alert",
        title: "Frost Risk",
        message:
          "Protect sensitive crops. Cover or use frost protection methods.",
        priority: 1,
      });
    }

    if (humidity < 30) {
      advisories.push({
        type: "caution",
        title: "Low Humidity",
        message:
          "Increase irrigation frequency. Crops may experience water stress.",
        priority: 3,
      });
    }

    if (
      tempCelsius >= 15 &&
      tempCelsius <= 28 &&
      humidity >= 40 &&
      humidity <= 70 &&
      windSpeed < 8 &&
      rainProbability < 20
    ) {
      advisories.push({
        type: "success",

        title: "Optimal Growing Conditions",
        message: "Excellent weather for crop growth and field operations.",
        priority: 5,
      });
    }

    return advisories.sort((a, b) => a.priority - b.priority);
  };

  const advisories = generateAdvisories();

  const getCardStyle = (type) => {
    switch (type) {
      case "warning":
        return "bg-orange-50 border-orange-200";
      case "alert":
        return "bg-red-50 border-red-200";
      case "caution":
        return "bg-yellow-50 border-yellow-200";
      case "success":
        return "bg-green-50 border-green-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTitleStyle = (type) => {
    switch (type) {
      case "warning":
        return "text-orange-800";
      case "alert":
        return "text-red-800";
      case "caution":
        return "text-yellow-800";
      case "success":
        return "text-green-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  const getMessageStyle = (type) => {
    switch (type) {
      case "warning":
        return "text-orange-700";
      case "alert":
        return "text-red-700";
      case "caution":
        return "text-yellow-700";
      case "success":
        return "text-green-700";
      case "info":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  if (advisories.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>Farmer Advisories</span>
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {advisories.map((advisory, index) => (
          <div
            key={index}
            className={`${getCardStyle(
              advisory.type
            )} rounded-lg p-4 border-l-4 transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4
                  className={`font-semibold text-base mb-1 ${getTitleStyle(
                    advisory.type
                  )}`}
                >
                  {advisory.title}
                </h4>
                <p className={`text-sm ${getMessageStyle(advisory.type)}`}>
                  {advisory.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmerAdvisory;
