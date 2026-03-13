import moment from "moment";

export interface Tag {
  id: number;
  name: string;
};

export interface Task {
  id: string; //uuid
  name: string; //name
  subtask: boolean; //is it a subtask?
  tags: Tag[] | null; // what tags does it have
  tasks: Task[] | null; // what subtasks does it have
  startDate: Date; // start date
  endDate: Date; // end date
};