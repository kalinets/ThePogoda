import React, { Fragment, useState, useEffect } from 'react'
import { api } from './constants'
import './styles.css'
// https://webdesign.tutsplus.com/tutorials/building-a-weather-app-with-the-darksky-api--cms-28678

export default function App() {
  const [[latitude, longitude], setCoords] = useState([])
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [loading, setLoading] = useState(false)

  const getDay = dt => {
    const date = new Date(dt * 1000)
    return formatDay(date.getDay())
  }

  const getHour = dt => {
    const date = new Date(dt * 1000)
    return formatTime(date.getHours())
  }

  const getMinutes = dt => {
    const date = new Date(dt * 1000)
    return formatTime(date.getMinutes())
  }

  const formatTime = num => num < 10 ? `0${num}` : num

  const formatDay = num => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return weekdays[num]
  }

  const getIcon = name => {
    return (
      <img
        // src={`https://darksky.net/images/weather-icons/${name}.png`}
        src={`icons/${name}.svg`}
        alt={name}
      />
    )
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(res => {
      setCoords([res.coords.latitude, res.coords.longitude])
    })
  }, [])

  useEffect(() => {
    let ignore = false
    async function getData() {
      setLoading(true)
      const res = await fetch(api.getForecast(latitude, longitude))
      const json = await res.json()
      if (!ignore) setWeatherForecast(json)
      setLoading(false)
    }
    latitude && getData()
    return () => { ignore = true }
  }, [latitude, longitude])

  return (
    <Fragment>
      {!latitude && <p>The app needs your location first.</p>}
      {loading && <p>Loading...</p>}
      {weatherForecast && weatherForecast.latitude && (
        <Fragment>
          <h2>{weatherForecast.timezone}</h2>
          <p>{weatherForecast.currently.summary}</p>
          <p>{Math.round(weatherForecast.currently.temperature)}&deg;</p>
          {getIcon(weatherForecast.currently.icon)}
          <div className="today-summary">
            <div>{getDay(weatherForecast.currently.time)} Today</div>
            <div>
              {Math.round(weatherForecast.daily.data[0].temperatureHigh)}
              &nbsp;
              {Math.round(weatherForecast.daily.data[0].temperatureLow)}
            </div>
          </div>
          <hr />
          <div className="forecast-hours">
            {weatherForecast.hourly.data.map(hour => (
              <div key={hour.time} className="forecast-hour">
                <p>{getHour(hour.time)}:{getMinutes(hour.time)}</p>
                {getIcon(hour.icon)}
                <p>{Math.round(hour.temperature)}&deg;</p>
              </div>
            ))}
          </div>
          <hr />
          <div className="forecast-days">
            {weatherForecast.daily.data.map(day => (
              <div key={day.time} className="forecast-day">
                <span>{getDay(day.time)}</span>
                {getIcon(day.icon)}
                <span>{Math.round(day.temperatureHigh)}</span>
                <span>{Math.round(day.temperatureLow)}</span>
                <span>Moon: {day.moonPhase}</span>
              </div>
            ))}
          </div>
          <hr />
          <p>Today: {weatherForecast.hourly.summary} {weatherForecast.daily.summary}</p>
          <hr />
          <div className="info-block sunrise-sunset">
            <div className="sunrise">
              <p>Sunrise</p>
              <p>{getHour(weatherForecast.daily.data[0].sunriseTime)}:{getMinutes(weatherForecast.daily.data[0].sunriseTime)}</p>
            </div>
            <div className="sunset">
              <p>Sunset</p>
              <p>{getHour(weatherForecast.daily.data[0].sunsetTime)}:{getMinutes(weatherForecast.daily.data[0].sunsetTime)}</p>
            </div>
          </div>
          <hr />
          <div className="info-block wet-data">
            <div className="chance-of-rain">
              <p>Chance of rain</p>
              <p>{weatherForecast.currently.precipProbability * 100}%</p>
            </div>
            <div className="humidity">
              <p>Humidity</p>
              <p>{weatherForecast.currently.humidity * 100}%</p>
            </div>
          </div>
          <hr />
          <div className="info-block wind-feels-like">
            <div className="wind">
              <p>Wind</p>
              <p>{weatherForecast.currently.windBearing}&deg; {weatherForecast.currently.windSpeed} m/s</p>
            </div>
            <div className="feels-like">
              <p>Feels like</p>
              <p>{Math.round(weatherForecast.currently.apparentTemperature)}&deg;</p>
            </div>
          </div>
          <hr />
          <div className="info-block water">
            <div className="precip">
              <p>Precipitation</p>
              <p>{weatherForecast.currently.precipIntensity * 100} cm</p>
            </div>
            <div className="pressure">
              <p>Pressure</p>
              <p>{weatherForecast.currently.pressure} hPa</p>
            </div>
          </div>
          <hr />
          <div className="info-block misc">
            <div className="visibility">
              <p>Visibility</p>
              <p>{weatherForecast.currently.visibility} km</p>
            </div>
            <div className="uv-index">
              <p>UV index</p>
              <p>{weatherForecast.currently.uvIndex}</p>
            </div>
          </div>
          <hr />
          <div className="info-block extra">
            <div className="clouds">
              <p>Cloudiness</p>
              <p>{Math.round(weatherForecast.currently.cloudCover * 100)}%</p>
            </div>
            <div className="ozone">
              <p>Ozone</p>
              <p>{weatherForecast.currently.ozone} DU</p>
            </div>
          </div>
        </Fragment>
      )}
      <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
    </Fragment>
  );
}
