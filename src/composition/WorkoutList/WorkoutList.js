import { Link } from 'react-router-dom'
import './WorkoutList.css'
import AppContext from '../../AppContext'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment';


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
    if (this.props.dateId) {
      items = items.filter(item => {
        const date = moment(item.date).format("MMDDYYYY")
        return date === this.props.dateId
      })
    }
    
    return (
        <ul className="workout-list">
        {
          items.map((item, index) => 
          
          <li className="exercise-add" key={index}>
          <Link to={'/edit-workout/' + item.id} tag='button' className="edit__name"><FontAwesomeIcon icon="edit" /></Link>
          <div className="item-name">
            
            <span className="workout_span">{item.name}{':'}</span>
            <span className="workout_span">{item.sets}{'X'}</span>
            <span className="workout_span">{item.reps}{':  '}</span>
            <span className="workout_span">{item.weight}{"  lbs"}{"\n"}</span>
            
          </div>
          <div className="delete__button" onClick={e => this.context.removeItem(item.id)}><FontAwesomeIcon icon="trash-alt" /></div>
        
          </li>)
        }
      </ul>
    )
  }
}
