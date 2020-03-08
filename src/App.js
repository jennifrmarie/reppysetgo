import React from 'react';
import './App.css';
import AppContext from './AppContext'
import Dashboard from './composition/Dashboard'
import { Link, Route } from 'react-router-dom';
import LandingPage from './composition/LandingPage'
import WorkoutForm from './composition/WorkoutForm'


export default class App extends React.Component {
  state = {
    term: '',
    items: [],
    selectedDays: [],
    selectedDay: '',
  }

  addItem = (item) => {
    this.setState({
      items: [
        ...this.state.items,
        item
      ]
    })
  }

  removeItem = (id) => {
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    })
  }

  editItem = (item) => {
    this.setState({
      items: this.state.items.map(i => i.id == item.id ? item : i)
    })
  }

  handleDateClicked = (index) => {
    // const index = e.target.getAttribute("data-index")
    let dates = this.state.selectedDays
    let date = dates[index]
    this.setState({
       index,
       term: '',
       items: [],
       selectedDays: date,
     })
  }

  setTerm = (term) => {
    this.setState({
      term,
    })
  }

  setReps = (reps) => {
    this.setState({
      reps,
    })
  }

  // setDay = (day) => {
  //   this.setState({
  //     selectedDay: day,
  //   })
  // }

  setDays = (days) => {
    this.setState({
      selectedDays: days,
    })
  }


  renderMainRoutes() {
    return (
      <>
    <Route
      exact path="/dashboard"
      component={Dashboard}
    />
    <Route 
      exact path='/'
      component={LandingPage}
    />
    <Route
      exact path='/add-workout'
      component={WorkoutForm}
    />
    <Route
      path='/edit-workout/:id'
      component={WorkoutForm}
    />
    </>
    )
  }

  render() {
    const value = {
      items: this.state.items,
      term: this.state.term,
      selectedDays: this.state.selectedDays,
      selectedDay: this.state.selectedDay,
      error: this.state.error,
      getItems: this.getItems,
      addItem: this.addItem,
      removeItem: this.removeItem,
      handleDateClicked: this.handleDateClicked,
      setTerm: this.setTerm,
      setDays: this.setDays,
      setDay: this.setDay,
      editItem: this.editItem,
    }

    return (
      <AppContext.Provider value={value}>
        <div className="App">
          <nav className='App__nav'>

          </nav>
            <header className='App__header'>
            </header>
            <main className='App__main'>
            {this.renderMainRoutes()}
            </main>
          
        </div>
      </AppContext.Provider>
    )

  }

}
