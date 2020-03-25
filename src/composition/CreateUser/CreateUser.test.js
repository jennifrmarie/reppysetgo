import React from 'react';
import ReactDOM from 'react-dom';
import CreateUser from './CreateUser';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
    const tree = renderer
      .create(<CreateUser name="Messages" unread={4}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });