# Weather Forecast & Advisory Tool for Farmers

A comprehensive MERN stack application that provides real-time weather forecasts and intelligent, farmer-friendly agricultural advisories using OpenWeatherMap API.

## 🚀 Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nikhil-nandanwar/weather-app
cd weather-app
```


### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend-weather
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend-weather` directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
API_KEY=your_openweathermap_api_key
```

**Important Notes:** 
- Get your MongoDB connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use a local MongoDB instance (`mongodb://localhost:27017/weather-app`)
- Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) (sign up for free tier)
- The PORT should be 3000 to match the frontend API calls

#### Start the Backend Server

```bash
node index.js
```

The backend server should now be running on `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal window/tab and navigate to the frontend directory:

```bash
cd frontend-weather
npm install
```

#### Start the Frontend Development Server

```bash
npm run dev
```

The frontend application should now be running on `http://localhost:5173` (default Vite port).

## 📁 Project Structure

```
/
├── backend-weather/                    # Backend Node.js/Express application
│   ├── config/
│   │   └── mongodb.config.js          # MongoDB connection configuration
│   ├── controller/
│   │   ├── getWeatherData.controller.js    # Current weather API
│   │   ├── getForecastData.controller.js   # 5-day forecast API
│   │   └── searchHistory.controller.js     # Search history CRUD
│   ├── model/
│   │   └── SearchHistory.model.js     # MongoDB schema for searches
│   ├── index.js                       # Main Express server
│   ├── package.json                   # Backend dependencies
│   └── .env.example                   # Environment template
└── frontend-weather/                  # Frontend React application
    ├── src/
    │   ├── components/
    │   │   ├── CityNameInput.jsx      # Search input & history
    │   │   ├── DisplayOneDayWeather.jsx   # Current weather display
    │   │   ├── FarmerAdvisory.jsx     # Advisory rules engine
    │   │   └── ForecastChart.jsx      # Temperature/rain chart
    │   ├── App.jsx                    # Main App component
    │   ├── main.jsx                   # Entry point
    │   └── index.css                  # Tailwind styles
    ├── package.json                   # Frontend dependencies
    └── vite.config.js                 # Vite configuration
```

## 🎮 Usage

1. **Start Backend**: Run `node index.js` in `backend-weather/` directory
2. **Start Frontend**: Run `npm run dev` in `frontend-weather/` directory
3. **Open Browser**: Navigate to `http://localhost:5173`
4. **Search Location**: Enter any city name (e.g., "London", "Mumbai", "New York")
5. **View Data**: See current weather, 5-day forecast chart, and advisories
6. **Download PDF**: Click "Download Advisory as PDF" for a printable report
7. **Quick Access**: Click on recent searches to quickly re-search locations

## 🔌 API Endpoints

### Backend Routes

```
GET  /getweatherdata?city=<cityname>     # Current weather data
GET  /getforecastdata?city=<cityname>    # 5-day forecast (3-hour blocks)
POST /savesearch                         # Save search to history
     Body: { cityName, country, coordinates }
GET  /getsearchhistory                   # Get last 5 searches
```

## 🛠️ Available Scripts

### Backend
- `node index.js` - Start the Express server on port 3000

### Frontend
- `npm run dev` - Start Vite development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🎨 Technologies Used

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **OpenWeatherMap API** - Weather data source

## 🐛 Troubleshooting

### Port Already in Use
**Issue**: Backend port 3000 or frontend port 5173 is occupied  
**Solution**: 
- Stop conflicting processes: `lsof -ti:3000 | xargs kill -9`
- Or change PORT in backend `.env` file (update frontend API calls accordingly)

### MongoDB Connection Issues
**Issue**: Cannot connect to MongoDB  
**Solution**:
- Verify MongoDB service is running: `sudo systemctl status mongod`
- Check connection string format in `.env`
- For Atlas: whitelist your IP address in network access settings
- Test connection: `mongosh <your-connection-string>`

### API Key Issues
**Issue**: Weather data not fetching  
**Solution**:
- Verify API key is correct in `.env` file
- Check API key is activated (can take 10 minutes after signup)
- Ensure you're using the free tier endpoints
- Check API call limits at OpenWeatherMap dashboard

### City Not Found
**Issue**: "City not found" error  
**Solution**:
- Check spelling of city name
- Try with country code: "London,UK" or "Paris,FR"
- Some small cities may not be in OpenWeatherMap database

### CORS Errors
**Issue**: Frontend can't reach backend  
**Solution**:
- Ensure backend is running on port 3000
- Check CORS configuration in `backend-weather/index.js`
- Verify frontend is calling `http://localhost:3000`

## 📊 Features Demonstration

### Weather Data Display
- Current temperature (°C)
- Min/Max temperature
- Humidity percentage
- Wind speed (m/s)
- Cloudiness
- Precipitation (rain/snow)
- Weather icon and description

### Forecast Visualization
- Interactive SVG chart
- Temperature trend line (red)
- Rain probability bars (blue)
- 48-hour forecast
- Time-labeled X-axis
- Temperature-labeled Y-axis
