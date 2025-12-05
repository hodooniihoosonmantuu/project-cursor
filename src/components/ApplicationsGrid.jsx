import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function ApplicationsGrid() {
  const gridRef = useRef(null)

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.app-item')
      gsap.fromTo(items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
  }, [])

  const apps = [
    { name: 'EdApp', icon: 'EA', variant: 'edapp' },
    { name: 'Ellipse 9', icon: 'E9', variant: 'ellipse' },
    { name: 'Дотоод веб сайт', icon: 'WB', variant: 'website' },
    { name: 'Veritech ERP', icon: 'VE', variant: 'veritech' },
    { name: 'Project Management', icon: 'PM', variant: 'project' },
    { name: 'Oracle UAT', icon: 'OU', variant: 'oracle' },
    { name: 'IT Helpdesk Support System', icon: 'IT', variant: 'helpdesk' }
  ]

  return (
    <div className="apps-section widget">
      <h3 className="apps-title">Хэрэгцээт программын жагсаалт</h3>
      <div className="apps-grid" ref={gridRef}>
        {apps.map((app, index) => (
          <div key={index} className="app-item">
            <div className={`app-icon ${app.variant}`}>
              {app.icon}
            </div>
            <span className="app-name">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApplicationsGrid
