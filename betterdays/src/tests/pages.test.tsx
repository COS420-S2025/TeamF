//simple tests verifying the page shows up.
import React from 'react';
import { render, screen } from '@testing-library/react';
import CalendarPage from '../pages/Calendar';
import HabitPage from '../pages/HabitTracker';
import TagPage from '../pages/TagPage';
import TaskPage from '../pages/TaskPage';

describe('CalendarPage', () => {
  test('renders CalendarPage component', () => {
    const mockDate = new Date(2024, 5, 15);
    const mockOpenModal = jest.fn();
    render(<CalendarPage activeView="day" date={mockDate} openModal={mockOpenModal} />);
    const calendarPageElement = screen.getByTestId("calendarpage");
    expect(calendarPageElement).toBeInTheDocument();
  });
}); 


describe('HabitPage', () => {
  test('renders HabitPage component', () => {
    const mockDate = new Date(2024, 5, 15);
    const mockOpenModal = jest.fn();
    render(<HabitPage activeView="hday" date={mockDate} openModal={mockOpenModal} />);
    const habitPageElement = screen.getByTestId("habitPage");
    expect(habitPageElement).toBeInTheDocument();
  });
});

describe('TagPage', () => {
  test('renders TagPage component', () => {
    render(<TagPage />);
    const tagPageElement = screen.getByTestId("TagPage");
    expect(tagPageElement).toBeInTheDocument();
  });
});

describe('TaskPage', () => {
  test('renders TaskPage component', () => {
    const mockOpenModal = jest.fn();
    render(<TaskPage openModal={mockOpenModal} />);
    const taskPageElement = screen.getByTestId("taskpage");
    expect(taskPageElement).toBeInTheDocument();
  });
});
