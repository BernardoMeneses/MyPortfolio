import React from 'react'
import './Styles/Hero.scss'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span>👋 Hello, devs!!</span>
            </div>
            
            <h1 className="hero-title">
              Bernardo Meneses
            </h1>
            
            <p className="hero-subtitle">
              Full Stack Developer
            </p>
            
            <p className="hero-description">
              Passionate about creating engaging and user-friendly web applications.
            </p>
            
            <div className="hero-buttons">
              <a href="/portfolio" className="btn-primary">
                View Projects
              </a>
              <a href="/contact" className="btn-outline">
                Let's Talk
              </a>
            </div>
            
            <div className="hero-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="avatar-container">
              <div className="avatar">
                <div className="avatar-inner">
                  <img 
                    src="/src/assets/eu.jpg" 
                    className="profile-image"
                  />
                </div>
              </div>
              <div className="floating-elements">
                <div className="element element-1">⚛️</div>
                <div className="element element-2">🎮</div>
                <div className="element element-3">💻</div>
                <div className="element element-4">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
