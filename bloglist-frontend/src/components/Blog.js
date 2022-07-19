import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog, likeBLOG } from '../reducers/blogReducer'
import blogService from '../services/blogs'


const Blog = () => {
  const id = useParams().id
  const [comment, setComment] = useState('')
  const blog = useSelector(state => {
    return state.blogs.filter(item => item.id === id)[0]
  })
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  if(!blog || !user){
    return <h4>loading...</h4>
  }

  const handleLike = () => {
    const newBlog = {
      ...blog, likes: blog.likes + 1
    }
    dispatch(likeBLOG(newBlog))
  }

  const deleteBlog = async(id) => {
    await blogService.deleteblog(id)
    dispatch(deleteBlog(id))
  }

  const handleDelete = () => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog.id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let arr = blog.comments
    arr = arr.concat(comment)
    dispatch(commentBlog({ ...blog, comments: arr }))
    setComment('')
  }

  return(
    <div>
      <h1>{blog.title}</h1>
      <br />
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes: {blog.likes} <button onClick={handleLike}>Like</button>
      <p>added by {blog.user.name}</p>
      {user.id === blog.user.id ? <button onClick={handleDelete}>delete</button> : ''}

      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        add comment: <input value={comment} onChange={({ target }) => setComment(target.value)}/>
        <button>submit</button>
      </form>
      <ul>
        {blog.comments.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )

}

export default Blog