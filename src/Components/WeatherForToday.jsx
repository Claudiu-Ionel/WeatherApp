

function WeatherForToday() {
  // getting user's location:
  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      let userLocation = [position.coords.latitude, position.coords.longitude];
      console.log(userLocation);
    });
  }
  getLocation();

//   let url = `http://api.openweathermap.org/data/2.5/weather?lat=${userLocation[0]}&lon=${userLocation[1]}&appid=${process.env.REACT_APP_API_KEY}`;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  async function getData() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let weatherInfo = Object.values(data);
        console.log(weatherInfo);
        document.querySelector('.titleCity').innerHTML = "Your city is " + weatherInfo[11];
        document.querySelector('.temp_now').innerHTML = "Temperature: " + Math.floor(weatherInfo[3].temp) + '°C';
        document.querySelector('.feelsLike_now').innerHTML = "Feels like: " + Math.floor(weatherInfo[3].feels_like) + '°C';
      });
  }

  getData();

  return (
    <article className="weatherForToday">
      <h1 className='titleCity'>Loading city...</h1>
      <section className='temp'>
        <p className='temp_now'>Temperature: </p>
        <p className='feelsLike_now'>Feels like: </p>
      </section>
    </article>
  );
}

export default WeatherForToday;
