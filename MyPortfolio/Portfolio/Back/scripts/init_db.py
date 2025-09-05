"""
Script para inicializar a base de dados do portfolio
Execute uma vez para criar as tabelas
"""
import sqlite3
import os

DATABASE_PATH = "portfolio.db"

def create_database():
    """Criar base de dados e tabelas necessárias"""
    print("🗄️  Criando base de dados do portfolio...")
    
    # Verificar se já existe
    if os.path.exists(DATABASE_PATH):
        response = input(f"⚠️  A base de dados '{DATABASE_PATH}' já existe. Recriar? (s/N): ")
        if response.lower() != 's':
            print("Operação cancelada.")
            return
        os.remove(DATABASE_PATH)
    
    # Criar conexão
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    print("📋 Criando tabela 'recommendations'...")
    cursor.execute('''
        CREATE TABLE recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            text TEXT NOT NULL,
            avatar TEXT NOT NULL,
            github_username TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    print("📋 Criando tabela 'projects'...")
    cursor.execute('''
        CREATE TABLE projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            tech TEXT NOT NULL,  -- JSON string
            repo TEXT NOT NULL,
            image TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    print("📋 Criando tabela 'contact_messages'...")
    cursor.execute('''
        CREATE TABLE contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            sent_by_email BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Confirmar mudanças
    conn.commit()
    conn.close()
    
    print("✅ Base de dados criada com sucesso!")
    print(f"📍 Localização: {os.path.abspath(DATABASE_PATH)}")
    
    return True

def verify_tables():
    """Verificar se as tabelas foram criadas corretamente"""
    if not os.path.exists(DATABASE_PATH):
        print("❌ Base de dados não encontrada!")
        return False
    
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Listar tabelas
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    print("📊 Tabelas encontradas:")
    for table in tables:
        table_name = table[0]
        print(f"  ✅ {table_name}")
        
        # Mostrar estrutura da tabela
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = cursor.fetchall()
        for col in columns:
            print(f"    - {col[1]} ({col[2]})")
    
    conn.close()
    return True

if __name__ == "__main__":
    print("🚀 INICIALIZADOR DA BASE DE DADOS")
    print("=" * 50)
    
    if create_database():
        print("\n" + "=" * 50)
        verify_tables()
        print("\n🎉 Pronto! A base de dados está configurada.")
        print("   Agora pode executar o main.py normalmente.")
    else:
        print("❌ Falha na criação da base de dados.")
