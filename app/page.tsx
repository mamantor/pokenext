import PokeView from './components/pokeView'

async function fetchPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const { results } = await res.json()
  return results
}

export default async function Home() {
  console.log('home')
  const pokemons = await fetchPokemon();
  return( <PokeView pokemons={pokemons}></PokeView>);
}
