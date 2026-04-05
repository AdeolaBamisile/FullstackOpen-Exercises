const PersonForm = ({
  handleSubmit,
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input onChange={handleNameChange} value={newName} type="text" />
        </div>
        <div>
          number:{" "}
          <input onChange={handleNumberChange} value={newNumber} type="text" />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default PersonForm;
