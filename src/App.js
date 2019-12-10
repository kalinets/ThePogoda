import React, { useState, useEffect } from 'react'
import Loader from './components/Loader'
import TodaySummary from './components/TodaySummary'
import ForecastHours from './components/ForecastHours'
import ForecastDays from './components/ForecastDays'
import TodayDetails from './components/TodayDetails'
import { api } from './constants'
import './styles.css'
// https://webdesign.tutsplus.com/tutorials/building-a-weather-app-with-the-darksky-api--cms-28678

export default function App() {
  const localData = localStorage.getItem('localData')
  const [[latitude, longitude], setCoords] = useState([])
  const [weatherForecast, setWeatherForecast] = useState(JSON.parse(localData))
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

  const getIcon = name => <img alt={name} src={`icons/${name}.svg`} />

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
      if (!ignore) {
        setWeatherForecast(json)
        localStorage.setItem('localData', JSON.stringify(json))
      }
      setLoading(false)
    }
    latitude && getData()
    return () => { ignore = true }
  }, [latitude, longitude])

  return (
    <>
      {!latitude && <p>The app needs your location first.</p>}
      {loading && <Loader />}
      {weatherForecast && weatherForecast.latitude && (
        <>
          <h2>{weatherForecast.timezone}</h2>
          <p>{weatherForecast.currently.summary}</p>
          <p>{Math.round(weatherForecast.currently.temperature)}&deg;</p>
          {getIcon(weatherForecast.currently.icon)}
          <TodaySummary
            currentDay={getDay(weatherForecast.currently.time)}
            currentDayHigh={weatherForecast.daily.data[0].temperatureHigh}
            currentDayLow={weatherForecast.daily.data[0].temperatureLow}
          />
          <hr />
          <ForecastHours
            getHour={getHour}
            getIcon={getIcon}
            getMinutes={getMinutes}
            hourlyForecast={weatherForecast.hourly.data}
          />
          <hr />
          <ForecastDays
            getDay={getDay}
            getIcon={getIcon}
            forecastDaysData={weatherForecast.daily.data}
          />
          <hr />
          <p>Today: {weatherForecast.hourly.summary} {weatherForecast.daily.summary}</p>
          <hr />
          <TodayDetails
            getHour={getHour}
            getMinutes={getMinutes}
            todaysData={weatherForecast.currently}
            sunriseTime={weatherForecast.daily.data[0].sunriseTime}
            sunsetTime={weatherForecast.daily.data[0].sunsetTime}
          />
        </>
      )}
      <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
    </>
  )
}
