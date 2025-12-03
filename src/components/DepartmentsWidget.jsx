import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function DepartmentsWidget() {
  const linksRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const departments = [
    'Боловсруулах үйлдвэр',
    'Аюулгүй ажиллагааны хэлтэс',
    'Байгаль орчин',
    'Уулын засвар',
    'Үйлдвэрийн засвар',
    'Мэдээллийн технологи',
    'Хайгуул, хүдэр хяналтын хэлтэс',
    'Уурхайн аж ахуй',
    'Санхүү бүртгэл',
    'Эдийн засгийн хэлтэс',
    'Төслийн менежмент',
    'Хэвлэл мэдээлэл орон нутагтай харилцах хэлтэс',
    'Хангамжийн хэлтэс',
    'Захиргаа хүний нөөц',
    'Хүний нөөцийн хэлтэс',
    'Хуулийн хэлтэс',
    'Хамгаалалтын хэлтэс',
    'Комплайнсийн хэлтэс',
    'Мэдээллийн аюулгүй байдлын хэлтэс'
  ]

  const itemsVisible = 8 // Show 8 blocks at once
  const itemsPerScroll = 4 // Scroll 4 blocks at a time
  const totalSlides = Math.ceil((departments.length - itemsVisible) / itemsPerScroll) + 1

  useEffect(() => {
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('.department-item')
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

  // Color variants: top row yellow, bottom row green
  const getVariant = (index) => {
    return index < 4 ? 'yellow' : 'green'
  }

  return (
    <div className="departments-widget widget" ref={linksRef}>
      <div className="departments-container">
        <div className="departments-grid">
          {getCurrentDepartments().map((dept, index) => (
            <div 
              key={`${currentSlide}-${index}`} 
              className={`department-item ${getVariant(index)}`}
            >
              <div className="department-text">{dept}</div>
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

      {/* Navigation arrows */}
      <button 
        className="departments-nav prev" 
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button 
        className="departments-nav next" 
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  )
}

export default DepartmentsWidget
