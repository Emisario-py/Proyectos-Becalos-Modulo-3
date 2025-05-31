// Implementa las Solicitudes con Fetch
const fetchBtn = document.getElementById("fetch-btn");
const dataContainer = document.getElementById("data-container");


// En esta funcion se obtienen los datos de la api utilizando fetch
fetchBtn.addEventListener("click", () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=100")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then((data) => {
      renderCharacters(data.results);
    })
    .catch((error) => {
      console.error("Error:", error);
      dataContainer.textContent = "Hubo un error al obtener los datos.";
    })
});


// En esta funcion se obtienen los datos de la api utilizando axios
const axiosBtn = document.getElementById("axios-btn");

axiosBtn.addEventListener("click", () => {
  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=50&offset=100")
    .then((response) => {
      const data = response.data;
      renderCharacters(data.results);
    })
    .catch((error) => {
      console.error("Error:", error);
      dataContainer.textContent = "Hubo un error al obtener los datos.";
    });
});


// Funcion para renderizar las tarjetas de los pokemon obtenidos desde la api
function renderCharacters(characters) {
  dataContainer.innerHTML = "";
  characters.forEach((character) => {
    fetch(character.url)
      .then((response) => response.json())
      .then((pokeData) => {
        const name = pokeData.name;
        const types = pokeData.types.map((t) => t.type.name).join(", ");
        const sprite = pokeData.sprites.front_default;
        const characterElement = document.createElement("div");

        characterElement.innerHTML = `
          <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
          <img src="${sprite}" alt="${name}">
          <span class="type-name">${types}</span>
        `;
        dataContainer.appendChild(characterElement);
      })
      .catch((error) => console.error("Error al cargar sprite:", error));
  });
}
