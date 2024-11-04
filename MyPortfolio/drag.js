function makeDraggable(element) {
    let posX = 0, posY = 0, initialX = 0, initialY = 0;
    const header = element.querySelector(".window-header");

    header.onmousedown = (e) => {
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = dragElement;
    };

    function dragElement(e) {
        e.preventDefault();
        posX = initialX - e.clientX;
        posY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - posY) + "px";
        element.style.left = (element.offsetLeft - posX) + "px";
    }

    function closeDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}