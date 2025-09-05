import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import PortfolioPage from './pages/PortfolioPage'
import RecommendationsPage from './pages/RecommendationsPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
