const Blog = require('../models/blog')

const initialBlogList = [
    {
        title: 'Title 1',
        author: 'Erenn Johnson',
        url: 'url 1',
        likes: 5,
    },
    {
        title: 'title 2',
        author: 'Eran Danniels',
        url: 'url 2',
        likes: 15,
    },
    {
        title: 'title 3',
        author: 'Erenn Johnson',
        url: 'url 3',
        likes: 10,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find()
    return blogs.map(b => b.toJSON())
}

module.exports = { initialBlogList, blogsInDb }
