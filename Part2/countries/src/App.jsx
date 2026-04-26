import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

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
      {filteredCountries.length === 1 ? (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>Capital {filteredCountries[0].capital}</div>
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
        </div>
      ) : null}
    </>
  );
};

export default App;
