import './App.css';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Profile from './views/Profile.jsx';
import Shop from './views/Shop.jsx';
import Cart from './views/Cart.jsx';
import Item from './views/Item.jsx';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';

const cities = [
  { name: 'Shibuya', latitude: 35.6586, longitude: 139.7454 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weatherData, setWeatherData] = useState({ temperature: null, time: null });

  useEffect(() => {
    const fetchWeather = async () => {
      const { latitude, longitude } = cities[currentIndex];
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        const data = await response.json();
        setWeatherData({
          temperature: data.current.temperature_2m,
          time: data.current.time,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  function checkLogin(){
    if (sessionStorage.getItem('login') == 'true') {
      return "/profile";
    }
    return "/login"
  }

  
  return (
    <>
      <header className="header">
        <div className="logo" onClick={() => {window.location = "/"}}>
          <img src="/jikan.png" style={{
            width: "23px",
            height: "auto",
            marginRight: "10px"
          }} />
          JIKAN
        </div>
        <div className="weather">
          <img src="../src/assets/icons/cloud.png" alt="Cloud" />
          { weatherData.temperature !== null && weatherData.time !== null ? (
            <h2 className="weather-info">
              {weatherData.temperature} °C in {cities[currentIndex].name} at {
                new Date(weatherData.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              }
            </h2>
          ) : ( <h2>Loading...</h2> )}
        </div>
        <div className="topNav">
          <img src="../src/assets/icons/cart.png" alt="Cart" onClick={() => {window.location = "/cart"}}/>
          <img src="../src/assets/icons/profile.png" alt="Profile" onClick={() => {window.location = checkLogin()}}/>
          <img src="../src/assets/icons/support.png" alt="Support" onClick={() => {window.location = "/#contactlinks"; }}/>
        </div>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/item" element={<Item />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
