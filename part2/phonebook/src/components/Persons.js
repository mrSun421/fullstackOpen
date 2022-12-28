export const Persons = ({ persons, removePerson }) => {

  return (
    <div>
      {persons.map(person => <Person key={person.id} person={person} removePerson = {removePerson}/>)}
    </div>
  );
};
const Person = ({ person, removePerson }) => {
  return (
    <p>{person.name} {person.number} <button onClick={() => removePerson(person.id, person.name)}>delete</button></p>
  );
};
