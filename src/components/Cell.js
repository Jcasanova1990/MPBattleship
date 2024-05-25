import React from 'react'
import styles from './Cell.module.scss'

const Cell = ({ type, onClick}) => {
    let className = styles.Cell

    if (type === 2) {
        className += ` ${styles.cellHit}`
    } else if (type === 3) {
        className += ` ${styles.cellMiss}`
    } else if (type === 1) {
        className += `${styles.cellShip}`
  }

  return <div className={className} onClick={onclick}></div>
}

export default Cell