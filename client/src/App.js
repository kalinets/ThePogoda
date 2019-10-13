import React, { Fragment, useState, useEffect } from 'react'
import { api } from './constants'
import './styles.css'

export default function App() {
  const [isGeoAvailable, setIsGeoAvailable] = useState(false)
  const [[latitude, longitude], setCoords] = useState([,])
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [loading, setLoading] = useState(false)

  const isGeoAllowed = () => {
    "geolocation" in navigator ? setIsGeoAvailable(true) : setIsGeoAvailable(false)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(res => {
      setCoords([res.coords.latitude, res.coords.longitude])
    })
  }

  const getWeatherForecast = async () => {
    try {
      setLoading(true)
      const res = await fetch(api.getForecast(latitude, longitude))
      const json = await res.json()
      setWeatherForecast(json)
      console.log('weather forecast', json)
      setLoading(false)
    } catch (error) {
      throw new Error(error)
      setLoading(false)
    }
  }

  const formatDate = dt => {
    const date = new Date(dt)
    return `${date.getDate()}.${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}`
  }

  const getDay = dt => {
    const date = new Date(dt)
    // return date.getDay()
    return 'Saturday'
  }

  const getHour = dt => {
    const date = new Date(dt)
    return date.getHours()
  }

  useEffect(isGeoAllowed, [])

  return (
    <Fragment>
      <h1>Welcome to the Pogoda app</h1>
      <button disabled={!isGeoAvailable} onClick={getLocation}>get your location</button>
      {latitude && (
        <div>
          <p>You are here: latitude is {latitude} and longitude is {longitude}</p>
          <button disabled={!latitude} onClick={getWeatherForecast}>get weather forecast</button>
          {loading && <p>Loading...</p>}
          {weatherForecast && (
            <Fragment>
              <h2>Minsk</h2>
              <p>{weatherForecast.currently.summary}</p>
              <p>{Math.round(weatherForecast.currently.temperature)}&#8451;</p>
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
                    <p>{getHour(hour.time)}</p>
                    <img alt={hour.icon} />
                    <p>{Math.round(hour.temperature)}</p>
                  </div>
                ))}
              </div>
              <hr />
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
}
