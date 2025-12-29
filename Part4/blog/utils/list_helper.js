const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    return blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav), blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let topAuthor = null
    let maxBlogs = 0

    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        let count = 0

        for (let j = 0; j < blogs.length; j++) {
            if (blogs[j].author === author) {
                count++
            }
        }

        if (count > maxBlogs) {
            maxBlogs = count
            topAuthor = author
        }
    }

    return { 
        author: topAuthor, 
        blogs: maxBlogs 
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let topAuthor = null
    let mostLikes = 0

    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        let sumLikes = 0

        for (let j = 0; j < blogs.length; j++) {
            if (blogs[j].author === author) {
                sumLikes = sumLikes + blogs[j].likes
            }
        }

        if (sumLikes > mostLikes) {
            mostLikes = sumLikes
            topAuthor = author
        }
    }

    return { 
        author: topAuthor, 
        likes: mostLikes 
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}