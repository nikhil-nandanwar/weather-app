export async function getForecastData(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City parameter is required" });
  }

  try {
    const apiKey = process.env.API_KEY;
    // OpenWeatherMap 5-day forecast API - returns forecast in 3-hour intervals
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.log("ERROR in getForecastData:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
