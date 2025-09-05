import React from 'react'
import './Styles/Skills.scss'

const Skills = () => {
  const skills = [
    { name: 'React', icon: '⚛️' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'Sass/SCSS', icon: '🎨' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Git', icon: '📁' },
    { name: 'C', icon: '💻' },
    { name: 'C++', icon: '💻' },
    { name: 'C#', icon: '💻' }
  ]

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">
                <span>{skill.icon}</span>
              </div>
              
              <div className="skill-info">
                <h3 className="skill-name">{skill.name}</h3>
                     
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
