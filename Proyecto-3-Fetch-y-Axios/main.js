const BASE_URL = 'https://pokeapi.co/api/v2';
const formNombre = document.querySelector('#searchForm')
formNombre.addEventListener('submit', (event)=>{
    event.preventDefault()
    const nombre = event.target.nombrePokemon;
    console.log(nombre.value);
    obtenerPokemonPorNombre(nombre.value)
})
const obtenerPokemonPorNombre = async (nombre, callback) => {
    const url_consulta = `${BASE_URL}/pokemon/${nombre}`;

    const responses = await fetch(url_consulta);

    if(!responses.ok){
        throw new Error('HTTP' + responses.status)
    }

    const data = await responses.json()
    console.log(data);
}

obtenerPokemonPorNombre('pikachu', () => {})