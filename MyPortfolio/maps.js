// Configurações do Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoicmFpbnpwdCIsImEiOiJjbTJ4a29zNjcwNXlwMnFzZHk3cnRrN2RhIn0.-Vz-cycrxMs07AIf02TdRQ';

function initMapboxMap() {
    const location = [ -8.2759558, 41.2074705];

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: location,
        zoom: 15
    });

    new mapboxgl.Marker({ color: 'red' })
        .setLngLat(location)
        .addTo(map);

    // Função para redimensionar o mapa
    function resizeMap() {
        map.resize();
    }

    // Observa mudanças no tamanho da janela de localização
    const localizacaoWindow = document.getElementById('localizacao');
    new ResizeObserver(() => {
        resizeMap();
    }).observe(localizacaoWindow);
}

// Inicia o mapa assim que o documento estiver carregado
document.addEventListener("DOMContentLoaded", initMapboxMap);