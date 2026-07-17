import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      setPassword("");
      setUsername("");
    } catch {
      setNotify({text: 'wrong username or password', type: 'error'})
      setTimeout(() => {
        setNotify(null)
      }, 5000);
    }
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    const initialBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(initialBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
    setNotify({text: `a new blog ${title} by ${author} added`, type:'success'})
    setTimeout(() => {
      setNotify(null)
    }, 5000);
  };

  const allBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notify} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>log out</button>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              title
              <input type="text" value={title} onChange={handleTitleChange} />
            </label>
          </div>
          <div>
            <label>
              author
              <input type="text" value={author} onChange={handleAuthorChange} />
            </label>
          </div>
          <div>
            <label>
              url
              <input type="text" value={url} onChange={handleUrlChange} />
            </label>
          </div>
          <button>create</button>
        </form>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <div>
      {!user && loginForm()}
      {user && allBlogs()}
    </div>
  );
};

export default App;
