import { useState } from 'react'

function OnboardingRoadmap() {
  const [selectedDate, setSelectedDate] = useState(16)
  
  const steps = [
    { number: 1, title: 'Step 1', desc: 'Complete Onboarding Forms', completed: true },
    { number: 2, title: 'Step 2', desc: 'Attend Orientation and Connect', completed: true },
    { number: 3, title: 'Step 3', desc: 'Review Benefits and Policies', completed: false },
    { number: 4, title: 'Step 4', desc: 'Complete Training', completed: false },
    { number: 5, title: 'Step 5', desc: 'Set up recurring check-ins', completed: false }
  ]

  const timelineItems = [
    { icon: '✓', text: 'First Day' },
    { icon: '✓', text: 'First Week' },
    { icon: '✓', text: 'First Month' },
    { icon: '✓', text: 'First Quarter' }
  ]

  const calendarDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const dates = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="onboarding-section widget">
      <h2 className="onboarding-header">Onboarding Roadmap & Calendar</h2>
      
      <div className="roadmap-container">
        <div className="roadmap-main">
          <div className="roadmap-steps">
            {steps.map((step, index) => (
              <div key={index} className="roadmap-step">
                <div className={`step-number ${step.completed ? 'completed' : ''}`}>
                  {step.completed ? '✓' : step.number}
                </div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>

          <div className="timeline-items">
            {timelineItems.map((item, index) => (
              <div key={index} className="timeline-item">
                <span className="timeline-icon">{item.icon}</span>
                <span className="timeline-text">{item.text}</span>
              </div>
            ))}
          </div>

          <p style={{ 
            fontSize: '12px', 
            color: 'var(--text-secondary)', 
            marginTop: '20px',
            lineHeight: '1.6'
          }}>
            During the first quarter of your onboarding, you will review your 90-day plan with 
            your manager, meet your cross functional team, and establish regular check-ins and 
            performance meetings. You will also collect feedback to gauge progress and 
            discuss potential role adjustments based on evolving business priorities.
          </p>
        </div>

        <div className="roadmap-calendar">
          <div className="calendar-header">
            <button className="calendar-nav">←</button>
            <span className="calendar-title">Nov 2024</span>
            <button className="calendar-nav">→</button>
          </div>
          
          <div className="calendar-grid">
            {calendarDays.map((day, i) => (
              <div key={i} className="calendar-day-header">{day}</div>
            ))}
            {/* Empty cells for alignment */}
            {[1, 2, 3, 4, 5].map(i => (
              <div key={`empty-${i}`} className="calendar-day" style={{ opacity: 0.3 }}></div>
            ))}
            {dates.slice(0, 25).map(date => (
              <div 
                key={date} 
                className={`calendar-day ${selectedDate === date ? 'active' : ''} ${[7, 8, 9].includes(date) ? 'has-event' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </div>
            ))}
          </div>

          <div className="calendar-event">
            <div className="event-date">16</div>
            <div className="event-title">New Hire Orientation</div>
            <div className="event-time">Nov · 9:00 AM - 5:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingRoadmap

