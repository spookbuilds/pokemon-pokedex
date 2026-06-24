const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const pokemonCard = document.getElementById("pokemonCard");

searchBtn.addEventListener("click", getPokemon);

async function getPokemon() {

  const name = searchInput.value.toLowerCase();

  if (!name) return;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    displayPokemon(data);

  } catch (error) {
    pokemonCard.innerHTML = "<p>Pokémon not found 😢</p>";
  }
}

function displayPokemon(data) {

  pokemonCard.innerHTML = `
    <h2>${data.name.toUpperCase()}</h2>
    <img src="${data.sprites.front_default}" />
    <p>Height: ${data.height}</p>
    <p>Weight: ${data.weight}</p>
    <p>Type: ${data.types.map(t => t.type.name).join(", ")}</p>
  `;
}
