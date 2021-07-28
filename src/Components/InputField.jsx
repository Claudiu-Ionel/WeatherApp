import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import '../Pages/Form.css';
const InputField = (list) => {
  const [cityList, setCityList] = useState(null);
  const [filteredCities, setFilteredCities] = useState(null);
  const fetchCities = async () => {
    try {
      const fetchCities = await Axios.get('http://localhost:3002/cities');
      const citiesNames = fetchCities.data.map((city) => {
        return city.name;
      });
      setCityList(citiesNames);
    } catch (err) {
      console.log(err);
    }
  };
  const filterCities = (e) => {
    e.preventDefault();
    const filterValue = e.target.value;
    if (filterValue?.length > 0) {
      const filteredCities = cityList.filter((city) => {
        return city.toLowerCase().includes(filterValue.toLowerCase());
      });
      setFilteredCities(filteredCities);
    } else {
      setFilteredCities(null);
    }
  };
  const setInputValue = (e) => {
    e.preventDefault();
    let citiesInput = document.getElementById('cities-input');
    citiesInput.value = e.target.innerHTML;
    setFilteredCities(null);
  };
  useEffect(() => {
    fetchCities();
  }, []);
  return (
    <form
      id="cities-form"
      onSubmit={(e) => {
        console.log(e);
      }}
    >
      <label htmlFor="cities">Cities: </label>
      <input
        type="text"
        name="cities"
        id="cities-input"
        required
        onChange={(e) => filterCities(e)}
      />

      <button>Search</button>
      <div className="city-list">
        {filteredCities?.map((city) => {
          return <span onClick={(e) => setInputValue(e)}>{city}</span>;
        })}
      </div>
    </form>
  );
};

export default InputField;
