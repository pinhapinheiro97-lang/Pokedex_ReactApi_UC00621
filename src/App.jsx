import { useEffect, useState } from 'react'
import Main from './components/Main.jsx'
import './App.css'

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");


  async function fetchPokemons() {

    // 1. Buscar a lista dos primeiros 20 Pokémon
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();

    // 2. Para cada Pokémon, buscar os detalhes
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      })

    );
    return pokemonDetails;

  }

  async function fetchPokemonByName(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        return null
      }
      const data = await response.json();
      return data;

    } catch (error) {
      return null;
    }

  }

  function handleSearch(e) {
    setSearch(e.target.value);

  }

  async function searchPokemon(e) {
    e.preventDefault();


    if (!search.trim()) {
      const pokemonList = await fetchPokemons();
      setPokemons(pokemonList);
      return;

    }

    setError("");

    const pokemon = await fetchPokemonByName(search.trim().toLowerCase());

    if (!pokemon) {
      setError("Pokémon não encontrado");
      return;
    }

    setPokemons([pokemon]);
  }

  useEffect(() => {
    async function loadPokemons() {
      const pokemonList = await fetchPokemons();
      setPokemons(pokemonList);
    }

    loadPokemons();
  }, []);

  return (

    <div>
      <Main
        pokemons={pokemons}
        handleSearch={handleSearch}
        searchPokemon={searchPokemon}
        error={error}


      />
    </div>
  )


}

export default App
