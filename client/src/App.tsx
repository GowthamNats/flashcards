import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TDeck, createDeck, deleteDeck, getDecks } from "./api/DeckFunctions"

function App() {

  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState("")

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
    const deck = await createDeck(title)
    setDecks([...decks, deck])
    await setTitle("")
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId))
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks();
  }, [])

  return (
    <div className="main-container">

      <form onSubmit={handleCreateDeck} className="form-container">
        <h1 className="main-text">Flash Card Deck</h1>
        <div className="flex">
          <input
            id="deck-title"
            type="text"
            placeholder="Enter Deck Title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            value={title}
            required
          />
          <button
            type="submit"
            className="deck-button"
          >
            Create Deck
          </button>
        </div>
      </form>

      <div className="card-container">
        {decks.map((deck) => (
          <div key={deck._id} className="card">
            <button
              onClick={() => handleDeleteDeck(deck._id)}
              className="card-delete"
            >
              X
            </button>
            <Link
              to={`decks/${deck._id}`}
              className="card-text"
            >
              {deck.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
