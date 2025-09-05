import uvicorn
import os

# Mudar para o diretório correto
os.chdir(r"c:\Users\gamer\Desktop\Projetos\dev\Portfolio\Back")

# Iniciar servidor
if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
