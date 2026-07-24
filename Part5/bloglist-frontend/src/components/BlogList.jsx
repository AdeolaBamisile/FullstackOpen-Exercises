import { Link } from "react-router-dom"
import Blog from "./Blog"
import Notification from "./Notification"

const BlogList = ({ blogs, handleLike, handleSubmit, handleDelete, user, message }) => {
    return (
      <div>
        <Notification message={message} />
        <h2>blogs</h2>
        <ul>{[...blogs].sort((a, b) => b.likes - a.likes).map((blog) => (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></li>
        ))}</ul>
      </div>
    )
}

export default BlogList