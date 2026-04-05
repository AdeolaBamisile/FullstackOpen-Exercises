import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "39-44-5323523" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
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

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const peopelToShow =
    newSearch == ""
      ? persons
      : persons.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(newSearch.toLocaleLowerCase()),
        );

  return (
    <>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons peopelToShow={peopelToShow} />
    </>
  );
};

export default App;
