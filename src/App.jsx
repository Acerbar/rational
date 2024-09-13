import './App.css'
import { useState } from 'react'
import Header from './components/header/Header.jsx'
import MainSection from './components/sections/main/mainSection.jsx'
import Preferences from './components/sections/prefs/prefsSection.jsx'
import Services from './components/sections/services/servicesSection.jsx'
import Feedback from './components/sections/feedback/feedback.jsx'
import Footer from './components/footer.jsx'

function App() {
  const [language, setLanguage] = useState('en');
  
    return (
      <main style={{
        overflowY: "auto",
        scrollSnapType: 'mandatory',
        scrollBehavior: 'smooth',
      }}>
            <Header language={language} setLanguage={setLanguage}/>
            <MainSection language={language} />
            <Preferences language={language}/>
            <Services language={language}/>
            <Feedback language={language}/>
            <Footer/>
      </main>
    )
}

export default App
