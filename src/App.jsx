import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StockWidget from './components/StockWidget'
import KPIWidget from './components/KPIWidget'
import HRWidget from './components/HRWidget'
import WeatherWidget from './components/WeatherWidget'
import QuickLinks from './components/QuickLinks'
import NewsSection from './components/NewsSection'
import ApplicationsGrid from './components/ApplicationsGrid'
import FeaturedArticle from './components/FeaturedArticle'
import TeamMembers from './components/TeamMembers'
import NewColleagues from './components/NewColleagues'
import Documents from './components/Documents'
import OnboardingRoadmap from './components/OnboardingRoadmap'
import ThreeBackground from './components/ThreeBackground'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const mainRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate widgets on scroll
      gsap.utils.toArray('.widget').forEach((widget, i) => {
        gsap.from(widget, {
          scrollTrigger: {
            trigger: widget,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out'
        })
      })

      // Stagger team members
      gsap.from('.team-member', {
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 80%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      })

      // Animate roadmap steps
      gsap.from('.roadmap-step', {
        scrollTrigger: {
          trigger: '.roadmap-container',
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: 'power2.out'
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="app" ref={mainRef}>
      <ThreeBackground />
      <Sidebar />
      <main className="main-content">
        <Header />
        
        <div className="dashboard-grid">
          {/* Top Row */}
          <div className="top-row">
            <StockWidget />
            <KPIWidget />
            <HRWidget />
          </div>

          {/* Second Row */}
          <div className="second-row">
            <div className="left-column">
              <WeatherWidget />
              <NewsSection title="Алтны тойм мэдээ" variant="gold" />
            </div>
            <div className="center-column">
              <QuickLinks />
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

