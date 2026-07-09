import { Routes, Route } from 'react-router-dom'
import CareerSearch from './pages/CareerSearch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CareerSearch />} />
    </Routes>
  )
}

export default App