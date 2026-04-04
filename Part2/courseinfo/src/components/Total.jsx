const Total = ({ course }) => {
  let sum = 0;
  course.parts.map((part) => {
    sum += part.exercises;
  });
  return <strong>total of {sum} exercises</strong>;
};

export default Total;
