function NewColleagues() {
  const colleagues = [
    {
      name: 'Derek Swinton',
      title: 'Director of Engineering',
      bio: 'Derek Swinton is a Director of Engineering. He is responsible for leading engineering operations, driving innovation, and ensuring the timely delivery of high-quality products. Leveraging his expertise to shape the company\'s engineering direction.',
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Rodriguez',
      title: 'Security Manager',
      bio: 'Emily Rodriguez is a Governance and Security Manager with over a decade of experience in the field. Previously serving as a Senior Security Analyst, she has honed her expertise in risk management and information security.',
      avatar: '👩‍💼'
    },
    {
      name: 'Kayla Anderson',
      title: 'Contract Manager',
      bio: 'Kayla Anderson is a Contract Management Team Lead. Kayla is responsible for overseeing the contractor management process, ensuring compliance with contractual obligations, and fostering strong relationships with external vendors.',
      avatar: '👩‍🔬'
    }
  ]

  return (
    <div className="colleagues-section widget">
      <h2 className="colleagues-header">Meet Your New Collegues</h2>
      <div className="colleagues-grid">
        {colleagues.map((colleague, index) => (
          <div key={index} className="colleague-card">
            <div className="colleague-avatar">{colleague.avatar}</div>
            <h3 className="colleague-name">{colleague.name}</h3>
            <p className="colleague-title">{colleague.title}</p>
            <p className="colleague-bio">{colleague.bio}</p>
            <span className="colleague-comments">Comments (0) 💬</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewColleagues

