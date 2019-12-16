import React from 'react'
import PropTypes from 'prop-types'

import './ForecastHours.scss'

export default function ForecastHours(props) {
  const {
    getHour,
    getIcon,
    getMinutes,
    hourlyForecast,
  } = props

  return (
    <div className='forecast-hours'>
      {hourlyForecast.map(hour => (
        <div key={hour.time} className='forecast-hour'>
          <p>{getHour(hour.time)}:{getMinutes(hour.time)}</p>
          {getIcon(hour.icon)}
          <p>{Math.round(hour.temperature)}&deg;</p>
        </div>
      ))}
    </div>
  )
}

ForecastHours.propTypes = {
  getHour: PropTypes.func.isRequired,
  getIcon: PropTypes.func.isRequired,
  getMinutes: PropTypes.func.isRequired,
  hourlyForecast: PropTypes.array.isRequired,
}
