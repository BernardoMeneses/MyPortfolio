//resize

function initializeResize() {
    document.querySelectorAll('.app-window').forEach(window => {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        window.appendChild(resizeHandle);

        resizeHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            window.isResizing = true;
            window.startX = e.clientX;
            window.startY = e.clientY;
            window.startWidth = parseInt(window.style.width || window.offsetWidth, 10);
            window.startHeight = parseInt(window.style.height || window.offsetHeight, 10);
        });

        document.addEventListener('mousemove', (e) => {
            if (window.isResizing) {
                const width = window.startWidth + (e.clientX - window.startX);
                const height = window.startHeight + (e.clientY - window.startY);
                window.style.width = width + 'px';
                window.style.height = height + 'px';

                const content = window.querySelector('.window-content');
                if (content) {
                    content.style.width = '100%';
                    content.style.height = 'calc(100% - 30px)';
                }
            }
        });

        document.addEventListener('mouseup', () => {
            window.isResizing = false;
        });
    });
}

document.addEventListener("DOMContentLoaded", initializeResize);


