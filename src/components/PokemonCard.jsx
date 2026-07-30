
const PokemonCard = ({ pokemon }) => {



    return (

        <div className="pokemon-card">
            <p className="pokemon-id">#{pokemon.id}</p>

            <img src={pokemon.sprites.front_default} alt={pokemon.name} />

            <h2>{pokemon.name}</h2>

            <p className="pokemon-type">
                {pokemon.types.map(tipo => tipo.type.name).join(" / ")}
            </p>

            <p className="pokemon-region">
                <strong>{pokemon.region}</strong>
            </p>

            <p className="pokemon-description">
                {pokemon.description}
            </p>
        </div>


    )
}

export default PokemonCard;