import { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import BlogHome from './components/BlogHome'
import Login from './components/Login'
import UserList from './components/UserList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'


const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.user
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const notification = useSelector(state => {
    return state.notification
  })

  return (
    <div>
      <Notification message={notification} />
      <NavBar user={user}/>
      <Routes>
        <Route path='/blogs/:id' element={<Blog />}></Route>
        <Route path='/users/:id' element={<User />}></Route>
        <Route path='/users' element={<UserList />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<BlogHome />}></Route>
      </Routes>

    </div>
  )
}

export default App