import FarmerAdvisory from "./FarmerAdvisory";
import ForecastChart from "./ForecastChart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React from "react";

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
  forecastData,
}) {
  const weatherRef = React.useRef(null);

  const downloadPDF = async () => {
    if (!weatherRef.current) return;

    try {
      const canvas = await html2canvas(weatherRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.setFontSize(18);
      pdf.setTextColor(41, 128, 185);
      pdf.text("Weather & Agricultural Advisory Report", pdfWidth / 2, position, {
        align: "center",
      });

      position += 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - position - 10;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - 10;
      }

      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text(
          `Generated on ${new Date().toLocaleString()} | Page ${i} of ${totalPages}`,
          pdfWidth / 2,
          pdfHeight - 10,
          { align: "center" }
        );
      }

      pdf.save(`${cityName}-weather-advisory-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download Advisory as PDF
        </button>
      </div>

      <div ref={weatherRef} className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
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
        forecastData={forecastData}
      />

      <ForecastChart forecastData={forecastData} />
      </div>
    </div>
  );
}

export default DisplayOneDayWeather;
