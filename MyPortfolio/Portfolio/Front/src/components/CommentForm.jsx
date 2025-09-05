import React, { useState } from 'react';
import './Styles/CommentForm.scss';

const CommentForm = ({ user, token, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !token) return;

    setIsSubmitting(true);
    try {
      // Determinar o provider baseado no usuário
      const provider = user?.provider || localStorage.getItem('auth_provider');
      
      const requestBody = {
        text: comment.trim()
      };
      
      // Adicionar token baseado no provider
      if (provider === 'github') {
        requestBody.github_token = token;
      } else if (provider === 'google') {
        requestBody.google_token = token;
      }

      const response = await fetch('http://localhost:8000/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const result = await response.json();
        setComment('');
        onCommentAdded(result.recommendation);
      } else {
        const error = await response.json();
        alert('Erro ao adicionar comentário: ' + error.detail);
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      alert('Erro ao enviar comentário. Tente novamente.');
    }
    setIsSubmitting(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="comment-form">
      <h3>Deixe uma Recomendação</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva aqui a sua recomendação sobre o trabalho do Bernardo..."
            disabled={isSubmitting}
            rows={4}
          />
        </div>
        <button type="submit" disabled={isSubmitting || !comment.trim()}>
          {isSubmitting ? 'Enviando...' : 'Publicar Recomendação'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
