import React from 'react'
import PropTypes from 'prop-types'

import './ForecastDays.scss'

export default function ForecastDays(props) {
  const { getDay, getIcon, forecastDaysData } = props

  return (
    <div className='forecast-days'>
      {forecastDaysData.map(day => (
        <div key={day.time} className='forecast-day'>
          <span className='forecast-day__name'>
            {getDay(day.time)}
          </span>
          {getIcon(day.icon)}
          <span>
            {Math.round(day.temperatureHigh)}
          </span>
          <span>
            {Math.round(day.temperatureLow)}
          </span>
          <span>
            Moon: {`${Math.round(day.moonPhase * 100)}%`}
          </span>
        </div>
      ))}
    </div>
  )
}

ForecastDays.propTypes = {
  getDay: PropTypes.func.isRequired,
}
