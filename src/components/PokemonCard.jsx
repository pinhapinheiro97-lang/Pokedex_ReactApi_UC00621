import React from 'react'

const PokemonCard = ({ pokemon }) => {
    return (

        <div className='pokemon-card'>
            <p># {pokemon.id}</p>

            {/* Imagem do Pokémon da API */}
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2> {pokemon.name} </h2>
            <p>  {pokemon.types.map(tipo => tipo.type.name).join(" / ")} </p>
        </div>


    )
}

export default PokemonCard;