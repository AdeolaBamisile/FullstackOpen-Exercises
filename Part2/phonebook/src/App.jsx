import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import ServerNotes from "./services/ServerNotes";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    ServerNotes.getAll().then((initialNote) => {
      const notes = initialNote;
      setPersons(notes);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteObject = {
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
    } else if (newName == "" || newNumber == "") {
      alert("Please fill all the required fields");
      return;
    }
    ServerNotes.create(noteObject).then((initialNote) => {
      setPersons(persons.concat(initialNote));
      setNewName("");
      setNewNumber("");
    });
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

  const handleDelete = (id) => () => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      ServerNotes.remove(id).then((initialNote) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
      {peopelToShow.map((person) => (
        <Persons
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={handleDelete(person.id)}
        />
      ))}
    </>
  );
};

export default App;
