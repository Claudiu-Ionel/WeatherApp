import React from 'react';

function weatherForToday(props) {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=Krasnodar&units=metric&appid=ec840d6f7116ad6409efbbf3a64fe27b";

    function getData() {
    
        fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));
    }
    
    getData(url);

    return <article className="weatherForToday">

    </article>
}

export default weatherForToday;