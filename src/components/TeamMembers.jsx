import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function TeamMembers() {
  const gridRef = useRef(null)

  useEffect(() => {
    // Initial animation is handled by parent App component
  }, [])

  const teamMembers = [
    { name: 'Abigail Carpenter', role: 'Sales Representative', avatar: '👩‍💼' },
    { name: 'Blake Lewis', role: 'Executive Assistant', avatar: '👨‍💼' },
    { name: 'Blake Martinez', role: 'UI Designer', avatar: '👩‍🎨' },
    { name: 'Charlie Smith', role: 'SVP of Operations', avatar: '👨‍💻' },
    { name: 'Chris Lewis', role: 'Software Engineer', avatar: '🧑‍💻' },
    { name: 'Chris Wilson', role: 'Business Developer...', avatar: '👨‍🔬' },
    { name: 'Drew Robinson', role: 'DevOps Engineer', avatar: '👩‍💻' },
    { name: 'Drew Taylor', role: 'SEO Analyst', avatar: '🧑‍🔧' },
    { name: 'Erika Ryan', role: 'Customer Care Man...', avatar: '👩‍🏫' },
    { name: 'Hayden Miller', role: 'Content Strategist', avatar: '👨‍🎓' },
    { name: 'James Christian...', role: 'IT Specialist', avatar: '🧑‍💼' },
    { name: 'Jenny Smith', role: 'General Manager', avatar: '👩‍⚕️' }
  ]

  return (
    <div className="team-section widget">
      <div className="widget-header">
        <h3 className="widget-title-large">Малууа и mon équipe</h3>
        <span style={{ fontSize: '12px', color: 'var(--primary-green)', cursor: 'pointer' }}>
          New Hire Orientation →
        </span>
      </div>
      <div className="team-grid" ref={gridRef}>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="team-avatar">
              {member.avatar}
            </div>
            <span className="team-name">{member.name}</span>
            <span className="team-role">{member.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamMembers

