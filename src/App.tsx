import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Auth } from './pages/auth'
import { Dashboard } from './pages/dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
