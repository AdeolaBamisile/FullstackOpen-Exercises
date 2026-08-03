import { useParams } from "react-router-dom";
import { useUsers } from "../store";

const User = () => {
  const users = useUsers();
  const id = useParams().id;
  const user = users.find((user) => user.id === id);

  if (users.length === 0) {
    return <div>Loading user...</div>;
  }

  if (!user) {
    return <h1>404 - Page not found</h1>;
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
