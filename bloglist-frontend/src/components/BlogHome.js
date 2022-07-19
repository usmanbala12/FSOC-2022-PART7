import React, { useRef } from 'react'
import Togglable from './Toggalable'
import Blogform from './Blogform'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const BlogHome = () => {

  const blogs = useSelector(state => {
    return state.blogs
  })

  const toggalableRef = useRef()
  const dispatch = useDispatch()

  const addblog = async (blog) => {
    toggalableRef.current.toggleVisibility()
    dispatch(addBlog(blog))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new note' ref={toggalableRef}>
        <Blogform addblog={addblog} />
      </Togglable>
      <h2>blogs</h2>
      <br />
      {blogs.map(blog =>
        <Link to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>
      )}
    </div>
  )
}

export default BlogHome
