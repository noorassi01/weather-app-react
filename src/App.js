import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import axios from 'axios';


function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=2a6806769214774f310632f7f3ab274e`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
    

      axios.get(url)
        .then((response) => {
          setData(response.data);
          setErrorMsg('');
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error.message);
          setErrorMsg('Location not found. Please enter a valid location.');
          setData({});
        })
        .finally(() => {
          setLocation('');
        });
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
          {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
      <div className="container">
        
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <React.Fragment>
                <p>{data.weather[0].main}</p>
                {data.weather[0].icon && (
                  <img
                    src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                )}
              </React.Fragment>
            ) : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App