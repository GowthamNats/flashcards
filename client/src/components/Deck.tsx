import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
// import { TDeck, createDeck, deleteDeck, getDecks } from "../api/DeckFunctions"
import { createCard, deleteCard } from "../api/CardFunctions"
import { TDeck, getDeck } from "../api/DeckFunctions"

export default function Deck() {   
  const [deck, setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState<string[]>([])
  const [text, setText] = useState("")
  const { deckId } = useParams()

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault()
    const { cards: serverCards } = await createCard(deckId!, text)
    setCards(serverCards)
    await setText("")
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards)
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return
      const newDeck = await getDeck(deckId)
      setDeck(newDeck)
      setCards(newDeck.cards)
    }
    fetchDeck();
  }, [deckId])

  return (
    <>
      <ul>
          {cards.map((card, index) => (
            <li key={index}>
              <button onClick={() => handleDeleteCard(index)}>X</button>  
              {card}
            </li>
          ))}
      </ul>
      <form onSubmit={handleCreateCard}>
        <label htmlFor="card-title">Card Text</label>
        <input 
          id="card-title" 
          type="text" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          required
        />
        <button>Create Card</button>
      </form>
    </>
  )
}