//I'm testing my body work here.
import { render, screen } from "@testing-library/react";
import DayBody from "../components/calendarParts/Collections/dayBody";
import MonthBody from "../components/calendarParts/Collections/monthBody";
import WeekBody from "../components/calendarParts/Collections/weekBody";

describe("Calendar body components", () => {
  test("renders DayBody component", () => {
    const mockDate = new Date(2024, 5, 15);
    render(<DayBody date={mockDate} openModal={() => {}} />);
    const dayBodyElement = screen.getByTestId("daybody");
    expect(dayBodyElement).toBeInTheDocument();
  });

  test("renders MonthBody component", () => {
    const mockDate = new Date(2024, 5, 15);
    render(<MonthBody date={mockDate} openModal={() => {}} />);
    const monthBodyElement = screen.getByTestId("monthbody");
    expect(monthBodyElement).toBeInTheDocument();
  });

  test("renders WeekBody component", () => {
    const mockDate = new Date(2024, 5, 15);
    render(<WeekBody date={mockDate} openModal={() => {}} />);
    const weekBodyElement = screen.getByTestId("weekbody");
    expect(weekBodyElement).toBeInTheDocument();
  });
});