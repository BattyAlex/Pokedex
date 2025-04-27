import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; 


function PokemonDetail()
{

    const {name} = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => 
    {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => setPokemon(res.data));
    }, [name]);
    
   if(!pokemon) return <div>Loading...</div>;

   function getBackgroundColour(types = []) 
   {
    const typeColors = 
    {
        grass: '#78c850',
        fire: '#F08030',
        water: '#6890f0',
        bug: '#A8B820',
        normal: '#A8A878',
        poison: '#A040A0',
        electric: '#F8D030',
        ground: '#E0C068',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        ghost: '#705898',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        flying: '#A890F0'
    };

    if (pokemon.types.length === 1) 
        {
        const type = pokemon.types[0].type.name;
        return typeColors[type] || '#ccc';
    } 
    else if (pokemon.types.length >= 2) 
        {
        const type1 = pokemon.types[0].type.name;
        const type2 = pokemon.types[1].type.name;
        const color1 = typeColors[type1] || '#ccc';
        const color2 = typeColors[type2] || '#ccc';
        return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    } 
    else 
    {
        return '#ccc';
    }
}


return(
    <div className="pokemon-detail" style={{ background: getBackgroundColour(pokemon.types), minHeight: '100vh', padding: '2rem', color: 'white' }}>
        <div className="detail-card">
            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#{pokemon.id})</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <div className="info">
                <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
                <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                <h3>Stats:</h3>
                <ul className="stats-list">
                    {pokemon.stats.map(stat => 
                    (
                        <li key={stat.stat.name}>
                            {stat.stat.name}: {stat.base_stat}
                        </li>
                    ))}
                </ul>
            </div>
          
        </div>
    </div>
);
}

export default PokemonDetail;