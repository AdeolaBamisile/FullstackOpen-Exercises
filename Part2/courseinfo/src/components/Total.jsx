const Total = ({ course }) => {
  const all = course.parts.map((part) => part.exercises);
  const total = all.reduce((acc, cur) => acc + cur, 0);
  return <strong>total of {total} exercises</strong>;
};

export default Total;
