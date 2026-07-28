import { create } from 'zustand'
import ServerAnecdotes from './services/ServerAnecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = anecdote => ({
  content: anecdote,
  votes: 0
})

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  notification: null,
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const editedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      const returnedAnecdote = await ServerAnecdotes.edit(id, editedAnecdote)
      set(state => ({ 
        anecdotes: state.anecdotes.map(anecdote => 
          anecdote.id === id ? returnedAnecdote : anecdote
        ) 
      }))
    },
    addAnecdote: async (anecdote) => {
      const newAnecdote = await ServerAnecdotes.create(asObject(anecdote))
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter: value => set(state => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await ServerAnecdotes.getAll()
      set(state => ({ anecdotes }))
    },
    setNotification: value => set(state => ({ notification: value })),
    remove: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      ServerAnecdotes.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    }
  },
}))

export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useFilter()
  return [...anecdotes]
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useNotification = () => useAnecdoteStore(state => state.notification)

export default useAnecdoteStore
