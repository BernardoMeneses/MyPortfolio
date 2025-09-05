import React, { useState, useEffect } from 'react';
import './Styles/SimpleAuth.scss';

const GoogleAuth = ({ onAuth }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar se já existe autenticação Google
        const savedUser = localStorage.getItem('google_auth_user');
        const authProvider = localStorage.getItem('auth_provider');
        
        if (savedUser && authProvider === 'google') {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                if (onAuth) {
                    onAuth(userData);
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário Google:', error);
                localStorage.removeItem('google_auth_user');
                localStorage.removeItem('auth_provider');
            }
        }
    }, [onAuth]);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            
            // Fazer requisição para obter URL de autorização
            const response = await fetch('http://localhost:8000/api/auth/google/login');
            
            if (!response.ok) {
                throw new Error('Erro ao iniciar autenticação Google');
            }
            
            const data = await response.json();
            
            // Redirecionar para a URL de autorização do Google
            window.location.href = data.auth_url;
            
        } catch (error) {
            console.error('Erro na autenticação Google:', error);
            alert('Erro ao iniciar autenticação Google. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('google_auth_user');
        localStorage.removeItem('auth_provider');
        setUser(null);
        if (onAuth) {
            onAuth(null);
        }
    };

    if (user) {
        return (
            <div className="auth-container">
                <div className="user-info">
                    <div className="user-avatar">
                        {user.picture ? (
                            <img src={user.picture} alt="Avatar" />
                        ) : (
                            <div className="avatar-placeholder">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                    </div>
                    <div className="user-details">
                        <h3>{user.name || 'Usuário Google'}</h3>
                        <p>{user.email}</p>
                        {user.verified_email === 'true' && (
                            <span className="verified-badge">✓ Email Verificado</span>
                        )}
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="auth-button logout-button"
                >
                    <span className="button-icon">🚪</span>
                    Logout Google
                </button>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <h3>Autenticação Google</h3>
            <p>Faça login com sua conta Google para acessar recursos exclusivos</p>
            
            <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="auth-button google-button"
            >
                <span className="button-icon">🔐</span>
                {loading ? 'Authenticating...' : 'Login with Google'}
            </button>
            
            <div className="auth-benefits">
                <h4>Benefícios do login:</h4>
                <ul>
                    <li>✨ Acesso a projetos exclusivos</li>
                    <li>📧 Contato direto simplificado</li>
                    <li>🎯 Experiência personalizada</li>
                    <li>🔒 Dados seguros com OAuth</li>
                </ul>
            </div>
        </div>
    );
};

export default GoogleAuth;
