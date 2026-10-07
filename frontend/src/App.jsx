import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './landingPage/Home'
import NotFound from './NotFound'
import Footer from './Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}