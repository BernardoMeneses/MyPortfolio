import React, { useState, useEffect } from 'react';
import './Styles/GitHubAuth.scss';

const GitHubAuth = ({ onLogin, user, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar se há dados de auth salvos
    const savedUser = localStorage.getItem('github_user');
    const savedToken = localStorage.getItem('github_token');
    
    if (savedUser && savedToken && !user) {
      try {
        const userData = JSON.parse(savedUser);
        onLogin(userData, savedToken);
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
        localStorage.removeItem('github_user');
        localStorage.removeItem('github_token');
      }
    }

    // Escutar por atualizações do localStorage (quando callback.html salva os dados)
    const handleStorageChange = (e) => {
      if (e.key === 'github_user' && e.newValue) {
        try {
          const userData = JSON.parse(e.newValue);
          const token = localStorage.getItem('github_token');
          onLogin(userData, token);
        } catch (error) {
          console.error('Erro ao processar dados do callback:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, onLogin]);

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true);
      
      // Obter URL de autorização do backend
      const response = await fetch('http://localhost:8000/api/auth/github/login');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Erro ao iniciar autenticação');
      }
      
      // Abrir popup para autenticação
      const popup = window.open(
        data.auth_url,
        'github-auth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );
      
      // Monitorar quando o popup é fechado
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          setIsLoading(false);
          
          // Verificar se a autenticação foi bem-sucedida
          setTimeout(() => {
            const savedUser = localStorage.getItem('github_user');
            const savedToken = localStorage.getItem('github_token');
            
            if (savedUser && savedToken) {
              try {
                const userData = JSON.parse(savedUser);
                onLogin(userData, savedToken);
              } catch (error) {
                console.error('Erro ao processar dados de autenticação:', error);
              }
            }
          }, 500);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Erro na autenticação:', error);
      alert('Erro ao conectar com GitHub. Tente novamente.');
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('github_user');
    localStorage.removeItem('github_token');
    onLogout();
  };

  if (user) {
    return (
      <div className="github-auth logged-in">
        <div className="user-info">
          <img src={user.avatar_url} alt={user.name} className="user-avatar" />
          <span className="user-name">Olá, {user.name || user.login}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="github-auth">
      <h3>Login com GitHub</h3>
      <p>Para deixar uma recomendação, faça login com sua conta GitHub.</p>
      
      <button 
        onClick={handleGitHubLogin} 
        disabled={isLoading}
        className="github-login-btn"
      >
        {isLoading ? (
          <>
            <div className="spinner"></div>
            Autenticando...
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="github-icon">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Conectar com GitHub
          </>
        )}
      </button>
      
      <div className="help-text">
        <p>
          <strong>Rápido e seguro:</strong><br />
          • Autenticação via OAuth do GitHub<br />
          • Seus dados ficam seguros<br />
          • Um clique para conectar
        </p>
      </div>
    </div>
  );
};

export default GitHubAuth;
