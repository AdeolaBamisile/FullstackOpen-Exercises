import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <>
      <Header courses={courses} />
      <Content courses={courses} />
      <Total courses={courses} />
    </>
  );
};

export default Course;
