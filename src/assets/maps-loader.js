fetch('/assets/environments.json')
  .then(response => response.json())
  .then(config => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  })
  .catch(error => console.error('Erro ao carregar a chave da API do Google Maps:', error));
