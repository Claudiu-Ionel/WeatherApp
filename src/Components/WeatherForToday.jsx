import { useState, useEffect, useCallback } from "react";
import { useGlobalState } from "../App";

function WeatherForToday() {
  const globalState = useGlobalState();
  const city = globalState.city;
  const userAgreement = globalState.userAgreement;
  const setWeather = globalState.setWeather;

  // getting user's location:
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  // The weather API returns slightly different JSON files, depending on thr request.
  // That's why one must compose two different URLs for every scenario respectively:
  const composeURL = useCallback(() => {
    let url = "";
    if (userAgreement === false) {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      return url;
    } else {
      url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      return url;
    }
  }, [userAgreement, latitude, longitude, city]);

  const getData = useCallback(async () => {
    const url = composeURL();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let weatherInfo = Object.values(data);
        document.querySelector(".titleCity").innerHTML = weatherInfo[11];
        document.querySelector(
          ".titleCity"
        ).label = `The current city name is ${weatherInfo[11]}`;
        document.querySelector(".temp_now").innerHTML =
          Math.floor(weatherInfo[3]?.temp) + "°C";
        document.querySelector(".feelsLike_now").innerHTML =
          "Feels like: " + Math.floor(weatherInfo[3]?.feels_like) + "°C";
        let weatherDesc = weatherInfo[1];
        document.querySelector(".weatherNowDesc").innerHTML =
          weatherDesc[0]?.main;

        setWeather(weatherDesc[0].main);

        // extracting the icons for the weather display:
        let iconCode = "";
        if (weatherDesc[0]?.main === "Clouds") {
          iconCode = "04d";
        } else if (weatherDesc[0]?.main === "Clear") {
          iconCode = "01d";
        } else if (weatherDesc[0]?.main === "Snow") {
          iconCode = "13d";
        } else if (weatherDesc[0]?.main === "Rain") {
          iconCode = "09d";
        } else if (weatherDesc[0]?.main === "Thunderstorm" || "Drizzle") {
          iconCode = "11d";
        } else {
          iconCode = "50d";
        }
        let iconSrcURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.querySelector(".weatherIcon").src = iconSrcURL;

        // Accessibility issue: when user hovers over the weather icon,
        // the screen reader has to pronounce the info in the ALT property.
        // It works for every type of weather (for example, if it's raining, user hears:
        // "The tiny picture of RAIN"), but it doesn't work for the weather "CLEAR".
        // So we gotta add a bit more of functionality in here:
        if (weatherDesc[0].main === "Clear") {
          document.querySelector(
            ".weatherIcon"
          ).alt = `The tiny picture of the Sun, representing the clear bright weather`;
        } else {
          document.querySelector(
            ".weatherIcon"
          ).alt = `The tiny picture of ${weatherDesc[0].main}`;
        }
      });
    console.log("Function Called");
  }, [composeURL, setWeather]);

  useEffect(() => {
    if (userAgreement === true) {
      getLocation();
      getData();
    }
    if (userAgreement === false) {
      getData();
    }
  }, [userAgreement, longitude, latitude, city, composeURL, getData]);

  // get data from the weather API and inject it into HTML elements:
  return (
    <article className="weatherForToday" aria-label="the weather description block">
      <h1 className="titleCity">Loading city...</h1>
      <section className="weatherNowSummary">
        <p className="temp_now"></p>
      </section>
      <section className="feelsLike_container">
        <div>
          <img className="weatherIcon" src="" alt="" />
          <span className="weatherNowDesc"></span>
        </div>
        <p className="feelsLike_now">Feels like: </p>
      </section>
    </article>
  );
}

export default WeatherForToday;
