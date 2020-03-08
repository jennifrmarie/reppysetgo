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
    render() {
        return (
            <div className="login">
            <h1>Reppy, Set, GO!</h1>
            <h2 className="below__head">(but do you, bro?)</h2>
            <div className="login__form">
              <form>
                <div className="login__form__credentials">
                  <input type="text" placeholder="Username" value={this.state.username}
                        onChange={this.handleUsernameInput.bind(this)} name="username" id="username"/>
                  <input type="password" placeholder="Password" value={this.state.password}
                        onChange={this.handlePasswordInput.bind(this)} name="password" id="password"/>
                </div>
                <div className="login__form__controls">
                  <div className="login__form__remember">
                    <input type="checkbox" name="rememberMe" id="rememberMe"/>
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <Link to='/dashboard'>Submit</Link>
                </div>
              </form>
            </div>
          </div>
        )
    }
}
