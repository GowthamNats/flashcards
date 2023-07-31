import { TDeck } from "./DeckFunctions"
import { API_URL } from "./config"

export async function createCard(deckId: string, text: string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      text
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  return response.json()
}

export async function deleteCard(deckId: string, index: number): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: 'DELETE',
  })
  return response.json()
}