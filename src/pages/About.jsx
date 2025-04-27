function About() 
{
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About This Pokédex</h1>
        <p>
          Welcome to the Pokédex! 📖
        </p>
        <p>
          This application allows you to browse and explore Pokémon using data from the <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokeAPI</a>.  
          You can view Pokémon stats, types, abilities, and much more!
        </p>
        <p>
          Made with ❤️ using React, Vite, Axios, and React Router.
        </p>
      </div>
    </div>
  );
}

export default About;