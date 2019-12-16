import React from "react"
import PropTypes from "prop-types"

import './TodaySummary.scss'

export default function TodaySummary(props) {
  const { currentDay, currentDayHigh, currentDayLow } = props
  return (
    <div className="today-summary">
      <div>{currentDay} Today</div>
      <div>
        {Math.round(currentDayHigh)}
        &emsp;
        {Math.round(currentDayLow)}
      </div>
    </div>
  )
}

TodaySummary.propTypes = {
  currentDay: PropTypes.string.isRequired,
  currentDayHigh: PropTypes.number.isRequired,
  currentDayLow: PropTypes.number.isRequired,
}
