function Documents() {
  const documents = [
    {
      number: '01',
      title: 'Гарын авлага',
      description: 'Ажлын явцад шаардлагатай мэдээлэл, зааварчилгаа, удирдамжийг нэгтгэн тайлбарласан баримт бичиг.',
      color: 'orange'
    },
    {
      number: '02',
      title: 'Журам',
      description: 'Байгууллагад мөрдөх дүрэм, зохицуулалт болон ажил хэрхэн явагдах дарааллыг тодорхойлсон баримт бичиг.',
      color: 'blue'
    },
    {
      number: '03',
      title: 'Маягт',
      description: 'Ажлын тэмдэглэл, мэдээлэл бөглөж өгөхөд ашиглагддаг стандарт маягтууд',
      color: 'green'
    },
    {
      number: '04',
      title: 'Форм',
      description: 'Хүсэлт, мэдээлэл бөглөх, хяналт хийх зориулалттай бүх төрлийн форм, загварууд',
      color: 'purple'
    }
  ]

  return (
    <div className="documents-section widget">
      <h2 className="documents-header">Хэрэгцээт баримт бичгүүд</h2>
      <div className="documents-flow">
        {documents.map((doc, index) => (
          <div key={index} className={`doc-card doc-${doc.color}`}>
            <div className="doc-pushpin"></div>
            <div className="doc-number">{doc.number}</div>
            <h3 className="doc-title">{doc.title}</h3>
            <p className="doc-description">{doc.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents

