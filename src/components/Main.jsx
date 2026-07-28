import React from 'react'
import PokemonList from './PokemonList.jsx'
import Header from './Header.jsx'

const Main = ({ pokemons, handleSearch, searchPokemon, error }) => {
    return (
        <div>
            <Header handleSearch={handleSearch}
                searchPokemon={searchPokemon}
                error={error}

            />
            {error && <p>{error}</p>}


            <PokemonList pokemons={pokemons}

            />
        </div>
    )
}

export default Main;