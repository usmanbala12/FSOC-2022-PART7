import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const UserList = () => {
  const users = useSelector(state => {
    return state.users
  })

  const userLink = users.map(item => {
    const userUrl = `/users/${item.id}`
    return <li key={item.id}><Link to={userUrl} >{item.name}</Link></li>
  })

  return (
    <div>
      <h2>users</h2>
      {userLink}
    </div>
  )
}

export default UserList
