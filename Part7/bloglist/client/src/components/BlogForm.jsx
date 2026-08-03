import { useState } from "react";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
    navigate("/");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 15 }}
          />
        </div>
        <div>
          <TextField
            label="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ marginBottom: 15 }}
          />
        </div>
        <div>
          <TextField
            label="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ marginBottom: 15 }}
          />
        </div>
        <Button type="submit" variant="contained">
          create
        </Button>
      </form>
    </>
  );
};

export default BlogForm;
