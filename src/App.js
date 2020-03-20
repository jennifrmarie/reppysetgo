import React from 'react';
import './App.css';
import config from './config'
import AppContext from './AppContext'
import Dashboard from './composition/Dashboard'
import { Route } from 'react-router-dom';
import LandingPage from './composition/LandingPage'
import WorkoutForm from './composition/WorkoutForm'
import CreateUser from './composition/CreateUser'


export default class App extends React.Component {
  state = {
    term: '',
    items: [],
    selectedDays: [],
    selectedDay: '',
  }

  componentDidMount() {
    this.getItems()
  }

  addItem = (data) => {
    return fetch('https://boiling-ridge-17775.herokuapp.com/api/workouts', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.authToken}`,
            },
            
            body: JSON.stringify(data)
        })
        .then(res => 
            res.json())
        .then(data => {
            this.setState({
              items: [
                ...this.state.items,
                data
              ]
            })
            console.log(data)
            
        })
   
  }

  removeItem = (itemId) => {
    return fetch(`https://boiling-ridge-17775.herokuapp.com/api/${itemId}`, {
            method: 'delete',
            headers: {
                "Authorization": `Bearer ${localStorage.authToken}`,
            },
        })
        .then(data => {
          this.setState({
            items: this.state.items.filter(item => item.id !== itemId)
          })
            console.log(data)
            
        })
    
  }

  editItem = (item) => {
      return fetch(`https://boiling-ridge-17775.herokuapp.com/api/${item.id}`, {
              method: 'put',
              headers: {
                  'content-type': 'application/json',
                  "Authorization": `Bearer ${localStorage.authToken}`,
              },
              
              body: JSON.stringify(item)
          })
          .then(res => 
              res.json())
          .then(data => {
            this.setState({
              items: this.state.items.map(i => i.id === item.id ? item : i)
            })
              console.log(data)
              
          })

  }

  handleDateClicked = (index) => {
    let dates = this.state.selectedDays
    let date = dates[index]
    this.setState({
       index,
       term: '',
       items: [],
       selectedDay: date,
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


  setDays = (days) => {
    this.setState({
      selectedDays: days,
    })
  }

  setDay = (day) => {
    this.setState({
      selectedDay: day
    })
  }

  getItems = () => {
    return fetch(`https://boiling-ridge-17775.herokuapp.com/api/workouts/`, {
      method: 'get',
      headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${localStorage.authToken}`,
      },
  })
  .then(res => 
      res.json())
  .then(items => {
    
    this.setState({
      items
    })
      
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
        <Route
      path='/add-workout/:dateId'
      component={WorkoutForm}
    />
    <Route
      path='/sign-up'
      component={CreateUser}
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
