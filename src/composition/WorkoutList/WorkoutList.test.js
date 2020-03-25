import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutList from './WorkoutList';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WorkoutList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
    const tree = renderer
      .create(<WorkoutList name="Messages" unread={4}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });