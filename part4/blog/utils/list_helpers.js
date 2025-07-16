const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return blog.likes + sum
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let fav = blogs[0]
    for (let i = 0; i < blogs.length; i++) {
        if (fav.likes < blogs[i].likes)
            fav = blogs[i]
    }

    return fav
}
// favoriteBLog but using reduce
// blogs.reduce((most, blog) => {
//     most.likes > blog.likes ? most : blog
// }, null)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,

}
