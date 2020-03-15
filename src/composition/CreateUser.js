import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import './CreateUser.css'

import Img from 'react-image';

export default class CreateUser extends Component {

    onSubmit = (e) => {
        e.preventDefault()
        const user_name = e.target.user_name.value
        const password = e.target.password.value
        const data = { user_name, password }
        fetch('http://localhost:8000/api/users', {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.props.history.push('/')
        })
    }


    render() {
        return (
            
            <form onSubmit={this.onSubmit}>
                <div className="logo__login"></div>
                <div className="login__form__credentials">
                    <h3 class="login__header">Let's get started!</h3>
                    <input class="username" type="text" placeholder="Username" 
                         name="user_name" id="user_name" />
                    <input class="password" type="password" placeholder="Password"
                        name="password" id="password" />
                    <input class="password" type="password" placeholder="Re-enter Password"
                        name="passwordconfirm" id="passwordconfirm" />
                    <button class="account_button">Create Account</button>
                </div>
            </form>
        )
    }
}
