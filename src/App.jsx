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
import WeatherPlusWidget from './components/WeatherPlusWidget'
import WeatherLastWidget from './components/WeatherLastWidget'
import DepartmentsWidget from './components/DepartmentsWidget'
import NewsSection from './components/NewsSection'
import ApplicationsGrid from './components/ApplicationsGrid'
import FAQWidget from './components/FAQWidget'
import SearchWidget1 from './components/SearchWidget1'
import ITHelpdeskWidget from './components/ITHelpdeskWidget'
import NewsWidget1 from './components/NewsWidget1'
import NewsWidget2 from './components/NewsWidget2'
import TeamMembers from './components/TeamMembers'
import HowIWork from './components/HowIWork'
import Documents from './components/Documents'
import OnboardingWidget from './components/OnboardingWidget'
import CalendarWidget from './components/CalendarWidget'
import Footer from './components/Footer'
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

          {/* Departments Row */}
          <div className="departments-row">
            <DepartmentsWidget />
          </div>

          {/* Second Row */}
          <div className="second-row">
            <div className="left-column">
              <NewsSection title="Алтны зах зээлийн тойм" variant="gold" />
            </div>
            <div className="center-column">
              <NewsSection title="Аюулгүй ажиллагааны сэрэмжлүүлэг" variant="safety" />
            </div>
          </div>

          {/* Applications & Weather Row */}
          <div className="apps-weather-row">
            <div className="weather-column">
              <WeatherWidget />
              <WeatherPlusWidget />
              <WeatherLastWidget />
            </div>
            <div className="apps-faq-column">
              <ApplicationsGrid />
              <FAQWidget />
              <div className="search-widgets-row">
                <SearchWidget1 />
                <ITHelpdeskWidget />
              </div>
            </div>
          </div>

          {/* News Widgets */}
          <div className="news-widgets-row">
            <NewsWidget1 />
            <NewsWidget2 />
          </div>
          
          {/* Team Members */}
          <TeamMembers />

          {/* New Colleagues & Documents Row */}
          <div className="colleagues-row">
            <HowIWork />
            <Documents />
          </div>

          {/* Onboarding & Calendar Row */}
          <div className="onboarding-calendar-row">
            <OnboardingWidget />
            <CalendarWidget />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}

export default App
