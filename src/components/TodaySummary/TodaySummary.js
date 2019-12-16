import React from 'react'
import PropTypes from 'prop-types'

import './TodaySummary.scss'

export default function TodaySummary(props) {
  const { currentDay, currentDayHigh, currentDayLow } = props
  return (
    <div className='today-summary'>
      <div className='today-summary__weekday'>
        {currentDay}
        <span>Today</span>
      </div>
      <div>
        {Math.round(currentDayHigh)}&deg;
        &emsp;
        {Math.round(currentDayLow)}&deg;
      </div>
    </div>
  )
}

TodaySummary.propTypes = {
  currentDay: PropTypes.string.isRequired,
  currentDayHigh: PropTypes.number.isRequired,
  currentDayLow: PropTypes.number.isRequired,
}
