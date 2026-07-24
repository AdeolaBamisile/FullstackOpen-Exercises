import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notify, setNotify] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.edit(blog.id, likedBlog);
    const returnedBlogWithUser = { ...likedBlog, user: blog.user };
    setBlogs(
      blogs.map((blog) => (blog.id === id ? returnedBlogWithUser : blog)),
    );
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    await blogService.remove(blog.id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const navigate = useNavigate()
  
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      setPassword("");
      setUsername("");
      navigate('/')
    } catch {
      setNotify({ text: "wrong username or password", type: "error" });
      setTimeout(() => {
        setNotify(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <h2>login to application</h2>
        <Notification message={notify} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
          </div>
          <button>login</button>
        </form>
      </div>
    );
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedInUser");
    navigate('/')
  };

  const handleSubmit = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    const blogToAdd = { ...returnedBlog, user };
    setBlogs(blogs.concat(blogToAdd));
    setNotify({
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      type: "success",
    });
    setTimeout(() => {
      setNotify(null);
    }, 5000);
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const padding = {
    padding: 5,
  };

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(b => b.id === match.params.id) : null

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      {user && <Link style={padding} to='/create'>new blog</Link>}
      {!user && <Link style={padding} to="/login">
        login
      </Link>}
      {user && <button onClick={handleLogout}>logout</button> }
      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              handleLike={handleLike}
              handleSubmit={handleSubmit}
              deleteBlog={deleteBlog}
              user={user}
            />
          }
        />
        <Route path="/login" element={loginForm()} />
        <Route path="/blogs/:id" element={
          <Blog blog={blog} user={user} deleteBlog={deleteBlog} handleLike={handleLike} />
        } />
        <Route path="/create" element={
          <BlogForm createBlog={handleSubmit} />
        } />
      </Routes>
    </div>

    // <div>
    //   {!user && loginForm()}
    //   {user && allBlogs()}
    // </div>
  );
};

export default App;
