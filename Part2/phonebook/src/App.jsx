import { use, useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "39-44-5323523" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteObject = { name: newName, number: newNumber };
    const existingName = persons.some((person) => person.name == newName);
    const existingNumber = persons.some((person) => person.number == newNumber);
    if (existingName) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    } else if (existingNumber) {
      alert(`${newNumber} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    setPersons(persons.concat(noteObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default App;
