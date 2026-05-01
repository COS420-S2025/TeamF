import TaskItem from "../components/taskParts/TaskItem";
import { render, screen } from "@testing-library/react";

describe("TaskItem component", () => {
  const mockTask = {
    taskID: "1",
    tagOptions: [],
    openModal: jest.fn()
  }

  test("does the component display", () => {
    render(<TaskItem {...mockTask} />);

    const taskItemElement = screen.getByTestId("taskitem");
    expect(taskItemElement).toBeInTheDocument();
  });

  //does the testbox display
  test("displays the checkbox", () => {
    render(<TaskItem {...mockTask} />);

    const checkboxElement = screen.getByTestId("checkbox");
    expect(checkboxElement).toBeInTheDocument();
  });

  //does the task name display
  test("displays the task name", () => {
    render(<TaskItem {...mockTask} />);

    const taskNameElement = screen.getByTestId("taskname");
    expect(taskNameElement).toBeInTheDocument();
  });
});

