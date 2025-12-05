import { useState } from 'react'
import faqImage1 from '../images/FAQimages/faq (1).jpg'
import faqImage2 from '../images/FAQimages/faq (2).jpg'
import faqImage3 from '../images/FAQimages/faq (3).jpg'
import faqImage4 from '../images/FAQimages/faq (4).jpg'
import faqImage5 from '../images/FAQimages/faq (5).jpg'
import faqImage6 from '../images/FAQimages/faq (6).jpg'
import faqImage7 from '../images/FAQimages/faq (7).jpg'

function FAQWidget() {
  const [selectedIndex, setSelectedIndex] = useState(1)

  const faqItems = [
    { 
      question: 'Хэрхэн системд нэвтрэх вэ?', 
      answer: 'Таны ажил олгогч танд нэвтрэх мэдээллийг өгөх болно. Email болон нууц үгээр нэвтэрнэ. Нэвтрэх хэсэгт очоод өөрийн email болон нууц үгээ оруулна уу.',
      image: faqImage1
    },
    { 
      question: 'Нууц үгээ мартсан бол яах вэ?', 
      answer: 'Нууц үг сэргээх хэсэгт очоод email хаягаа оруулна уу. Таны email руу сэргээх холбоос ирнэ. Холбоос дээр дарж шинэ нууц үг тохируулна уу.',
      image: faqImage2
    },
    { 
      question: 'Хэрхэн ажлын цагийг бүртгэх вэ?', 
      answer: 'Ажлын цагийг бүртгэх хэсэгт очоод өдөр бүр ажлын цагаа бүртгэнэ үү. Эхлэх болон дуусах цагаа оруулж хадгалах товчийг дараарай.',
      image: faqImage3
    },
    { 
      question: 'Амралтын хүсэлт хэрхэн илгээх вэ?', 
      answer: 'Амралтын хүсэлт хэсэгт очоод шаардлагатай мэдээллийг бөглөн илгээнэ үү. Амралтын огноо, шалтгаан зэргийг оруулж хүсэлт илгээнэ үү.',
      image: faqImage4
    },
    { 
      question: 'Хэрхэн профайл засах вэ?', 
      answer: 'Профайл хэсэгт очоод хүссэн мэдээллээ засварлана уу. Хадгалах товчийг дарахад шинэчлэгдэнэ. Нэр, утас, email зэрэг мэдээллийг засах боломжтой.',
      image: faqImage5
    },
    { 
      question: 'Хэрхэн мэдэгдэл харах вэ?', 
      answer: 'Мэдэгдэл хэсэгт очоод бүх мэдэгдлүүдийг харж болно. Шинэ мэдэгдэл ирэхэд мэдэгдэх болно. Мэдэгдлүүдийг уншиж, устгах боломжтой.',
      image: faqImage6
    },
    { 
      question: 'Хэрхэн баримт бичиг татаж авах вэ?', 
      answer: 'Баримт бичгийн хэсэгт очоод татаж авахыг хүссэн баримт бичгээ сонгоод татаж авах товчийг дараарай. PDF эсвэл Excel форматтай баримт бичгүүдийг татаж авах боломжтой.',
      image: faqImage7
    }
  ]

  const handleQuestionClick = (index) => {
    setSelectedIndex(index)
  }

  return (
    <div className="widget faq-widget">
      <div className="faq-title">Түгээмэл Асуулт Хариултууд</div>
      <div className="faq-content-wrapper">
        <div className="faq-content">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${selectedIndex === index ? 'active' : ''}`}
              onClick={() => handleQuestionClick(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-answer-panel">
          {selectedIndex !== null ? (
            <div className="faq-answer-content">
              <img 
                src={faqItems[selectedIndex].image} 
                alt={faqItems[selectedIndex].question}
                className="faq-answer-image"
              />
              <div className="faq-answer-text">
                {faqItems[selectedIndex].answer}
              </div>
            </div>
          ) : (
            <div className="faq-placeholder">
              Хариулт текстууд энд байрлана
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQWidget

