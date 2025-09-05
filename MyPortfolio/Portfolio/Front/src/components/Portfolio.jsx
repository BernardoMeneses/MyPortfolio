import React, { useState, useEffect } from 'react'
import './Styles/Portfolio.scss'

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/projects')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        return response.json()
      })
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <h2 className="section-title">Portfolio</h2>
          <div className="loading">Carregando projetos...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <h2 className="section-title">Portfolio</h2>
          <div className="error">Erro ao carregar projetos: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <h2 className="section-title">Portfolio</h2>
        
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <a 
                    href={project.repo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <i className="fab fa-github"></i>
                    Ver Código
                  </a>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
