import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import ServerNotes from "./services/ServerNotes";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notify, setNotify] = useState(null);

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
      const personToUpdate = persons.find((person) => person.name === newName);
      const changedNumber = { ...personToUpdate, number: newNumber };
      const id = personToUpdate.id;
      ServerNotes.edit(id, changedNumber).then((initialNote) => {
        setPersons(
          persons.map((person) => (person.id === id ? initialNote : person)),
        );
        setNotify(`Changed ${personToUpdate.name}'s number`);
        setTimeout(() => {
          setNotify(null);
        }, 5000);
      });
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
      setNotify(`Added ${newName}`);
      setTimeout(() => {
        setNotify(null);
      }, 5000);
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
      <Notification message={notify} />
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
