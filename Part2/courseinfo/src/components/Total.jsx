const Total = ({ courses }) => {
  const all = courses.parts.map((course) => course.exercises);
  const sum = all.reduce((acc, cur) => acc + cur, 0);
  return <strong>total of {sum} exercises</strong>;
};

export default Total;
