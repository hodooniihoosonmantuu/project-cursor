import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StockWidget from './components/StockWidget'
import KPIWidget from './components/KPIWidget'
import HRWidget from './components/HRWidget'
import SafetyWidget from './components/SafetyWidget'
import ManhoursWidget from './components/ManhoursWidget'
import WeatherWidget from './components/WeatherWidget'
import DepartmentsWidget from './components/DepartmentsWidget'
import NewsSection from './components/NewsSection'
import ApplicationsGrid from './components/ApplicationsGrid'
import FeaturedArticle from './components/FeaturedArticle'
import TeamMembers from './components/TeamMembers'
import NewColleagues from './components/NewColleagues'
import Documents from './components/Documents'
import OnboardingRoadmap from './components/OnboardingRoadmap'
import './App.css'

function App() {
  const mainRef = useRef(null)

  useEffect(() => {
    // Simple fade-in animation on load - no ScrollTrigger dependency
    const widgets = gsap.utils.toArray('.widget')
    
    gsap.set(widgets, { opacity: 1, y: 0 }) // Ensure visible first
    
    gsap.fromTo(widgets, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      }
    )

    // Team members animation
    const teamMembers = gsap.utils.toArray('.team-member')
    if (teamMembers.length > 0) {
      gsap.fromTo(teamMembers,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.5
        }
      )
    }

    // Roadmap steps animation
    const roadmapSteps = gsap.utils.toArray('.roadmap-step')
    if (roadmapSteps.length > 0) {
      gsap.fromTo(roadmapSteps,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.6
        }
      )
    }
  }, [])

  return (
    <div className="app" ref={mainRef}>
      <Sidebar />
      <main className="main-content">
        <Header />
        
        <div className="dashboard-grid">
          {/* Top Row */}
          <div className="top-row">
            <StockWidget />
            <KPIWidget />
          </div>

          {/* Safety Row - T-shaped layout */}
          <div className="safety-row">
            <HRWidget />
            <div className="safety-middle">
              <SafetyWidget location="БОРОО" days="158 Days" />
              <SafetyWidget location="УЛААНБУЛАГ" days="1795 Days" />
            </div>
            <ManhoursWidget />
          </div>

          {/* Second Row */}
          <div className="second-row">
            <div className="left-column">
              <WeatherWidget />
              <NewsSection title="Алтны тойм мэдээ" variant="gold" />
            </div>
            <div className="center-column">
              <DepartmentsWidget />
              <NewsSection title="Аюулгүй ажиллагааны сэрэмжлүүлэг" variant="safety" />
            </div>
          </div>

          {/* Applications Row */}
          <ApplicationsGrid />

          {/* Featured & Team Row */}
          <div className="featured-row">
            <FeaturedArticle />
            <TeamMembers />
          </div>

          {/* New Colleagues & Documents Row */}
          <div className="colleagues-row">
            <NewColleagues />
            <Documents />
          </div>

          {/* Onboarding Section */}
          <OnboardingRoadmap />
        </div>

        <footer className="footer">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Хайлт хийх ..." />
          </div>
          <p className="footer-text">Танд туслах хэрэгтэй бол helpdesk@boroogold.mn хаяг руу email бичээрэй!</p>
        </footer>
      </main>
    </div>
  )
}

export default App
