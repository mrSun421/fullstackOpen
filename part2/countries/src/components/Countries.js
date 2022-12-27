import { useState, useEffect } from "react";

import axios from "axios";

export const Countries = ({ countries, setCountriesToShow }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  if (countries.length === 1) {
    const [country] = countries;
    return (
      <CountryData country={country} />
    );
  }

  return (
    <div>
      {countries.map(country => <CountryListElement key={country.cca3} country={country} setCountriesToShow={setCountriesToShow} />)}
    </div>
  );
};
const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <Languages languages={country.languages} />
      <img src={country.flags.png} />
      <Weather capital={country.capital} />
    </div>
  );
};
const CountryListElement = ({ country, setCountriesToShow }) => {
  return (
    <div>
      <p>{country.name.common} <button onClick={() => setCountriesToShow([country])}>show</button></p>
    </div>
  );
};
const Languages = ({ languages }) => {
  return (
    <div>
      <ul>
        {Object.entries(languages).map(([key, language]) => <Language key={key} language={language} />)}
      </ul>
    </div>
  );
};
const Language = ({ language }) => {
  return (
    <li>{language}</li>
  );
};

const Weather = ({ capital }) => {
  const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${OPENWEATHER_API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  if (weather.main) {
    return(
      <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature: {weather.main.temp} C</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )
  } else {
    return null
  }
  


}