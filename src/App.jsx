import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { Homepage } from './pages/Homepage'
import { Ranking } from './pages/Ranking'
import { Register } from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="register" element={<Register />} />
          <Route path="ranking" element={<Ranking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
