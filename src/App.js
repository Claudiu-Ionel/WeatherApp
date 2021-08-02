import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login.jsx'
import WeatherForToday from './Components/WeatherForToday';
import InputField from './Components/InputField'
import { createContext, useContext, useState } from 'react';
import UserAgreement from './Components/UserAgreement/UserAgreement';

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
  const globalState = {
    city,
    setCity,
    userAgreement,
    setUserAgreement,
    whiteBlock,
    setWhiteBlock
  };
  return (
    <main className="App">
      <AppContext.Provider value={globalState}>
        <div className={whiteBlock ? "white-block on" : "white-block off"}></div>
        <UserAgreement />
        {/* <Register /> */}
        {/* <Login /> */}
        <InputField />
        <WeatherForToday />
      </AppContext.Provider>
    </main>
  );
}

export default App;
