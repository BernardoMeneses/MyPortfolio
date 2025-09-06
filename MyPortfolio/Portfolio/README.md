# Portfolio do Bernardo Meneses

Portfolio pessoal com sistema de recomendações via GitHub e formulário de contato funcional.

## Funcionalidades

- ✅ Design gaming moderno e responsivo
- ✅ Sistema de autenticação com GitHub
- ✅ Recomendações com perfil do GitHub
- ✅ Formulário de contato que envia emails reais
- ✅ API Backend em FastAPI
- ✅ Frontend em React com Vite

## Configuração da Base de Dados

## Configurar Ambiente Virtual

- C:/Users/gamer/Desktop/Projetos/dev/Portfolio//venv/Scripts/Activate.ps1

O sistema agora usa **SQLite** para persistir dados permanentemente.

### 1. Inicializar Base de Dados (primeira vez)

```bash
cd Back
python init_db.py
```

Isso criará:
- ✅ **recommendations** - Recomendações do GitHub
- ✅ **projects** - Portfolio de projetos  
- ✅ **contact_messages** - Mensagens do formulário

### 2. Gerir Base de Dados

```bash
python db_manager.py
```

Menu interativo para:
- Ver conteúdo da base de dados
- Adicionar projetos de exemplo
- Ver estatísticas
- Limpar dados

## Configuração do Sistema de Email

Para que o formulário de contato funcione, precisa configurar o envio de emails:

### 1. Criar arquivo .env

No diretório `Back/`, copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 2. Configurar Gmail

1. Vá para [Google Account Security](https://myaccount.google.com/security)
2. Ative a **verificação em 2 etapas**
3. Vá para **Senhas de aplicativo**
4. Gere uma nova senha de aplicativo para "Mail"
5. Use essa senha no arquivo `.env`

### 3. Configurar variáveis

Edite o arquivo `.env` com seus dados:

```env
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=seu-email@gmail.com
SENDER_PASSWORD=sua-senha-de-aplicativo-gerada
RECIPIENT_EMAIL=bernardojvmeneses@gmail.com
```

## Como executar

### Backend
```bash
cd Back
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

### Frontend
```bash
cd Front
npm install
npm run dev
```

## Sistema de Recomendações

1. Usuários fazem login com token do GitHub
2. Podem deixar recomendações que aparecem com nome e foto do perfil
3. Recomendações são salvas em memória (podem ser migradas para BD)

## Contato

Formulário envia emails diretamente para o email configurado no `.env`.

## Estrutura

```
Portfolio/
├── Back/           # API FastAPI
├── Front/          # React + Vite
└── README.md       # Este arquivo
```
