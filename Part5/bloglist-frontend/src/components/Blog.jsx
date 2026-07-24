import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, handleLike, deleteBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  
  if (!blog) {
    return <div>Loading blog...</div>
  }

  const remove = { 
    display: blog.user?.username === user?.username ? "" : "none" ,
    backgroundColor: "blue"
  }

  const navigate = useNavigate()

  const handleDelete = () => {
    deleteBlog(blog.id)
    navigate('/')
  }

  return (
    <div>
      <h2 className='AuthorAndTitle'>{blog.author}: {blog.title}</h2>
      <div className='url'>{blog.url}</div>
      <div className='likes'>
        likes: {blog.likes}
        {user && <button className='likeButton' onClick={() => handleLike(blog.id)}>like</button>}
      </div>
      <div>Added by {blog.user.name}</div>
      <button className='removeButton' style={remove} onClick={handleDelete}>remove</button>
    </div>
  )
}

export default Blog
