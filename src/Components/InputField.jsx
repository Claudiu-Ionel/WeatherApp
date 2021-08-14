import Axios from 'axios';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import '../Pages/Form.css';
import { useGlobalState } from '../App';

const InputField = () => {
  const [cityList, setCityList] = useState(null);
  const [filteredCities, setFilteredCities] = useState(null);
  const cityListDiv = useRef(null);
  const citiesInput = useRef(null);
  const globalState = useGlobalState();
  const setCityName = globalState.setCity;
  const setUserAgreement = globalState.setUserAgreement;
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
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(citiesInput.current.value);
    setCityName(citiesInput.current.value);
    setUserAgreement(false);
    citiesInput.current.value = null;
    cityListDiv.current.style.display = 'none';
  };
  const filterCities = (e) => {
    e.preventDefault();
    const filterValue = e.target.value;

    if (filterValue?.length > 0) {
      cityListDiv.current.style.display = 'flex';
      const filteredCities = cityList?.filter((city) => {
        return city.toLowerCase().includes(filterValue.toLowerCase());
      });
      setFilteredCities(filteredCities);
    } else {
      cityListDiv.current.style.display = 'none';
      setFilteredCities(null);
    }
  };
  const setInputValue = (e) => {
    e.preventDefault();
    citiesInput.current.value = e.target.innerHTML;
    setFilteredCities(null);
    cityListDiv.current.style.display = 'none';
  };
  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <form id="cities-form" onSubmit={(e) => onSubmitHandler(e)} aria-label="The form for typing the city name">
      <label htmlFor="cities">Cities: 
        <input
          type="text"
          name="cities"
          id="cities-input"
          required
          onChange={(e) => filterCities(e)}
          ref={citiesInput}
        />
      </label>

      <button>Search</button>
      <div id="city-list" ref={cityListDiv}>
        {filteredCities?.map((city, index) => {
          return (
            <span key={index} onClick={(e) => setInputValue(e)}>
              {city}
            </span>
          );
        })}
      </div>
    </form>
  );
};

export default InputField;
