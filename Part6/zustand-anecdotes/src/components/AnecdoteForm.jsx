import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions();

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    addAnecdote(content);

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
