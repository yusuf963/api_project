import React, { useState } from 'react'
import axios from 'axios'
import style from '../styles/signupLogin.css'


const HomePage = () => {
  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const handelChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    updateFormData({ ...formData, [name]: [value] })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post('/api/register', formData)
    console.log(data)
  }


  return (
    <>
      <div className="sign-form-container">
        <div className='sign-up'>
          <div className='form-header'>Sign up here</div>
          <form onSubmit={handleSubmit}>
            <lable>User Name</lable>
            <input type="text" name="username" value={formData.username} onChange={handelChange}></input>
            <lable>E.mail</lable>
            <input type="text" name="email" value={formData.email} onChange={handelChange}></input>
            <lable>Password</lable>
            <input type="password" name="password" value={formData.password} onChange={handelChange}></input>
            <div className='btn-form'>
              <button>Register</button>
            </div>
          </form>
        </div>

        <div className='sign-in'>
          <div className='form-header'>Log in here</div>
          <form>
            <lable>E.mail</lable>
            <input type="text" name="email" onChange={handelChange}></input>
            <lable>Password</lable>
            <input type="text" name="password" onChange={handelChange}></input>
            <div className='btn-form'>
              <button>Log in</button>
            </div>
          </form>
        </div>

      </div>
    </>
  )
}

export default HomePage