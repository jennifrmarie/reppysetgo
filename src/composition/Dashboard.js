import React, { Component } from 'react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import AppContext from '../AppContext'
import './Dashboard.css'
import { withRouter } from 'react-router-dom'
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList'

class Dashboard extends React.Component {
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
      // outside: {
      //   backgroundColor: 'black'
      // }
    };
    let dates = this.context.selectedDays
    const date = this.state.selectedDay
    console.log(date)
    
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

    const SingleDate = (itemId) => (
    <div key={itemId} className='li-date' onClick={() => this.props.history.push(`/add-workout/${itemId}`)}>
    {/* onClick={props.addWorkout}  */}
        {moment(date).format('MMM Do, YYYY')}
      </div>
    )



    return (
      <div class="dashboard__background">
        <div className="logo__dashboard"></div>
        {/* <h3>click on a day to get started</h3> */}
        <div class="calendar_container">
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
      <WorkoutList
                />
        {/* {this.state.isEmptyState && <SingleDate addWorkout={this.triggerWorkoutForm}/>}
        {this.state.isAddWorkoutState && <WorkoutForm />} */}
        {/* <Link to="/add-workout"> Add Workout </Link> */}
        </div>
    );
  }
}

export default withRouter(Dashboard)