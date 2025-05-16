
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage     from "./pages/LandingPage";
import SignUpPage      from "./pages/SignUpPage";
import Questionnaire   from "./components/questionnaire/Questionnaire";
import DashboardPage   from "./pages/DashboardPage";     // ← NEW
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                element={<LandingPage />} />
        <Route path="/signup"          element={<SignUpPage />} />
        <Route path="/questionnaire/*" element={<Questionnaire />} />
        <Route path="/dashboard"       element={<DashboardPage />} /> {/* NEW */}
      </Routes>
    </Router>
  );
}

export default App;