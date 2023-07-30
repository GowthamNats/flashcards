import express, { Request, Response } from "express"
import mongoose, { connect } from "mongoose"

import DeckModel from "./models/deck"

const PORT = 5000

const app = express()

app.use(express.json())

app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new DeckModel({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
})

connect("mongodb+srv://gowtham:damnyoukiddo@flashcardsage.hv0b2s8.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log(`Listening to PORT ${PORT}`)
    app.listen(PORT)
})