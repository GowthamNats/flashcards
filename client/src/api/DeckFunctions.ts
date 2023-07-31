import { API_URL } from "./config"

export type TDeck = {
    title: string,
    cards: string[],
    _id: string
  }  

export async function createDeck(title: string) {
    const response = await fetch(`${API_URL}/decks`, {
      method: 'POST',
      body: JSON.stringify({
        title
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response.json()
}

export async function getDecks(): Promise<TDeck[]> {
    const response = await fetch(`${API_URL}/decks`)
    return response.json()
}

export async function deleteDeck(deckId: string) {
    await fetch(`${API_URL}/decks/${deckId}`, {
      method: 'DELETE',
    })
}

export async function getDeck(deckId: string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}`)
  return response.json()
}