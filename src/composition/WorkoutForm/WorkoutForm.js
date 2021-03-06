import React, { Component } from 'react'
import AppContext from '../../AppContext'
import uuid from 'uuid'
import WorkoutList from '../WorkoutList/WorkoutList'
import './WorkoutForm.css'
import NavButton from '../NavButton'
import config from '../../config'
import moment from 'moment';
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
            const item = this.context.items.find(item => item.id === parseInt(this.props.match.params.id))
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
        e.preventDefault()
  
        if(this.props.match.params.id) {
            const item = this.context.items.find(item => item.id === parseInt(this.props.match.params.id))
            item.name = this.state.name;
            item.sets = this.state.sets;
            item.reps = this.state.reps;
            item.weight = this.state.weight;
            this.context.editItem(item)
            .then(data => {
                this.props.history.push('/dashboard')
            })
        } else {
            const item = {
                id: uuid(),
                name: this.state.name,
                sets: this.state.sets,
                reps: this.state.reps,
                weight: this.state.weight,
                date: moment(this.props.match.params.dateId,"MMDDYYYY")          
            }
            console.log(this.context.date)
            this.context.addItem(item)
           
        }
        
       
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
        return (
            <div className="workout-box">
                <nav className="logo__nav"></nav>
                <form onSubmit={this.handleSubmit} className="workout-form">
                    <div>
                    <label className='workout-name-input'>
                        LIFT:
                    </label>
                    <input 
                        className="form-box1"  
                        type="text" 
                        value={this.state.name}
                        placeholder="e.g. deadlift" 
                        required 
                        onChange={this.handleNameChange.bind(this)} 
                        name="Workout" />{' '} 
                    </div>
                    <div>
                    <label htmlFor='workout-set-input'>
                        SETS:
                    </label>
                    <input className="form-box2" 
                        type="number" 
                        pattern="[0-9]*" 
                        inputMode="numeric"
                        value={this.state.sets}
                        required 
                        onChange={this.handleSetChange.bind(this)} 
                    />{' '}
                    </div>
                    <div>
                    <label htmlFor='workout-reps-input'>
                        REPS:
                    </label>
                    <input className="form-box3" 
                        type="number" 
                        pattern="[0-9]*" 
                        inputMode="numeric"
                        value={this.state.reps}
                        required 
                        onChange={this.handleRepChange.bind(this)} 
                    />{' '}
                    </div>
                    <div>
                    <label htmlFor='workout-weight-input'>
                        WEIGHT:
                    </label>
                    <input className="form-box4" 
                        type="number" 
                        pattern="[0-9]*" 
                        inputMode="numeric" 
                        value={this.state.weight}
                        required 
                        onChange={this.handleWeightChange.bind(this)} 
                    />
                    </div>
                    <button 
                        tag='a' 
                        className="submit-button" 
                        
                    >
                        Submit
                    </button>

                    </form>
                    {this.props.match.params.id ? "": (
                        <WorkoutList
                        dateId={this.props.match.params.dateId}
                    />
                    )} 
                
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

export default WorkoutForm