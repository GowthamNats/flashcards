import { useEffect, useState } from "react"

type TDeck = {
  title: string,
  _id: string
}

function App() {

  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState<string>('')

  async function handleCreateDeck(e: React.FormEvent) {
    // e.preventDefault()
    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      body: JSON.stringify({
        title
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    setTitle("")
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch('http://localhost:5000/decks')
      const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks();
  }, [])

  return (
    <>
      <ul>
          {decks.map((deck) => (
            <li key={deck._id}>{deck.title}</li>
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
