import React from 'react'
import PropTypes from 'prop-types'
import InfoBlock from './InfoBlock'

export default function TodayDetails(props) {
  const {
    getHour,
    getMinutes,
    sunriseTime,
    sunsetTime,
    todaysData,
  } = props

  return (
    <div>
      <InfoBlock
        leftName={'Sunrise'}
        leftData={`${getHour(sunriseTime)}:${getMinutes(sunriseTime)}`}
        rightName={'Sunset'}
        rightData={`${getHour(sunsetTime)}:${getMinutes(sunsetTime)}`}
      />
      <hr />
      <InfoBlock
        leftName={'Chance of rain'}
        leftData={`${Math.round(todaysData.precipProbability * 100)}%`}
        rightName={'Humidity'}
        rightData={`${Math.round(todaysData.humidity * 100)}%`}
      />
      <hr />
      <InfoBlock
        leftName={'Wind'}
        leftData={`${todaysData.windBearing}°`}
        rightName={'Feels like'}
        rightData={`${Math.round(todaysData.apparentTemperature)}°`}
      />
      <hr />
      <InfoBlock
        leftName={'Precipitation'}
        leftData={`${Math.round(todaysData.precipIntensity * 100)} cm`}
        rightName={'Pressure'}
        rightData={`${todaysData.pressure} hPa`}
      />
      <hr />
      <InfoBlock
        leftName={'Visibility'}
        leftData={`${todaysData.visibility} km`}
        rightName={'UV index'}
        rightData={todaysData.uvIndex}
      />
      <hr />
      <InfoBlock
        leftName={'Cloudiness'}
        leftData={`${Math.round(todaysData.cloudCover * 100)}%`}
        rightName={'Ozone'}
        rightData={`${todaysData.ozone} DU`}
      />
    </div>
  )
}

TodayDetails.propTypes = {
  getHour: PropTypes.func.isRequired,
  getMinutes: PropTypes.func.isRequired,
  sunriseTime: PropTypes.number.isRequired,
  sunsetTime: PropTypes.number.isRequired,
  todaysData: PropTypes.object.isRequired,
}
