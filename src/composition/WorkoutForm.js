import React, { Component } from 'react'
import AppContext from '../AppContext'
import uuid from 'uuid'
import WorkoutList from './WorkoutList'
import './WorkoutForm.css'
import NavButton from './NavButton'
import { withRouter } from 'react-router-dom'
 
class WorkoutForm extends Component {
    static defaultProps = {
        match: {
          params: {}
        },
        history: {
          push: () => { }
        },
        dates: [],
        selectedDays: [],
      }
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sets: '',
            reps: '',
            weight: '',
        };
        this.handleNameChange.bind(this);
        this.handleSubmit.bind(this)
        this.handleRepChange.bind(this)
        this.handleSetChange.bind(this)
        this.handleWeightChange.bind(this)
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            const item = this.context.items.find(item => item.id == this.props.match.params.id)
            this.setState({
                name: item.name,
                sets: item.sets,
                reps: item.reps,
                weight: item.weight
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if(this.props.match.params.id) {
            const item = this.context.items.find(item => item.id == this.props.match.params.id)
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
                date: this.context.selectedDay,            
            }
            this.context.addItem(item)
        }
       
        this.setState({
            name: '',
            sets: '',
            reps: '',
            weight: '',
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
        return (
            <div class="workout-box">
                <h1>REPPY, SET, GO!</h1>
                <form class="workout-form">
                    <label htmlFor='workout-name-input'>
                        WORKOUT:
                    </label>
                    <input class="form-box1" type="text" value={this.state.name}
                        onChange={this.handleNameChange.bind(this)} name="Workout" /> 
                    <label htmlFor='workout-set-input'>
                        SETS:
                    </label>
                    <input class="form-box2" type="text" value={this.state.sets}
                        onChange={this.handleSetChange.bind(this)} />
                    <label htmlFor='workout-reps-input'>
                        REPS:
                    </label>
                    <input class="form-box3" type="text" value={this.state.reps}
                        onChange={this.handleRepChange.bind(this)} />
                    <label htmlFor='workout-weight-input'>
                        WEIGHT:
                    </label>
                    <input class="form-box4" type="text" value={this.state.weight}
                        onChange={this.handleWeightChange.bind(this)} />
                    </form>
                    <button class="submit-button" onClick={this.handleSubmit}>Submit</button>


                
                <WorkoutList
                    date= {this.context.selectedDays} 
                />
                <NavButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.push(location)}
                    className='NotePage__back-button'
                    >
                    Back
                </NavButton>
            </div>
        )
    }
}

export default withRouter(WorkoutForm)