import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Auth } from './pages/Auth'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Auth />} />
        {/* <Route path='/' element={<Dashboard />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
