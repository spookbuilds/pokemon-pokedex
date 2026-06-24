document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const pokemonCard = document.getElementById("pokemonCard");

  searchBtn.addEventListener("click", getPokemon);

  searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getPokemon();
  }
});

  async function getPokemon() {

  const name = (searchInput.value || "").toLowerCase().trim();
  if (!name) return;

  let loadingTimeout = setTimeout(showLoading, 200); 

    function showLoading() {
  pokemonCard.innerHTML = "<p>Loading Pokémon...</p>";
}

    clearTimeout(loadingTimeout);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      displayPokemon(data);

    } catch (error) {
      pokemonCard.innerHTML = "<p>Pokémon not found 😢</p>";
    }
  }

  function displayPokemon(data) {

    const stats = data.stats;

    pokemonCard.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" />
      <p>Type: ${data.types.map(t => t.type.name).join(", ")}</p>

      <h3>Stats</h3>

      <p>HP: ${stats[0].base_stat}</p>
      <div class="bar"><div style="width:${stats[0].base_stat}%"></div></div>

      <p>Attack: ${stats[1].base_stat}</p>
      <div class="bar"><div style="width:${stats[1].base_stat}%"></div></div>

      <p>Defense: ${stats[2].base_stat}</p>
      <div class="bar"><div style="width:${stats[2].base_stat}%"></div></div>

      <p>Speed: ${stats[5].base_stat}</p>
      <div class="bar"><div style="width:${stats[5].base_stat}%"></div></div>
    `;
  }

});
