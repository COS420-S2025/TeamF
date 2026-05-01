//import weekday habit component and test objects like screen
import WeekDay from "../components/HabitParts/Fields/WeekDay"; 
import type { Task } from "../utils/props/Objects";
import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

//first I want to build a date helper
const createMockDate = (dateString: string): Date => {
    return new Date(dateString);
    };

//I want to make sure that day is any day between tomorrow and 6 days from now
const getNextWeekDate = (): Date => {
    const today = new Date();
    const nextWeekDate = new Date(today);
    nextWeekDate.setDate(today.getDate() + 1); // Start from tomorrow
    return nextWeekDate;
}

//Now I'll describe a situation and check that the page doesn't crash via checking succesful parts on the dom
describe("WeekDay component", () => {
    test("renders without crashing and displays time cells", () => {
        const mockDate = getNextWeekDate();
        render(<WeekDay date={mockDate} openModal={() => {}} />);
        
        // Check if the grid container is rendered
        const gridContainer = screen.getByTestId("grid-container");
        expect(gridContainer).toBeInTheDocument();
        
        // Check if time cells are rendered for 24 hours
        for (let i = 0; i < 24; i++) {
            const hour = i >= 12 ? `${i > 12 ? i - 12 : 12}pm` : `${i === 0 ? 12 : i}am`;
            const timeCell = screen.getByTestId(`time-cell-${hour}`);
            expect(timeCell).toBeInTheDocument();
            expect(timeCell.textContent).toBe(hour);
        }
    })
});

//Now I will check the hook interaction with tasks and refresh
const mockRefreshTasks = jest.fn();
const mockUseTasks = jest.fn(() => ({
    //tasks ensure tasks is not type never
    tasks: [] as Task[],
    refreshTasks: mockRefreshTasks
}));

jest.mock('../../../services/databaseManager', () => ({
    useTasks: () => mockUseTasks()
}));

describe("WeekDay component", () => {
    test("calls refreshTasks on mount", () => {
        const mockDate = getNextWeekDate();
        render(<WeekDay date={mockDate} openModal={() => {}} />);
        
        expect(mockRefreshTasks).toHaveBeenCalled();
    });
});

//lets check the dependency
it('calls refreshTasks when the component mounts', () => {
    const mockDate = getNextWeekDate();
    render(<WeekDay date={mockDate} openModal={() => {}} />);
    
    expect(mockRefreshTasks).toHaveBeenCalled();
});

//check task rendering
it('renders tasks in the correct time slots', () => {
    const mockDate = getNextWeekDate();
    const mockTasks: Task[] = [
        {
            id: "1",
            title: "Test Task 1",
            description: "Testing task rendering",
            completed: 0,
            event: false,
            tags: [],
            start: new Date(mockDate.getFullYear(), mockDate.getMonth(), mockDate.getDate(), 9, 0), // 9am  
            end: new Date(mockDate.getFullYear(), mockDate.getMonth(), mockDate.getDate(), 10, 0), // 10am
            userId: "1",
            filterNum: 0
        }
    ];

    mockUseTasks.mockReturnValue({
        tasks: mockTasks,
        refreshTasks: mockRefreshTasks
    });

    render(<WeekDay date={mockDate} openModal={() => {}} />);
    
    const taskElement = screen.getByText("Test Task 1");
    expect(taskElement).toBeInTheDocument();
});

//openmodal opens when called
it('calls openModal when a task is clicked', () => {
    const mockDate = getNextWeekDate();
    const mockOpenModal = jest.fn();
    const mockTasks: Task[] = [
        {
            id: "1",
            title: "Test Task 1",
            start: new Date(mockDate.getFullYear(), mockDate.getMonth(), mockDate.getDate(), 9, 0), // 9am
            end: new Date(mockDate.getFullYear(), mockDate.getMonth(), mockDate.getDate(), 10, 0),
            event: false,
            tags: [],
            description: "",
            completed: 0,
            userId: "",
            filterNum: 0
        },
        {
            id: "2",
            title: "Test Task 2",
            start: new Date(mockDate.getFullYear(), mockDate.getMonth(), mockDate.getDate(), 11, 0), // 11am
            end: new Date(mockDate.getFullYear(), mockDate.getMonth(), mockDate.getDate(), 12, 0),
            event: false,
            tags: [],
            description: "",
            completed: 0,
            userId: "",
            filterNum: 0
        }
    ];

    mockUseTasks.mockReturnValue({
        tasks: mockTasks,
        refreshTasks: mockRefreshTasks
    });

    render(<WeekDay date={mockDate} openModal={mockOpenModal} />);
    
    const taskElement = screen.getByText("Test Task 1");
    fireEvent.click(taskElement);
    expect(mockOpenModal).toHaveBeenCalledWith(mockTasks[0]);
});

//unfortunately after I installed firebase dependencies I had a conflict that said transport.js setImediate not defined and I don't want to mess with packages.