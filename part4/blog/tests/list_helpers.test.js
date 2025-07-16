const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')

const filled_blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",    
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
    __v: 0
  },
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes:', () =>{
    test('Empty array', () => {
        const blogs = []
        
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('An array of size one', () => {
        const blogs = [
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12,
                __v: 0
            }
        ]

        const results = listHelper.totalLikes(blogs)
        assert.strictEqual(results, blogs[0].likes)
    })

    test('a bigger array', () => {
        const results = listHelper.totalLikes(filled_blogs)
        assert.strictEqual(results, 22)
    })
})

describe('Most likes', () => {
    test('Multiple blogs', () => {
        const result = listHelper.favoriteBlog(filled_blogs)
        assert.deepStrictEqual(result, filled_blogs[2])
    })

    test('empty array', () => {
        const blog = []
        
        const results = listHelper.favoriteBlog(blog)
        assert.deepStrictEqual(results, undefined)
    })

    test('One array element', () => {
        const blogs = [
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12,
                __v: 0
            }
        ]

        const results = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(results, blogs[0])
    })
})
