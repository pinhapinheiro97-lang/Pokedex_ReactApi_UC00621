import React from 'react'
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {



    return (
        <div className='pokemon-list'>
            {/* Percorre a lista de Pokémon e cria um cartão para cada um */}
            {pokemons.map(pokemon => (
                <PokemonCard pokemon={pokemon} key={pokemon.id} />
            ))
            }
        </div>
    )
}

export default PokemonList;