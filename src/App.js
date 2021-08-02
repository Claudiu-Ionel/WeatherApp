import { createContext, useContext, useState } from 'react';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login.jsx';
import WeatherForToday from './Components/WeatherForToday';
import InputField from './Components/InputField';
import Background from './Components/Background';

export const AppContext = createContext();

export function useGlobalState() {
  const globalState = useContext(AppContext);

  return globalState;
}

require('dotenv').config();

function App() {
  const [city, setCity] = useState('Stockholm');

  const globalState = {
    city,
    setCity
  };
  console.log(city);
  return (
    <main className="App">
      <AppContext.Provider value={globalState}>
        {/* <Register /> */}
        {/* <Login /> */}
        {/* <InputField /> */}
        <WeatherForToday />
        <Background />
      </AppContext.Provider>
    </main>
  );
}

export default App;
