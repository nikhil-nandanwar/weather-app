export async function getWeatherData(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City parameter is required" });
  }

  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log("ERROR in getWeatherData:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
