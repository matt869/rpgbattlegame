import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Results from './pages/Results'
import { LanguageProvider } from './context/LanguageContext'

export default function App() {
  const [results, setResults] = useState(null)
  const [formData, setFormData] = useState(null)
  const [view, setView] = useState('home')

  const handleResults = (data, form) => {
    setResults(data)
    setFormData(form)
    setView('results')
  }

  const handleStart = () => {
    setView('home')
    setResults(null)
    setFormData(null)
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-bg flex flex-col">
        <Navbar
          onStart={handleStart}
          hasResults={results !== null}
          onViewResults={() => setView('results')}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {view === 'results' && results ? (
              <Results
                key="results"
                data={results}
                form={formData}
                onBack={handleStart}
              />
            ) : (
              <Home
                key="home"
                onResults={handleResults}
              />
            )}
          </AnimatePresence>
        </main>

        {view !== 'results' && <Footer />}
      </div>
    </LanguageProvider>
  )
}
