import moment from "moment";

export interface Tag {
  id: number;
  name: string;
};

export type ViewType = 'day' | 'week' | 'month' | 'To Do' | 'FAQ' | 'Settings';

export interface Task {
  id: string; //uuid
  title: string; //name
  subtask: boolean; //is it a subtask?
  tags: Tag[] | null; // what tags does it have
  tasks: Task[] | null; // what subtasks does it have
  start: Date; // start date
  end: Date; // end date
};