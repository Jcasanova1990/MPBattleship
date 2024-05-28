import React from 'react'
import Cell from './Cell'
import styles from './_board.module.scss'

const Board = ({ board, handlePlaceShip, handleMakeAttack }) => {
    return (
        <div className={styles.board}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.boardRow}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            type={cell}
                            onClick={() => handleMakeAttack({ row: rowIndex, col: colIndex })}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board