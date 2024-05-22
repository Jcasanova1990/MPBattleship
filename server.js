require('dotenv').config()
require('./config/database')

const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const mongoose = require('mongoose')
const { placeShip, makeAttack, allShipsSunk } = require('./gameLogic')

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