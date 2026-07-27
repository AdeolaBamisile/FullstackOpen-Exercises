import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote, setNotification } = useAnecdoteActions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    addAnecdote(content);
    setNotification(`New anecdote created '${content}'`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);

    event.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
