/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/esm/index.js");
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameLogic */ "./src/gameLogic.js");
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gameLogic__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Board */ "./src/components/Board.js");
/* harmony import */ var _App_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App.module.scss */ "./src/App.module.scss");





const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__["default"])('http://localhost:1942');
const App = () => {
  const [gameId, setGameId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [playerId, setPlayerId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [playerName, setPlayerName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [gameState, setGameState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const handleCreateGame = () => {
    socket.emit('createGame', playerName, 10); // Assuming board size is 10x10
  };
  const handleJoinGame = gameId => {
    socket.emit('joinGame', gameId, playerName);
  };
  const handlePlaceShip = shipCoordinates => {
    socket.emit('placeShip', gameId, playerId, shipCoordinates);
  };
  const handleMakeAttack = attackCoordinates => {
    socket.emit('makeAttack', gameId, playerId, attackCoordinates);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    socket.on('gameCreated', createdGameId => {
      setGameId(createdGameId);
    });
    socket.on('gameJoined', game => {
      setPlayerId(game.players.find(player => player.name === playerName)._id);
      setGameState(game);
    });
    socket.on('gameError', errorMessage => {
      console.error(errorMessage);
      // Handle error
    });
    socket.on('gameStateUpdate', updatedGameState => {
      setGameState(updatedGameState);
    });
    return () => {
      socket.off('gameCreated');
      socket.off('gameJoined');
      socket.off('gameError');
      socket.off('gameStateUpdate');
    };
  }, [playerName]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _App_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].container
  }, !gameId ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "Enter your name",
    value: playerName,
    onChange: e => setPlayerName(e.target.value)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: handleCreateGame
  }, "Create Game"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "Enter game ID"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => handleJoinGame(gameId)
  }, "Join Game")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _App_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].gameArea
  }, gameState.players.map(player => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: player._id,
    className: _App_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].boardContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, player.name), player._id === playerId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Board__WEBPACK_IMPORTED_MODULE_3__["default"], {
    board: player.board,
    handlePlaceShip: handlePlaceShip,
    handleMakeAttack: handleMakeAttack
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/components/Board.js":
/*!*********************************!*\
  !*** ./src/components/Board.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ "./src/components/Cell.js");
/* harmony import */ var _sass_board_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sass/board.module.scss */ "./src/components/sass/board.module.scss");



const Board = _ref => {
  let {
    board,
    handlePlaceShip,
    handleMakeAttack
  } = _ref;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _sass_board_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].board
  }, board.map((row, rowIndex) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: rowIndex,
    className: _sass_board_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].boardRow
  }, row.map((cell, colIndex) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Cell__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: "".concat(rowIndex, "-").concat(colIndex),
    type: cell,
    onClick: () => handleMakeAttack({
      row: rowIndex,
      col: colIndex
    })
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);

/***/ }),

/***/ "./src/components/Cell.js":
/*!********************************!*\
  !*** ./src/components/Cell.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sass_cell_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sass/cell.module.scss */ "./src/components/sass/cell.module.scss");


const Cell = _ref => {
  let {
    type,
    onClick
  } = _ref;
  let className = _sass_cell_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].Cell;
  if (type === 2) {
    className += " ".concat(_sass_cell_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cellHit);
  } else if (type === 3) {
    className += " ".concat(_sass_cell_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cellMiss);
  } else if (type === 1) {
    className += "".concat(_sass_cell_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cellShip);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: className,
    onClick: onclick
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cell);

/***/ }),

/***/ "./src/gameLogic.js":
/*!**************************!*\
  !*** ./src/gameLogic.js ***!
  \**************************/
/***/ ((module) => {

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
  VERTICAL: 'vertical'
};

// Function to place a ship on the game board
const placeShip = (board, _ref) => {
  let {
    row,
    col,
    shipType,
    direction
  } = _ref;
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
const makeAttack = (board, _ref2) => {
  let {
    row,
    col
  } = _ref2;
  if (row >= board.length || col >= board[row].length) {
    throw new Error('Invalid attack coordinates');
  }

  // Determine the result of the attack
  if (board[row][col] === 1) {
    board[row][col] = 2; // Mark the cell as a hit
    return {
      result: 'hit',
      board
    };
  } else if (board[row][col] === 0) {
    board[row][col] = 3; // Mark the cell as a miss
    return {
      result: 'miss',
      board
    };
  } else {
    throw new Error('Invalid attack, cell already attacked');
  }
};

// Function to check if all ships are sunk on a board
const allShipsSunk = board => {
  for (let row of board) {
    for (let cell of row) {
      if (cell === 1) {
        return false; // There are still ships that are not sunk
      }
    }
  }
  return true;
};
module.exports = {
  placeShip,
  makeAttack,
  allShipsSunk
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/esm/index.js");
/* provided dependency */ var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
// index.js





const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_3__["default"])('http://localhost:1942'); // Adjust URL as per your server setup

const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(document.getElementById('app'));
root.render( /*#__PURE__*/React.createElement(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, null, /*#__PURE__*/React.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], {
  socket: socket
}), " "));

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss ***!
  \********************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #ecf0f1;
  color: #2c3e50;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  color: #3498db;
}

p {
  margin-bottom: 1rem;
}

.Z2Yl7j4OG9d4A1TOV_pR {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  gap: 5px;
  margin: 20px auto;
  border: 2px solid #3498db;
}

.T4HywgxzHzZSLCMaxdGg {
  border-color: #2ecc71;
}

.RVMK59BuDWRwf6_mett1 {
  width: 40px;
  height: 40px;
  background-color: #ecf0f1;
  border: 1px solid #2c3e50;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
}
.UjifEFUknN2wZXfU8Rkg {
  background-color: #e74c3c;
}
.V4hVIu998tmcuAJMN49w {
  background-color: #95a5a6;
}
.oK6jChCh5Y57GNPo8utM {
  background-color: #34495e;
  border-radius: 5px;
}

.ZZwLaR9ryPLLSzdjoRkL {
  background-color: #34495e;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.S7zYAWd3OiEvDGh1UkCn {
  width: 200px;
  height: 40px;
}
.LL76FACabvutno9DxCY5 {
  width: 160px;
  height: 40px;
}
.Tiv8bpEM4TUghYNoJT1W, .Euaoba0inScwbmuOrgDv {
  width: 120px;
  height: 40px;
}
.I2PCPpTP2gBR44igmM1Z {
  width: 80px;
  height: 40px;
}

.w8XR2IwzybnvlX1BE9jz {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.DT5dVUEAa3kBDCiNP0up {
  text-align: center;
  margin-bottom: 20px;
}
.DT5dVUEAa3kBDCiNP0up h1 {
  color: #3498db;
}

.gQcddYtO97MP5vC_FovV {
  display: flex;
  justify-content: space-between;
}
.gQcddYtO97MP5vC_FovV .r86NhhHrvxRKZGbB2yvQ {
  flex: 1;
  margin: 0 10px;
}
.gQcddYtO97MP5vC_FovV .r86NhhHrvxRKZGbB2yvQ:first-child {
  margin-right: 20px;
}
.gQcddYtO97MP5vC_FovV .r86NhhHrvxRKZGbB2yvQ:last-child {
  margin-left: 20px;
}

.MdqsLkkAm41D0gxYUdvk {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
  color: #2c3e50;
}`, "",{"version":3,"sources":["webpack://./src/components/sass/base/_reset.scss","webpack://./src/App.module.scss","webpack://./src/components/sass/base/_typography.scss","webpack://./src/components/sass/board.module.scss","webpack://./src/components/sass/base/_variables.scss","webpack://./src/components/sass/cell.module.scss","webpack://./src/components/sass/base/_mixins.scss","webpack://./src/components/sass/ship.module.scss","webpack://./src/components/main.module.scss"],"names":[],"mappings":"AAAA;EACI,SAAA;EACA,UAAA;EACA,sBAAA;ACCJ;;ADEE;EACE,8BAAA;EACA,yBAAA;EACA,cAAA;ACCJ;;ACVA;EACI,mBAAA;EACA,cAAA;ADaJ;;ACVE;EACE,mBAAA;ADaJ;;AEjBA;EACE,aAAA;EACA,uCAAA;EACA,oCAAA;EACA,QAAA;EACA,iBAAA;EACA,yBAAA;AFoBF;;AEjBA;EACE,qBCVgB;AH8BlB;;AI7BA;EACE,WDQO;ECPP,YDQO;ECPP,yBDHiB;ECIjB,yBAAA;EACA,kBAAA;ECPE,aAAA;EACA,uBAAA;EACA,mBAAA;EAIA,6CAAA;ALqCJ;AIhCE;EACE,yBDRQ;AH0CZ;AI/BE;EACE,yBDXS;AH4Cb;AI9BE;EACE,yBDdS;ECeT,kBDRiB;AHwCrB;;AMtDA;EACE,yBHMW;EGLX,kBHYmB;EEbjB,aAAA;EACA,uBAAA;EACA,mBAAA;AL2DJ;AMzDE;EACE,YAAA;EACA,YHMK;AHqDT;AMxDE;EACE,YAAA;EACA,YHCK;AHyDT;AMvDE;EACE,YAAA;EACA,YHJK;AH6DT;AMtDE;EACE,WAAA;EACA,YHTK;AHiET;;AOtEA;EACE,iBAAA;EACA,cAAA;EACA,aAAA;APyEF;;AOtEA;EACE,kBAAA;EACA,mBAAA;APyEF;AOvEE;EACE,cJlBY;AH2FhB;;AOrEA;EACE,aAAA;EACA,8BAAA;APwEF;AOtEE;EACE,OAAA;EACA,cAAA;APwEJ;AOtEI;EACE,kBAAA;APwEN;AOrEI;EACE,iBAAA;APuEN;;AOlEA;EACE,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,cJzCW;AH8Gb","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n  \n  body {\n    font-family: Arial, sans-serif;\n    background-color: #ecf0f1;\n    color: #2c3e50;\n  }\n  ","* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #ecf0f1;\n  color: #2c3e50;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin-bottom: 1rem;\n  color: #3498db;\n}\n\np {\n  margin-bottom: 1rem;\n}\n\n.board {\n  display: grid;\n  grid-template-columns: repeat(10, 40px);\n  grid-template-rows: repeat(10, 40px);\n  gap: 5px;\n  margin: 20px auto;\n  border: 2px solid #3498db;\n}\n\n.board--opponent {\n  border-color: #2ecc71;\n}\n\n.cell {\n  width: 40px;\n  height: 40px;\n  background-color: #ecf0f1;\n  border: 1px solid #2c3e50;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: background-color 0.3s ease-in-out;\n}\n.cell--hit {\n  background-color: #e74c3c;\n}\n.cell--miss {\n  background-color: #95a5a6;\n}\n.cell--ship {\n  background-color: #34495e;\n  border-radius: 5px;\n}\n\n.ship {\n  background-color: #34495e;\n  border-radius: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship--carrier {\n  width: 200px;\n  height: 40px;\n}\n.ship--battleship {\n  width: 160px;\n  height: 40px;\n}\n.ship--cruiser, .ship--submarine {\n  width: 120px;\n  height: 40px;\n}\n.ship--destroyer {\n  width: 80px;\n  height: 40px;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.header {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.header h1 {\n  color: #3498db;\n}\n\n.game-area {\n  display: flex;\n  justify-content: space-between;\n}\n.game-area .board-container {\n  flex: 1;\n  margin: 0 10px;\n}\n.game-area .board-container:first-child {\n  margin-right: 20px;\n}\n.game-area .board-container:last-child {\n  margin-left: 20px;\n}\n\n.status {\n  text-align: center;\n  margin-top: 20px;\n  font-size: 1.2em;\n  color: #2c3e50;\n}","h1, h2, h3, h4, h5, h6 {\n    margin-bottom: 1rem;\n    color: #3498db;\n  }\n  \n  p {\n    margin-bottom: 1rem;\n  }\n  ","@import './base/_variables'; \n\n.board {\n  display: grid;\n  grid-template-columns: repeat(#{$board-W}, $cell-W);\n  grid-template-rows: repeat(#{$board-H}, $cell-H);\n  gap: 5px;\n  margin: 20px auto;\n  border: 2px solid $primary-color;\n}\n\n.board--opponent {\n  border-color: $secondary-color;\n}\n","\n$primary-color: #3498db;\n$secondary-color: #2ecc71;\n$background-color: #ecf0f1;\n$text-color: #2c3e50;\n$hit-color: #e74c3c;\n$miss-color: #95a5a6;\n$ship-color: #34495e;\n\n\n$board-W: 10;\n$board-H: 10;\n$cell-W: 40px;\n$cell-H: 40px;\n$ship-border-radius: 5px;\n\n\n$z-index-front: 10;\n$z-index-back: 1;\n","@import './base/_variables';\n@import './base/_mixins';\n\n.cell {\n  width: $cell-W;\n  height: $cell-H;\n  background-color: $background-color;\n  border: 1px solid $text-color;\n  position: relative;\n  @include center-content;\n  @include transition(background-color, 0.3s, ease-in-out);\n\n  &--hit {\n    background-color: $hit-color;\n  }\n\n  &--miss {\n    background-color: $miss-color;\n  }\n\n  &--ship {\n    background-color: $ship-color;\n    border-radius: $ship-border-radius;\n  }\n}\n","@mixin center-content {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  @mixin transition($property, $duration, $timing-function) {\n    transition: $property $duration $timing-function;\n  }\n  ",".ship {\n  background-color: $ship-color;\n  border-radius: $ship-border-radius;\n  @include center-content;\n\n  &--carrier {\n    width: calc($cell-W * 5);\n    height: $cell-H;\n  }\n\n  &--battleship {\n    width: calc($cell-W * 4);\n    height: $cell-H;\n  }\n\n  &--cruiser, &--submarine {\n    width: calc($cell-W * 3);\n    height: $cell-H;\n  }\n\n  &--destroyer {\n    width: calc($cell-W * 2);\n    height: $cell-H;\n  }\n}\n","@import './sass/base/reset';\n@import './sass/base/variables';\n@import './sass/base/mixins';\n@import './sass/base/typography';\n@import './sass/board.module.scss';\n@import './sass/cell.module.scss';\n@import './sass/ship.module.scss';\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.header {\n  text-align: center;\n  margin-bottom: 20px;\n\n  h1 {\n    color: $primary-color;\n  }\n}\n\n.game-area {\n  display: flex;\n  justify-content: space-between;\n\n  .board-container {\n    flex: 1;\n    margin: 0 10px;\n\n    &:first-child {\n      margin-right: 20px;\n    }\n\n    &:last-child {\n      margin-left: 20px;\n    }\n  }\n}\n\n.status {\n  text-align: center;\n  margin-top: 20px;\n  font-size: 1.2em;\n  color: $text-color;\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"board": `Z2Yl7j4OG9d4A1TOV_pR`,
	"board--opponent": `T4HywgxzHzZSLCMaxdGg`,
	"cell": `RVMK59BuDWRwf6_mett1`,
	"cell--hit": `UjifEFUknN2wZXfU8Rkg`,
	"cell--miss": `V4hVIu998tmcuAJMN49w`,
	"cell--ship": `oK6jChCh5Y57GNPo8utM`,
	"ship": `ZZwLaR9ryPLLSzdjoRkL`,
	"ship--carrier": `S7zYAWd3OiEvDGh1UkCn`,
	"ship--battleship": `LL76FACabvutno9DxCY5`,
	"ship--cruiser": `Tiv8bpEM4TUghYNoJT1W`,
	"ship--submarine": `Euaoba0inScwbmuOrgDv`,
	"ship--destroyer": `I2PCPpTP2gBR44igmM1Z`,
	"container": `w8XR2IwzybnvlX1BE9jz`,
	"header": `DT5dVUEAa3kBDCiNP0up`,
	"game-area": `gQcddYtO97MP5vC_FovV`,
	"board-container": `r86NhhHrvxRKZGbB2yvQ`,
	"status": `MdqsLkkAm41D0gxYUdvk`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/components/sass/board.module.scss":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/components/sass/board.module.scss ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.w3L8yROQUbheGGvfGxiR {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  gap: 5px;
  margin: 20px auto;
  border: 2px solid #3498db;
}

.OdKy5blaCbszg0hhI8iQ {
  border-color: #2ecc71;
}`, "",{"version":3,"sources":["webpack://./src/components/sass/board.module.scss","webpack://./src/components/sass/base/_variables.scss"],"names":[],"mappings":"AAEA;EACE,aAAA;EACA,uCAAA;EACA,oCAAA;EACA,QAAA;EACA,iBAAA;EACA,yBAAA;AADF;;AAIA;EACE,qBCVgB;ADSlB","sourcesContent":["@import './base/_variables'; \n\n.board {\n  display: grid;\n  grid-template-columns: repeat(#{$board-W}, $cell-W);\n  grid-template-rows: repeat(#{$board-H}, $cell-H);\n  gap: 5px;\n  margin: 20px auto;\n  border: 2px solid $primary-color;\n}\n\n.board--opponent {\n  border-color: $secondary-color;\n}\n","\n$primary-color: #3498db;\n$secondary-color: #2ecc71;\n$background-color: #ecf0f1;\n$text-color: #2c3e50;\n$hit-color: #e74c3c;\n$miss-color: #95a5a6;\n$ship-color: #34495e;\n\n\n$board-W: 10;\n$board-H: 10;\n$cell-W: 40px;\n$cell-H: 40px;\n$ship-border-radius: 5px;\n\n\n$z-index-front: 10;\n$z-index-back: 1;\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"board": `w3L8yROQUbheGGvfGxiR`,
	"board--opponent": `OdKy5blaCbszg0hhI8iQ`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/components/sass/cell.module.scss":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/components/sass/cell.module.scss ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.MppsE0sOMfAEYDfCQpJo {
  width: 40px;
  height: 40px;
  background-color: #ecf0f1;
  border: 1px solid #2c3e50;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
}
.YoawoW5V8aeA50zqqlEN {
  background-color: #e74c3c;
}
.m2rPgM4lcNUJX83aXKGl {
  background-color: #95a5a6;
}
.YEad2AbrilqUZdjxPUnd {
  background-color: #34495e;
  border-radius: 5px;
}`, "",{"version":3,"sources":["webpack://./src/components/sass/cell.module.scss","webpack://./src/components/sass/base/_variables.scss","webpack://./src/components/sass/base/_mixins.scss"],"names":[],"mappings":"AAGA;EACE,WCQO;EDPP,YCQO;EDPP,yBCHiB;EDIjB,yBAAA;EACA,kBAAA;EEPE,aAAA;EACA,uBAAA;EACA,mBAAA;EAIA,6CAAA;AFGJ;AAEE;EACE,yBCRQ;ADQZ;AAGE;EACE,yBCXS;ADUb;AAIE;EACE,yBCdS;EDeT,kBCRiB;ADMrB","sourcesContent":["@import './base/_variables';\n@import './base/_mixins';\n\n.cell {\n  width: $cell-W;\n  height: $cell-H;\n  background-color: $background-color;\n  border: 1px solid $text-color;\n  position: relative;\n  @include center-content;\n  @include transition(background-color, 0.3s, ease-in-out);\n\n  &--hit {\n    background-color: $hit-color;\n  }\n\n  &--miss {\n    background-color: $miss-color;\n  }\n\n  &--ship {\n    background-color: $ship-color;\n    border-radius: $ship-border-radius;\n  }\n}\n","\n$primary-color: #3498db;\n$secondary-color: #2ecc71;\n$background-color: #ecf0f1;\n$text-color: #2c3e50;\n$hit-color: #e74c3c;\n$miss-color: #95a5a6;\n$ship-color: #34495e;\n\n\n$board-W: 10;\n$board-H: 10;\n$cell-W: 40px;\n$cell-H: 40px;\n$ship-border-radius: 5px;\n\n\n$z-index-front: 10;\n$z-index-back: 1;\n","@mixin center-content {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  @mixin transition($property, $duration, $timing-function) {\n    transition: $property $duration $timing-function;\n  }\n  "],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"cell": `MppsE0sOMfAEYDfCQpJo`,
	"cell--hit": `YoawoW5V8aeA50zqqlEN`,
	"cell--miss": `m2rPgM4lcNUJX83aXKGl`,
	"cell--ship": `YEad2AbrilqUZdjxPUnd`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/App.module.scss":
/*!*****************************!*\
  !*** ./src/App.module.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../node_modules/sass-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./App.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/components/sass/board.module.scss":
/*!***********************************************!*\
  !*** ./src/components/sass/board.module.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_board_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!./board.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/components/sass/board.module.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_board_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_board_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_board_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_board_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/components/sass/cell.module.scss":
/*!**********************************************!*\
  !*** ./src/components/sass/cell.module.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_cell_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!./cell.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/components/sass/cell.module.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_cell_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_cell_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_cell_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_cell_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"App": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-95d5ef"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=App.88b5907094a4271906393485f1afcdc3.js.map