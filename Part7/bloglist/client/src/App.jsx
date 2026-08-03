import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  useNotificationActions,
  useBlogsActions,
  useBlogs,
  useUserActions,
  useUser,
  useUsersActions,
} from "./store";

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
import UserList from "./components/UserList";
import User from "./components/User";

const App = () => {
  const [fetchError, setFetchError] = useState(false);
  const { notify } = useNotificationActions();
  const blogs = useBlogs();
  const { initialize, addBlog, likeBlog, deleteBlog } = useBlogsActions();
  const user = useUser();
  const { logoutUser, setUser } = useUserActions();
  const { getUsers } = useUsersActions();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        initialize();
      } catch (error) {
        setFetchError(!fetchError);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    setUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        getUsers();
      } catch (error) {
        setFetchError(!fetchError);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    deleteBlog(id);
    notify({
      text: `Blog ${blog.title} by ${blog.author} deleted`,
      type: "warning",
    });
  };

  const border = {
    border: "none",
    borderBottom: "1px solid grey",
  };

  const handleSubmit = async (blogObject) => {
    addBlog(blogObject, user);
    notify({
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      type: "success",
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

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
              <Button color="inherit" component={Link} sx={style} to="/users">
                Users
              </Button>
            )}
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
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<BlogList fetchError={fetchError} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                user={user}
                deleteBlog={handleDelete}
                blogs={blogs}
                fetchError={fetchError}
              />
            }
          />
          <Route
            path="/create"
            element={<BlogForm createBlog={handleSubmit} />}
          />
          <Route path="/users" element={<UserList fetchError={fetchError} />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
      </ErrorBoundary>
    </div>

    // <div>
    //   {!user && loginForm()}
    //   {user && allBlogs()}
    // </div>
  );
};

export default App;
