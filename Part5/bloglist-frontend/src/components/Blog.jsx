import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [blogInfo, setBlogInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const remove = {
    backgroundColor: 'blue'
  }

  const toggleView = () => {
    setBlogInfo(!blogInfo)
  }


  if (!blogInfo) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <button onClick={() => handleDelete(blog.id)} style={remove}>remove</button>
    </div>
  )
}

export default Blog
