import express, { Request, Response } from "express"
import DeckModel from "../models/deck"

// Fetch all the decks
export async function getDecksController(req: Request, res: Response) {
    const decks = await DeckModel.find()
    res.json(decks)
}

// Create a new deck
export async function createDeckController(req: Request, res: Response) {
    const newDeck = new DeckModel({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
}

// Delete a deck based on deck id
export async function deleteDeckController (req: Request, res: Response) {
    const deckId = req.params.deckId
    const deck = await DeckModel.findByIdAndDelete(deckId)
    res.json({
        message: "Successfully deleted"
    })
}

// Get a particular deck
export async function getDeckController(req: Request, res: Response) {
    const { deckId } = req.params
    const deck = await DeckModel.findById(deckId)
    res.json(deck)
}