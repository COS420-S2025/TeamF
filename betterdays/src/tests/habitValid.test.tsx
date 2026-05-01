//I decided to just work on the code I made becuase it was easy to test.

import DayDay from "../components/calendarParts/Fields/DayDay";
import { render, screen } from "@testing-library/react";
import MonthDay from "../components/calendarParts/Fields/MonthDay";
import WeekDay from "../components/calendarParts/Fields/WeekDay";

describe("DayDay component", () => {
  
  test("does the componenet display", () => {
    const mockDate = new Date(2024, 5, 15);

    render(<DayDay date={mockDate} openModal={() => {}} />);

    const dayDayElement = screen.getByTestId("dayday");
    expect(dayDayElement).toBeInTheDocument();
  });

  //create a test that the monthDay display
  
  test("displays the monthDay component", () => {
    const mockDate = new Date(2024, 5, 15);

    render(<MonthDay date={mockDate} openModal={() => {}} />);

    const monthDayElement = screen.getByTestId("monthday");
    expect(monthDayElement).toBeInTheDocument();
  });

  //create a test that the weekDay displays
  test("displays the weekDay component", () => {
    const mockDate = new Date(2024, 5, 15);

    render(<WeekDay date={mockDate} openModal={() => {}} />);

    const weekDayElement = screen.getByTestId("weekday");
    expect(weekDayElement).toBeInTheDocument();
  });
});