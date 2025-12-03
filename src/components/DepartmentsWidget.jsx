import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { 
  HiOutlineCog, 
  HiOutlineShieldCheck, 
  HiOutlineLeaf, 
  HiOutlineWrench, 
  HiOutlineCog6Tooth,
  HiOutlineComputerDesktop,
  HiOutlineMagnifyingGlass,
  HiOutlineCube,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineClipboardDocumentList,
  HiOutlineMegaphone,
  HiOutlineCubeTransparent,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineScale,
  HiOutlineShieldExclamation,
  HiOutlineCheckCircle,
  HiOutlineLockClosed
} from 'react-icons/hi2'

function DepartmentsWidget() {
  const linksRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const departments = [
    { name: 'Боловсруулах үйлдвэр', icon: HiOutlineCog, desc: 'Үйлдвэрийн үйл ажиллагаа' },
    { name: 'Аюулгүй ажиллагааны хэлтэс', icon: HiOutlineShieldCheck, desc: 'Аюулгүй байдлын удирдлага' },
    { name: 'Байгаль орчин', icon: HiOutlineLeaf, desc: 'Байгаль орчны хамгаалалт' },
    { name: 'Уулын засвар', icon: HiOutlineWrench, desc: 'Уулын ажлын засвар үйлчилгээ' },
    { name: 'Үйлдвэрийн засвар', icon: HiOutlineCog6Tooth, desc: 'Үйлдвэрийн тоног төхөөрөмжийн засвар' },
    { name: 'Мэдээллийн технологи', icon: HiOutlineComputerDesktop, desc: 'IT үйлчилгээ, системийн удирдлага' },
    { name: 'Хайгуул, хүдэр хяналтын хэлтэс', icon: HiOutlineMagnifyingGlass, desc: 'Хайгуул, хүдрийн хяналт' },
    { name: 'Уурхайн аж ахуй', icon: HiOutlineCube, desc: 'Уурхайн үйл ажиллагаа' },
    { name: 'Санхүү бүртгэл', icon: HiOutlineCurrencyDollar, desc: 'Санхүүгийн удирдлага' },
    { name: 'Эдийн засгийн хэлтэс', icon: HiOutlineChartBar, desc: 'Эдийн засгийн шинжилгээ' },
    { name: 'Төслийн менежмент', icon: HiOutlineClipboardDocumentList, desc: 'Төслийн удирдлага' },
    { name: 'Хэвлэл мэдээлэл орон нутагтай харилцах хэлтэс', icon: HiOutlineMegaphone, desc: 'Харилцаа, мэдээлэл' },
    { name: 'Хангамжийн хэлтэс', icon: HiOutlineCubeTransparent, desc: 'Хангамж, худалдан авалт' },
    { name: 'Захиргаа хүний нөөц', icon: HiOutlineUserGroup, desc: 'Захиргаа, хүний нөөц' },
    { name: 'Хүний нөөцийн хэлтэс', icon: HiOutlineBriefcase, desc: 'Хүний нөөцийн удирдлага' },
    { name: 'Хуулийн хэлтэс', icon: HiOutlineScale, desc: 'Хуулийн зөвлөгөө' },
    { name: 'Хамгаалалтын хэлтэс', icon: HiOutlineShieldExclamation, desc: 'Аюулгүй байдлын хамгаалалт' },
    { name: 'Комплайнсийн хэлтэс', icon: HiOutlineCheckCircle, desc: 'Дүрэм, журам' },
    { name: 'Мэдээллийн аюулгүй байдлын хэлтэс', icon: HiOutlineLockClosed, desc: 'Мэдээллийн аюулгүй байдал' }
  ]

  const itemsVisible = 10 // Show 10 blocks at once
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

  // Color variants: cycling through colors
  const getVariant = (index) => {
    const variants = ['red', 'dark-grey', 'yellow', 'green']
    return variants[index % 4]
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
              <div className="department-item-top">
                <div className="department-icon-box">
                  <dept.icon className="department-icon" />
                </div>
                <div className="department-title-wrapper">
                  <div className="department-title">{dept.name}</div>
                </div>
              </div>
              <div className="department-desc-wrapper">
                <div className="department-desc">{dept.desc}</div>
              </div>
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
