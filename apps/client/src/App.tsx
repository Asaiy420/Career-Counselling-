import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CareerSearch from './pages/CareerSearch';
import SavedCareers from './pages/SavedCareers';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/register' replace />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/careers' element={<CareerSearch />} />
        <Route path='/saved-careers' element={<SavedCareers />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Navigate to='/register' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
