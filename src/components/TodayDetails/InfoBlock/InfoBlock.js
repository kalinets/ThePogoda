import React from 'react'
import PropTypes from 'prop-types'

import './InfoBlock.scss'

export default function InfoBlock(props) {
  const {
    leftName,
    leftData,
    rightName,
    rightData,
  } = props

  return (
    <div className='info-block'>
      <div>
        <p>{leftName}</p>
        <p>{leftData}</p>
      </div>
      <div>
        <p>{rightName}</p>
        <p>{rightData}</p>
      </div>
    </div>
  )
}

InfoBlock.propTypes = {
  leftName: PropTypes.string.isRequired,
  leftData: PropTypes.string.isRequired,
  rightName: PropTypes.string.isRequired,
  rightData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}
