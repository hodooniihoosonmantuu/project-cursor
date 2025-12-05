import mywork1 from '../images/howiwork/mywork (1).jpg'
import mywork2 from '../images/howiwork/mywork (2).jpg'
import mywork3 from '../images/howiwork/mywork (3).jpg'

function HowIWork() {
  const colleagues = [
    {
      name: 'Дорж',
      bio: 'Дорж гал хамгаалагч мэргэжилтэй. Өглөө бүр унтраагуураа бүсэлхийгээрээ зүүгээд "өнөөдөр хэн надтай тоглох бол?" гэж ажилдаа гардаг. Розеткыг ширтэн "чи л гал гаргавал би чамтай ярилцана шүү" гэж айлгадаг. Галын дохиолол дуугармагц Дорж Бэтмэнээс хурдан гүйж очно. Ажлынхан нь "гал биш ч гэсэн Доржийг ажилтай байлгахгүй бол унтраагуураа тослоод сууж байна" гэж шоолдог.',
      image: mywork1,
      comments: 2,
      likes: 6,
      readTime: '15 мин'
    },
    {
      name: 'Бат',
      bio: 'Бат бол граффити зураач. Өглөө бүр будгаа үүрээд "өнөөдөр аль хана намайг дууддаг бол?" гэж хотыг ажиглана. Хуурай саарал ханыг харангуутаа "чамайг би амь оруулаад өгнө өө" гэж шивнэдэг. Шүршдэг баллон дуугарахтай зэрэгцэн Батын төсөөлөл галзууртал ажиллаж эхэлнэ. Хүмүүс түүний бүтээлийг хараад "хана хүртэл жаргалтай харагдаж байна" гэж гайхдаг.',
      image: mywork2,
      comments: 4,
      likes: 6,
      readTime: '6 мин'
    },
    {
      name: 'Готов',
      bio: 'Готов бол шугам гортикийн багш. Өглөө бүр анги руугаа алхахдаа "өнөөдөр ямар утас намайг сорих бол?" гэж догдлоно. Оюутан бүрийн бооцоонд тавьсан шиг орооцолдсон утсыг хараад "энэ бол миний *** " гэж инээмсэглэнэ. Хичээл орохдоо утсыг загнаж "чи миний нэр хүндийг бүү унагаарай!" гэж сүрдүүлнэ. Оюутнууд нь хүртэл "Утас Готовыг биш, Готов утсыг айлгадаг" гэж ярьдаг.',
      image: mywork3,
      comments: 7,
      likes: 6,
      readTime: '9 мин'
    }
  ]

  return (
    <div className="colleagues-section widget">
      <h2 className="colleagues-header">Би хэрхэн ажилладаг вэ?</h2>
      <div className="colleagues-grid">
        {colleagues.map((colleague, index) => (
          <div key={index} className="colleague-card">
            <div className="colleague-photo">
              <img src={colleague.image} alt={colleague.name} />
            </div>
            <div className="colleague-content">
              <div className="colleague-name-row">
                <h3 className="colleague-name">{colleague.name}</h3>
                <div className="colleague-time-status">
                  <span className="live-dot"></span>
                  <span className="read-time">{colleague.readTime}</span>
                </div>
              </div>
              <p className="colleague-bio">{colleague.bio}</p>
              <div className="colleague-footer">
                <button className="colleague-comments-btn">
                  <span className="comments-text">Сэтгэгдэл</span>
                  <span className="comments-badge">{colleague.comments}</span>
                </button>
                <button className="colleague-read-btn">
                  <span className="read-text">Унших</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowIWork

