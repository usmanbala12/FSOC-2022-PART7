import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const User = () => {

  const id = useParams().id
  const user = useSelector(state => {
    return state.users.find(item => item.id === id)
  })

  if(!user){
    return <h3>loading...</h3>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <br />
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(item => {
          return <li key={item.id}>{item.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User