import { useEffect } from 'react';
import { useState } from 'react'
import countryService from './services/countryService';
import weatherService from './services/weather';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const showCountry = (name) => {
    const country = results.find(r => r.name.common === name);
    setSelectedCountry(country);
  };

  const countryToShow = filteredCountries.length === 1 ? filteredCountries[0] : selectedCountry;

  let content;

  if (filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else if (countryToShow) {
    content = (
      <CountryDetails country={countryToShow} />
    );
  } else {
    content = filteredCountries.map(country => (
      <div>
        <p key={country.cca3}>{country.name.common}</p>
        <button type='button' onClick={() => showCountry(country.name.common)}>Show</button>
      </div>
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

function CountryDetails({ country }) {
  const [weather, setWeather] = useState(null);

  const latlng = country.capitalInfo?.latlng || country.latlng; // fallback
  const lat = latlng?.[0];
  const lon = latlng?.[1];

  useEffect(() => {
    if (!lat || !lon) return;

    weatherService
      .getCurrent(lat, lon)
      .then(current => setWeather(current))
      .catch(() => setWeather(null));
  }, [lat, lon]);

  return (
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

      <h2>Weather in {country.name.common}</h2>
      {!lat || !lon ? (
        <p>No coordinates available</p>
      ) : !weather ? (
        <p>Loading weather…</p>
      ) : (
        <>
          <p>temperature: {weather.temperature} °C</p>
          <p>wind: {weather.windspeed} m/s</p>
        </>
      )}
    </div>
  );
}

export default App
