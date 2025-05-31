// Implementa las Solicitudes con Fetch
const fetchBtn = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');

fetchBtn.addEventListener('click', () => {
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(data => {
      // ✅ Completar: renderizar datos en el contenedor
      renderCharacters(data.results);
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

// Implementa las Solicitudes con Axios
const axiosBtn = document.getElementById('axios-btn');

axiosBtn.addEventListener('click', () => {
  axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
      const data = response.data;
      // ✅ Completar: renderizar datos en el contenedor
      renderCharacters(data.results);
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

// Ejemplo de función de renderizado:
function renderCharacters(characters) {
  dataContainer.innerHTML = '';
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.innerHTML = `
      <h3>${character.name}</h3>
      <img src="${character.image}" alt="${character.name}">
    `;
    dataContainer.appendChild(characterElement);
  });
}
