import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import team1 from '../images/TeamMembers/team-1.jpg'
import team2 from '../images/TeamMembers/team-2.jpg'
import team3 from '../images/TeamMembers/team-3.jpg'
import team4 from '../images/TeamMembers/team-4.jpg'
import team5 from '../images/TeamMembers/team-5.jpg'
import team6 from '../images/TeamMembers/team-6.jpg'
import team7 from '../images/TeamMembers/team-7.jpg'
import team8 from '../images/TeamMembers/team-8.jpg'

function TeamMembers() {
  const gridRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    // Initial animation is handled by parent App component
  }, [])

  // Image mapping by ID
  const teamImages = {
    1: team1,
    2: team2,
    3: team3,
    4: team4,
    5: team5,
    6: team6,
    7: team7,
    8: team8
  }

  const teamMembers = [
    { 
      id: 1, 
      name: 'Ч.Уянга', 
      role: 'Татварын нягтлан бодогч',
      lastName: 'Чинзориг',
      firstName: 'Уянга',
      department: 'Санхүү бүртгэлийн хэлтэс',
      position: 'Татварын нягтлан бодогч',
      date: '9/22/2025',
      employeeCode: '6498'
    },
    { 
      id: 2, 
      name: 'М.Багабанди', 
      role: 'Уурхайн зураглалын геологич',
      lastName: 'Мягмарсүрэн',
      firstName: 'Багабанди',
      department: 'Хайгуул, хүдэр хяналт',
      position: 'Уурхайн зураглалын геологич',
      date: '8/15/2025',
      employeeCode: '6480'
    },
    { 
      id: 3, 
      name: 'Э.Ганцэцэг', 
      role: 'Баяжуулах үйлдвэрийн оператор',
      lastName: 'Энхнаст',
      firstName: 'Ганцэцэг',
      department: 'Боловсруулах үйлдвэр, үйлдвэрийн хэсэг',
      position: 'Баяжуулах үйлдвэрийн оператор',
      date: '9/8/2025',
      employeeCode: '6490'
    },
    { 
      id: 4, 
      name: 'Б.Энхзул', 
      role: 'Эдийн засагч',
      lastName: 'Батбаатар',
      firstName: 'Энхзул',
      department: 'Эдийн засгийн хэлтэс',
      position: 'Эдийн засагч',
      date: '8/18/2025',
      employeeCode: '6481'
    },
    { 
      id: 5, 
      name: 'Э.Лхагвасүрэн', 
      role: 'Хүдэр хяналтын геологич',
      lastName: 'Эрдэнэбат',
      firstName: 'Лхагвасүрэн',
      department: 'Хайгуул, хүдэр хяналт',
      position: 'Хүдэр хяналтын геологич',
      date: '9/29/2025',
      employeeCode: '6503'
    },
    { 
      id: 6, 
      name: 'Г.Жаргалмаа', 
      role: 'Зөвшөөрөл, эрх зүйн хэрэгжилт хариуцсан мэргэжилтэн',
      lastName: 'Ганболд',
      firstName: 'Жаргалмаа',
      department: 'Комплайнсийн хэлтэс',
      position: 'Зөвшөөрөл, эрх зүйн хэрэгжилт хариуцсан мэргэжилтэн',
      date: '9/1/2025',
      employeeCode: '6489'
    },
    { 
      id: 7, 
      name: 'Н.Жавхлантамир', 
      role: 'Төлөвлөгч',
      lastName: 'Наранцэцэг',
      firstName: 'Жавхлантамир',
      department: 'Техник ашиглалт, засварын хэлтэс, Төлөвлөлтийн алба',
      position: 'Төлөвлөгч',
      date: '10/6/2025',
      employeeCode: '6507'
    },
    { 
      id: 8, 
      name: 'Г.Сандаг', 
      role: 'Худалдан авалт хариуцсан ажилтан',
      lastName: 'Ганхуяг',
      firstName: 'Сандаг',
      department: 'Хангамжийн хэлтэс',
      position: 'Худалдан авалт хариуцсан ажилтан',
      date: '10/14/2025',
      employeeCode: '6511'
    }
  ]

  return (
    <div className="team-section widget">
      <div className="widget-header">
        <h3 className="widget-title-large">БОРООГОУЛД ХХК-д тавтай морил</h3>
      </div>
      <div className="team-grid" ref={gridRef}>
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="team-member"
            onMouseEnter={() => setHoveredId(member.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.div
              className="team-card-inner"
              animate={{
                rotateY: hoveredId === member.id ? 180 : 0
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center'
              }}
            >
              <motion.div
                className="team-card-front"
                animate={{
                  opacity: hoveredId === member.id ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="team-photo">
                  <img src={teamImages[member.id]} alt={member.name} />
                </div>
                <div className="team-info">
                  <span className="team-name">{member.name}</span>
                  <span className="team-role">{member.role}</span>
                </div>
              </motion.div>
              <motion.div
                className="team-card-back"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredId === member.id ? 1 : 0,
                  rotateY: 180
                }}
                transition={{ duration: 0.3, delay: hoveredId === member.id ? 0.3 : 0 }}
              >
                <div className="team-details-container">
                  <motion.div
                    className="team-details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredId === member.id ? 1 : 0,
                      y: hoveredId === member.id ? 0 : 20
                    }}
                    transition={{
                      duration: 0.4,
                      delay: hoveredId === member.id ? 0.5 : 0,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div
                      className="detail-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredId === member.id ? 1 : 0,
                        x: hoveredId === member.id ? 0 : -20
                      }}
                      transition={{ delay: hoveredId === member.id ? 0.6 : 0 }}
                    >
                      <span className="detail-label">Овог:</span>
                      <span className="detail-value">{member.lastName}</span>
                    </motion.div>
                    <motion.div
                      className="detail-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredId === member.id ? 1 : 0,
                        x: hoveredId === member.id ? 0 : -20
                      }}
                      transition={{ delay: hoveredId === member.id ? 0.65 : 0 }}
                    >
                      <span className="detail-label">Нэр:</span>
                      <span className="detail-value">{member.firstName}</span>
                    </motion.div>
                    <motion.div
                      className="detail-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredId === member.id ? 1 : 0,
                        x: hoveredId === member.id ? 0 : -20
                      }}
                      transition={{ delay: hoveredId === member.id ? 0.7 : 0 }}
                    >
                      <span className="detail-label">Газар нэгж:</span>
                      <span className="detail-value">{member.department}</span>
                    </motion.div>
                    <motion.div
                      className="detail-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredId === member.id ? 1 : 0,
                        x: hoveredId === member.id ? 0 : -20
                      }}
                      transition={{ delay: hoveredId === member.id ? 0.75 : 0 }}
                    >
                      <span className="detail-label">Албан тушаал:</span>
                      <span className="detail-value">{member.position}</span>
                    </motion.div>
                    <motion.div
                      className="detail-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredId === member.id ? 1 : 0,
                        x: hoveredId === member.id ? 0 : -20
                      }}
                      transition={{ delay: hoveredId === member.id ? 0.8 : 0 }}
                    >
                      <span className="detail-label">Огноо:</span>
                      <span className="detail-value">{member.date}</span>
                    </motion.div>
                    <motion.div
                      className="detail-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredId === member.id ? 1 : 0,
                        x: hoveredId === member.id ? 0 : -20
                      }}
                      transition={{ delay: hoveredId === member.id ? 0.85 : 0 }}
                    >
                      <span className="detail-label">Ажилтны код:</span>
                      <span className="detail-value">{member.employeeCode}</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamMembers

