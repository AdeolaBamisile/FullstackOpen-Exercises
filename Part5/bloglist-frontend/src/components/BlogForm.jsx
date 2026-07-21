import { useEffect, useImperativeHandle, useState } from 'react'
import Blog from './Blog'

const BlogForm = ({ createBlog, ref }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title
            <input placeholder='Title' type="text" value={title} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            author
            <input placeholder='Author' type="text" value={author} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            url
            <input placeholder='url' type="text" value={url} onChange={handleUrlChange} />
          </label>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default BlogForm
