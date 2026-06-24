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

  pokemonCard.innerHTML = `<div class="loader"></div>`;

  try {

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const data = await response.json();

    displayPokemon(data);

  } catch (error) {

    pokemonCard.innerHTML = `
      <p>Pokémon not found 😢</p>
    `;

  }
}

  const randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {

  const randomId = Math.floor(Math.random() * 1025) + 1;

  searchInput.value = randomId;

  getPokemon();

});

  let shinyMode = false;

  shinyBtn.addEventListener("click", () => {

  shinyMode = !shinyMode;

  if (currentPokemon) {
    displayPokemon(currentPokemon);
  }

});

  function displayPokemon(data) {

    const stats = data.stats;

    pokemonCard.innerHTML = `
      <div class="pokemon-card">
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" />
     <div>
  ${data.types.map(t => {
    const color = getTypeColor(t.type.name);
    return `<span style="background:${color}; padding:4px 8px; border-radius:6px; margin:2px;">
      ${t.type.name}
    </span>`;
  }).join(" ")}
  const sprite = shinyMode
  ? data.sprites.front_shiny
  : data.sprites.front_default;
  <img src="${sprite}">
</div></div>

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

function getTypeColor(type) {
  const colors = {
    fire: "#ff4d4d",
    water: "#4da6ff",
    grass: "#4caf50",
    electric: "#ffd633",
    psychic: "#ff66b3",
    ice: "#66ffff",
    dragon: "#7b61ff",
    dark: "#333333",
    fairy: "#ff99cc",
    normal: "#cccccc",
    ground: "#d2b48c",
    rock: "#b8a15a",
    bug: "#9acd32",
    poison: "#b266ff",
    fighting: "#ff9933",
    ghost: "#9966cc",
    steel: "#b0b0b0"
  };

  return colors[type] || "#ffffff";
}

localStorage.setItem(
  "lastPokemon",
  data.name
);

const lastPokemon =
  localStorage.getItem("lastPokemon");

if (lastPokemon) {
  searchInput.value = lastPokemon;
  getPokemon();
}
