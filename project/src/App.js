import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home"
import { CityInfo } from "./pages/CityInfo"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/cityinfo" exact element={<CityInfo />} />
      </Routes>
    </div>
  );
}

export default App;
