import { useEffect, useState } from 'react'
import Main from './components/Main.jsx'
import './App.css'
import axios from "axios";

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // em caso de erro
  const [error, setError] = useState("");


  // Obtém os primeiros 20 Pokémon da PokéAPI
  async function fetchPokemons(url) {

    setLoading(true);

    try {

      const response = await axios.get(url);

      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        })
      );

      // api devolve ja url pa pesquisa a seguir e anterior
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);

      return pokemonDetails;

    } finally {

      setLoading(false);

    }


  }

  // obter pokemon especifico através do nome
  async function fetchPokemonByName(name) {
    try {
      setLoading(true);

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

      return response.data;

    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }

  }

  // atualiza o estado da pesquisa sempre que o user escreve
  function handleSearch(e) {
    setSearch(e.target.value);

  }

  // Pesquisar pokemon introduzido
  async function searchPokemon(e) {
    e.preventDefault();
    setError("");
    // Se a pesquisa estiver vazia, volta a apresentar os primeiros 20 Pokémon
    if (!search.trim()) {

      const pokemonList = await fetchPokemons(currentPageUrl);
      setPokemons(pokemonList);
      return;

    }


    // Procura o Pokémon pelo nome
    const pokemon = await fetchPokemonByName(search.trim().toLowerCase());

    if (!pokemon) {
      setError("Pokémon não encontrado");
      return;
    }

    setError("");
    // limpar para apos pesquisar nao dar erro a carregar nos botoes
    setNextPageUrl(null);
    setPrevPageUrl(null);
    // Atualiza a lista apresentando apenas o Pokémon encontrado
    setPokemons([pokemon]);
  }

  // passar próxima página
  function nextPage() {
    if (nextPageUrl) {
      setCurrentPageUrl(nextPageUrl);
      setSearch("");
      setError("");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  // passar página anterior
  function previousPage() {
    if (prevPageUrl) {
      setCurrentPageUrl(prevPageUrl);
      setSearch("");
      setError("");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  }


  // executado quando app é carregada ou ha um novo pageUrl
  useEffect(() => {
    async function loadPokemons() {

      try {
        const pokemonList = await fetchPokemons(currentPageUrl);
        setPokemons(pokemonList);

      } catch (error) {
        console.log(error);
        setError("Erro ao carregar Pokémon")
      }

    }

    loadPokemons();
  }, [currentPageUrl]);

  return (

    <div>
      {loading && <p>A carregar Pokémon...</p>}
      <Main
        pokemons={pokemons}
        handleSearch={handleSearch}
        searchPokemon={searchPokemon}
        error={error}
        nextPage={nextPage}
        previousPage={previousPage}
        nextPageUrl={nextPageUrl}
        prevPageUrl={prevPageUrl}

      />
    </div>
  )


}

export default App
