const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const reducer = (sum, item) => {
        return sum + item
    }
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    
    const reducer = (max, item) => {
        return (item.likes > max.likes) ? item : max
    }

    const favorite = blogs.reduce(reducer, blogs[0])
    
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const groupedAuthor = lodash.groupBy(blogs, 'author')

    const authorCount = lodash.map(groupedAuthor, (authorBlogs, authorName) => {
        return {
            author: authorName,
            blogs: authorBlogs.length
        }
    })

    return lodash.maxBy(authorCount, 'blogs')
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const groupedAuthor = lodash.groupBy(blogs, 'author')

    const AuthorLikes = lodash.map(groupedAuthor, (authorBlogs, authorName) => {
        const reducer = (sum, blog) => {
            return sum + blog.likes
        }
        const totalLikes = authorBlogs.reduce(reducer, 0)
        return {
            author: authorName,
            likes: totalLikes
        }
    })

    return lodash.maxBy(AuthorLikes, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }