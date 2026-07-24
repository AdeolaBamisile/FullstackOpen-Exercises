import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Typography, CardContent } from '@mui/material'

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
  }

  const navigate = useNavigate()

  const handleDelete = () => {
    deleteBlog(blog.id)
    navigate('/')
  }

  return (
    <Card sx={{boxShadow: 3}}>
      <CardContent>
        <Typography variant='h4' component='h2' className='AuthorAndTitle' gutterBottom>{blog.title}</Typography>
        <Typography variant='subtitle1' gutterBottom>by {blog.author}</Typography>
        <Typography variant='body1' gutterBottom><Link className='url'>{blog.url}</Link></Typography>
        <Typography variant='body2' gutterBottom>Added by {blog.user.name}</Typography>
          <div className='likes'>
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes' }
          </div>
          {user && (
            <div>
              <Button className='likeButton' style={{marginRight: 10}} variant='outlined' onClick={() => handleLike(blog.id)} color='primary'>like</Button>
              <Button className='removeButton' style={remove} variant='outlined' onClick={handleDelete} color='error'>remove</Button>
            </div>
          )}
      </CardContent>
    </Card>
  )
}

export default Blog
