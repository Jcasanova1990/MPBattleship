// Constants for ship sizes and directions
const SHIP_SIZES = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  };
  const DIRECTIONS = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
  };
  
  // Function to place a ship on the game board
  const placeShip = (board, { row, col, shipType, direction }) => {
    const size = SHIP_SIZES[shipType];
    if (!size) {
      throw new Error('Invalid ship type');
    }
    if (direction !== DIRECTIONS.HORIZONTAL && direction !== DIRECTIONS.VERTICAL) {
      throw new Error('Invalid direction');
    }
  
    // Check if the ship can be placed at the given coordinates
    for (let i = 0; i < size; i++) {
      const r = direction === DIRECTIONS.HORIZONTAL ? row : row + i;
      const c = direction === DIRECTIONS.HORIZONTAL ? col + i : col;
      if (r >= board.length || c >= board[r].length || board[r][c] !== 0) {
        throw new Error('Invalid placement');
      }
    }
  
    // Place the ship on the board
    for (let i = 0; i < size; i++) {
      const r = direction === DIRECTIONS.HORIZONTAL ? row : row + i;
      const c = direction === DIRECTIONS.HORIZONTAL ? col + i : col;
      board[r][c] = 1; // Mark the cell as occupied by a ship
    }
  
    return board;
  };
  
  // Function to make an attack on the opponent's game board
  const makeAttack = (board, { row, col }) => {
    if (row >= board.length || col >= board[row].length) {
      throw new Error('Invalid attack coordinates');
    }
  
    // Determine the result of the attack
    if (board[row][col] === 1) {
      board[row][col] = 2; // Mark the cell as a hit
      return { result: 'hit', board };
    } else if (board[row][col] === 0) {
      board[row][col] = 3; // Mark the cell as a miss
      return { result: 'miss', board };
    } else {
      throw new Error('Invalid attack, cell already attacked');
    }
  };
  
  // Function to check if all ships are sunk on a board
  const allShipsSunk = (board) => {
    for (let row of board) {
      for (let cell of row) {
        if (cell === 1) {
          return false; // There are still ships that are not sunk
        }
      }
    }
    return true;
  };
  
  module.exports = { placeShip, makeAttack, allShipsSunk };
  