import moment from "moment";

export interface Tag {
  id: number;
  name: string;
};

export type ViewType = 'day' | 'week' | 'month' | 'To Do';

export type TaskState = 0 | 1 | 2; //0 default, 1 completed, 2 failed to complete

export interface Task {
  id: string; //uuid
  title: string; //name
  state?: TaskState; // will likely change to enum later
  subtask: boolean; //is it a subtask?
  tags: Tag[] | null; // what tags does it have
  tasks: Task[] | null; // what subtasks does it have
  start: Date; // start date
  end?: Date; // end date //making this ? so that enddate can be undefined

/*
How to handle this object
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

so to have it go to different locations
list is the list in which all tasks (todo and event) are saved

so to filter to our todo/task page or to the calendar events page

const todoList = list.filter((task) => task.status !== undefined) // Checks to see if if status isn't undefined. If it isn't, then have it appear in the todo list
const calendarList = list.filter((task) => task.start !== undefined) // checking to see if start date is defined. if it isn't, it's a calendar item!


*/
};