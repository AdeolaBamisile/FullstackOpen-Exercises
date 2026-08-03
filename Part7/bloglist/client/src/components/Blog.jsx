import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Typography,
  CardContent,
  TextField,
} from "@mui/material";
import { useBlogsActions } from "../store";

const Blog = ({ blog, deleteBlog, user, blogs, fetchError }) => {
  if (fetchError) {
    throw new Error("error");
  }

  if (!blog && blogs.length === 0) {
    return <div>Loading blogs...</div>;
  }

  if (!blog) {
    return <h2>404 - Page not found</h2>;
  }

  const { likeBlog, addComment } = useBlogsActions();
  const [comment, setComment] = useState("");

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const newComment = (event) => {
    event.preventDefault();
    addComment(blog.id, comment);
    setComment("");
  };

  const remove = {
    display: blog.user?.username === user?.username ? "" : "none",
  };

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteBlog(blog.id);
    navigate("/");
  };

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant="h4"
          component="h2"
          className="AuthorAndTitle"
          gutterBottom
        >
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          by {blog.author}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Link className="url">{blog.url}</Link>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Added by {blog.user.name}
        </Typography>
        <div className="likes">
          {blog.likes} {blog.likes === 1 ? "like" : "likes"}
        </div>
        {user && (
          <div>
            <Button
              className="likeButton"
              style={{ marginRight: 10 }}
              variant="outlined"
              onClick={() => likeBlog(blog.id)}
              color="primary"
            >
              like
            </Button>
            <Button
              className="removeButton"
              style={remove}
              variant="outlined"
              onClick={handleDelete}
              color="error"
            >
              remove
            </Button>
          </div>
        )}
        <Typography
          sx={{ marginTop: 3 }}
          variant="h5"
          component="h2"
          gutterBottom
        >
          comments
        </Typography>
        <form onSubmit={newComment}>
          <TextField
            label="add a comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <Button sx={{ padding: 2 }} variant="contained" type="submit">
            Add comment
          </Button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Blog;
