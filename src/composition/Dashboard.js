import React, { Component } from 'react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import AppContext from '../AppContext'
import './Dashboard.css'
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList'

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
    
    // const DateList = () => (
    //   <div>
    //   <ul className="date-selector">
    //     {dates.map((date, index) => 
    //     <li key={index} data-index={index} className="li-date" 
    //     onClick={() => this.props.history.push(`/add-workout/${date}`) && <WorkoutForm date={date} />}>
    //       {moment(date).format('MMM Do, YYYY')}
    //     </li>
    //     )}
    //   </ul>
    //   </div>
    // );

    const SingleDate = (index) => (
    <div key={index} className='li-date' onClick={() => this.props.history.push(`/add-workout/${dateid}`)}>
    {/* onClick={props.addWorkout}  */}
        {moment(date).format('MMM Do, YYYY')}
      </div>
    )

    let items = this.context.items

    return (
      <div className="dashboard__background">
        <div className="logo__dashboard"></div>
        {/* <h3>click on a day to get started</h3> */}
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
        </div>
        </div>
      <SingleDate />
      <ul className="dashboard__list">
        {
          items.map((item, index) => 
            <li key={index}>
              {moment(item.date).format('MMDDYYYY')}
              {item.name}
              {item.sets}
              {item.reps}
              {item.weight}
            </li>
          )
        }
      </ul>
        {/* {this.state.isEmptyState && <SingleDate addWorkout={this.triggerWorkoutForm}/>} */}
        {this.state.isAddWorkoutState && <WorkoutForm dateId={dateid}/>} 
        {/* /* <Link to="/add-workout"> Add Workout </Link> */}
        </div>
    );
  }
}