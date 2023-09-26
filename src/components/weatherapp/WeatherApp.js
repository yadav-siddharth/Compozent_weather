import React, { useState } from "react";
import "./weather.css";
import clear from "../../Assets/clear.png";
import cloud from "../../Assets/cloud.png";
import rain from "../../Assets/rain.png";
import drizzle from "../../Assets/drizzle.png";
import searchimg from "../../Assets/search.png";
import wind from "../../Assets/wind.png";
import snow from "../../Assets/snow.png";
import humidity from "../../Assets/humidity.png";

const WeatherApp = () => {
  let API_KEY = "9e68336f4e9e81e1aae1a3ab9732165f";
  const [wicon, setWicon] = useState(cloud);
  const search = async () => {
    const element = document.getElementsByClassName("cityinput");
    if (element[0].value === "") {
      return 0;
    }

    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`;
    try {
      let response = await fetch(URL);
      if (response.status === 404) {
        const location = document.getElementsByClassName("weather-location");
        alert(`No City Found ${location}`);
      } else {
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = Math.floor(data.main.humidity) + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temp[0].innerHTML = Math.floor(data.main.temp) + " °c";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
          setWicon(clear);
        } else if (
          data.weather[0].icon === "02d" ||
          data.weather[0].icon === "02n"
        ) {
          setWicon(cloud);
        } else if (
          data.weather[0].icon === "03d" ||
          data.weather[0].icon === "03n"
        ) {
          setWicon(drizzle);
        } else if (
          data.weather[0].icon === "04d" ||
          data.weather[0].icon === "04n"
        ) {
          setWicon(drizzle);
        } else if (
          data.weather[0].icon === "09d" ||
          data.weather[0].icon === "09n"
        ) {
          setWicon(rain);
        } else if (
          data.weather[0].icon === "10d" ||
          data.weather[0].icon === "10n"
        ) {
          setWicon(rain);
        } else if (
          data.weather[0].icon === "13d" ||
          data.weather[0].icon === "13n"
        ) {
          setWicon(snow);
        } else {
          setWicon(clear);
        }
      }
    } catch (error) {
      console.log("An error Occured:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityinput" placeholder="Search City (Eg: Mumbai , New York)" />
        <div className="search-icon" onClick={search}>
          <img src={searchimg} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24 °c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity-percent">18 km/h</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind} alt="" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Humidity</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
