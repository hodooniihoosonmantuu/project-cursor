import { useState } from 'react'

function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState(16)
  
  const calendarDays = ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПУР', 'БАА', 'БЯМ']
  const dates = Array.from({ length: 31 }, (_, i) => i + 1)
  
  // Calendar data with numbers, letters, and dots
  const calendarData = {
    1: { number: '11' },
    3: { number: '13' },
    4: { number: '14' },
    16: { number: '27', highlighted: true },
    5: { letter: 'Б', number: '16' },
    6: { number: '17', weekend: true },
    7: { number: '18', weekend: true },
    8: { letter: 'M', number: '19' },
    10: { number: '21' },
    11: { number: '22' },
    12: { number: '23' },
    13: { number: '24', weekend: true },
    14: { letter: 'T', number: '25', weekend: true },
    15: { number: '26' },
    16: { number: '27' },
    17: { number: '28' },
    18: { number: '29' },
    19: { number: '30' },
    20: { letter: 'Б', number: '1', weekend: true, dot: true },
    21: { number: '2', weekend: true },
    22: { number: '2' },
    23: { number: '3' },
    24: { number: '4' },
    25: { number: '5' },
    26: { number: '6' },
    27: { number: '7', weekend: true },
    28: { number: '9', weekend: true },
    29: { number: '10' },
    30: { number: '11' },
    31: { number: '12' }
  }

  // First day of month falls on Tuesday (ДАВ), so we need 1 empty cell
  const firstDayOffset = 1

  return (
    <div className="calendar-section widget">
      <h2 className="calendar-header-title">Цаг тооны бичиг</h2>
      
      <div className="roadmap-calendar">
        <div className="calendar-header">
          <button className="calendar-nav-btn">←</button>
          <span className="calendar-title">
            <span className="calendar-month">12 CAP</span> <span className="calendar-year">2025 OH</span>
          </span>
          <button className="calendar-nav-btn">→</button>
        </div>
        
        <div className="calendar-grid">
          {calendarDays.map((day, i) => (
            <div key={i} className={`calendar-day-header ${i === 0 || i === 6 ? 'weekend' : ''}`}>
              {day}
            </div>
          ))}
          {/* Empty cells for alignment */}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty"></div>
          ))}
          {dates.map((date, index) => {
            const data = calendarData[date]
            const dayOfWeek = (firstDayOffset + index) % 7
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 || data?.weekend
            const isHighlighted = data?.highlighted || date === 16
            
            return (
              <div 
                key={date} 
                className={`calendar-day ${selectedDate === date ? 'active' : ''} ${isHighlighted ? 'highlighted' : ''} ${isWeekend ? 'weekend' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="calendar-date-number">{date}</div>
                {data && (
                  <div className="calendar-date-info">
                    {data.letter && <span className="calendar-letter">{data.letter}</span>}
                    {data.number && <span className="calendar-number">{data.number}</span>}
                    {data.dot && <span className="calendar-dot"></span>}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {selectedDate && (
          <div className="calendar-event-card">
            <div className="calendar-event-date">
              <div className="event-date-number">{selectedDate}</div>
              <div className="event-date-month">ӨДӨР</div>
            </div>
            <div className="calendar-event-details">
              <div className="event-title">Quiz Night</div>
              <div className="event-time">7:30 PM - 9:30 PM</div>
            </div>
            <div className="calendar-event-tag">
              <span className="red-dot"></span>
              <span className="live-dot"></span>
              Идэвхтэй
            </div>
            <div className="calendar-event-bar"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarWidget

