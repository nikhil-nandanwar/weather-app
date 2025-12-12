import React from "react";

function ForecastChart({ forecastData }) {
  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return null;
  }

  const dataPoints = forecastData.list.slice(0, 16);

  const width = 800;
  const height = 300;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const temps = dataPoints.map((d) => d.main.temp - 273.15);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const tempRange = maxTemp - minTemp || 1;

  const scaleX = (index) => (index / (dataPoints.length - 1)) * chartWidth;
  const scaleY = (temp) => chartHeight - ((temp - minTemp) / tempRange) * chartHeight;

  const tempPath = dataPoints
    .map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d.main.temp - 273.15);
      return `${i === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  const rainBars = dataPoints.map((d, i) => {
    const rainAmount = d.rain?.["3h"] || 0;
    const barHeight = (rainAmount / 10) * chartHeight; 
    const x = scaleX(i);
    return {
      x: x - 10,
      y: chartHeight - barHeight,
      height: barHeight,
      amount: rainAmount,
    };
  });

  const formatTime = (dt) => {
    const date = new Date(dt * 1000);
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${month}/${day} ${hours}:00`;
  };

  return (
    <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Temperature & Rain Forecast (Next 48 Hours)
      </h3>

      <div className="overflow-x-auto">
        <svg width={width} height={height} className="mx-auto">
          <g transform={`translate(${padding.left},${padding.top})`}>
            {[0, 1, 2, 3, 4].map((i) => {
              const y = (i / 4) * chartHeight;
              const temp = maxTemp - (i / 4) * tempRange;
              return (
                <g key={i}>
                  <line
                    x1="0"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeDasharray="4"
                  />
                  <text
                    x="-10"
                    y={y + 5}
                    textAnchor="end"
                    fontSize="12"
                    fill="#6b7280"
                  >
                    {temp.toFixed(1)}°C
                  </text>
                </g>
              );
            })}

            {rainBars.map((bar, i) => (
              <rect
                key={`rain-${i}`}
                x={bar.x}
                y={bar.y}
                width="20"
                height={bar.height}
                fill="#3b82f6"
                opacity="0.3"
              />
            ))}

            <path
              d={tempPath}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {dataPoints.map((d, i) => {
              const temp = d.main.temp - 273.15;
              const x = scaleX(i);
              const y = scaleY(temp);
              return (
                <g key={`point-${i}`}>
                  <circle cx={x} cy={y} r="4" fill="#ef4444" />
                  {i % 2 === 0 && (
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#374151"
                      fontWeight="600"
                    >
                      {temp.toFixed(1)}°
                    </text>
                  )}
                </g>
              );
            })}

            {dataPoints.map((d, i) => {
              if (i % 3 === 0) {
                const x = scaleX(i);
                return (
                  <text
                    key={`label-${i}`}
                    x={x}
                    y={chartHeight + 25}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#6b7280"
                  >
                    {formatTime(d.dt)}
                  </text>
                );
              }
              return null;
            })}

            <text
              x={-chartHeight / 2}
              y={-45}
              textAnchor="middle"
              fontSize="12"
              fill="#374151"
              fontWeight="600"
              transform={`rotate(-90, -${chartHeight / 2}, -45)`}
            >
              Temperature (°C)
            </text>

            <text
              x={chartWidth / 2}
              y={chartHeight + 50}
              textAnchor="middle"
              fontSize="12"
              fill="#374151"
              fontWeight="600"
            >
              Date & Time
            </text>
          </g>
        </svg>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-700">Temperature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 opacity-30"></div>
          <span className="text-sm text-gray-700">Rain (mm)</span>
        </div>
      </div>
    </div>
  );
}

export default ForecastChart;
