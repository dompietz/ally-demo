// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage         from "./pages/LandingPage";
import SignUpPage          from "./pages/SignUpPage";
import Questionnaire       from "./components/questionnaire/Questionnaire";
import DashboardPage       from "./pages/DashboardPage";
import ContentLibraryPage  from "./pages/ContentLibraryPage";
import SettingsPage        from "./pages/SettingsPage"; // ← ✅ Import new page
import DataPage from './pages/DataPage';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                element={<LandingPage />} />
        <Route path="/signup"          element={<SignUpPage />} />
        <Route path="/questionnaire/*" element={<Questionnaire />} />
        <Route path="/dashboard"       element={<DashboardPage />} />
        <Route path="/content-library" element={<ContentLibraryPage />} />
        <Route path="/settings"        element={<SettingsPage />} /> {/* ← ✅ New route */}
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
