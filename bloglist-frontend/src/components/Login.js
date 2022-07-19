import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import Notification from './Notification'


const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector(state => {
    return state.notification
  })


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userResult = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userResult)
      )
      blogService.setToken(userResult.token)
      dispatch(setUser(userResult))
      setUsername('')
      setPassword('')
    } catch(exception) {
      setMessage({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Notification message={notification} />
      <div>
            username: <input type='text' id='username' value={username} name='Username' onChange={({ target }) => {setUsername(target.value)}}/>
      </div>
      <div>
            password: <input type='password' id='password' value={password} name='password' onChange={({ target }) => {setPassword(target.value)}}/>
      </div>
      <button type='submit' id='login-submit'>login</button>
    </form>
  )
}
export default Login