import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import AppContext from '../../AppContext'
import './Dashboard.css'
import WorkoutForm from '../WorkoutForm/WorkoutForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      isEmptyState: true
    };
  }
static contextType = AppContext

componentDidMount() {
  this.context.getItems()
}

  handleWeekClick = (day, days, e) => {
    this.context.setDays(days)
    this.context.setDay(day)
  };

  handleDayClick(day, modifiers = {}) {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      selectedDay: modifiers.selected ? undefined : day,
    });
  }

  triggerWorkoutForm = () => {
    this.setState({
      ...this.state,
      isAddWorkoutState: true,
      isEmptyState: false
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.history.push('/')
  }


render() {
    const { selectedDays } = this.context;
    
    const daysAreSelected = selectedDays.length > 0;
    const modifiers = {
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[0],
      },
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[0],
      daysHighlighted: selectedDays && this.state.selectedDay
    };
    const modifiersStyles = {
      daysHighlighted: {
        backgroundColor: 'white',
        color: 'black',
      },
    };
    const date = this.state.selectedDay
    const dateid = moment(date).format('MMDDYYYY')

    const SingleDate = (index) => (
      <button key={index} 
        className='li-date' 
        onClick={() => this.props.history.push(`/add-workout/${dateid}`)}
      >
        {moment(date).format('MMM Do, YYYY')}
      </button>
    )

    let items = this.context.items

    return (
      <div className="dashboard__background">
        <div className="logo__dashboard">
        <nav><button className="logout_button" onClick={this.handleLogout}>Logout</button></nav>
        </div>
        
        <div className="calendar_container">
        
        <div className="date-section">
          
          <DayPicker
            showWeekDays
            className="Selectable"
            selectedDays={this.context.selectedDays}
            selectedDay={this.state.selectedDay}
            onDayClick={this.handleDayClick} 
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
          <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
        </div>
        <SingleDate />
        </div>
      
      <ul className="dashboard__list">
        {
          items.map((item, index) => 
            <li className="dashboard__workout" key={index}>
              <div className="dashboard__date">{moment(item.date).format('MM-DD-YY')}</div>
              <span className="workout-name">{item.name}{''}</span>
                <span className="sets_reps">{item.sets}{"X"}
                {item.reps}{''}{":"}{'   '}</span>
                <span className="workout-weight">{" "}{item.weight}{"  lbs "}</span>
                <span className="nav_buttons">
                <Link to={'/edit-workout/' + item.id} tag='button' className="edit_button"><FontAwesomeIcon icon="edit" color="black" /></Link>{'  '}
                <div className="dashboard_delete" onClick={e => this.context.removeItem(item.id)}><FontAwesomeIcon icon="trash-alt" /></div>
              </span>
            </li>
          )
        }
      </ul>
        {this.state.isAddWorkoutState && <WorkoutForm dateId={dateid}/>} 
    </div>
    );
  }
}