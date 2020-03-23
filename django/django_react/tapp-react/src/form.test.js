import {App} from '../src/App'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {LoginModal} from '../src/Login'
import {SignupModal} from '../src/Form'
import React from 'react';
import renderer from 'react-test-renderer';
import {initialState} from '../src/reducers/students'
import { Provider } from 'react-redux';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount} from "enzyme";

Enzyme.configure({adapter : new Adapter() });

describe('SignupModal', () => {
  it('renders correctly', () => {
    const mockLoginfn = jest.fn();
    const wrapper = renderer.create(<LoginModal login={mockLoginfn} students={[]} error={{}}/>);
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('SignupModal renders correctly', () => {
    const mockLoginfn = jest.fn();
    const wrapper = renderer.create(<SignupModal register={mockLoginfn} addEvent={mockLoginfn} error={{}} />);
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('SignupModal initializes states correctly', () => {
    const mockLoginfn = jest.fn();
    const wrapper = shallow(<SignupModal register={mockLoginfn} addEvent={mockLoginfn} error={{}} />);
    const componentInstance = wrapper.instance();
    expect(wrapper.state('emailValid')).toBe(false);
    expect(wrapper.state('nameValid')).toBe(false);
    expect(wrapper.state('passValid')).toBe(false);
    expect(wrapper.state('first')).toBe(false);
    expect(wrapper.state('isLoading')).toBe(false);
    componentInstance.toggleIsLoading();
    expect(wrapper.state('isLoading')).toBe(true);
  });

  it('Toggling works for similar toggles', () => {
    const mockLoginfn = jest.fn();
    const wrapper = shallow(<SignupModal register={mockLoginfn} addEvent={mockLoginfn} error={{}} />);
    const componentInstance = wrapper.instance();
    expect(wrapper.state('first')).toBe(false);
    expect(wrapper.state('isLoading')).toBe(false);
    componentInstance.toggleIsLoading();
    expect(wrapper.state('isLoading')).toBe(true);
  });

  it('Fails on invalid email', () => {
    const mockLoginfn = jest.fn();
    const wrapper = mount(<SignupModal register={mockLoginfn} show={true} addEvent={mockLoginfn} error={{}} />);
    const componentInstance = wrapper.instance();
    wrapper.find('[name="email"]').first().simulate("change",{target: {value : "a@c"} });
    wrapper.find('[name="name"]').first().simulate("change",{target: {value : "a@c"} });
    wrapper.find('[name="password"]').first().simulate("change",{target: {value : "a@c"} });
    wrapper.find('[name="course"]').first().simulate("change",{target: {value : "a@c"} });
    expect(wrapper.state('emailValid')).toBe(false);
    wrapper.find('[type="submit"]').first().simulate("click",componentInstance.handleSubmit);
    setTimeout(expect(wrapper.state('emailValid')).toBe(false), 2000);
  });

  it('Check validity', () => {
    const mockLoginfn = jest.fn();
    const wrapper = mount(<SignupModal register={mockLoginfn} show={true} addEvent={mockLoginfn} error={{}} />);
    const componentInstance = wrapper.instance();
    wrapper.find('[name="email"]').first().simulate("change",{target: {value : "a@c"} });
    wrapper.find('[name="name"]').first().simulate("change",{target: {value : "a@c"} });
    wrapper.find('[name="password"]').first().simulate("change",{target: {value : "a@c"} });
    wrapper.find('[name="course"]').first().simulate("change",{target: {value : "a@c"} });
    expect(wrapper.state('emailValid')).toBe(false);
    wrapper.find('[type="submit"]').first().simulate("click",componentInstance.handleSubmit);
    expect(componentInstance.checkValidity()).toBe(false);
  });
});
