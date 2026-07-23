import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [blogInfo, setBlogInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const remove = { 
    display: blog.user.username === user.username ? "" : "none" ,
    backgroundColor: "blue"
  }

  const toggleView = () => {
    setBlogInfo(!blogInfo)
  }


  if (!blogInfo) {
    return (
      <div className='titleAndAuthor' style={blogStyle}>
        {blog.title} {blog.author}
        <button className='viewButton' onClick={toggleView}>view</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div className='titleAndAuthor'>
        {blog.title} {blog.author}
        <button onClick={toggleView}>hide</button>
      </div>
      <div className='url'>{blog.url}</div>
      <div className='likes'>
        likes {blog.likes}
        <button className='likeButton' onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <button onClick={() => handleDelete(blog.id)} style={remove}>remove</button>
    </div>
  )
}

export default Blog
