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
    let items = this.context.items
    if (this.props.date) {
      items.filter(item => 
        moment(this.props.date).isSame(item.date,"day")
    )}
    return (
      <div>
        <ul class="workout-list">
          {
            items.map((item, index) => <li class="exercise-add" key={index}>
            <div class="item-name">{item.name}{':  '}
            {item.sets} sets{',  '}
            {item.reps} reps{':  '}
            {item.weight} lbs
          </div>
          <Link to={'/edit-workout/' + item.id} tag='button'>edit</Link>
          <button className="remove-button" onClick={e => this.context.removeItem(item.id)}> {'    '}remove </button>

            </li>)
          }
        </ul>

      </div>
    )
  }
}
