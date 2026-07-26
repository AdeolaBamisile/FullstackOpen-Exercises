import { useAnecdotes, useFilter } from "../store";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()

  const filteredAnecdote = anecdotes.filter(anecdote => (
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  ))

  return (
    <>
      {[...filteredAnecdote].sort((a, b) => b.votes - a.votes).map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  );
};

export default AnecdoteList;
