import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("");
  const [states, setStates] = useState([]);
  const [currentState, setCurrentState] = useState("");
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        setCountries(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("Country Changed");
    if (currentCountry !== "") {
      console.log("State API Called");
      fetch(
        `https://crio-location-selector.onrender.com/country=${currentCountry}/states`
      )
        .then((response) => {
          const data = response.json();
          return data;
        })
        .then((data) => {
          console.log(data);
          setStates(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("State API Not Called");
    }
  }, [currentCountry]);

  useEffect(() => {
    if (currentState !== "") {
      fetch(
        `https://crio-location-selector.onrender.com/country=${currentCountry}/state=${currentState}/cities`
      )
        .then((response) => {
          const data = response.json();
          return data;
        })
        .then((data) => {
          console.log(data);
          setCities(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("City API Not Called");
    }
  }, [currentCountry, currentState]);

  return (
    <>
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          name="country"
          id="country"
          value={currentCountry}
          onChange={(e) => {
            console.log(e.target.value);
            setCurrentCountry(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          name="state"
          id="state"
          disabled={currentCountry === "" ? true : false}
          value={currentState}
          onChange={(e) => {
            setCurrentState(e.target.value);
          }}
        >
          <option value="" disabled>
            Select State
          </option>

          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          name="city"
          id="city"
          disabled={currentState === "" ? true : false}
          value={currentCity}
          onChange={(e) => {
            setCurrentCity(e.target.value);
          }}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {currentCity !== "" ? (
        <>
          <div className="selection">
            <p>
              You selected
              <span> {currentCity}, </span>
            </p>
            {`${currentState}, ${currentCountry}`}
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
