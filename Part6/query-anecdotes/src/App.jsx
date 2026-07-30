import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import useNotify from './hooks/useNotify'
import { useAnecdotes } from './useAnecdotes'

const App = () => {
  const { notify, setNotify } = useNotify()

  const { anecdotes, vote, isPending, isError } = useAnecdotes()

  const handleVote = (anecdote) => {
    vote({ ...anecdote, votes: anecdote.votes + 1})
    setNotify(`anecdote '${anecdote.content}' voted`)
    setTimeout(() => {
      setNotify(null)
    }, 5000);
  }

  if (isPending) {
    return <div>Loading anecdotes...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App