require('dotenv').config()
require('./config/database')

const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const mongoose = require('mongoose')
const { placeShip, makeAttack, allShipsSunk } = require('./GameLogic')

const app = express()
const server = http.vreateServer(app)
const io = socketIo(server)

// mongodb setup
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// game model

const Game = mongoose.model('Game', {
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    boardSize: Number,
    playerTurn: {type: Number, default: 0},
    ships: [{ row: Number, col:Number, isSunk:Boolean}]
})

const Player = mongoose.model('Player', {
    name: String,
    board: [[Number]]
})

let games = {}

// webSocket Connection

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('createGame', (playerName, boardSize) => {
        const newPlayer = new Player({
            name: playerName,
            board: Array.from(Array(boardSize), () => Array(boardSize).fill(0)),
        })

        const newGame = new Game({
            players: [newPlayer._id],
            boardSize,
            ships: [],
        })

        newPlayer.save().then(() => {
            newGame.save().then((savedGame) => {
                games[savedGame._id] = {
                    players: [newPlayer],
                    playerTurn: savedGame.playerTurn,
                    gameStatus: 'waiting'
                }
                socket.join(savedGame._id.toString())
                socket.emit('gameCreated', savedGame._id.toString())
            })
        })
    })

    socket.on('joinGame', (gameId, playerName) => {
        Game.findById(gameId).populate('players').exec((err, game) => {
            if (!err && game && game.players.length < 2) {
                const newPlayer = new Player({
                    name: playerName,
                    board: Array.from(Array(game.boardSize), () => Array(game.boardSize).fill(0))
                })
                game.players.push(newPlayer)
                game.save().then((savedGame) => {
                    games[savedGame._id] = {
                        players: [...games[savedGame._id].players, newPlayer],
                        playerTurn: savedGame.playerTurn,
                        gameStatus: 'ready'
                    }
                    socket.join(savedGame._id.toString())
                    io.to(savedGame._id.toString()).emit('gameJoined', savedGame)
                })
            } else {
                socket.emit('gameError', 'Game not found or already full')
            }
        })
    })

    socket.on('placeShip', (gameId, PlayerId, shipCoordinates) => {
        const game = games[gameId]
        const player = game.players.find((p) => p._id.toString() === playerId)
        if (player && game.gameSatus === 'ready' && game.players.length === 2) {
            const upadatedBoard = placeShip(player.board, shipCoordinates)
            player.board = upadatedBoard
            player.save().then(() => {
                io.to(gameId).emit('gameStateUpdate', game)
            })
        }
    })


    socket.on('makeAttack', (gameId, playerId, attackCoordinates) => {
        const game = games[gameId]
        const attackingPlayer = game.players.find((p) => p._id.toString() === playerId)
        const defendingPlayer = game.players.find((p) => p._id.toString() !== playerId)
        if (attackingPlayer && defendingPlayer && game.gameStatus === 'playing') {
            const updatedDefendingBoard = makeAttack(defendingplayer.board, attackCoordinates)
            defendingPlayer.board = updatedDefendingBoard
            defendingPlayer.save().then(() => {
                if (allShipsSunk(defendingPlayer.board)) {
                    game.gameStatus = 'finished'
                    io.to(gameId).emit('gameStateUpdate', game)
                } else {
                    // turn swap
                    game.playerTurn = (game.playerTurn + 1) % 2
                    game.save().then(() => {
                        io.to(gameId).emit('gameStateUpdate', game)
                    })
                }
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('Player Disconnected')
    })
})

const PORT = process.env.PORT || 1942

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})