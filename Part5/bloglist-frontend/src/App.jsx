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
import {
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

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
    setNotify({
      text: `Blog ${blog.title} by ${blog.author} deleted`,
      type: "warning",
    });
    setTimeout(() => {
      setNotify(null);
    }, 5000);
  };

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      setPassword("");
      setUsername("");
      navigate("/");
    } catch {
      setNotify({ text: "wrong username or password", type: "error" });
      setTimeout(() => {
        setNotify(null);
      }, 5000);
    }
  };

  const border = {
    border: "none",
    borderBottom: "1px solid grey",
  };

  const loginForm = () => {
    return (
      <div>
        <h2>login to application</h2>
        <Notification message={notify} />
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              style={{ marginTop: 5, marginBottom: 5 }}
            />
          </div>
          <div>
            <TextField
              label="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ marginTop: 5, marginBottom: 5 }}
            />
          </div>
          <Button type="submit" variant="contained">
            login
          </Button>
        </form>
      </div>
    );
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedInUser");
    navigate("/");
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

  const style = {
    "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
  };

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blogs
          </Typography>
          <Box>
            <Button color="inherit" component={Link} sx={style} to="/">
              blogs
            </Button>
            {user && (
              <Button color="inherit" component={Link} sx={style} to="/create">
                new blog
              </Button>
            )}
            {!user && (
              <Button color="inherit" component={Link} sx={style} to="/login">
                login
              </Button>
            )}
            {user && (
              <Button color="inherit" sx={style} onClick={handleLogout}>
                logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
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
              message={notify}
            />
          }
        />
        <Route path="/login" element={loginForm()} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              user={user}
              deleteBlog={deleteBlog}
              handleLike={handleLike}
            />
          }
        />
        <Route
          path="/create"
          element={<BlogForm createBlog={handleSubmit} />}
        />
      </Routes>
    </div>

    // <div>
    //   {!user && loginForm()}
    //   {user && allBlogs()}
    // </div>
  );
};

export default App;
