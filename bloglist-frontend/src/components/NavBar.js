import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'

const NavBar = ({ user }) => {

  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappuser')
    dispatch(setUser(null))
  }

  return (
    <div className='nav-bar'>
      <ul>
        <li><Link to='/'>home</Link></li>
        <li><Link to='/users'>users</Link></li>
        <li>{user ? user.name : null} is logged in <button onClick={logout}>logout</button></li>
      </ul>
    </div>
  )
}

export default NavBar
