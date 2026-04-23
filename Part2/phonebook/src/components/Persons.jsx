const Persons = ({ name, number, handleDelete }) => {
  return (
    <>
      <div>
        {name} {number} <button onClick={handleDelete}>delete</button>
      </div>
    </>
  );
};

export default Persons;
