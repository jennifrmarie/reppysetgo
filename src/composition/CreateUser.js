import React, { Component } from 'react'
import './CreateUser.css'
import config from '../config'

export default class CreateUser extends Component {

    onSubmit = (e) => {
        e.preventDefault()
        const user_name = e.target.user_name.value
        const password = e.target.password.value
        const data = { user_name, password }
        fetch(`${config.API_ENDPOINT}/users`, {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res)
            if (!res.ok)
            if(!res.ok) 
              return res.json().then(e => Promise.reject(e))
              return res.json()
          })
        .then(data => {
            console.log(data)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({ error })            
          })
    }


    render() {
        return (
            
            <form onSubmit={this.onSubmit}>
                <div className="logo__login"></div>
                <div className="login__form__credentials">
                    <h3 className="login__header">Let's get started!</h3>
                    <input 
                        className="username" 
                        type="text" 
                        placeholder="Username" 
                         name="user_name" 
                         id="user_name" 
                        required
                    />
                    {/* <span className="password_req">At least 6 characters, one capital letter, one lowercase letter, and special character</span> */}
                    <input 
                        className="password" 
                        type="password" 
                        placeholder="Password"
                        name="password" 
                        id="password"
                        required 
                    />
                    <input 
                        className="password" 
                        type="password" 
                        placeholder="Re-enter Password"
                        name="passwordconfirm" 
                        id="passwordconfirm" 
                        required
                    />
                    <button 
                        className="account_button"
                    >
                        Create Account
                    </button>
                </div>
            </form>
        )
    }
}
