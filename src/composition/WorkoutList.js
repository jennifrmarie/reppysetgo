import { Link } from 'react-router-dom'
import './WorkoutList.css'
import AppContext from '../AppContext'
import NavButton from './NavButton'
import React, { Component } from 'react'
import moment from 'moment'

export default class WorkoutList extends Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      goBack: () => { }
    },
  }

  
  
  static contextType = AppContext

  render() {
    const items = this.context.items
    return (
      <div>
        <ul class="workout-list">
        {
          items.map((item, index) => 
          <li class="exercise-add" key={index}>
          <div class="item-name">
            {item.name}{':  '}
            {item.sets} sets{',  '}
            {item.reps} reps{':  '}
            {item.weight} lbs
          </div>
        <Link to={'/edit-workout/' + item.id} tag='button'>edit</Link>
        {/* <Link to={'/add-workout'} className="remove-button" onClick={e => this.context.removeItem(item.id)}> {'    '}remove </Link> */}
        <button onClick={e => this.context.removeItem(item.id)}>remove</button>
          </li>)
        }
      </ul>
      </div>
    )
  }
}
