import React from 'react'
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {



    return (
        <div className='pokemon-list'>
            {pokemons.map(pokemon => (
                <PokemonCard pokemon={pokemon} key={pokemon.id} />
            ))
            }
        </div>
    )
}

export default PokemonList;