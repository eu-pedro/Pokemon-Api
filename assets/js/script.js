let pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')

let maxRecords = 151
const limit = 10
let offset = 0

function converterPokemonHTML(pokemon) {
  return `
  
    <li class="pokemon ${pokemon.type}">
          
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">

          <ol class="types">

            ${pokemon.types
              .map(type => `<li class="type ${type}">${type}</li>`)
              .join('')}

    
          </ol>

          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>

    
  </li>`
}

// console.log(pokemonOl)

function loadPokemonItens(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      const novaLista = pokemons
        .map(pokemon => (pokemonOl.innerHTML += converterPokemonHTML(pokemon)))
        .join('')

      // console.log(novaLista)

      // const newHTML = novaLista.join("")

      // pokemonOl.innerHTML += newHTML;

      // const listItens = [];

      // for(let elementos of pokemons){
      //   // converterPokemonHTML(elementos.name)
      //   listItens.push(converterPokemonHTML(elementos.name))

      // }
      // console.log(listItens)

      // pokemonOl.innerHTML += converterPokemonHTML(elementos.name)
    })
    // .then((pokemon) => {
    //   //debugger = debuga o meu código no devtools, em fonte;
    //   // console.log(pokemonList)

    // })
    .catch(error => console.error(error))
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecord = offset + limit

  if (qtdRecord >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, limit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})
