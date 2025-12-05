import { useState } from 'react'

function OnboardingWidget() {
  const [selectedTimeline, setSelectedTimeline] = useState(null)

  const steps = [
    { number: 1, title: 'Байгаль орчны менежментийн', desc: 'ISO 14001:2015', completed: true },
    { number: 2, title: 'Хөдөлмөрийн эрүүл мэнд, аюулгүй байдлын удирдлагын тогтолцоо', desc: 'ISO 45001:2018', completed: true },
    { number: 3, title: 'Эрчим хүчний тогтолцооны', desc: 'ISO 50001:2018', completed: true },
    { number: 4, title: 'Чанарын удирдлагын тогтолцоо', desc: 'ISO 9001:2015', completed: false },
    { number: 5, title: 'Хөрөнгийн удирдлагын тогтолцоо', desc: 'ISO 55001:2014', completed: false }
  ]

  // Find the last completed step index
  const lastCompletedIndex = steps.findLastIndex(step => step.completed)
  const completedCount = lastCompletedIndex + 1

  const timelineItems = [
    { 
      icon: '✓', 
      text: 'ISO стандарт гэж юу вэ?',
      description: 'ISO стандарт нь олон улсын стандартчилалын байгууллагаас гаргасан чанарын удирдлагын тогтолцооны стандартууд юм. Эдгээр стандартууд нь байгууллагуудад тогтмол сайжруулалт хийх, үйл ажиллагааны үр ашгийг нэмэгдүүлэх, хариуцлагатай байдлыг хангах зорилготой.'
    },
    { 
      icon: '✓', 
      text: 'Байгаль орчны менежмент гэж юу вэ?',
      description: 'Байгаль орчны менежмент нь байгууллагын үйл ажиллагаа байгаль орчинд үзүүлэх нөлөөллийг бууруулах, байгаль орчныг хамгаалах, тогтвортой хөгжлийг дэмжих зорилготой удирдлагын тогтолцоо юм. ISO 14001:2015 стандарт нь байгаль орчны менежментийн тогтолцоог бий болгох, хэрэгжүүлэх, сайжруулахад чиглэгддэг.'
    },
    { 
      icon: '✓', 
      text: 'Хөдөлмөрийн эрүүл мэнд, аюулгүй байдлын удирдлагын тогтолцоо гэж юу вэ?',
      description: 'Хөдөлмөрийн эрүүл мэнд, аюулгүй байдлын удирдлагын тогтолцоо нь ажилчдын эрүүл мэнд, аюулгүй байдлыг хангах, ажлын байрны эрсдэлийг бууруулах, аюулгүй ажлын орчныг бүрдүүлэх зорилготой. ISO 45001:2018 стандарт нь ажлын байрны эрүүл мэнд, аюулгүй байдлын удирдлагын тогтолцоог бий болгох, хэрэгжүүлэхэд чиглэгддэг.'
    },
    { 
      icon: '✓', 
      text: 'Эрчим хүчний тогтолцоо гэж юу вэ?',
      description: 'Эрчим хүчний тогтолцоо нь байгууллагын эрчим хүчний хэрэглээг үр ашигтай удирдах, эрчим хүчний зардлыг бууруулах, нүүрсхүчлийн хэмжээг багасгах зорилготой удирдлагын тогтолцоо юм. ISO 50001:2018 стандарт нь эрчим хүчний үр ашгийг сайжруулах, эрчим хүчний менежментийн тогтолцоог бий болгоход чиглэгддэг.'
    }
  ]

  return (
    <div className="onboarding-section widget">
      <h2 className="onboarding-header">Аюулгүй хариуцлагатай уул уурхайг хөгжүүлэхийн төлөө</h2>
      
      <div className="roadmap-main">
        <div className="roadmap-steps" style={{ '--completed-count': completedCount, '--total-steps': steps.length }}>
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
            <div key={index}>
              <div 
                className={`timeline-item ${selectedTimeline === index ? 'active' : ''}`}
                onClick={() => setSelectedTimeline(selectedTimeline === index ? null : index)}
              >
                <span className="timeline-icon">{item.icon}</span>
                <span className="timeline-text">{item.text}</span>
              </div>
              {selectedTimeline === index && (
                <div className="timeline-description">
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OnboardingWidget

