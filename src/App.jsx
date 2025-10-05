import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Landing from './Pages/Landing.jsx'
import EarthDeepDive from './Pages/EarthDeepDive.jsx'
import About from './Pages/About.jsx'
import Models from './Pages/Models.jsx'
import ModelViewer from './Pages/ModelViewer.jsx'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ocean-pulse" element={<EarthDeepDive />} />
          <Route path="/about" element={<About />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:model" element={<ModelViewer />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
