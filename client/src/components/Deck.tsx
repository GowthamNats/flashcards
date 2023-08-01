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
    <div className="main-container">

      <form onSubmit={handleCreateCard} className="form-container">
        <h1 className="main-text">Flash Cards</h1>
        <div className="flex">
          <input
            id="deck-title"
            type="text"
            placeholder="Enter Confession"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            value={text}
            required
          />
          <button
            type="submit"
            className="deck-button"
          >
            Create a Flash Card
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center my-3">
        <Link to={"/"} className="deck-button">Back to the Array</Link>
      </div>

      <div className="card-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <button
              onClick={() => handleDeleteCard(index)}
              className="card-delete"
            >
              X
            </button>
            <h1
              className="card-text"
            >
              {card}
            </h1>
          </div>
        ))}
      </div>
    </div>
  )
}