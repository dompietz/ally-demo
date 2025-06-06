import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Website/LandingPage";
import Questionnaire from "./components/questionnaire/Questionnaire";
import DashboardPage from "./pages/DashboardPage";
import ContentLibraryPage from "./pages/ContentLibraryPage";
import ContentTopicPage from "./pages/ContentTopicPage"; // ✅ for category overview
import SingleArticlePage from "./pages/SingleArticlePage"; // ✅ NEW for individual articles
import SettingsPage from "./pages/SettingsPage";
import DataPage from './pages/DataPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from "./pages/LogInPage";
import CheckEmailPage from "./pages/CheckEmailPage";
import ConfirmSuccessPage from "./pages/ConfirmSuccessPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";


import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* ✅ Public access for users who are NOT logged in */}
        <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LogInPage /></PublicRoute>} />

        {/* ✅ Public pages (email actions) */}
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/confirm-success" element={<ConfirmSuccessPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* ✅ Protected pages (require login) */}
        <Route path="/questionnaire/*" element={<Questionnaire />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/data" element={<ProtectedRoute><DataPage /></ProtectedRoute>} />
        <Route path="/content-library" element={<ProtectedRoute><ContentLibraryPage /></ProtectedRoute>} />
        <Route path="/contentlibrary/:topic" element={<ProtectedRoute><ContentTopicPage /></ProtectedRoute>} />
        <Route path="/content/:slug" element={<ProtectedRoute><SingleArticlePage /></ProtectedRoute>} /> {/* ✅ NEW */}
      </Routes>
    </Router>
  );
}

export default App;
