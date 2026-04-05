const Persons = ({ peopelToShow }) => {
  return (
    <>
      {peopelToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
