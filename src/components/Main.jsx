import React from 'react'
import PokemonList from './PokemonList.jsx'
import Header from './Header.jsx'
import Pagination from './Pagination.jsx'


const Main = ({ pokemons, handleSearch, searchPokemon, error, nextPage, previousPage, nextPageUrl, prevPageUrl, goHome }) => {
    return (
        <div>
            {/* Barra de navegação com o logótipo e a pesquisa */}

            <Header handleSearch={handleSearch}
                searchPokemon={searchPokemon}
                goHome={goHome}

            />

            {/* Apresenta uma mensagem caso ocorra um erro na pesquisa */}
            {error && <p>{error}</p>}


            {/* Lista de Pokémon obtidos através da API */}
            <PokemonList pokemons={pokemons} />
            <Pagination nextPage={nextPage}
                previousPage={previousPage}
                nextPageUrl={nextPageUrl}
                prevPageUrl={prevPageUrl}
            ></Pagination>
        </div>
    )
}

export default Main;