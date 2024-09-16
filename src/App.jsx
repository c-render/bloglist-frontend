import { useEffect, useRef, useState } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'
import ReactDOM from 'react-dom/client'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { createStore } from 'redux'
import loginService from './services/login'

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const store = createStore(notificationReducer)

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('useEffect1: Fetching blogs; user =', user)
    if (user !== null) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
      ) 
      console.log('useEffect1: Done fetching blogs; user =', user, 'blogs =', blogs)
    } else{
      console.log('User is null, not fetching blogs; user =', user)
    }
  }, [user])

  useEffect(() => {
    console.log('useEffect2: Checking local storage for user')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Got user and set token', user, user.token)
      setUser(user)
      blogService.setToken(user.token)
    }
    console.log('useEffect2: Done checking local storage for user; user =', user)
  }, [])
  


  const Notify = (message) => {
    //setNotificationMessage(message)
    store.dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })
    setTimeout(() => {
      // setNotificationMessage(null)
      store.dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }

  const ShowError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('handleLogin', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      ShowError('Wrong credentials')
    }
  }

  const handleLogout = () => {
    //event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
      setBlogs([]) // Clear blogs on logout
    } catch (exception) {
      console.log('Logout did not work', exception)
      setErrorMessage('logout did not work')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        console.log('returnedBlog:', returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        Notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }

  const handleRemoveBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  const reSortBlogs = (updatedBlog) => {
    console.log('reSortBlogs')
    const updatedBlogs = blogs.map(blog =>
      blog.id ===  updatedBlog.id ? updatedBlog : blog
    )
    setBlogs(updatedBlogs.sort(compareLikes))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={store.getState()} />
      <ErrorMessage message={errorMessage} />

      {
        user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in
            <button onClick={() => handleLogout()}>logout</button>
          </p>
          {blogForm()}
        </div>
      }
      {
        blogs.length !== 0 ?
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} currentUser={user} onRemove={handleRemoveBlog} onLike={reSortBlogs}/>) :
        <div>
          <p>Please login to see blogs</p>
        </div>
        
      }
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

export default App