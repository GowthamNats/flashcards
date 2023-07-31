import express, { Request, Response } from "express"
import DeckModel from "../models/deck"

export async function createCardController(req: Request, res: Response) {
    const deckId = req.params.deckId
    const deck = await DeckModel.findById(deckId)

    if (!deck) return res.status(400).send("No deck of this id exists")
    
    const { text } = req.body
    deck?.cards.push(text)
    await deck?.save()
    res.json(deck)
}

export async function deleteCardController(req: Request, res: Response) {
    const deckId = req.params.deckId
    const index = req.params.index
    const deck = await DeckModel.findById(deckId)
    if (!deck) return res.status(400).send("No deck of this ID exists")
    deck.cards.splice(parseInt(index), 1)
    await deck.save()
    res.json(deck)
}