import React, { useState, useEffect } from 'react'
import AuthToggle from './AuthToggle'
import CommentForm from './CommentForm'
import './Styles/Recommendations.scss'

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/recommendations')
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations')
      }
      const data = await response.json()
      setRecommendations(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleAuth = (userData) => {
    if (userData) {
      setUser(userData)
      setToken(userData.token || userData.access_token)
    } else {
      setUser(null)
      setToken(null)
    }
  }

  const handleLogin = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
  }

  const handleCommentAdded = (newRecommendation) => {
    setRecommendations(prev => [...prev, newRecommendation])
  }

  if (loading) {
    return (
      <section id="recommendations" className="recommendations section">
        <div className="container">
          <h2 className="section-title">Recommendations</h2>
          <div className="loading">Loading recommendations...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="recommendations" className="recommendations section">
        <div className="container">
          <h2 className="section-title">Recommendations</h2>
          <div className="error">Error loading recommendations: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <section id="recommendations" className="recommendations section">
      <div className="container">
        <h2 className="section-title">Recommendations</h2>

        <AuthToggle onAuth={handleAuth} />
        
        <CommentForm 
          user={user}
          token={token}
          onCommentAdded={handleCommentAdded}
        />
        
        {recommendations.length === 0 ? (
          <div className="no-recommendations">
            <p>There are no recommendations yet. Be the first to leave one!</p>
          </div>
        ) : (
          <div className="recommendations-grid">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="recommendation-card">
                <div className="recommendation-content">
                  <div className="quote-icon">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  
                  <p className="recommendation-text">
                    {recommendation.text}
                  </p>
                  
                  <div className="recommendation-author">
                    <img 
                      src={recommendation.avatar} 
                      alt={recommendation.name}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <span className="author-name">{recommendation.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Recommendations
