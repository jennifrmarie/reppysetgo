import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHandPointLeft, faTrashAlt, faEdit, faPlusCircle, faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom';

library.add(faHandPointLeft, faTrashAlt, faEdit, faPlusCircle, faChevronDown)


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
