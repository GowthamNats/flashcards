import { config } from "dotenv"
config()

import express, { Request, Response } from "express"
import mongoose, { connect } from "mongoose"
import cors from "cors"

import DeckModel from "./models/deck"
import { createDeckController, deleteDeckController, getDeckController, getDecksController } from "./controllers/DeckControllers"
import { createCardController, deleteCardController } from "./controllers/CardControllers"

const PORT = 5000

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.json())

// Deck Controllers
app.get('/decks', getDecksController)
app.post('/decks', createDeckController)
app.delete('/decks/:deckId', deleteDeckController)
app.get("/decks/:deckId", getDeckController)

// Card Controllers
app.post("/decks/:deckId/cards", createCardController);
app.delete("/decks/:deckId/cards/:index", deleteCardController)

connect(process.env.MONGO_URL ?? "")
.then(() => {
    console.log(`Listening to PORT ${PORT}`)
    app.listen(PORT)
})