import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login.jsx'
import WeatherForToday from './Components/WeatherForToday';
import InputField from './Components/InputField';
require('dotenv').config();

function App() {
  return (
    <main className="App">
      {/* <Register /> */}
      {/* <Login /> */}
      <WeatherForToday />
      {/* <InputField /> */}
    </main>
  );
}

export default App;
