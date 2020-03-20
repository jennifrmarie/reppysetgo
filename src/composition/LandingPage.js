import React, { Component } from 'react'
import config from '../config'
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

    state = { error: null }
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
    saveAuthToken(token) {
      window.localStorage.setItem(config.TOKEN_KEY, token)
    }


    handleSubmit = (e) => {
      e.preventDefault()
      const user_name = e.target.user_name.value
      const password = e.target.password.value
      const data = { user_name, password }
      
      fetch(`${config.API_ENDPOINT}api/auth/login`, {
          method: 'post',
          mode: 'no-cors',
          headers: {
              "content-type": "application/json",
          },

          body: JSON.stringify(data)
      })
      .then((res) => {
        if(!res.ok) {
          throw new Error(window.alert('incorrect username/password'))
          
        }
        return res.json();
      })
      .then(data => {
          localStorage.authToken = data.authToken;
          this.props.history.push('/dashboard')
      })
      .catch((error) => {
          console.error('Error')
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
                  <input class="username" type="text" placeholder="guest" name="user_name" id="user_name"/>
                  <input class="password" type="password" placeholder="Test123!" name="password" id="password"/>
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
