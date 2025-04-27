function PokemonCard({ name, id, image, types =[] }) 
{
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
      
        if (types.length === 1) 
            {
          const type = types[0].type.name;
          return typeColors[type] || '#ccc';
        } 
        else if (types.length >= 2) 
            {
          const type1 = types[0].type.name;
          const type2 = types[1].type.name;
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
      <div className="pokemon-card" style={{background: getBackgroundColour(types)}}>
        <span>#{id}</span>
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <img src={image} alt={name} />
      </div>
    );
  }
  
  export default PokemonCard;