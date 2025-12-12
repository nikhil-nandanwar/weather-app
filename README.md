# Weather Forecast Application

A full-stack weather forecast application with a React frontend and Node.js/Express backend.

## Prerequisites

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
PORT=5000
MONGODB_URI=your_mongodb_connection_string
API_KEY=your_weather_api_key
```

**Note:** 
- Get your MongoDB connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use a local MongoDB instance
- Obtain a weather API key from a weather service provider (e.g., OpenWeatherMap, WeatherAPI, etc.)

#### Start the Backend Server

```bash
node index.js
```

The backend server should now be running on `http://localhost:5000` (or the port you specified).

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

## Project Structure

```
internship-assignment/
├── backend-weather/          # Backend Node.js/Express application
│   ├── config/              # Configuration files
│   ├── controller/          # Route controllers
│   ├── model/               # Database models
│   ├── index.js             # Main server file
│   └── .env.example         # Environment variables template
└── frontend-weather/        # Frontend React application
    ├── src/                 # Source files
    │   ├── components/      # React components
    │   ├── assets/          # Static assets
    │   └── App.jsx          # Main App component
    └── public/              # Public assets
```

## Usage

1. Ensure both backend and frontend servers are running
2. Open your browser and navigate to `http://localhost:5173`
3. Enter a city name to get weather forecast information
4. View weather data and farmer advisory information

## Available Scripts

### Backend
- `node index.js` - Start the backend server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error, either:
- Stop the process using that port
- Change the PORT in your `.env` file (backend) or `vite.config.js` (frontend)

### MongoDB Connection Issues
- Verify your MongoDB URI is correct
- Ensure MongoDB service is running (if using local installation)
- Check network access settings in MongoDB Atlas

### API Key Issues
- Verify your weather API key is valid
- Check API rate limits and quotas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
