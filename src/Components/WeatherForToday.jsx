import { useState, useEffect } from 'react';
import { useGlobalState } from '../App';

function WeatherForToday() {
  const globalState = useGlobalState();
  const city = globalState.city;
  // getting user's location:
  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);

  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }
  getLocation();
  useEffect(() => {
    composeURL(latitude, longitude);
    getData();
  }, [latitude, longitude]);

  useEffect(() => {
    setLatitude(0);
    setLongitude(0);
  }, [city]);
  // setting the URL params:
  // const [cityName, setCityName] = useState('Stockholm');
  // const [url, setUrl] = useState('');

  let url = '';
  function composeURL(lat, long) {
    if (lat === 0 && long === 0) {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    } else {
      url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    }
  }

  // get data from the weather API and inject it into HTML elements:
  async function getData() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let weatherInfo = Object.values(data);
        console.log(weatherInfo);
        document.querySelector('.titleCity').innerHTML = 'Your city is ' + weatherInfo[11];
        document.querySelector('.temp_now').innerHTML =
          'Temperature: ' + Math.floor(weatherInfo[3]?.temp) + '°C';
        document.querySelector('.feelsLike_now').innerHTML =
          'Feels like: ' + Math.floor(weatherInfo[3]?.feels_like) + '°C';
      });
  }

  console.log(longitude, latitude);
  console.log(city);
  return (
    <article className="weatherForToday">
      <h1 className="titleCity">Loading city...</h1>
      <section className="temp">
        <p className="temp_now">Temperature: </p>
        <p className="feelsLike_now">Feels like: </p>
      </section>
    </article>
  );
}

export default WeatherForToday;
