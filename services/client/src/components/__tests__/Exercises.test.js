import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import AceEditor from 'react-ace';
jest.mock('react-ace');

import Exercises from '../Exercises';

const exercises = [
  {
    id: 0,
    body: 'Define a function called sum that takes two integers as arguments and returns their sum.',
    test_code: 'sum(2,2)',
    test_code_solution: '4'
  }
];

beforeEach(() => {
  console.error = jest.fn();
  console.error.mockClear();
});

test('Exercises renders properly when not authenticated', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = onDidMount;
  const wrapper = shallow(<Exercises isAuthenticated={false}/>);
  wrapper.setState({exercises : exercises});
  const alert = wrapper.find('.alert');
  expect(alert.length).toBe(1);
  expect(alert.get(0).props.children[1].props.children).toContain(
    'Please log in to submit an exercise.')
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('Exercises renders properly when authenticated', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = onDidMount;
  const wrapper = shallow(<Exercises isAuthenticated={true}/>);
  wrapper.setState({exercises : exercises});
  const alert = wrapper.find('.alert');
  expect(alert.length).toBe(0);
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('Exercises does not render properly when not all props are defined', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = onDidMount;
  const wrapper = shallow(<Exercises/>);
  wrapper.setState({exercises : exercises});
  expect(console.error).toHaveBeenCalledTimes(2);
});

test('Exercises renders a snapshot properly', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = exercises;
  const tree = renderer.create(<Exercises isAuthenticated={false}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Exercises will call componentWillMount when mounted', () => {
  const onWillMount = jest.fn();
  Exercises.prototype.componentWillMount = onWillMount;
  const wrapper = mount(<Exercises isAuthenticated={false}/>);
  expect(onWillMount).toHaveBeenCalledTimes(1)
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('Exercises will call componentDidMount when mounted', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = onDidMount;
  const wrapper = mount(<Exercises isAuthenticated={false}/>);
  expect(onDidMount).toHaveBeenCalledTimes(1)
  expect(console.error).toHaveBeenCalledTimes(0);
});
