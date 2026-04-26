import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase()),
  );

  const handleShow = (country) => () => {
    setValue(country.name.common);
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital[0];
      const apiKey = import.meta.env.VITE_WEATHER_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`,
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [filteredCountries[0]?.name.common]);

  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={value} onChange={handleChange} />
      </div>
      {filteredCountries.length > 10 ? (
        <div>Too many matched, specify another filter</div>
      ) : null}
      {filteredCountries.length <= 10 && filteredCountries.length > 1
        ? filteredCountries.map((country) => (
            <div key={country.cca3}>
              {country.name.common}
              <button onClick={handleShow(country)}>show</button>
            </div>
          ))
        : null}
      {filteredCountries.length === 1 && weather ? (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>Capital {filteredCountries[0].capital[0]}</div>
          <div>Area {filteredCountries[0].area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map((language) => {
              return <li key={language}>{language}</li>;
            })}
          </ul>
          <img
            src={filteredCountries[0].flags.png}
            alt={filteredCountries[0].flags.alt}
          />
          <h2>Weather in {filteredCountries[0].capital[0]}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      ) : null}
    </>
  );
};

export default App;
