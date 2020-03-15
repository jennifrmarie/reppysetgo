import React, { Component } from 'react'
import AppContext from '../AppContext'
import uuid from 'uuid'
import WorkoutList from './WorkoutList'
import './WorkoutForm.css'
import NavButton from './NavButton'
import { withRouter } from 'react-router-dom'
import config from '../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 
class WorkoutForm extends Component {
    static defaultProps = {
        match: {
          params: {}
        },
        history: {
          push: () => { }
        }
      }
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sets: '',
            reps: '',
            weight: '',
            date: '',
        };
        this.handleNameChange.bind(this);
        this.handleSubmit.bind(this)
        this.handleRepChange.bind(this)
        this.handleSetChange.bind(this)
        this.handleWeightChange.bind(this)
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            const item = this.context.items.find(item => item.id === this.props.match.params.id)
            this.setState({
                name: item.name,
                sets: item.sets,
                reps: item.reps,
                weight: item.weight
            })
        }
    }
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
      }    

    handleSubmit = (e) => {
        const data = {
            id: uuid(),
            name: this.state.name,
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight,
            // date: this.props.dateId,
        }
        e.preventDefault()
        if(this.props.match.params.id) {
            const item = this.context.items.find(item => item.id === this.props.match.params.id)
            item.name = this.state.name;
            item.sets = this.state.sets;
            item.reps = this.state.reps;
            item.weight = this.state.weight;
            this.context.editItem(item);
        } else {
            const item = {
                id: uuid(),
                name: this.state.name,
                sets: this.state.sets,
                reps: this.state.reps,
                weight: this.state.weight,
                date: this.context.date,            
            }
            this.context.addItem(item)
        }
        fetch('http://localhost:8000/api/workouts', {
            method: 'post',
            headers: {
                "content-type": "application/json",
                // "Authorization": `Bearer ${localStorage.authToken}`,
            },
            
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.props.history.push(`/add-workout/${data.id}`)
        })
       
        this.setState({
            name: '',
            sets: '',
            reps: '',
            weight: '',
            date: '',
        })
      }
    
    handleNameChange(e) {
        this.setState({
            name: e.target.value,
        })
      }

    handleRepChange(e) {
        this.setState({
            reps: e.target.value
        })
    }

    handleSetChange(e) {
        this.setState({
            sets: e.target.value
        })
    }

    handleWeightChange(e) {
        this.setState({
            weight: e.target.value
        })
    }
    render() {
        const location = {
            pathname: '/dashboard',
            state: { dates: [] }
        }
        console.log(this.props.dateId)
        return (
            <div className="workout-box">
                <nav className="logo__nav"></nav>
                <form className="workout-form">
                    <div>
                    <label htmlFor='workout-name-input'>
                        LIFT:
                    </label>
                    <input className="form-box1" type="text" align="right" value={this.state.name}
                        onChange={this.handleNameChange.bind(this)} name="Workout" />{' '} 
                    </div>
                    <div>
                    <label htmlFor='workout-set-input'>
                        SETS:
                    </label>
                    <input className="form-box2" type="text" align="right" value={this.state.sets}
                        onChange={this.handleSetChange.bind(this)} />{' '}
                    </div>
                    <div>
                    <label htmlFor='workout-reps-input'>
                        REPS:
                    </label>
                    <input className="form-box3" type="text" align="right" value={this.state.reps}
                        onChange={this.handleRepChange.bind(this)} />{' '}
                    </div>
                    <div>
                    <label htmlFor='workout-weight-input'>
                        WEIGHT:
                    </label>
                    <input className="form-box4" type="text" align="right" value={this.state.weight}
                        onChange={this.handleWeightChange.bind(this)} />{' '}
                    </div>
                    <button className="submit-button" onClick={this.handleSubmit}>Submit</button>

                    </form>
                <WorkoutList
                    dateId={this.props.dateId}
                    className="list_page"
                />
                <NavButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.push(location)}
                    className='NotePage__back-button'
                    >
                    <FontAwesomeIcon icon='hand-point-left' size="lg" />
                </NavButton>
            </div>
        )
    }
}

export default withRouter(WorkoutForm)