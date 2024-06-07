require('dotenv').config();
require('./config/database');

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')
const { placeShip, makeAttack, allShipsSunk } = require('./src/gameLogic');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB setup
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(cors());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Game model
const Game = mongoose.model('Game', {
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    boardSize: Number,
    playerTurn: { type: Number, default: 0 },
    ships: [{ row: Number, col: Number, isSunk: Boolean }]
});

// Player model
const Player = mongoose.model('Player', {
    name: String,
    board: [[Number]]
});

// WebSocket Connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // WebSocket event handlers (createGame, joinGame, placeShip, makeAttack, etc.)

    socket.on('disconnect', () => {
        console.log('Player disconnected');
    });
});

const PORT = process.env.PORT || 1942;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
