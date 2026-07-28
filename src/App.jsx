import { useEffect, useState } from 'react'
import Main from './components/Main.jsx'
import './App.css'
import axios from "axios";

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [prevPage]

  // em caso de erro
  const [error, setError] = useState("");


  // Obtém os primeiros 20 Pokémon da PokéAPI
  async function fetchPokemons() {

    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");

    // 2. Para cada Pokémon, buscar os detalhes
    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return response.data;
      })

    );
    return pokemonDetails;

  }

  // obter pokemon especifico através do nome
  async function fetchPokemonByName(name) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

      return response.data;

    } catch (error) {
      console.error(error);
      return null;
    }

  }

  // atualiza o estado da pesquisa sempre que o user escreve
  function handleSearch(e) {
    setSearch(e.target.value);

  }

  // Pesquisar pokemon introduzido
  async function searchPokemon(e) {
    e.preventDefault();

    // Se a pesquisa estiver vazia, volta a apresentar os primeiros 20 Pokémon
    if (!search.trim()) {
      setError("");

      const pokemonList = await fetchPokemons();
      setPokemons(pokemonList);
      return;

    }


    // Procura o Pokémon pelo nome
    const pokemon = await fetchPokemonByName(search.trim().toLowerCase());

    if (!pokemon) {
      setError("Pokémon não encontrado");
      return;
    }

    // Atualiza a lista apresentando apenas o Pokémon encontrado
    setPokemons([pokemon]);
  }

  // executado quando app é carregada mounted
  useEffect(() => {
    async function loadPokemons() {

      try {
        const pokemonList = await fetchPokemons();
        setPokemons(pokemonList);

      } catch (error) {
        console.log(error);
        setError("Erro ao carregar Pokemón")
      }

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
