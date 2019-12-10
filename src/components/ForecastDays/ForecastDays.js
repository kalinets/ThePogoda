import React from 'react'
import PropTypes from 'prop-types'
import './ForecastDays.scss'

export default function ForecastDays(props) {
  const { getDay, getIcon, forecastDaysData } = props

  return (
    <div className='forecast-days'>
      {forecastDaysData.map(day => (
        <div key={day.time} className='forecast-day'>
          <span>{getDay(day.time)}</span>
          {getIcon(day.icon)}
          <span>{Math.round(day.temperatureHigh)}</span>
          <span>{Math.round(day.temperatureLow)}</span>
          <span>Moon: {day.moonPhase}</span>
        </div>
      ))}
    </div>
  )
}

ForecastDays.propTypes = {
  getDay: PropTypes.func.isRequired,
}
