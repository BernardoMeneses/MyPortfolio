"""
Script para testar e gerir a base de dados do portfolio
"""
import sqlite3
import json
from datetime import datetime

DATABASE_PATH = "portfolio.db"

def view_database():
    """Ver conteúdo da base de dados"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    print("=== RECOMENDAÇÕES ===")
    cursor.execute("SELECT * FROM recommendations ORDER BY created_at DESC")
    recommendations = cursor.fetchall()
    
    if recommendations:
        for rec in recommendations:
            print(f"ID: {rec['id']}")
            print(f"Nome: {rec['name']}")
            print(f"GitHub: @{rec['github_username']}")
            print(f"Texto: {rec['text']}")
            print(f"Data: {rec['created_at']}")
            print("-" * 50)
    else:
        print("Nenhuma recomendação encontrada.")
    
    print("\n=== PROJETOS ===")
    cursor.execute("SELECT * FROM projects ORDER BY created_at DESC")
    projects = cursor.fetchall()
    
    if projects:
        for proj in projects:
            tech_list = json.loads(proj['tech'])
            print(f"ID: {proj['id']}")
            print(f"Título: {proj['title']}")
            print(f"Descrição: {proj['description']}")
            print(f"Tecnologias: {', '.join(tech_list)}")
            print(f"Repo: {proj['repo']}")
            print(f"Data: {proj['created_at']}")
            print("-" * 50)
    else:
        print("Nenhum projeto encontrado.")
    
    conn.close()

def add_sample_project():
    """Adicionar projeto de exemplo"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO projects (title, description, tech, repo, image)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        "Portfolio Pessoal",
        "Portfolio profissional com sistema de recomendações GitHub e formulário de contato funcional.",
        json.dumps(["React", "FastAPI", "SQLite", "Sass", "Python"]),
        "https://github.com/bernardomeneses/portfolio",
        "https://via.placeholder.com/400x200?text=Portfolio"
    ))
    
    conn.commit()
    project_id = cursor.lastrowid
    conn.close()
    
    print(f"✅ Projeto de exemplo adicionado com ID: {project_id}")

def clear_database():
    """Limpar toda a base de dados"""
    response = input("⚠️  Tem certeza que quer limpar TODA a base de dados? (digite 'SIM'): ")
    if response == "SIM":
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM recommendations")
        cursor.execute("DELETE FROM projects")
        conn.commit()
        conn.close()
        
        print("✅ Base de dados limpa!")
    else:
        print("Operação cancelada.")

def get_stats():
    """Mostrar estatísticas da base de dados"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) as count FROM recommendations")
    rec_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) as count FROM projects")
    proj_count = cursor.fetchone()[0]
    
    conn.close()
    
    print(f"📊 ESTATÍSTICAS:")
    print(f"Recomendações: {rec_count}")
    print(f"Projetos: {proj_count}")
    print(f"Base de dados: {DATABASE_PATH}")

if __name__ == "__main__":
    print("🗄️  GESTOR DA BASE DE DADOS - Portfolio Bernardo Meneses")
    print("=" * 60)
    
    while True:
        print("\nOpções:")
        print("1. Ver conteúdo da base de dados")
        print("2. Adicionar projeto de exemplo")
        print("3. Ver estatísticas")
        print("4. Limpar base de dados")
        print("0. Sair")
        
        choice = input("\nEscolha uma opção: ")
        
        if choice == "1":
            view_database()
        elif choice == "2":
            add_sample_project()
        elif choice == "3":
            get_stats()
        elif choice == "4":
            clear_database()
        elif choice == "0":
            print("👋 Até logo!")
            break
        else:
            print("❌ Opção inválida!")
