import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';

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
                <div className="login__form__credentials">
                    <input type="text" placeholder="Username" 
                         name="user_name" id="user_name" />
                    <input type="password" placeholder="Password"
                        name="password" id="password" />
                </div>
                <div className="login__form__controls">
                    <div className="login__form__remember">
                        <input type="checkbox" name="rememberMe" id="rememberMe" />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button>Submit</button>

                </div>
            </form>
        )
    }
}
