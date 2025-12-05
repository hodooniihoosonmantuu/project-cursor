import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import searchIcon from '../icons/seach-icon.png'

function SearchWidget1() {
  const widgetRef = useRef(null)
  const textRef = useRef(null)
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  const questions = [
    'Бид танд юугаар туслах вэ?',
    'Ямар баримт бичиг хэрэгтэй байна вэ?',
    'Юутай холбоотой мэдээлэл хайж байна?',
    'Ажилтны нэр эсвэл албан тушаал хайх уу?'
  ]

  useEffect(() => {
    if (widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
  }, [])

  useEffect(() => {
    const currentText = questions[currentIndex]
    let charIndex = 0
    let timeoutId

    const typeText = () => {
      if (charIndex < currentText.length) {
        setDisplayText(currentText.substring(0, charIndex + 1))
        charIndex++
        timeoutId = setTimeout(typeText, 100) // Typing speed
      } else {
        // Wait before deleting
        timeoutId = setTimeout(() => {
          const deleteText = () => {
            if (charIndex > 0) {
              charIndex--
              setDisplayText(currentText.substring(0, charIndex))
              timeoutId = setTimeout(deleteText, 50) // Deleting speed
            } else {
              // Move to next text
              setCurrentIndex((prev) => (prev + 1) % questions.length)
            }
          }
          deleteText()
        }, 2000) // Wait 2 seconds before deleting
      }
    }

    // GSAP animation for text appearance
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        }
      )
    }

    typeText()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentIndex])

  return (
    <div className="widget search-widget search-widget-1" ref={widgetRef}>
      <div className="search-widget-content">
        <img src={searchIcon} alt="Search" className="search-icon" />
        <div className="search-separator"></div>
        <div className="search-typing-text" ref={textRef}>
          {displayText}
          <span className="typing-cursor">|</span>
        </div>
      </div>
    </div>
  )
}

export default SearchWidget1

