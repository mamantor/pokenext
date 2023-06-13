async function fetchPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const { results } = await res.json();
  return results;
}

export default async function PokeList(): Promise<JSX.Element> {
  const pokemon = await fetchPokemon();
  console.log("pokeList");
  return (
    <div>
      <ul>
        {pokemon.map((p: { name: string }) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
