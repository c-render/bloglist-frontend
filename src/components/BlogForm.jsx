import { useState } from "react"

const BlogForm = ({ createBlog }) => {

    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl,
            likes: 0
        })

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }

    return (
        <div>
            <h2>Create new blog</h2>

            <form onSubmit={addBlog}>
            <div>
                title
                <input
                    type="text"
                    value={newBlogTitle}
                    name="Title"
                    onChange={({ target }) => setNewBlogTitle(target.value)}
                />
                </div>
                <div>
                author
                <input
                    type="text"
                    value={newBlogAuthor}
                    name="Author"
                    onChange={({ target }) => setNewBlogAuthor(target.value)}
                />
                </div>
                <div>
                url
                <input
                    type="text"
                    value={newBlogUrl}
                    name="Url"
                    onChange={({ target }) => setNewBlogUrl(target.value)}
                />
            </div>
                <button type="submit">save</button>
            </form> 
        </div>
    )
}

export default BlogForm