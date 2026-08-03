import { Link } from "react-router-dom";
import Notification from "./Notification";
import { useBlogs } from "../store";
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

const BlogList = ({ fetchError }) => {
  const blogs = useBlogs();

  if (fetchError) {
    throw new Error("Error fetching blogs");
  }

  if (blogs === null) {
    return <div>Loading blogs...</div>;
  }

  if (blogs.length === 0) {
    return <h1>No Blogs</h1>;
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>{blog.likes}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
