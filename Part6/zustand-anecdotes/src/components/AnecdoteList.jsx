import { useAnecdotes } from "../store";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  return (
    <>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  );
};

export default AnecdoteList;
