const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total sum', () => {
    const listWithOneBlog = [
        {
            _id: '536748596708aehf',
            title: 'Go To Statement',
            author: 'Erenn Johnson',
            url: 'https://example.com/test1',
            likes: 5,
            __v: 0
        }
    ]
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
})

describe('total likes', () => {
    const BiggerList = [
        {
            _id: '1',
            title: 'Title 1',
            author: 'Erenn Johnson',
            url: 'url 1',
            likes: 5,
            __v: 0
        },
        {
            _id: '2',
            title: 'title 2',
            author: 'Eran Danniels',
            url: 'url 2',
            likes: 15,
            __v: 0
        },
        {
            _id: '3',
            title: 'title 3',
            author: 'Erenn Johnson',
            url: 'url 3',
            likes: 10,
            __v: 0
        }
    ]
    test('a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(BiggerList)
        assert.strictEqual(result, 30)
    })
})

describe('total likes', () => {
    const BiggerList = [
        {
            _id: '1',
            title: 'Title 1',
            author: 'Erenn Johnson',
            url: 'url 1',
            likes: 5,
            __v: 0
        },
        {
            _id: '2',
            title: 'title 2',
            author: 'Eran Danniels',
            url: 'url 2',
            likes: 15,
            __v: 0
        },
        {
            _id: '3',
            title: 'title 3',
            author: 'Erenn Johnson',
            url: 'url 3',
            likes: 10,
            __v: 0
        }
    ]
    test('finds the most popular blog', () => {
        const result = listHelper.favoriteBlog(BiggerList)
        assert.deepStrictEqual(result, {
            title: 'title 2',
            author: 'Eran Danniels',
            likes: 15
        })
    })
})

describe('most blogs', () => {
    const BiggerList = [
        {
            _id: '1',
            title: 'Title 1',
            author: 'Erenn Johnson',
            url: 'url 1',
            likes: 5,
            __v: 0
        },
        {
            _id: '2',
            title: 'title 2',
            author: 'Eran Danniels',
            url: 'url 2',
            likes: 15,
            __v: 0
        },
        {
            _id: '3',
            title: 'title 3',
            author: 'Erenn Johnson',
            url: 'url 3',
            likes: 10,
            __v: 0
        }
    ]
    test('most blogs by an author', () => {
        const result = listHelper.mostBlogs(BiggerList)
        assert.deepStrictEqual(result, {
            author: 'Erenn Johnson',
            blogs: 2
        })
    })
})

describe('most likes', () => {
    const BiggerList = [
        {
            _id: '1',
            title: 'Title 1',
            author: 'Erenn Johnson',
            url: 'url 1',
            likes: 6,
            __v: 0
        },
        {
            _id: '2',
            title: 'title 2',
            author: 'Eran Danniels',
            url: 'url 2',
            likes: 15,
            __v: 0
        },
        {
            _id: '3',
            title: 'title 3',
            author: 'Erenn Johnson',
            url: 'url 3',
            likes: 10,
            __v: 0
        }
    ]
    test('most likes by an author', () => {
        const result = listHelper.mostLikes(BiggerList)
        assert.deepStrictEqual(result, {
            author: 'Erenn Johnson',
            likes: 16
        })
    })
})