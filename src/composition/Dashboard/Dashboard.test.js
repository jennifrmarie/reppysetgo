import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
    const tree = renderer
      .create(<Dashboard name="Messages" unread={4}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });