import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { placeShip, makeAttack } from './gameLogic';
import Board from './components/Board';
import styles from './App.module.scss';

const socket = io('http://localhost:5000');

const App = () => {
  const [gameId, setGameId] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [gameState, setGameState] = useState(null);

  const handleCreateGame = () => {
    socket.emit('createGame', playerName, 10); // Assuming board size is 10x10
  };

  const handleJoinGame = (gameId) => {
    socket.emit('joinGame', gameId, playerName);
  };

  const handlePlaceShip = (shipCoordinates) => {
    socket.emit('placeShip', gameId, playerId, shipCoordinates);
  };

  const handleMakeAttack = (attackCoordinates) => {
    socket.emit('makeAttack', gameId, playerId, attackCoordinates);
  };

  useEffect(() => {
    socket.on('gameCreated', (createdGameId) => {
      setGameId(createdGameId);
    });

    socket.on('gameJoined', (game) => {
      setPlayerId(game.players.find((player) => player.name === playerName)._id);
      setGameState(game);
    });

    socket.on('gameError', (errorMessage) => {
      console.error(errorMessage);
      // Handle error
    });

    socket.on('gameStateUpdate', (updatedGameState) => {
      setGameState(updatedGameState);
    });

    return () => {
      socket.off('gameCreated');
      socket.off('gameJoined');
      socket.off('gameError');
      socket.off('gameStateUpdate');
    };
  }, [playerName]);

  return (
    <div className={styles.container}>
      {!gameId ? (
        <div>
          <input type="text" placeholder="Enter your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
          <button onClick={handleCreateGame}>Create Game</button>
          <input type="text" placeholder="Enter game ID" />
          <button onClick={() => handleJoinGame(gameId)}>Join Game</button>
        </div>
      ) : (
        <div className={styles.gameArea}>
          {gameState.players.map((player) => (
            <div key={player._id} className={styles.boardContainer}>
              <h2>{player.name}</h2>
              {player._id === playerId && (
                <Board board={player.board} handlePlaceShip={handlePlaceShip} handleMakeAttack={handleMakeAttack} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;