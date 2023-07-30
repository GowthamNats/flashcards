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
    <>
      <ul>
          {decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>  
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input 
          id="deck-title" 
          type="text" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />
        <button>Create Deck</button>
      </form>
    </>
  )
}

export default App
