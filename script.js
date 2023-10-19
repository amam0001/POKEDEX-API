
const heading = document.createElement("h1");
heading.textContent = "Pokédex";
document.body.appendChild(heading);

// Retrieve the types
const types = [];
for (const pokemon of pokedex) {
  for (const type of pokemon.type) {
    if (!types.includes(type)) {
      types.push(type);
    }
  }
}
types.sort();

// Create a navigation bar for the types
const nav = document.createElement("nav");
types.forEach(type => {
  const button = document.createElement("button");
  button.textContent = type;
  button.addEventListener("click", () => {
    const typeSection = document.getElementById(type.toLowerCase());
    typeSection.scrollIntoView({ behavior: "smooth" });
  });
  nav.appendChild(button);
});
document.body.appendChild(nav);

// Create a type-specific Pokédex for each type
for (const type of types) {
  // Filter the Pokédex for Pokémon of the current type
  const typePokedex = pokedex.filter(pokemon => pokemon.type.includes(type)).sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  // Create a section for the type
  const section = document.createElement("section");
  section.id = type.toLowerCase();
  document.body.appendChild(section);

  // Create a Pokémon card for each Pokémon in the type-specific Pokédex
  for (const pokemon of typePokedex) {
    const card = document.createElement("div");
    card.classList.add("card", ...pokemon.type);
    section.appendChild(card);

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprite;
    card.appendChild(sprite);

    const name = document.createElement("h2");
    name.textContent = pokemon.name;
    card.appendChild(name);

    const stats = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];
    for (const stat of stats) {
      const value = pokemon.base[stat];
      const info = document.createElement("p");
      info.textContent = `${stat}: ${value}`;
      card.appendChild(info);
    }

    card.onclick = function() {
      window.open(pokemon.url, "_blank");
    };
  
  }
  const totalStats = typePokedex.reduce((total, pokemon) => {
    total.hp += pokemon.base.HP;
    total.attack += pokemon.base.Attack;
    return total;
  }, { hp: 0, attack: 0 });
  
  const statsParagraph = document.createElement("p");
  statsParagraph.textContent = `Total HP: ${totalStats.hp} | Total Attack: ${totalStats.attack}`;
  section.insertBefore(statsParagraph, section.firstChild);
  
  const backToTopButton = document.createElement("back");
  backToTopButton.textContent = "Back to top";
  backToTopButton.href = "#";
  backToTopButton.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  return false;
};
  
  section.insertBefore(backToTopButton, section.firstChild.nextSibling);
  
  const typeHeader = document.createElement("h2");
  typeHeader.textContent = `Type: ${type} ${typePokedex.length}`;
  section.insertBefore(typeHeader, section.firstChild);
}