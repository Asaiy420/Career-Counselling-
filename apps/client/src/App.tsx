import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CareerSearch from "./pages/CareerSearch";
import CareerDetail from "./pages/CareerDetail";
import SavedCareers from "./pages/SavedCareers";
import Assessment from "./pages/Assessment";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/careers" element={<CareerSearch />} />
        <Route path="/careers/:id" element={<CareerDetail />} />
        <Route path="/saved-careers" element={<SavedCareers />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
