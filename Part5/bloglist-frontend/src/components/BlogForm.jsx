import { useState } from "react";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

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
            label='title'
              type="text"
              value={title}
              onChange={handleTitleChange}
              style={{marginBottom: 15}}
          />
        </div>
        <div>
          <TextField
            label='author'
              type="text"
              value={author}
              onChange={handleAuthorChange}
              style={{marginBottom: 15}}
          />
        </div>
        <div>
          <TextField
            label='url'
              type="text"
              value={url}
              onChange={handleUrlChange}
              style={{marginBottom: 15}}
          />
        </div>
        <Button type="submit" variant="contained">create</Button>
      </form>
    </>
  );
};

export default BlogForm;
