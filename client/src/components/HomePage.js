import React from 'react'


const HomePage = () => {
  return (
    <div>
      <div className="header-homepage-text">
        <h1>Group songs</h1>
        <h3>Share the team spirit through music</h3>
      </div>

      <div>
        <form>
          <div className="sign-up-text">
            <h4>Sign up for Free</h4>
          </div>
          <div className="label-input-form">
            <label>username</label>
            <input type="text" name="username" placeholder="your name"></input>
            <label>E.amil</label>
            <input type="text" name="email" placeholder="your email"></input>
            <label>password</label>
            <input type="text" name="password" placeholder="your name"></input>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HomePage