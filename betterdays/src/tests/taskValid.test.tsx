import TaskItem from "../components/taskParts/TaskItem";
import type { Task } from "../utils/props/Objects";

//bro import the testing library at least
import { render, screen, fireEvent } from '@testing-library/react';

describe("Task object", () => {
  test("should create a valid task", () => {
    const task: Task = {
      id: "1",
      title: "Test Task",
      description: "Test the functionality of Task",
      completed: 1,
      event: false,
      tags: ["annoying tests"],
      start: new Date("2026-04-17T09:00:00"),
      end: new Date("2026-04-17T10:00:00"),
      userId: "1",
      filterNum: 0
    };

    expect(task.id).toBe("1");
    expect(task.title).toBe("Test Task");
    expect(task.completed).toBe(1);
    expect(task.tags).toEqual(["annoying tests"]);
    expect(task.start instanceof Date).toBe(true);
    expect(task.end instanceof Date).toBe(true);
    expect(task.userId).toBe("1");
    expect(task.filterNum).toBe(0);

  });
});



//Start of actual tests

//I want to test, it goes from ☒, ☑, ☐ and back to ☒
describe("TaskItem component", () => {
  test("should cycle through checkbox states correctly", () => {
    // Mock task data
    const mockTask: Task = {
      id: "1",
      title: "Test Task",
      description: "Testing checkbox cycling",
      completed: 0,
      event: false,
      tags: [],
      start: new Date(),
      end: new Date(),
      userId: "1",
      filterNum: 0
    };

    // Render the TaskItem component with the mock task
    render(<TaskItem taskID={mockTask.id} tagOptions={[]} openModal={() => {}} />);

    const checkbox = screen.getByTestId("checkbox");
    
    // Initial state should be ☐
    expect(checkbox.textContent).toBe("☐");
    // Click to cycle to ☑
    fireEvent.click(checkbox);
    expect(checkbox.textContent).toBe("☑");
    // Click to cycle to ☒
    fireEvent.click(checkbox);
    expect(checkbox.textContent).toBe("☒");
    // Click to cycle back to ☐
    fireEvent.click(checkbox);
    expect(checkbox.textContent).toBe("☐");
  });
});