import React from 'react'
import pokelogo from "../assets/pokelogo.png";

export const Header = ({ handleSearch, searchPokemon, goHome }) => {
    return (
        <nav className="navbar">
            <div
                className="logo"
                onClick={goHome}
            >
                <img src={pokelogo} alt="Pokémon" />
            </div>

            <form className="search-bar" onSubmit={searchPokemon}>
                <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Pesquisar..."
                />

                <button type="submit">
                    Pesquisar
                </button>
            </form>
        </nav>
    )
}

export default Header;