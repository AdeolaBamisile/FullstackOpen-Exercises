import { useAnecdoteActions } from "../store";

const Anecdote = ({ anecdote }) => {
    const { vote, setNotification, remove } = useAnecdoteActions()

    const handleVote = () => {
      vote(anecdote.id)
      setNotification(`You voted '${anecdote.content}'`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
        { anecdote.votes === 0 && <button onClick={() => remove(anecdote.id)}>delete</button> }
      </div>
    </>
  );
};

export default Anecdote;
