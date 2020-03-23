import React from 'react';
import renderer from 'react-test-renderer';
import {Dashboard} from './Dashboard';
import {CalendarTab} from './CalendarTab';
import {initialState} from '../src/reducers/students'
import { Provider } from 'react-redux';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount} from "enzyme";

Enzyme.configure({adapter : new Adapter() });

describe('Dashboard testing.', () => {
  it('Dashboard initializes states correctly', () => {
    const mockLoginfn = jest.fn();
    const wrapper = mount(<Dashboard events={[]} getEvents={mockLoginfn} authobj = {{}} />);
    const componentInstance = wrapper.instance();
    expect(wrapper.state('Queues')).toBe(false);
    expect(wrapper.state('Calendar')).toBe(true);
  });

  it('Dashboard allows for switching between calendar and queue tabs.', () => {
    const mockLoginfn = jest.fn();
    const wrapper = mount(<Dashboard events={[]} getEvents={mockLoginfn} authobj = {{}} />);
    const componentInstance = wrapper.instance();
    expect(wrapper.state('Queues')).toBe(false);
    wrapper.find('[eventKey="Queues"]').first().simulate("click",componentInstance.handleSubmit);
    expect(wrapper.state('Queues')).toBe(true);
    expect(wrapper.state('Calendar')).toBe(false);
    wrapper.find('[eventKey="Calendar"]').first().simulate("click",componentInstance.handleSubmit);
    expect(wrapper.state('Calendar')).toBe(true);
  });

  it('Dashboard allows for switching between calendar and queue tabs.', () => {
    const mockLoginfn = jest.fn();
    const wrapper = mount(<Dashboard events={[]} getEvents={mockLoginfn} authobj = {{}} />);
    const componentInstance = wrapper.instance();
    expect(wrapper.state('Queues')).toBe(false);
    wrapper.find('[eventKey="Queues"]').first().simulate("click",componentInstance.handleSubmit);
    expect(wrapper.state('Queues')).toBe(true);
    expect(wrapper.state('Calendar')).toBe(false);
    wrapper.find('[eventKey="Calendar"]').first().simulate("click",componentInstance.handleSubmit);
    expect(wrapper.state('Calendar')).toBe(true);
  });
});

describe('CalendarTab testing.', () => {
  it('CalendarTab initializes states correctly', () => {
    const mockLoginfn = jest.fn();
    const wrapper = mount(<CalendarTab />);
    const componentInstance = wrapper.instance();
  });

  it('CalendarTab initializes with a Calendar Instance', () => {
    const mockLoginfn = jest.fn();
    const wrapper = mount(<CalendarTab />);
    const componentInstance = wrapper.instance();
    expect(wrapper.find('[startAccessor="start"]').length).toBe(1);
  });

  it('CalendarTab initializes with ui for creating an event.', () => {
    const mockLoginfn = jest.fn();
    const wrapper = mount(<CalendarTab />);
    const componentInstance = wrapper.instance();
    expect(wrapper.find('[dateFormat=false]').length).toBe(2);
    expect(wrapper.find('[timeFormat=false]').length).toBe(1);
  });
});
