import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home"
import { CityInfo } from "./pages/CityInfo"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/registration" element={<Registration />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/cityinfo" exact element={<CityInfo />} />
      </Routes>
    </div>
  );
}

export default App;
