import { config } from "dotenv"
config()

import express, { Request, Response } from "express"
import mongoose, { connect } from "mongoose"
import cors from "cors"

import DeckModel from "./models/deck"

const PORT = 5000

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.json())

// Fetch all the decks
app.get('/decks', async (req: Request, res: Response) => {
    const decks = await DeckModel.find()
    res.json(decks)
})

// Create a new deck
app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new DeckModel({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
})

connect(process.env.MONGO_URL ?? "")
.then(() => {
    console.log(`Listening to PORT ${PORT}`)
    app.listen(PORT)
})