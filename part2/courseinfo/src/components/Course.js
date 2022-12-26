export const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Parts parts={course.parts} />
    </div>
  );
};
const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};
const Parts = ({ parts }) => {

  return (
    <div>
      <ul>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </ul>
      <Total parts={parts} />
    </div>
  );
};
const Part = ({ part }) => {
  return (

    <li>{part.name} {part.exercises}</li>
  );
};
const Total = ({ parts }) => {
  const sum = parts.reduce((partialSum, part) => { return partialSum + part['exercises']; }, 0);
  return (
    <div>
      <p>total of {sum} excercises</p>
    </div>
  );
};
