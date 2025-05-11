import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Import your page components
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <Router>
      <div>
        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<LandingPage />} />         {/* New Home Page */}
          <Route path="/signup" element={<SignUpPage />} />    {/* Sign Up Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
