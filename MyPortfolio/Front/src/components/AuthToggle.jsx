import React, { useState, useEffect } from 'react';
import './Styles/AuthToggle.scss';

const AuthToggle = ({ onAuth }) => {
    const [activeProvider, setActiveProvider] = useState('github'); // github ou google
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [authProvider, setAuthProvider] = useState(null);

    useEffect(() => {
        // Verificar se já existe autenticação ativa
        const provider = localStorage.getItem('auth_provider');
        
        if (provider === 'github') {
            // Tentar múltiplas chaves para compatibilidade
            const savedUser = localStorage.getItem('github_auth_user') || localStorage.getItem('github_user');
            if (savedUser) {
                try {
                    const userData = JSON.parse(savedUser);
                    setUser(userData);
                    setAuthProvider('github');
                    setActiveProvider('github');
                    // Notificar o componente pai
                    if (onAuth) {
                        onAuth(userData);
                    }
                } catch (error) {
                    console.error('Erro ao carregar dados GitHub:', error);
                    localStorage.removeItem('github_auth_user');
                    localStorage.removeItem('github_user');
                    localStorage.removeItem('auth_provider');
                }
            }
        } else if (provider === 'google') {
            // Tentar múltiplas chaves para compatibilidade
            const savedUser = localStorage.getItem('google_auth_user') || localStorage.getItem('google_user');
            if (savedUser) {
                try {
                    const userData = JSON.parse(savedUser);
                    setUser(userData);
                    setAuthProvider('google');
                    setActiveProvider('google');
                    // Notificar o componente pai
                    if (onAuth) {
                        onAuth(userData);
                    }
                } catch (error) {
                    console.error('Erro ao carregar dados Google:', error);
                    localStorage.removeItem('google_auth_user');
                    localStorage.removeItem('google_user');
                    localStorage.removeItem('auth_provider');
                }
            }
        }

        // Listener para mensagens do callback de autenticação
        const handleAuthMessage = (event) => {
            if (event.data.type === 'github_auth_success') {
                const userData = event.data.user;
                setUser(userData);
                setAuthProvider('github');
                setActiveProvider('github');
                localStorage.setItem('auth_provider', 'github');
                localStorage.setItem('github_auth_user', JSON.stringify(userData));
                
                if (onAuth) {
                    onAuth(userData);
                }
            } else if (event.data.type === 'google_auth_success') {
                const userData = event.data.user;
                setUser(userData);
                setAuthProvider('google');
                setActiveProvider('google');
                localStorage.setItem('auth_provider', 'google');
                localStorage.setItem('google_auth_user', JSON.stringify(userData));
                
                if (onAuth) {
                    onAuth(userData);
                }
            }
        };

        window.addEventListener('message', handleAuthMessage);

        return () => {
            window.removeEventListener('message', handleAuthMessage);
        };
    }, [onAuth]);

    const handleLogin = async (provider) => {
        try {
            setLoading(true);
            
            const endpoint = provider === 'github' 
                ? 'http://localhost:8000/api/auth/github/login'
                : 'http://localhost:8000/api/auth/google/login';
            
            console.log(`Fazendo requisição para: ${endpoint}`);
            
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            
            console.log(`Status da resposta: ${response.status}`);
            console.log(`Headers da resposta:`, response.headers);
            
            if (!response.ok) {
                throw new Error(`Erro ao iniciar autenticação ${provider}: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`Dados recebidos:`, data);
            
            // Abrir popup para autenticação
            const popup = window.open(
                data.auth_url,
                `${provider}_auth`,
                'width=600,height=700,scrollbars=yes,resizable=yes'
            );
            
            // Verificar se popup foi bloqueado
            if (!popup || popup.closed || typeof popup.closed === 'undefined') {
                alert('Por favor, permita popups para este site para fazer login.');
                return;
            }
            
            // Monitorar fechamento do popup
            const checkClosed = setInterval(() => {
                if (popup.closed) {
                    clearInterval(checkClosed);
                    setLoading(false);
                }
            }, 1000);
            
        } catch (error) {
            console.error(`Erro na autenticação ${provider}:`, error);
            alert(`Erro ao iniciar autenticação ${provider}. Tente novamente.`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Limpar dados do localStorage
        localStorage.removeItem('github_auth_user');
        localStorage.removeItem('google_auth_user');
        localStorage.removeItem('auth_provider');
        
        // Resetar estado
        setUser(null);
        setAuthProvider(null);
        
        if (onAuth) {
            onAuth(null);
        }
    };

    // Se já está autenticado, mostrar informações do usuário
    if (user && authProvider) {
        return (
            <div className="auth-toggle-container">
                <div className="auth-user-card">
                    <div className="user-header">
                        <div className="user-avatar">
                            {user.avatar_url || user.picture ? (
                                <img src={user.avatar_url || user.picture} alt="Avatar" />
                            ) : (
                                <div className="avatar-placeholder">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            )}
                        </div>
                        <div className="user-info">
                            <h4>{user.name || user.login || 'Usuário'}</h4>
                            <p>{user.email || 'Email não disponível'}</p>
                            <span className="provider-badge">
                                {authProvider === 'github' ? '🐙 GitHub' : '🔐 Google'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="user-actions">
                        <button onClick={handleLogout} className="logout-btn">
                            🚪 Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Se não está autenticado, mostrar opções de login
    return (
        <div className="auth-toggle-container">
            <div className="auth-header">
                <h3>Login to leave a recommendation</h3>
                <p>Choose your authentication method:</p>
            </div>

            <div className="provider-toggle">
                <button 
                    className={`toggle-btn ${activeProvider === 'github' ? 'active' : ''}`}
                    onClick={() => setActiveProvider('github')}
                >
                    🐙 GitHub
                </button>
                <button 
                    className={`toggle-btn ${activeProvider === 'google' ? 'active' : ''}`}
                    onClick={() => setActiveProvider('google')}
                >
                    🔐 Google
                </button>
            </div>

            <div className="auth-section">
                {activeProvider === 'github' ? (
                    <div className="provider-card">
                        <div className="provider-info">
                            <h4>🐙 GitHub</h4>
                            <p>For developers and collaborators</p>
                            <ul>
                                <li>✅ Quick access with dev profile</li>
                                <li>✅ Verified recommendations</li>
                                <li>✅ Contribution history</li>
                            </ul>
                        </div>
                        <button 
                            onClick={() => handleLogin('github')}
                            disabled={loading}
                            className="login-btn github-btn"
                        >
                            {loading ? 'Conectando...' : 'Login com GitHub'}
                        </button>
                    </div>
                ) : (
                    <div className="provider-card">
                        <div className="provider-info">
                            <h4>🔐 Google</h4>
                            <p>For general access and contacts</p>
                            <ul>
                                <li>✅ Secure login with Google</li>
                                <li>✅ Verified profile</li>
                                <li>✅ Universal access</li>
                            </ul>
                        </div>
                        <button 
                            onClick={() => handleLogin('google')}
                            disabled={loading}
                            className="login-btn google-btn"
                        >
                            {loading ? 'Conectando...' : 'Login com Google'}
                        </button>
                    </div>
                )}
            </div>

            <div className="auth-footer">
                <p>🔒 Your data is safe with OAuth 2.0</p>
            </div>
        </div>
    );
};

export default AuthToggle;
