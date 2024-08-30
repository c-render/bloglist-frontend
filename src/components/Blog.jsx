import React, { useEffect, useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, currentUser, onRemove, onLike }) => {

  const [blogState, setBlogState] = useState(blog)

  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    console.log('Like button clicked')
    console.log('Blog:', blogState)
    console.log('Blog likes:', blogState.likes)
    console.log('Blog id:', blogState.id)
    console.log('Blog user:', blogState.user)
    console.log('Blog user id:', blogState.user.id)
    console.log('Blog user name:', blogState.user.name)

    const updatedBlog = { ...blogState, likes: blogState.likes + 1 }
    
    try {
      const returnedBlog = await blogService.update(blogState.id, updatedBlog)
      setBlogState(returnedBlog)
      onLike(returnedBlog)
    } catch (error) {
      console.log('Error updating likes:', error)
    }
  }

  const handleRemove = async () => {
    console.log('Remove button clicked')
    console.log('Blog:', blogState)
    console.log('Blog id:', blogState.id)
    console.log('Blog user:', blogState.user)
    console.log('Blog user id:', blogState.user.id)
    console.log('Blog user name:', blogState.user.name)

    if (window.confirm(`Remove blog ${blogState.title} by ${blogState.author}`)) {
      try {
        await blogService.remove(blogState.id)
        console.log('Blog removed')
        onRemove(blogState.id)
      } catch (error) {
        console.log('Error removing blog:', error)
      }
    }
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} 
      <button style={hideWhenVisible} onClick={() => setDetailsVisible(true)}>view</button>
      <button style={showWhenVisible} onClick={() => setDetailsVisible(false)}>hide</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {blogState.likes} <button onClick={handleLike}>like</button> <br />
        {blog.user.name} <br />
        {currentUser.username === blog.user.username ? <button onClick={handleRemove}>remove</button> : null}
      </div>
    </div>  
  )
}

export default Blog