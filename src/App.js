import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Api() {
  const [data, setData] = useState([]);
  // const [error, setError] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        const sortedData = response.data.sort((a, b) => {
          return a.name.common.localeCompare(b.name.common);
        });
        const dataWithContinent = sortedData.map(country => ({
          ...country,
          continent: country.region === "Americas" ? "America" : country.region,
        }));
        setData(dataWithContinent);
      })
  }, []);

  const handleSelectChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  const filteredData = data.filter((country) => {
    // Filtrer par nom de pays
  const nameMatch =
    searchText === "" ||
    country.name.common.toLowerCase().includes(searchText.toLowerCase());

    // Filtrer par continent
    const continentMatch =
      selectedContinent === "All" || country.continent === selectedContinent;

    return nameMatch && continentMatch;
  });

  // if (error) {
  //   return <div className='Api'><p>Une erreur s'est produite. Veuillez réessayer CHIEN.</p></div>
  // }
  const DARKSASOUKE = darkMode ? 'App dark-mode' : 'App';
  return (

    <div className={DARKSASOUKE}>
      <div className='navdiv'>
        <div>
          <h1 className='navdiv_gauche'>APIDPI?</h1>
        </div>
        <div>
        <button className='navdiv_droite' onClick={() => setDarkMode(!darkMode)}> {/* Ajouter le gestionnaire d'événements pour le mode sombre */}
          {darkMode ? 'Light mode' : 'Dark mode'} {/* Modifier le texte du bouton en fonction de l'état du mode sombre */}
        </button>
        </div>
      </div>
      <div className='groupe_nav'>
        <div className='centre_cherche'>
          <input className='recherche_tsebien' type="text" placeholder="Recherche" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
        </div>
        <select className='selecto' value={selectedContinent} onChange={handleSelectChange}>
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="America">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="groupe_cardpays">
        <Routes>
          <Route path="/pays/:code" element={<Details data={filteredData} />} />
          <Route path="/" element={
            filteredData.map((country, index) => (
              <div className='cards_tout' key={index}>
                <Link className='linkek' to={`/pays/${country.cca3}`}>
                  <img src={country.flags.svg} alt={`Drapeau de ${country.name.common}`} className='drapeau' />
                  <h1 className='nom_pays'>{country.name.common}</h1>
                  <div className='donnee_card'>
                    <p><strong>Population : </strong>{country.population}</p>
                    <p><strong>Capital : </strong>{country.capital}</p>
                    <p><strong>Région : </strong>{country.region}</p>
                  </div>
                </Link>
              </div>
            ))
          } />
        </Routes>
      </div>
    </div>
  );
}

function Details({ data }) {

    const { code } = useParams();
    const selectedCountry = data.find(country => country.cca3 === code);
    if (!selectedCountry) {
        return <div>Pays non trouvé</div>
    }
  return (
    <div className="Api">
      <div className='Api_gauche'>
      <img src={selectedCountry.flags.svg} alt={`Drapeau de ${selectedCountry.name.common}`} className='drapeau3' />
      </div>
      <div className='Api_droite'>
      <h1>{selectedCountry.name.common}</h1>
      <p><strong>Capital : </strong>{selectedCountry.capital}</p>
      <p><strong>Population : </strong>{selectedCountry.population}</p>
      <p><strong>Région : </strong>{selectedCountry.region}</p>
      <p><strong>Sub Région : </strong>{selectedCountry.subregion}</p>
      <p><strong>Capital : </strong>{selectedCountry.capital}</p>
      <p><strong>Top Level Domain : </strong>{selectedCountry.tld}</p>
      <p><strong>Currencies : </strong>{selectedCountry.currencies ? Object.values(selectedCountry.currencies).map(currency => (
      <span key={currency.name}>{currency.name}</span> )) : <span>Pas de monnaie</span> }</p>
      <p><strong>Language(s) : </strong>{selectedCountry.languages ? Object.values(selectedCountry.languages).join(", ") : null }</p>
      <p className='p_border'><strong>Border countries : </strong>{selectedCountry.borders ? selectedCountry.borders.map(border => (
      <span key={border}><Link to={`/pays/${border}`}><button className='frontier'>{border}</button></Link></span>)) : <span>NO NO NO PAYS A COTé</span> }</p>
      <br />
      <Link to="/"><button className='back'>BACK</button></Link>
      </div>
    </div>
  );
}

export default Api;
