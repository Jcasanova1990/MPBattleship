const SHIPS_SIZES = [5, 4, 3, 3, 2]
const DIRECTIONS = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
}

const placeShip = (board, { row, col, size, direction}) => {
    if (direction !== DIRECTIONS.HORIZONTAL && direction !== DIRECTIONS.VERTICAL)
        throw new Error('Invalid direction')
}

// check if ship can be placed

for (let i = 0; < size; i++) {
    const r = direction === DIRECTIONS.HORIZONTAL ? row : row + i
    const c = direction === DIRECTIONS.HORIZONTAL ? col + i : col
    if (r >= board.length || c >= board[r].length || board[r][c] !== 0) {
        throw new Error('Invalid placement')
    }
}

// placing ships

for (let i = 0)