import { useEffect } from 'react';
import { useState } from 'react'
import countryService from './services/countryService';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const eventHandler = countries => {
      console.log('promise fulfilled')
      setResults(countries)
    }
  
    countryService.getAll().then(eventHandler);
  }, []);

  const filteredCountries = results.length === 0
    ? 
    results
    :
    results.filter(result => 
      result.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

  console.log(filteredCountries);

  let content;

if (filteredCountries.length > 10) {
  content = <p>Too many matches, specify another filter</p>;
} else if (filteredCountries.length === 1) {
  const country = filteredCountries[0];

  content = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital?.[0]}</p>
        <p>Area: {country.area}</p>

        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages || {}).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>

        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="150"
        />
      </div>
    );
  } else {
    content = filteredCountries.map(country => (
      <p key={country.cca3}>{country.name.common}</p>
    ));
  }

  return (
    <>
      <Input 
          name={"find countries "}
          value={searchTerm}
          handle={(e) => setSearchTerm(e.target.value)}
      />
      {content}
    </>
  )
}

function Input({name, value, handle}) {
    return (
        <div>
            {name} <input value={value} onInput={handle}/>
        </div>
    );
}

export default App
