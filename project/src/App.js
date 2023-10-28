import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
      </Routes>
    </div>
  );
}

export default App;
