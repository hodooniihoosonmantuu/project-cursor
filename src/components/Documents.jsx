function Documents() {
  const documents = [
    { name: 'Request Form', icon: '📝', variant: 'request' },
    { name: 'Applications', icon: '📱', variant: 'apps' },
    { name: 'Templates', icon: '📄', variant: 'templates' },
    { name: 'Projects', icon: '📊', variant: 'projects' },
    { name: 'Employee Handbook', icon: '📚', variant: 'handbook' },
    { name: 'Marketing Collateral', icon: '📈', variant: 'marketing' }
  ]

  return (
    <div className="documents-section widget">
      <h2 className="documents-header">Documents</h2>
      <input 
        type="text" 
        className="documents-search" 
        placeholder="Search Forms & Templates"
      />
      <div className="documents-grid">
        {documents.map((doc, index) => (
          <div key={index} className="doc-item">
            <div className={`doc-icon ${doc.variant}`}>
              {doc.icon}
            </div>
            <span className="doc-name">{doc.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents

