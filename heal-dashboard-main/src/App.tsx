import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import ReportsPage from "./pages/ReportsPage";
import ResultsPage from "./pages/ResultsPage";
import ConfirmPage from "./pages/ConfirmPage";
import LoginPage from "./pages/LoginPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/patients" element={<PatientsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/billing" element={<ResultsPage />} />
      <Route path="/recruitment" element={<ConfirmPage />} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;