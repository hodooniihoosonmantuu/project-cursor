import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function DepartmentsWidget() {
  const linksRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const departments = [
    { name: 'Боловсруулах үйлдвэр', desc: 'Үйлдвэрийн үйл ажиллагаа', icon: '🏭', variant: 'color-1' },
    { name: 'Аюулгүй ажиллагааны хэлтэс', desc: 'Аюулгүй байдлын удирдлага', icon: '🦺', variant: 'color-2' },
    { name: 'Байгаль орчин', desc: 'Байгаль орчны хамгаалалт', icon: '🌿', variant: 'color-3' },
    { name: 'Уулын засвар', desc: 'Уулын ажлын засвар үйлчилгээ', icon: '🔧', variant: 'color-4' },
    { name: 'Үйлдвэрийн засвар', desc: 'Үйлдвэрийн тоног төхөөрөмжийн засвар', icon: '⚙️', variant: 'color-5' },
    { name: 'Мэдээллийн технологи', desc: 'IT үйлчилгээ, системийн удирдлага', icon: '💻', variant: 'color-6' },
    { name: 'Хайгуул, хүдэр хяналтын хэлтэс', desc: 'Хайгуул, хүдрийн хяналт', icon: '🔍', variant: 'color-7' },
    { name: 'Уурхайн аж ахуй', desc: 'Уурхайн үйл ажиллагаа', icon: '⛏️', variant: 'color-8' },
    { name: 'Санхүү бүртгэл', desc: 'Санхүүгийн удирдлага', icon: '💰', variant: 'color-9' },
    { name: 'Эдийн засгийн хэлтэс', desc: 'Эдийн засгийн шинжилгээ', icon: '📊', variant: 'color-10' },
    { name: 'Төслийн менежмент', desc: 'Төслийн удирдлага', icon: '📋', variant: 'color-11' },
    { name: 'Хэвлэл мэдээлэл орон нутагтай харилцах хэлтэс', desc: 'Харилцаа, мэдээлэл', icon: '📢', variant: 'color-12' },
    { name: 'Хангамжийн хэлтэс', desc: 'Хангамж, худалдан авалт', icon: '📦', variant: 'color-13' },
    { name: 'Захиргаа хүний нөөц', desc: 'Захиргаа, хүний нөөц', icon: '👥', variant: 'color-14' },
    { name: 'Хүний нөөцийн хэлтэс', desc: 'Хүний нөөцийн удирдлага', icon: '💼', variant: 'color-15' },
    { name: 'Хуулийн хэлтэс', desc: 'Хуулийн зөвлөгөө', icon: '⚖️', variant: 'color-16' },
    { name: 'Хамгаалалтын хэлтэс', desc: 'Аюулгүй байдлын хамгаалалт', icon: '🛡️', variant: 'color-17' },
    { name: 'Комплайнсийн хэлтэс', desc: 'Дүрэм, журам', icon: '✅', variant: 'color-18' },
    { name: 'Мэдээллийн аюулгүй байдлын хэлтэс', desc: 'Мэдээллийн аюулгүй байдал', icon: '🔒', variant: 'color-19' },
    { name: 'Бусад', desc: 'Бусад үйлчилгээ', icon: '📌', variant: 'color-20' }
  ]

  const itemsVisible = 12 // Show 12 blocks at once
  const itemsPerScroll = 4 // Scroll 4 blocks at a time
  const totalSlides = Math.ceil((departments.length - itemsVisible) / itemsPerScroll) + 1

  useEffect(() => {
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('.quick-link')
      gsap.fromTo(links,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const getCurrentDepartments = () => {
    const start = currentSlide * itemsPerScroll
    const end = start + itemsVisible
    // Handle wrapping for circular scroll
    if (end > departments.length) {
      return [
        ...departments.slice(start),
        ...departments.slice(0, end - departments.length)
      ]
    }
    return departments.slice(start, end)
  }

  return (
    <div className="departments-widget widget" ref={linksRef}>
      <div className="departments-container">
        <div className="departments-grid">
          {getCurrentDepartments().map((dept, index) => (
            <div 
              key={`${currentSlide}-${index}`} 
              className={`quick-link ${dept.variant}`}
            >
              <div className="quick-link-header">
                <div className="quick-link-icon-box">
                  <div className="quick-link-icon">{dept.icon}</div>
                </div>
                <div className="quick-link-title">{dept.name}</div>
              </div>
              <div className="quick-link-desc">{dept.desc}</div>
            </div>
          ))}
        </div>
        
        {/* Navigation indicators */}
        <div className="departments-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DepartmentsWidget
