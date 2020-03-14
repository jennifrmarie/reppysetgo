import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleUsernameInput.bind(this);
        this.handlePasswordInput.bind(this);
    }
    handleUsernameInput(e) {
        this.setState({
            username: e.target.value,
        })        
    }
    handlePasswordInput(e) {
        this.setState({
            password: e.target.value,
        })     
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const user_name = e.target.user_name.value
      const password = e.target.password.value
      const data = { user_name, password }
      fetch('http://localhost:8000/api/auth/login', {
          method: 'post',
          headers: {
              "content-type": "application/json"
          },
          body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          localStorage.authToken = data.authToken;
          this.props.history.push('/dashboard')
      })
    }

    handleCreateAccount = (e) => {
      e.preventDefault()
      this.props.history.push('/sign-up')
    }

    render() {
        return (
              <form onSubmit={this.handleSubmit}>
              <div className="logo__login"></div>
                <div className="login__form__credentials">
                <h3 class="login__header">Log In!</h3>
                  <input class="username" type="text" placeholder="Username" name="user_name" id="user_name"/>
                  <input class="password" type="password" placeholder="Password" name="password" id="password"/>
                    <div className="login__controls">
                    <input type="checkbox" name="rememberMe" id="rememberMe"/>
                    <label htmlFor="rememberMe">Remember me</label>
                    </div>
                  <button class="login_button">Login</button>
                  <div class="login_new_account">
                  <button className="account_button" onClick={this.handleCreateAccount}>Create a New Account</button>
                  </div>
                </div>
              </form>
        )
    }
}
