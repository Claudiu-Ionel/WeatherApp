import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import '../Pages/Form.css';
import { useGlobalState } from '../App';

const InputField = ({ list, setState }) => {
  const [cityList, setCityList] = useState(null);
  const [filteredCities, setFilteredCities] = useState(null);
  const cityListDiv = document.getElementById('city-list');
  const citiesInput = document.getElementById('cities-input');
  const globalState = useGlobalState();
  const setCityName = globalState.setCity;

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
    console.log(citiesInput.value);
    setCityName(citiesInput.value);
    citiesInput.value = null;
  };
  const filterCities = (e) => {
    e.preventDefault();
    const filterValue = e.target.value;

    if (filterValue?.length > 0) {
      cityListDiv.style.display = 'flex';
      const filteredCities = cityList.filter((city) => {
        return city.toLowerCase().includes(filterValue.toLowerCase());
      });
      setFilteredCities(filteredCities);
    } else {
      cityListDiv.style.display = 'none';
      setFilteredCities(null);
    }
  };
  const setInputValue = (e) => {
    e.preventDefault();
    citiesInput.value = e.target.innerHTML;
    setFilteredCities(null);
    cityListDiv.style.display = 'none';
  };
  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <form id="cities-form" onSubmit={(e) => onSubmitHandler(e)}>
      <label htmlFor="cities">Cities: </label>
      <input
        type="text"
        name="cities"
        id="cities-input"
        required
        onChange={(e) => filterCities(e)}
      />

      <button>Search</button>
      <div id="city-list">
        {filteredCities?.map((city) => {
          return <span onClick={(e) => setInputValue(e)}>{city}</span>;
        })}
      </div>
    </form>
  );
};

export default InputField;
