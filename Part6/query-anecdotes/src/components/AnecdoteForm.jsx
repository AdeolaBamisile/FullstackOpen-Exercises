import useNotify from "../hooks/useNotify";
import { useAnecdotes } from "../useAnecdotes";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();
  const { notify, setNotify } = useNotify();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    
    if (content.length < 5) {
      setNotify('too short anecdote, must have length 5 or more');
      setTimeout(() => {
        setNotify(null);
      }, 5000);
    } else {
      setNotify(`anecdote '${content}' added`);
      addAnecdote({ content, votes: 0 });
      setTimeout(() => {
        setNotify(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
