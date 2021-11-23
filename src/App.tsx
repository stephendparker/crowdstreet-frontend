import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/landing/LandingPage';
import SuccessPage from './pages/success/SuccessPage';
import DisqualificationPage from './pages/disqualification/DisqualificiationPage';
function App()
{
  return (
    <div className="App">

      <Router>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/disqualification" element={<DisqualificationPage />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
