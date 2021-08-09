import { createContext, useContext, useState } from 'react';
import {Helmet} from "react-helmet";
import './App.css';
// import Register from './Pages/Register';
// import Login from './Pages/Login.jsx';
import WeatherForToday from './Components/WeatherForToday';
import InputField from './Components/InputField'
import UserAgreement from './Components/UserAgreement/UserAgreement';
import Background from './Components/Background';


export const AppContext = createContext();

export function useGlobalState() {
  const globalState = useContext(AppContext);

  return globalState;
}

require('dotenv').config();

function App() {
  const [city, setCity] = useState("Stockholm");
  const [userAgreement, setUserAgreement] = useState(null)
  const [whiteBlock, setWhiteBlock] = useState(true);
  const [weather, setWeather] = useState(null);
  const globalState = {
    city,
    setCity,
    userAgreement,
    setUserAgreement,
    whiteBlock,
    setWhiteBlock,
    weather,
    setWeather
  };
  return (
    <main className="App">
      <Helmet>
        <title>The Weather App</title>
      </Helmet>
      <AppContext.Provider value={globalState}>
        <div className={whiteBlock ? "white-block on" : "white-block off"}></div>
        <UserAgreement />
        {/* <Register /> */}
        {/* <Login /> */}
        <InputField />
        <WeatherForToday />
        <Background />
      </AppContext.Provider>
    </main>
  );
}

export default App;
