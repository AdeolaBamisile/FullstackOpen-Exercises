import { Link } from "react-router-dom"
import Blog from "./Blog"

const BlogList = ({ blogs, handleLike, handleSubmit, handleDelete, user }) => {
    return (
      <div>
        <h2>blogs</h2>
        {[...blogs].sort((a, b) => b.likes - a.likes).map((blog) => (
          <ul><Link to={`/blogs/${blog.id}`} ><li key={blog.id}>{blog.title} {blog.author}{}</li></Link></ul>
        ))}
      </div>
    )
}

export default BlogList