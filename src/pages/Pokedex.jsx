import {useState, useEffect} from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import {Link} from 'react-router-dom';

function Pokedex()
{
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [prevPageUrl, setPrevPageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() 
        {
          setLoading(true);
          try 
          {
            const res = await axios.get(currentPageUrl);
            setNextPageUrl(res.data.next);
            setPrevPageUrl(res.data.previous);
      
            const pokemonDetails = await Promise.all
            (
              res.data.results.map(async (pokemon) => 
                {
                const pokeRes = await axios.get(pokemon.url);
                return pokeRes.data;
              })
            );
      
            setPokemonList(pokemonDetails);
            setLoading(false);
          } 
          catch (error) 
          {
            console.error('Error fetching Pokemon:', error);
          }
        }
      
        fetchData();
      }, [currentPageUrl]);

    function goToNextPage()
    {
        setCurrentPageUrl(nextPageUrl);
    }

    function goToPrevPage()
    {
        setCurrentPageUrl(prevPageUrl);
    }

    if (loading) return "Loading...";

    return(
        <div>
            <div className="pokemon-grid">
                {
                    pokemonList.map(pokemon => 
                    (
                        <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
                            <PokemonCard 
                            name={pokemon.name} 
                            id={pokemon.id} 
                            image={pokemon.sprites.front_default} 
                            types={pokemon.types}/>

                        </Link>
                    ))
                }
            </div>
            <Pagination 
            goToNextPage={nextPageUrl ? goToNextPage : null} 
            goToPrevPage={prevPageUrl ? goToPrevPage : null} />
        </div>
    );

}
export default Pokedex;