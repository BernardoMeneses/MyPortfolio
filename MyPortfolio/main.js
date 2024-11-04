// Objeto para armazenar os estados iniciais das janelas
const initialStates = {};

// Função para salvar o estado inicial da janela (tamanho e posição)
function saveInitialState(appId) {
    const appWindow = document.getElementById(appId);
    initialStates[appId] = {
        width: appWindow.style.width,
        height: appWindow.style.height,
        top: appWindow.style.top,
        left: appWindow.style.left,
    };
}

// Função para restaurar o estado inicial da janela
function restoreInitialState(appId) {
    const appWindow = document.getElementById(appId);
    const initialState = initialStates[appId];
    if (initialState) {
        appWindow.style.width = initialState.width;
        appWindow.style.height = initialState.height;
        appWindow.style.top = initialState.top;
        appWindow.style.left = initialState.left;
    }
}

// Função para abrir a janela do aplicativo, restaurando o estado inicial se necessário
function openApp(appId) {
    const appWindow = document.getElementById(appId);

    // Verifica se a janela foi fechada e precisa de restauração
    if (!appWindow.style.display || appWindow.style.display === 'none') {
        restoreInitialState(appId);
    }

    appWindow.classList.remove('minimized');
    appWindow.style.display = 'block';

    makeDraggable(appWindow);
    makeResizable(appWindow);
}

// Função para fechar a janela do aplicativo, restaurando ao estado inicial ao reabrir
function closeApp(appId) {
    const appWindow = document.getElementById(appId);

    // Salva o estado inicial se não foi salvo anteriormente
    if (!initialStates[appId]) {
        saveInitialState(appId);
    }

    appWindow.style.display = 'none';
    appWindow.classList.remove('minimized'); // Remove a classe de minimização, se houver
}

// Função para minimizar a janela do aplicativo, mantendo o estado
function minimizeApp(appId) {
    const appWindow = document.getElementById(appId);
    appWindow.classList.add('minimized'); // Adiciona a classe de minimização
    appWindow.style.display = 'none'; // Esconde a janela temporariamente
}

function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long'
    });
    const formattedTime = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    currentTimeElement.innerHTML = `${formattedDate}  ${formattedTime}`;
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime(); // Chamada inicial para definir o valor logo ao carregar a página.

function saveNote() {
    const noteContent = document.getElementById("noteContent").value;
    const blob = new Blob([noteContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notes.txt";
    link.click();
}







