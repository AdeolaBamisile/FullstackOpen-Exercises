import Part from "./Part";

const Content = ({ courses }) => {
  return (
    <div>
      {courses.parts.map((course) => (
        <Part key={course.id} part={course.name} exercises={course.exercises} />
      ))}
    </div>
  );
};

export default Content;
