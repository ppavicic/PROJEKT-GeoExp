import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home"
import { CityInfo } from "./pages/CityInfo"
import Login from "./pages/Login"
import Question from "./pages/Questions"
import Registration from "./pages/Registration"
import PrivateRoutes from './pages/Private';
import { ProfilePage } from "./pages/ProfilePage"
import { Quiz } from "./pages/Quiz"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/question" element={
          <PrivateRoutes>
            <Question cityInfo={CityInfo} />
          </PrivateRoutes>}
          exact />
        <Route path="/registration" element={<Registration />} exact />
        <Route path="/home" element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>}
          exact />
        <Route path="/cityInfo" element={
          <PrivateRoutes>
            <CityInfo />
          </PrivateRoutes>}
          exact />
        <Route path="/profile" element={
          <PrivateRoutes>
            <ProfilePage />
          </PrivateRoutes>}
          exact />
        <Route path="/quiz" element={
          <PrivateRoutes>
            <Quiz />
          </PrivateRoutes>}
          exact />
      </Routes>
    </div>
  );
}

export default App;
