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
        document.querySelector('.titleCity').innerHTML = 'Your city is ' + weatherInfo[11];
        document.querySelector('.temp_now').innerHTML =
          Math.floor(weatherInfo[3]?.temp) + '°C';
        document.querySelector('.feelsLike_now').innerHTML =
          'Feels like: ' + Math.floor(weatherInfo[3]?.feels_like) + '°C';
        let weatherDesc = weatherInfo[1];
        document.querySelector('.weatherNowDesc').innerHTML = weatherDesc[0]?.main;

        // extracting the icons:
        let iconCode = '';
        if (weatherDesc[0]?.main === 'Clouds') {
          iconCode = '04d';
        } else if (weatherDesc[0]?.main === 'Clear') {
          iconCode = '01d';
        } else if (weatherDesc[0]?.main === 'Snow') {
          iconCode = '13d';
        } else if (weatherDesc[0]?.main === 'Rain') {
          iconCode = '09d';
        } else if (weatherDesc[0]?.main === 'Thunderstorm' || 'Drizzle') {
          iconCode ='11d';
        } else {
          iconCode = '50d';
        }
        let iconSrcURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.querySelector('.weatherIcon').src= iconSrcURL;
      });
      
  }

  console.log(longitude, latitude);
  console.log(city);
  return (
    <article className="weatherForToday">
      <h1 className="titleCity">Loading city...</h1>
      <section className='weatherNowSummary'>
        <span className="temp_now"></span>
        <img className='weatherIcon' src='' alt='' />
        <span className='weatherNowDesc'></span>
      </section>
      <section className="feelsLike_container">
        <p className="feelsLike_now">Feels like: </p>
      </section>
    </article>
  );
}

export default WeatherForToday;
