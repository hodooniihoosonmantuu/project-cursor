import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function ApplicationsGrid() {
  const gridRef = useRef(null)

  useEffect(() => {
    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      })
    }
  }, [])

  const apps = [
    { name: 'EdApp', icon: 'ADP', variant: 'adp', label: 'Training' },
    { name: 'Elque 2', icon: 'E2', variant: 'elque', label: 'Portal' },
    { name: 'Тоглоо тайлб', icon: 'W', variant: 'word', label: 'Documents' },
    { name: 'IT Helpdesk', icon: 'IT', variant: 'it', label: 'Support' },
    { name: 'Project Mgmt', icon: 'C', variant: 'concur', label: 'Projects' },
    { name: 'Vantage ERP', icon: '✉️', variant: 'mail', label: 'Email' }
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

